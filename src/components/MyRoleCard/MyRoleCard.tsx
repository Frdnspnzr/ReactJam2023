import useRoles from "../../hooks/useRoles";
import RoleCard from "../RoleCard/RoleCard";

export default function MyRoleCard() {
  const { myRole, loading: myRoleLoading } = useRoles();
  return <>{!myRoleLoading && <RoleCard role={myRole!} />}</>;
}
