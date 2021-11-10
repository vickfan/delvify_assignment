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
    useIonViewWillEnter,
} from "@ionic/react";
import { personCircle, trashBinOutline, trashOutline } from "ionicons/icons";
import { useParams } from "react-router";
import { get } from "../helpers/api";
import { List, Task } from "../helpers/models";
import styles from "./TaskPage.module.scss";

function TaskPage() {
    const [list, setList] = useState<List>();
    const [tasks, setTasks] = useState<Task[]>();
    const [editing, setEditing] = useState<boolean>(false);
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

    const toggleEditMode = () => {
        editing ? setEditing(false) : setEditing(true);
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
                            <>
                                <IonItem key={task.id}>
                                    {editing ? <IonCheckbox /> : null}
                                    <IonLabel>
                                        <span
                                            className={
                                                task.is_completed
                                                    ? styles.completedTask
                                                    : ""
                                            }
                                        >
                                            {task.content}
                                        </span>
                                    </IonLabel>
                                    {!task.is_completed ? (
                                        <IonButton color="success" slot="end">
                                            complete
                                        </IonButton>
                                    ) : null}
                                </IonItem>
                            </>
                        );
                    })}
                </IonList>
                {editing ? (
                    <IonFab horizontal="center" vertical="bottom">
                        <IonFabButton color="danger">
                            <IonIcon icon={trashOutline} />
                        </IonFabButton>
                    </IonFab>
                ) : null}
            </IonContent>
        </IonPage>
    );
}

export default TaskPage;
