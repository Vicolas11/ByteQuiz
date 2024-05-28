import { CustomInput } from "@/components/common/CustomInput";
import { CustomBtn } from "@/components/common/CustomBtn";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./questiondetailmodal.module.scss";
import {
  createCompetitionAction,
  updateCompetitionAction,
} from "@/services/competition/competitionActions";
import Modal from "@/components/Modals/Modal";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import {
  CreateCompetition,
  QuestDetailModalProps,
} from "@/interfaces/others.interface";
import toast from "react-hot-toast";
import Image from "next/image";

const QuestionDetailModal = ({
  data,
  competeData,
  isUpdate = false,
}: QuestDetailModalProps) => {
  const [state, action] = useFormState(
    isUpdate ? updateCompetitionAction : createCompetitionAction,
    { data: null }
  );
  const [inputValue, setInputValue] = useState({
    title: isUpdate ? competeData?.title || "" : "",
    subtitle: isUpdate ? competeData?.subtitle || "" : "",
    price: isUpdate ? competeData?.price || "" : "",
  });
  const { title, subtitle, price } = inputValue;

  const handleOnChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = evt.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  let newCompeteData: CreateCompetition = {
    title,
    subtitle,
    price: +price,
    questionData: data,
  };

  if (isUpdate) {
    newCompeteData = { id: competeData?.id, ...newCompeteData };
  }

  let disabled = Object.values(inputValue).some((val) => val === "");

  useEffect(() => {
    if (state?.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        redirect("/features/competition");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state?.data]);

  return (
    <Modal xtraStyle={styles.modal}>
      <form action={action}>
        <div className={styles.container}>
          <div className={styles.coverImg}>
            <div className={styles.overlay}></div>
            <Image
              className={styles.Image}
              src={"/placeholder.png"}
              alt="placeholder"
              fill
            />
          </div>

          <CustomInput
            xtraStyle={styles.input}
            placeholder="Title"
            name="title"
            value={inputValue.title}
            onChange={handleOnChange}
          />

          <textarea
            placeholder="Subtitle"
            rows={3}
            name="subtitle"
            value={inputValue.subtitle}
            onChange={handleOnChange}
          ></textarea>

          <CustomInput
            xtraStyle={styles.input}
            type="number"
            placeholder="Price"
            name="price"
            value={inputValue.price}
            onChange={handleOnChange}
          />

          <input
            type="hidden"
            name="data"
            defaultValue={JSON.stringify(newCompeteData)}
          />

          <div className={styles.btn_wrapper}>
            <CustomBtn
              name={isUpdate ? "Update" : "Submit"}
              xtraStyle={styles.btn}
              disabled={disabled}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default QuestionDetailModal;
