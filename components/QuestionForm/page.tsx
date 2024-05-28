"use client";
import QuestionDetailModal from "@/components/Modals/QuestionDetailModal";
import { CustomInput } from "@/components/common/CustomInput";
import QuestionModal from "@/components/Modals/QuestionModal";
import { SearchParams } from "@/interfaces/props.interface";
import { CustomBtn } from "@/components/common/CustomBtn";
import { usePathname, useRouter } from "next/navigation";
import { FaEdit, FaSave } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import styles from "./question.module.scss";
import { FaTrash } from "react-icons/fa6";
import { optArr } from "@/utils/data";
import {
  InputValue,
  ActionType,
  CreateQuestList,
  CreateMultiInputValue,
} from "@/interfaces/others.interface";

const QuestionForm = ({ searchParams }: SearchParams) => {
  const [isCorrect, setIsCorrect] = useState<string | null>(null);
  const [inpValue, setInpValue] = useState<InputValue>({
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    time: "",
    score: "",
  });
  const showModal = searchParams?.modal;
  const showSubmitModal = searchParams?.submit;
  const pathname = usePathname();
  const router = useRouter();

  const [multiInpVal, setMultiInpVal] = useState<CreateMultiInputValue>({});

  const actionArr = Object.values(multiInpVal).map((data) => [
    data._id,
    { isSave: true, isEdit: false },
  ]);

  const [action, setAction] = useState<ActionType>(
    Object.fromEntries(actionArr)
  );

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key?: keyof typeof multiInpVal,
    idx = -1
  ) => {
    const { value, name } = evt.target;

    if (key !== undefined) {
      if (idx >= 0) {
        setMultiInpVal((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            options: prev[key].options.map((opts, optIdx) =>
              optIdx === idx ? { ...prev[key].options[idx], value } : opts
            ),
          },
        }));

        return;
      }

      setMultiInpVal((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [name]: value,
        },
      }));

      return;
    }

    setInpValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleBtnClick = (key: keyof typeof multiInpVal, idx: number) => {
    setMultiInpVal((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: prev[key].options?.map((opts, optIdx) => {
          return optIdx === idx
            ? { ...opts, isCorrect: true }
            : { ...opts, isCorrect: false };
        }),
      },
    }));
  };

  const handleAction = (key: keyof typeof action) => {
    setAction((prev) => ({
      ...prev,
      [key]: { isEdit: !prev[key]?.isEdit, isSave: !prev[key]?.isSave },
    }));
  };

  const removeQuestion = (idx: string) => {
    const delArr = Object.values(multiInpVal).filter(
      (item) => item._id !== idx
    );
    const multiInpValArr = delArr.map((data, i) => [i, data]);
    setMultiInpVal(Object.fromEntries(multiInpValArr));
  };

  const addQuestion = () => {
    const { question, opt1, opt2, opt3, opt4, score, time } = inpValue;
    const id = `${Math.floor(Math.random() * 10000)}`;
    const newArr: CreateQuestList[] = [
      ...Object.values(multiInpVal),
      {
        _id: id,
        question,
        time: +time,
        score: +score,
        point: +time * +score,
        isAnswered: false,
        isCompleted: false,
        options: [
          {
            label: "A",
            value: opt1,
            isSelected: false,
            isCorrect: isCorrect === "opt1",
          },
          {
            label: "B",
            value: opt2,
            isSelected: false,
            isCorrect: isCorrect === "opt2",
          },
          {
            label: "C",
            value: opt3,
            isSelected: false,
            isCorrect: isCorrect === "opt3",
          },
          {
            label: "D",
            value: opt4,
            isSelected: false,
            isCorrect: isCorrect === "opt4",
          },
        ],
      },
    ];
    const newQuestion = newArr.map((data, i) => [i, data]);

    setMultiInpVal(Object.fromEntries(newQuestion));

    setAction((prev) => ({
      ...prev,
      [id]: { isSave: true, isEdit: false },
    }));

    // Reset Input and Textarea to empty strings
    setInpValue(Object.fromEntries(Object.keys(inpValue).map((d) => [d, ""])));
    setIsCorrect(null);
  };

  const data = Object.values(multiInpVal).map(
    ({ _id, score, time, ...rest }) => ({
      score: +score,
      time: +time,
      ...rest,
      point: score * time,
    })
  );

  let disabledAddQuest =
    Object.values(inpValue).some((val) => val === "") || !isCorrect;

  return (
    <>
      {showModal && <QuestionModal />}
      {showSubmitModal && <QuestionDetailModal data={data} />}
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Question</h1>
          <p>
            Create competition by setting up multiple questions and allocate
            time and score to each
          </p>
        </div>

        <div className={styles.box}>
          <div className={styles.questionBox}>
            <label htmlFor="Quest">Enter your questions here</label>
            <textarea
              id="Quest"
              name="question"
              value={inpValue.question}
              onChange={handleInputChange}
              placeholder="Type your questions here..."
            ></textarea>
          </div>
          <div className={styles.optionsBox}>
            <h4>Enter your options here and check the correct option</h4>
            <ul className={styles.optList}>
              {optArr.map(({ name, ph, opt }, i) => (
                <li key={i}>
                  <button
                    className={`${styles.btnOpt} ${
                      isCorrect === opt ? styles.active : ""
                    }`}
                    onClick={() => setIsCorrect(opt)}
                  >
                    {name}
                  </button>
                  <CustomInput
                    name={opt}
                    value={inpValue[opt]}
                    onChange={handleInputChange}
                    placeholder={ph}
                    xtraStyle={styles.input}
                  />
                </li>
              ))}
            </ul>
            <div className={styles.time_score}>
              <div className={styles.time}>
                <label htmlFor="time">Time (seconds)</label>
                <CustomInput
                  id="time"
                  name="time"
                  type="number"
                  value={inpValue.time}
                  onChange={handleInputChange}
                  placeholder="Allocate time in seconds"
                  xtraStyle={styles.input}
                />
              </div>
              <div className={styles.score}>
                <label htmlFor="score">Scores</label>
                <CustomInput
                  id="score"
                  name="score"
                  type="number"
                  value={inpValue.score}
                  onChange={handleInputChange}
                  placeholder="Question score"
                  xtraStyle={styles.input}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.add_question}>
          <CustomBtn
            name="Add Question"
            disabled={disabledAddQuest}
            onClick={addQuestion}
          />
        </div>

        <ul className={styles.questionList}>
          {Object.values(multiInpVal).length !== 0 &&
            Object.values(multiInpVal).map((data, i) => (
              <li key={i}>
                {/* 1. Question */}
                <div className={styles.txtAreaQuest}>
                  <h2>{i + 1}</h2>
                  <textarea
                    name="question"
                    disabled={!action[data._id]?.isEdit}
                    value={multiInpVal[i]?.question}
                    onChange={(evt) => handleInputChange(evt, `${i}`)}
                  ></textarea>
                </div>
                {/* OPTION INPUTS A - D */}
                <ul className={styles.optList}>
                  {data.options.map((itm, idx) => (
                    <li key={idx}>
                      <button
                        disabled={!action[data._id]?.isEdit}
                        className={`${styles.btnOpt} ${
                          multiInpVal[i]?.options[idx].isCorrect
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => handleBtnClick(`${i}`, idx)}
                      >
                        {itm.label}
                      </button>
                      <CustomInput
                        disabled={!action[data._id]?.isEdit}
                        id={`${idx}`}
                        name="options"
                        value={multiInpVal[i]?.options[idx].value}
                        onChange={(evt) => handleInputChange(evt, `${i}`, idx)}
                        placeholder="Option"
                        xtraStyle={styles.input}
                      />
                    </li>
                  ))}
                </ul>
                {/* TIME AND SCORE INPUTS */}
                <div className={styles.time_score}>
                  <div className={styles.time}>
                    <label htmlFor="time">Time (seconds)</label>
                    <CustomInput
                      id="time"
                      name="time"
                      type="number"
                      placeholder="Allocate time in seconds"
                      value={`${multiInpVal[i]?.time}`}
                      onChange={(evt) => handleInputChange(evt, `${i}`)}
                      disabled={!action[data._id]?.isEdit}
                      xtraStyle={styles.input}
                    />
                  </div>
                  <div className={styles.score}>
                    <label htmlFor="score">Scores</label>
                    <CustomInput
                      id="score"
                      name="score"
                      type="number"
                      placeholder="Question score"
                      value={`${multiInpVal[i]?.score}`}
                      onChange={(evt) => handleInputChange(evt, `${i}`)}
                      disabled={!action[data._id]?.isEdit}
                      xtraStyle={styles.input}
                    />
                  </div>
                  {/* EDIT, SAVE, AND DELETE BUTTONS */}
                  <div className={styles.btn_group}>
                    <div className={styles.toolTip}>
                      <CustomBtn
                        icon={<FaEdit />}
                        xtraStyle={styles.btn}
                        disabled={action[data._id]?.isEdit}
                        onClick={() => handleAction(data._id)}
                      />
                      <div className={styles.toolTipTxt}>Edit Question</div>
                    </div>
                    <div className={styles.toolTip}>
                      <CustomBtn
                        icon={<FaSave />}
                        xtraStyle={styles.btn}
                        disabled={action[data._id]?.isSave}
                        onClick={() => handleAction(data._id)}
                      />
                      <div className={styles.toolTipTxt}>Save Question</div>
                    </div>
                    <div className={styles.toolTip}>
                      <CustomBtn
                        icon={<FaTrash />}
                        xtraStyle={styles.btn}
                        onClick={() => removeQuestion(data._id)}
                      />
                      <div className={styles.toolTipTxt}>Delete Question</div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>

        {Object.values(multiInpVal).length !== 0 && (
          <div className={styles.add_question}>
            <CustomBtn
              name="Continue"
              onClick={() =>
                router.replace(`${pathname}?modal=true`, {
                  scroll: false,
                })
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionForm;
