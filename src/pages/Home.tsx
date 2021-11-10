import MessageListItem from "../components/MessageListItem";
import { useCallback, useEffect, useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
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
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { get } from "../helpers/api";
import { List } from "../helpers/models";
import { trashOutline } from "ionicons/icons";

const Home: React.FC = () => {
    const [lists, setLists] = useState<List[]>();
    const [editing, setEditing] = useState<boolean>(false);

    const getLists = useCallback(
        async function () {
            let activeLists: List[] = await get("/lists");
            setLists(activeLists);
        },
        [setLists]
    );

    const toggleEditMode = () => {
        editing ? setEditing(false) : setEditing(true);
    };

    useEffect(() => {
        getLists();
    }, [getLists]);

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>To Do List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => toggleEditMode()}>
                            {editing ? "done" : "edit"}
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {/* <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher> */}

                <IonList>
                    {lists?.map((list) => {
                        return (
                            <>
                                <IonItem
                                    routerLink={"/tasks/" + list.id}
                                    key={list.id}
                                >
                                    {editing ? (
                                        <IonCheckbox slot="start"></IonCheckbox>
                                    ) : null}
                                    <IonLabel>{list.name}</IonLabel>
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
};

export default Home;
