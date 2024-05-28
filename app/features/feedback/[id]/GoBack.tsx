"use client";
import { MdKeyboardBackspace } from "react-icons/md";
import styles from "./feedbackdetail.module.scss";
import { useRouter } from "next/navigation";

export default function GoBack({ compete }: { compete: any }) {
  const { push } = useRouter();

  return (
    <h4 className={styles.title}>
      <span
        className={styles.btnBack}
        onClick={() => push(`/features/feedback`)}
      >
        <MdKeyboardBackspace />
      </span>
      {`${compete ? compete.title : ""} Feedback`}
    </h4>
  );
}
