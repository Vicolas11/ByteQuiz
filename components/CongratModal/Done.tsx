import { CustomBtn } from "../common/CustomBtn";
import styles from "./congratmodal.module.scss";
import { useRouter } from "next/navigation";

export default function Done({ hasAchieved }: { hasAchieved: boolean }) {
  const { replace } = useRouter();

  return (
    <CustomBtn
      name={"Close"}
      xtraStyle={styles.doneBtn}
      onClick={() =>
        replace(`/features/${hasAchieved ? "profile?scroll=true" : "learn"}`)
      }
    />
  );
}
