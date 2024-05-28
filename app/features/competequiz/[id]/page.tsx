import { getACompetition } from "@/data/competition/getCompetition";
import { Params } from "@/interfaces/props.interface";
import ShowLoader from "@/components/ShowLoader";
import QuizForm from "@/components/QuizForm";
import { redirect } from "next/navigation";
import styles from "./quiz.module.scss";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compete Quiz",
};

const CompeteQuizPage = async ({ searchParams, params }: Params) => {
  const competition = await getACompetition(params.id);

  if (!competition?.data || competition.data.hasSubmitted) {
    redirect("/features/competition");
  }

  return (
    <div className={styles.container}>
      <Suspense fallback={<ShowLoader />}>
        <QuizForm
          competitionId={competition.data.id}
          searchParams={searchParams}
          questions={competition.data.questions}
        />
      </Suspense>
    </div>
  );
};

export default CompeteQuizPage;
