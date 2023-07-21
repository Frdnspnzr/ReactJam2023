import { usePlayerInformation } from "../../context/PlayerInformationProvider";
import Finish from "../Finish/Finish";
import MyGuesses from "../MyGuesses/MyGuesses";
import RoleCard from "../RoleCard/RoleCard";

export default function MainScreen() {
  const { myself, loading: playerInformationLoading } = usePlayerInformation();
  return (
    <>
      {!playerInformationLoading && <p>{myself?.displayName}</p>}
      <MyGuesses />
      <Finish />
      <RoleCard />
    </>
  );
}
