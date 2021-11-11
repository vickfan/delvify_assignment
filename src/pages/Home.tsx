import MessageListItem from "../components/MessageListItem";
import { useCallback, useEffect, useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    useIonModal,
    useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { get, post, put } from "../helpers/api";
import { List } from "../helpers/models";
import { addOutline, listOutline, trashOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { NewListModal } from "../components/NewListModal";

const Home: React.FC = () => {
    const [lists, setLists] = useState<List[]>();
    const [editing, setEditing] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState<number[]>();

    const handleDismiss = () => {
        dismissNewList();
    };

    const getLists = useCallback(
        async function () {
            let activeLists: List[] = await get("/lists");
            setLists(activeLists);
        },
        [setLists]
    );
    const [newList, dismissNewList] = useIonModal(NewListModal, {
        onDismiss: handleDismiss,
        updateList: getLists,
    });

    const toggleEditMode = () => {
        editing ? setEditing(false) : setEditing(true);
    };

    const selectList = (isChecked: boolean, listId: number) => {
        if (isChecked) {
            if (selectedList) {
                if (!selectedList?.includes(listId)) {
                    setSelectedList([...selectedList, listId]);
                    return;
                } else {
                    return;
                }
            } else {
                setSelectedList([listId]);
                return;
            }
        } else {
            if (selectedList) {
                setSelectedList(selectedList.filter((id) => id !== listId));
                return;
            }
        }
    };

    const deleteList = async () => {
        await put("/list", { selectedList }, "application/json");
        getLists();
        toggleEditMode();
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
                <IonList>
                    {lists?.map((list) => {
                        return (
                            <span key={list.id}>
                                {editing ? (
                                    <IonItem>
                                        <IonCheckbox
                                            slot="start"
                                            onIonChange={(e) => {
                                                selectList(
                                                    e.detail.checked,
                                                    list.id
                                                );
                                            }}
                                        />
                                        <IonLabel>{list.name}</IonLabel>
                                    </IonItem>
                                ) : (
                                    <IonItem routerLink={"/tasks/" + list.id}>
                                        <IonLabel>{list.name}</IonLabel>
                                    </IonItem>
                                )}
                            </span>
                        );
                    })}
                </IonList>
                <IonFab horizontal="center" vertical="bottom">
                    {editing ? (
                        <IonFabButton color="danger" onClick={deleteList}>
                            <IonIcon icon={trashOutline} />
                        </IonFabButton>
                    ) : (
                        <IonFabButton
                            onClick={() => {
                                newList({
                                    cssClass: "my-class",
                                });
                            }}
                            color="primary"
                        >
                            <IonIcon icon={addOutline} />
                        </IonFabButton>
                    )}
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Home;
