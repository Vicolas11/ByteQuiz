import { SearchParams } from "@/interfaces/props.interface";
import QuestionForm from "@/components/QuestionForm/page";
import styles from "./question.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question",
};

const QuestionPage = ({ searchParams }: SearchParams) => {
  return (
    <div className={styles.container}>
      <QuestionForm searchParams={searchParams} />
    </div>
  );
};

export default QuestionPage;
