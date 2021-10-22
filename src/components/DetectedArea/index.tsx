import { IDetectedArea } from "../../types";
import { calculatePercentage, randomHexColor } from "../../utils";
import styles from "./styles.module.scss";
const DetectedArea: React.FC<IDetectedArea> = ({
  bbox,
  score,
  name,
  zIndex,
}) => {
  const color = `#${randomHexColor()}`;
  return (
    <div
      className={styles.wrapper}
      style={{
        position: "absolute",
        top: `${bbox[1]}px`,
        left: `${bbox[0]}px`,
        width: `${bbox[2]}px`,
        height: `${bbox[3]}px`,
        zIndex: zIndex + 1,
        transformOrigin: "center center",
        border: `4px solid ${color || "#111"}`,
        background: "transparent",
      }}
    >
      <p style={{ background: `${color}` }} className={styles.wrapperTitle}>
        {name + " " + calculatePercentage(score)}
      </p>
    </div>
  );
};
export default DetectedArea;
