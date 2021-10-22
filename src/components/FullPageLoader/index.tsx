import styles from "./styles.module.scss";
const FullPageLoader = ({ text = "Model is loading..." }: { text?: string }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.wrapperText}>{text}</p>
      <div className={styles.wrapperSpinner}></div>
    </div>
  );
};
export default FullPageLoader;
