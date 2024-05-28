"use client";
import { deleteCompetitionAction } from "@/services/competition/competitionActions";
import { SearchParams } from "@/interfaces/props.interface";
import { CustomBtn } from "@/components/common/CustomBtn";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/Modals/Modal";
import styles from "./styles.module.scss";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const DeleteModal = ({ searchParams }: SearchParams) => {
  const [state, action] = useFormState(deleteCompetitionAction, { data: null });
  const competitionId = searchParams?.id as string;
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        replace(pathname);
      } else {
        toast.error(state.data.message);
      }
    }
  }, [pathname, replace, state.data]);

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <h4>Delete Competition</h4>
        <p>Are you sure you want to delete this competition?</p>
        <div className={styles.btn_wrapper}>
          <form action={action}>
            <input type="hidden" name="id" defaultValue={competitionId} />
            <CustomBtn name="Yes" xtraStyle={styles.btn} />
          </form>
          <CustomBtn
            name="No"
            xtraStyle={styles.btn}
            onClick={() => replace(pathname)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
