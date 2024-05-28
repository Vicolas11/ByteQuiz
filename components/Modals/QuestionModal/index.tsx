import { CustomBtn } from "@/components/common/CustomBtn";
import Modal from "@/components/Modals/Modal";
import { usePathname, useRouter } from "next/navigation";
import styles from "./questionmodal.module.scss";

const QuestionModal = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <p>Are you sure all the question and options are correct?</p>
        <div className={styles.btn_wrapper}>
          <CustomBtn
            name="Yes"
            xtraStyle={styles.btn}
            onClick={() =>
              replace(`${pathname}?submit=true`, {
                scroll: false,
              })
            }
          />
          <CustomBtn
            name="No"
            xtraStyle={styles.btn}
            onClick={() => replace(`${pathname}`, { scroll: false })}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
