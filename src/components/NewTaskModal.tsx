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
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { post } from "../helpers/api";

export const NewTaskModal: React.FC<{
    onDismiss: () => void;
    updateTasks: () => void;
    listId: string;
}> = ({ onDismiss, updateTasks, listId }) => {
    const [taskName, setTaskName] = useState<string | null>();
    const [taskDescription, setTaskDescription] = useState<string | null>();
    const [deadline, setDeadline] = useState<Date | null>();

    const saveNewTask = async () => {
        let body = {
            name: taskName,
            description: taskDescription,
            list_id: parseInt(listId),
            is_active: true,
            is_completed: false,
        };
        await post("/task", body, "application/json");
        updateTasks();
        onDismiss();
    };

    return (
        <div>
            <IonItem>
                <IonButtons slot="start">
                    <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
                </IonButtons>
                <IonHeader>New Task</IonHeader>
                <IonButtons slot="end">
                    <IonButton
                        disabled={taskName ? false : true}
                        onClick={saveNewTask}
                    >
                        Done
                    </IonButton>
                </IonButtons>
            </IonItem>
            <IonCard>
                <IonItem>
                    <IonLabel position="floating">List Name</IonLabel>
                    <IonInput
                        className="ion-text-center"
                        value={taskName}
                        onIonChange={(e) => setTaskName(e.detail.value)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonTextarea
                        className="ion-padding ion-text-center"
                        rows={4}
                        value={taskDescription}
                        onIonChange={(e) => setTaskDescription(e.detail.value)}
                    ></IonTextarea>
                </IonItem>
                <IonItem>
                    <IonLabel>Deadline</IonLabel>
                    <IonDatetime></IonDatetime>
                    {/* <IonInput
                        type="date"
                        onIonChange={(e) => {
                            // setDeadline(e.detail.value);
                            console.log(e.detail.value);
                            console.log(Date.parse(e.detail.value!));
                            let date = Date.parse(e.detail.value!);
                            console.log(date.toISOString());
                        }}
                    /> */}
                </IonItem>
            </IonCard>
        </div>
    );
};
