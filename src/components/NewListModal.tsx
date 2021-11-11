import {
    IonButton,
    IonButtons,
    IonCard,
    IonHeader,
    IonInput,
    IonItem,
} from "@ionic/react";
import { useState } from "react";
import { post } from "../helpers/api";

export const NewListModal: React.FC<{
    onDismiss: () => void;
    updateList: () => void;
}> = ({ onDismiss, updateList }) => {
    const [listName, setListName] = useState<string | null>();

    const saveNewList = async () => {
        await post("/newList", { listName }, "application/json");
        updateList();
        onDismiss();
    };

    return (
        <div>
            <IonItem>
                <IonButtons slot="start">
                    <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
                </IonButtons>
                <IonHeader>New List</IonHeader>
                <IonButtons slot="end">
                    <IonButton
                        disabled={listName ? false : true}
                        onClick={saveNewList}
                    >
                        Done
                    </IonButton>
                </IonButtons>
            </IonItem>
            <IonCard>
                <IonInput
                    placeholder="List Name"
                    className="ion-text-center"
                    value={listName}
                    onIonChange={(e) => setListName(e.detail.value)}
                ></IonInput>
            </IonCard>
        </div>
    );
};
