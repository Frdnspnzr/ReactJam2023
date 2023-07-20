import classNames from "classnames";
import useFinished from "../../hooks/useFinished";
import style from "./finish.module.css";

export default function Finish() {
  const { iAmFinished, toggle } = useFinished();
  return (
    <button
      onClick={toggle}
      className={classNames(style.button, { [style.finished]: iAmFinished })}
    >
      {iAmFinished ? "✓" : "×"} Finished
    </button>
  );
}
