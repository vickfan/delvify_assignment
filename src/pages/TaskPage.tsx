import { useCallback, useEffect, useState } from "react";
import { Message, getMessage } from "../data/messages";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonNote,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonModal,
    useIonViewWillEnter,
} from "@ionic/react";
import {
    addOutline,
    arrowForwardOutline,
    personCircle,
    trashBinOutline,
    trashOutline,
} from "ionicons/icons";
import { useParams } from "react-router";
import { get, put } from "../helpers/api";
import { List, Task } from "../helpers/models";
import styles from "./TaskPage.module.scss";
import { NewTaskModal } from "../components/NewTaskModal";

function TaskPage() {
    const [list, setList] = useState<List>();
    const [tasks, setTasks] = useState<Task[]>();
    const [editing, setEditing] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState<number[]>();
    const { listId } = useParams<{ listId: string }>();

    const getInfo = useCallback(
        async function () {
            let activeList: List = await get(`/list/${listId}`);
            setList(activeList);
            let activeTasks = await get(`/tasks/${listId}`);
            setTasks(activeTasks);
        },
        [setList, setTasks]
    );

    const selectList = (isChecked: boolean, taskId: number) => {
        if (isChecked) {
            if (selectedList) {
                if (!selectedList?.includes(taskId)) {
                    setSelectedList([...selectedList, taskId]);
                    return;
                } else {
                    return;
                }
            } else {
                setSelectedList([taskId]);
                return;
            }
        } else {
            if (selectedList) {
                setSelectedList(selectedList.filter((id) => id !== taskId));
                return;
            }
        }
    };

    const deleteTask = async () => {
        await put("/task", { selectedList }, "application/json");
        getInfo();
        toggleEditMode();
    };

    const handleDismiss = () => {
        dismissNewTask();
    };

    const [newTask, dismissNewTask] = useIonModal(NewTaskModal, {
        onDismiss: handleDismiss,
        updateTasks: getInfo,
        listId,
    });

    const toggleEditMode = () => {
        editing ? setEditing(false) : setEditing(true);
    };

    const completeTask = async (taskId: number) => {
        await get(`/task/${taskId}`);
        getInfo();
    };

    useEffect(() => {
        getInfo();
    }, [getInfo]);

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton
                            text="Lists"
                            defaultHref="/home"
                        ></IonBackButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={toggleEditMode}>
                            {editing ? "done" : "edit"}
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    {tasks?.map((task) => {
                        return (
                            <span key={task.id}>
                                <IonItem>
                                    {editing ? (
                                        <IonCheckbox
                                            onIonChange={(e) => {
                                                selectList(
                                                    e.detail.checked,
                                                    task.id
                                                );
                                            }}
                                        />
                                    ) : null}
                                    <IonLabel>
                                        <span
                                            className={
                                                task.is_completed
                                                    ? styles.completedTask
                                                    : ""
                                            }
                                        >
                                            {task.name}
                                        </span>
                                    </IonLabel>
                                    {!task.is_completed && !editing ? (
                                        <IonButton
                                            color="success"
                                            slot="end"
                                            onClick={() =>
                                                completeTask(task.id)
                                            }
                                        >
                                            complete
                                        </IonButton>
                                    ) : null}
                                </IonItem>
                            </span>
                        );
                    })}
                </IonList>
                <IonFab horizontal="center" vertical="bottom">
                    {editing ? (
                        <>
                            <IonFabButton
                                className="ion-margin-vertical"
                                color="success"
                            >
                                <IonIcon icon={arrowForwardOutline} />
                            </IonFabButton>
                            <IonFabButton color="danger" onClick={deleteTask}>
                                <IonIcon icon={trashOutline} />
                            </IonFabButton>
                        </>
                    ) : (
                        <IonFabButton
                            color="primary"
                            onClick={() => {
                                newTask({
                                    cssClass: "my-class",
                                });
                            }}
                        >
                            <IonIcon icon={addOutline} />
                        </IonFabButton>
                    )}
                </IonFab>
            </IonContent>
        </IonPage>
    );
}

export default TaskPage;
