"use client";
import { joinedCompetitionAction } from "@/services/competition/competitionActions";
import { createQuizAction } from "@/services/quiz/quizActions";
import { SearchParams } from "@/interfaces/props.interface";
import { CustomBtn } from "@/components/common/CustomBtn";
import styles from "./startnowmodal.module.scss";
import Modal from "@/components/Modals/Modal";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const StartModal = ({ searchParams }: SearchParams) => {
  const competitionId = searchParams?.id as string;
  const concept = searchParams?.concept as string;
  const [state, action] = useFormState(
    concept ? createQuizAction : joinedCompetitionAction,
    { data: null }
  );

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        const isCompete = state.data.compete;
        const id = state.data.data.id;
        redirect(`/features/${isCompete ? "competequiz" : "quiz"}/${id}`);
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data]);

  return (
    <Modal xtraStyle={styles.modal}>
      <div className={styles.container}>
        <h4>Quiz Instruction</h4>
        <p>
          You are about to take a quiz. Each question has time allocated to it.
          The faster and correctly you answer it, the more points you earned.
        </p>
        <div className={styles.btnWrapper}>
          <form action={action}>
            <input
              type="hidden"
              name="competitionId"
              defaultValue={competitionId}
            />
            <input type="hidden" name="concept" defaultValue={concept} />
            <CustomBtn name="Start Now" xtraStyle={styles.btn} />
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default StartModal;
