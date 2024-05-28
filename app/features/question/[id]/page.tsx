import UpdateQuestionForm from "@/components/UpdateQuestionForm/page";
import { getACompetition } from "@/data/competition/getCompetition";
import { Params } from "@/interfaces/props.interface";
import styles from "./question.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Question",
};

const UpdateQuestionPage = async ({ params, searchParams }: Params) => {
  const competition = await getACompetition(params.id);

  return (
    <div className={styles.container}>
      {competition?.data ? (
        <UpdateQuestionForm
          searchParams={searchParams}
          data={competition.data}
        />
      ) : (
        <div className={styles.notFound}>
          <p>Competition not found!</p>
        </div>
      )}
    </div>
  );
};

export default UpdateQuestionPage;
