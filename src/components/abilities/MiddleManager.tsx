import { AbilityMiddleManager } from "../../datatypes/GameState";

interface Props {
  ability: AbilityMiddleManager;
}

export default function MiddleManager({ ability }: Props) {
  return (
    <p>
      You&apos;re not assigned tasks but your points for correctly guessing a
      role are doubled.
    </p>
  );
}
