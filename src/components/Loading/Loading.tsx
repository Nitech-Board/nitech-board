import ReactLoading from "react-loading";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <ReactLoading type="spokes" color="#444" height={130} width={130} />
    </div>
  );
}
