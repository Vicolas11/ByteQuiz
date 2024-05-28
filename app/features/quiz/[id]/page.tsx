import { Params } from "@/interfaces/props.interface";
import ShowLoader from "@/components/ShowLoader";
import { getAQuiz } from "@/data/quiz/getQuiz";
import QuizForm from "@/components/QuizForm";
import { redirect } from "next/navigation";
import styles from "./quiz.module.scss";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice Quiz",
};

const PracticeQuizPage = async ({ searchParams, params }: Params) => {
  const quiz = await getAQuiz(params.id);

  if (!quiz?.data || quiz.data.hasSubmitted) {
    redirect("/features/learn");
  }

  return (
    <div className={styles.container}>
      <Suspense fallback={<ShowLoader />}>
        <QuizForm
          quizId={quiz.data.id}
          searchParams={searchParams}
          questions={quiz.data.questions}
        />
      </Suspense>
    </div>
  );
};

export default PracticeQuizPage;
