import { SubmitQuizResp } from "@/interfaces/response.interface";
import styles from "./congratmodal.module.scss";
import Image from "next/image";
import Done from "./Done";

const CongratModal = ({ data }: { data: SubmitQuizResp }) => {
  const hasAchieved = data.other.hasAchieved;
  const achievement = data.other.achievement;
  const lstIdx = achievement.length - 1;
  let medalImgSrc = "";
  if (hasAchieved) medalImgSrc = achievement[lstIdx].medalImg;
  const totalPoint = data.data.totalPoint;
  const overallPoint = data.data.overallPoint;
  const percentage = (totalPoint / overallPoint) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.headerImg}>
        <p className={styles.title}>Keep up the great work!</p>
        <Image src="/img.jpg" alt="Profile picture" fill />
        {hasAchieved && (
          <div className={styles.medalImg}>
            <Image src={medalImgSrc} alt="medal" fill />
          </div>
        )}
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.body}>
        {hasAchieved && <h4>You have earned an achievement</h4>}
        {hasAchieved && <p className={styles.congrat}>{data.message}</p>}
        <h5>Well done</h5>
        <p>
          {`You have attained a total point of ${totalPoint} out of ${overallPoint}
         ( ${percentage.toFixed(2)}%)`}
        </p>
        <Done hasAchieved={hasAchieved} />
      </div>
    </div>
  );
};

export default CongratModal;
