import { usePlayerInformation } from "../../context/PlayerInformationProvider";
import Finish from "../Finish/Finish";
import MyGuesses from "../MyGuesses/MyGuesses";
import RoleCard from "../RoleCard/RoleCard";
import Tasks from "../Tasks/Tasks";
import styles from "./mainscreen.module.css";

export default function MainScreen() {
  const { myself, loading: playerInformationLoading } = usePlayerInformation();
  return (
    <>
      <div className={styles.content}>
        {!playerInformationLoading && <p>{myself?.displayName}</p>}
        <Tasks />
        <MyGuesses />
        <Finish />
      </div>
      <RoleCard />
    </>
  );
}
