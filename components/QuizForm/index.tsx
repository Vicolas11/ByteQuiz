"use client";
import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { QuestionResp } from "@/interfaces/response.interface";
import { TSearchParams } from "@/interfaces/props.interface";
import { CustomBtn } from "@/components/common/CustomBtn";
import CustomRadio from "@/components/CustomRadioBtn";
import CircularProgress from "../CircularProgress";
import { Persistor } from "@/utils/persistor.util";
import styles from "./styles.module.scss";
import ShowLoader from "../ShowLoader";
import Welldone from "./Welldone";

const QuizForm = ({
  searchParams,
  questions,
  competitionId,
  quizId,
}: TSearchParams) => {
  // Get Initial values from Local Storage
  const initIdx = Persistor.getData("idx");
  const initCount = Persistor.getData("count");
  const initQuestData = Persistor.getData("questData");
  const [ansQuestData, setAnsQuestData] = useState<QuestionResp[]>(
    initQuestData ? initQuestData : []
  );
  const [hasSelect, setHasSelect] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const questData = useMemo(() => questions || [], [questions]);
  const [idx, setIdx] = useState(initIdx ? +initIdx : 0);
  const [count, setCount] = useState(
    initCount ? +initCount : questData[idx]?.time || 0
  );
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string | null;
  }>({});
  const [isFirstRender, setIsFirstRender] = useState(true);
  const showModal = searchParams?.congrats;

  const onSelectOpt = (selected: string | null, isCorrect: boolean) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [idx]: selected,
    }));
    setHasSelect(!!selected);
    setIsCorrect(isCorrect);
  };

  useEffect(() => {
    if (questData[idx] && idx < questData.length) {
      if (!isFirstRender) {
        setCount(questData[idx].time);
      }
      setIsFirstRender(false);
      setHasSelect(!!selectedOptions[idx]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, questData]);

  const handleNext = useCallback(
    (isAnswered = true) => {
      if (questData[idx] && idx < questData.length) {
        const score = questData[idx].score;
        const options = questData[idx].options;

        setIdx((prevIdx) => prevIdx + 1);

        // Save to Local Storage
        Persistor.setData("idx", idx + 1);

        const newQuestData = {
          ...questData[idx],
          time: count,
          point: isCorrect && isAnswered ? count * score : 0,
          isAnswered,
          isCompleted: true,
          options: options.map((opt) => ({
            ...opt,
            isSelected:
              opt.label === selectedOptions[idx] ? true : opt.isSelected,
          })),
        };

        setAnsQuestData((prev) => {
          Persistor.setData("questData", [...prev, newQuestData]);
          return [...prev, newQuestData];
        });
      }
    },
    [count, idx, isCorrect, questData, selectedOptions]
  );

  useEffect(() => {
    if (count <= 0) {
      if (!isFirstRender) {
        handleNext(false);
      }
      setIsFirstRender(false);
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
      Persistor.setData("count", count - 1);
    }, 1000);

    if (idx === questData.length) clearInterval(timer);

    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, isFirstRender, questData.length]);

  useEffect(() => {
    // Enable fullscreen mode when component mounts
    // toggleFullScreen();

    // Event listeners to detect focus loss
    const handleFocus = () => console.log("Window in focus");
    const handleBlur = () => alert("You navigated away from the quiz!");

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Prevent context menu
    const handleContextMenu = (e: any) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Prevent key combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
        alert("Key combinations are disabled during the quiz!");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (idx === questData.length) {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [idx, questData.length]);

  return (
    <>
      {questData[idx] && idx < questData.length ? (
        <Suspense fallback={<ShowLoader />}>
          <div key={questData[idx].id} className={styles.container}>
            <header>
              <h4>Quiz</h4>
              <div>
                <h5>Time Left (Sec)</h5>
                <CircularProgress
                  progress={count}
                  total={questData[idx].time}
                />
              </div>
            </header>

            <div
              className={`${styles.progressor}`}
              style={{ width: `${((idx + 1) / questData.length) * 100}%` }}
            ></div>
            <h3 className={styles.title}>{questData[idx].question}</h3>

            <div className={styles.options}>
              <CustomRadio
                options={questData[idx].options}
                onSelectOpt={onSelectOpt}
                selectedOption={selectedOptions[idx]}
              />
            </div>

            <footer>
              <h4>
                {idx + 1} of {questData.length} Questions
              </h4>
              <CustomBtn
                name="Next"
                disabled={!hasSelect}
                onClick={() => handleNext()}
              />
            </footer>
          </div>
        </Suspense>
      ) : (
        <div className={styles.container}>
          {/* Show this after all the Question is Complete */}
          {idx === questData.length ? (
            <Welldone
              idx={idx}
              showModal={showModal}
              quizId={quizId}
              questData={questData}
              ansQuestData={ansQuestData}
              competitionId={competitionId}
            />
          ) : (
            <h1 className={styles.notFound}>No Quiz Found!</h1>
          )}
        </div>
      )}
    </>
  );
};

export default QuizForm;
