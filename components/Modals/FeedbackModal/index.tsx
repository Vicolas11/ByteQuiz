"use client";
import { CustomBtn } from "@/components/common/CustomBtn";
import Modal from "@/components/Modals/Modal";
import { useRouter } from "next/navigation";
import styles from "./feedbackmodal.module.scss";

const FeedbackModal = () => {
  const router = useRouter();

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <p>No feedback yet because you have NOT taken any practical Quiz!</p>
        <div className={styles.btn_wrapper}>
          <CustomBtn
            name="Close"
            xtraStyle={styles.btn}
            onClick={() => router.replace("/features")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
