import classNames from "classnames";
import useFinished from "../../hooks/useFinished";
import style from "./finish.module.css";

export default function Finish() {
  const { iAmFinished, canIFinish, toggle, loading } = useFinished();

  if (loading) {
    return <>...</>;
  } else {
    return (
      <div className={style.container}>
        <button
          onClick={toggle}
          className={classNames(style.button, {
            [style.finished]: iAmFinished,
          })}
          disabled={!canIFinish}
        >
          {iAmFinished ? "✓" : "×"} Finished
        </button>
      </div>
    );
  }
}
