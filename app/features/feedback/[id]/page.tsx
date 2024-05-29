import { getACompetition } from "@/data/competition/getCompetition";
import { getFeedback } from "@/data/competition/getFeedback";
import { Params } from "@/interfaces/props.interface";
import styles from "./feedbackdetail.module.scss";
import { getAQuiz } from "@/data/quiz/getQuiz";
import { FaDotCircle } from "react-icons/fa";
import { revalidateTag } from "next/cache";
import GoBack from "./GoBack";

const FeedbackDetail = async ({ params }: Params) => {
  revalidateTag("quiz");
  const compete = (await getACompetition(params.id))?.data;
  const quiz = (await getAQuiz(params.id))?.data;
  const feedback = (await getFeedback(params.id))?.data;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <GoBack compete={compete} />
            {compete && (
              <p>{`View the correction for the ${compete.title} competion`}</p>
            )}
            {quiz && <p>{`View the correction for the quiz`}</p>}

            <div className={styles.key}>
              <span className={styles.isCorrect}>
                <FaDotCircle /> <span>Correct Answer</span>
              </span>
              <span className={styles.isSelect}>
                <FaDotCircle /> <span>Selected Answer</span>
              </span>
            </div>
          </div>

          <ul className={styles.questionList}>
            {feedback || quiz?.questions ? (
              (feedback || quiz?.questions)?.map((data, i) => (
                <li key={i}>
                  {/* 1. Question */}
                  <div className={styles.txtAreaQuest}>
                    <h2>{i + 1}</h2>
                    <textarea
                      name="question"
                      disabled
                      value={data.question}
                    ></textarea>
                  </div>
                  {/* OPTION INPUTS A - D */}
                  <ul className={styles.optList}>
                    {data.options.map((itm, idx) => (
                      <li key={idx}>
                        <button
                          disabled
                          className={`${styles.btnOpt} ${
                            data.options[idx].isCorrect ? styles.isCorrect : ""
                          } ${
                            data.options[idx].isSelected !=
                              data.options[idx].isCorrect &&
                            !data.options[idx].isCorrect
                              ? styles.selected
                              : ""
                          }`}
                        >
                          {itm.label}
                        </button>
                        <textarea
                          rows={1}
                          id={`${idx}`}
                          name="options"
                          disabled
                          value={data.options[idx].value}
                          placeholder="Option"
                          className={`${styles.input} ${
                            data.options[idx].isCorrect
                              ? styles.isCorrectInput
                              : ""
                          } ${
                            data.options[idx].isSelected !=
                              data.options[idx].isCorrect &&
                            !data.options[idx].isCorrect
                              ? styles.selectedInput
                              : ""
                          }`}
                        ></textarea>
                      </li>
                    ))}
                  </ul>
                  <h2 className={styles.points}>Point: {data.point}</h2>
                </li>
              ))
            ) : (
              <h2>Not Found</h2>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FeedbackDetail;
