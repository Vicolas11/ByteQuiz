"use client";
import { submitCompetitionAction } from "@/services/competition/competitionActions";
import { submitQuizAction } from "@/services/quiz/quizActions";
import { WelldoneProps } from "@/interfaces/props.interface";
import { Persistor } from "@/utils/persistor.util";
import { CustomBtn } from "../common/CustomBtn";
import { redirect, useRouter } from "next/navigation";
import CongratModal from "../CongratModal";
import styles from "./styles.module.scss";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Welldone({
  idx,
  quizId,
  showModal,
  ansQuestData,
  questData,
  competitionId,
}: WelldoneProps) {
  const [state, action] = useFormState(
    quizId ? submitQuizAction : submitCompetitionAction,
    { data: null }
  );
  const { replace } = useRouter();

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        Persistor.removeData("idx");
        Persistor.removeData("count");
        Persistor.removeData("questData");
        const isCompete = state.data.compete;
        toast.success(state.data.message);
        replace(
          !isCompete
            ? `/features/quiz/${state.data.data.id}?congrats=true`
            : `/features/leaderboard/${state.data.data}`
        );
      } else {
        toast.error(state.data.message);
      }
    }
  }, [replace, state.data]);

  const competeData = {
    id: competitionId,
    questionData: ansQuestData.map(
      ({ id, userId, quizId, competitionId, options, ...rest }) => ({
        ...rest,
        options: options.map(({ id, questionId, ...rest }) => rest),
      })
    ),
  };

  const quizData = {
    id: quizId,
    questionData: ansQuestData.map(
      ({ userId, quizId, competitionId, options, createdAt, ...rest }) => ({
        ...rest,
        options: options.map(({ questionId, ...rest }) => rest),
      })
    ),
  };

  return (
    <>
      {showModal && state.data && state.data.status && (
        <CongratModal data={state.data} />
      )}

      <div className={styles.wellDone}>
        <h1>Well Done!!!</h1>
        <p>
          {`You have successfully answered a total of ${
            ansQuestData.filter((data) => data.isAnswered).length
          } out of ${
            questData.length
          }. Click the submit button below to submit and see your ${
            quizId ? "achievement" : "position on the leaderboard"
          }.`}
        </p>
        <form action={action}>
          <input
            type="hidden"
            name="data"
            defaultValue={JSON.stringify(quizId ? quizData : competeData)}
          />
          <CustomBtn name="Submit" />
        </form>
      </div>
    </>
  );
}
