import { usePlayerInformation } from "../../context/PlayerInformationProvider";
import MyGuesses from "../MyGuesses/MyGuesses";
import MyRoleCard from "../MyRoleCard/MyRoleCard";

export default function MainScreen() {
  const { myself, loading: playerInformationLoading } = usePlayerInformation();
  return (
    <>
      {!playerInformationLoading && <p>{myself?.displayName}</p>}
      <MyGuesses />
      <MyRoleCard />
    </>
  );
}
