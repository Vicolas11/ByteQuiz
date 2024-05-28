"use client";
import { CustomBtn } from "@/components/common/CustomBtn";
import Modal from "@/components/Modals/Modal";
import { useRouter } from "next/navigation";
import { FcCancel } from "react-icons/fc";
import styles from "./leadermodal.module.scss";

const LeaderModal = () => {
  const router = useRouter();

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <FcCancel size={70} />
        <p>
          You are not on the Leaderboard yet. Try join a competition to be on
          the Leadership board
        </p>
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

export default LeaderModal;
