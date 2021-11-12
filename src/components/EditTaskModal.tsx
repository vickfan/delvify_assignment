import {
    IonButton,
    IonButtons,
    IonCard,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    IonTitle,
    IonToggle,
} from "@ionic/react";
import { put } from "../helpers/api";
import { Task } from "../helpers/models";

export const EditTask: React.FC<{
    onDismiss: () => void;
    updateTasks: () => void;
    activeTask: Task;
    setActiveTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
}> = ({ onDismiss, updateTasks, activeTask, setActiveTask }) => {
    const saveTask = async () => {
        await put(`/task/${activeTask.id}`, activeTask, "application/json");
        updateTasks();
        onDismiss();
    };

    return (
        <div>
            <IonItem>
                <IonButtons slot="start">
                    <IonButton
                        onClick={() => {
                            onDismiss();
                        }}
                    >
                        Cancel
                    </IonButton>
                </IonButtons>
                <IonHeader>Edit Task</IonHeader>
                <IonButtons slot="end">
                    <IonButton onClick={saveTask}>Done</IonButton>
                </IonButtons>
            </IonItem>
            <IonCard>
                <IonItem>
                    <IonLabel position="floating">List Name</IonLabel>
                    <IonInput
                        value={activeTask.name}
                        onIonChange={(e) =>
                            setActiveTask({
                                ...activeTask,
                                name: e.detail.value!,
                            })
                        }
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonTextarea
                        value={activeTask.description}
                        onIonChange={(e) =>
                            setActiveTask({
                                ...activeTask,
                                description: e.detail.value!,
                            })
                        }
                        rows={4}
                    ></IonTextarea>
                </IonItem>
                <IonItem>
                    <IonLabel>Deadline</IonLabel>
                    <IonDatetime></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel>Status</IonLabel>
                    <IonToggle
                        checked={activeTask.is_completed}
                        onIonChange={(e) =>
                            setActiveTask({
                                ...activeTask,
                                is_completed: e.detail.checked,
                            })
                        }
                    ></IonToggle>
                </IonItem>
            </IonCard>
        </div>
    );
};
