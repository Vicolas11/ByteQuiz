import { getJoinedCompetition } from "@/data/competition/getJoinedCompetition";
import { SearchParams } from "@/interfaces/props.interface";
import { getAllUserQuiz } from "@/data/quiz/getAllUserQuiz";
import FeedbackCompete from "@/components/FeedbackCompete";
import FeedbackQuiz from "@/components/FeedbackQuiz";
import styles from "./feedback.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
};

const FeedbackPage = async ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 8;
  const allQuiz = await getAllUserQuiz({ currentPage, perPage });
  const joinedCompetitions = await getJoinedCompetition({
    currentPage,
    perPage,
  });

  return (
    <>
      <div className={styles.container}>
        {joinedCompetitions?.data && allQuiz?.data ? (
          <>
            <FeedbackCompete
              currentPg={currentPage}
              perPage={perPage}
              totalCount={joinedCompetitions.totalCount}
              joinedCompetition={joinedCompetitions.data}
              isError={!joinedCompetitions.status}
            />
            <FeedbackQuiz
              currentPg={currentPage}
              perPage={perPage}
              totalCount={allQuiz.totalCount}
              quiz={allQuiz.data}
              isError={!allQuiz.status}
            />
          </>
        ) : (
          <h2>No Feedback Found!</h2>
        )}
      </div>
    </>
  );
};

export default FeedbackPage;
