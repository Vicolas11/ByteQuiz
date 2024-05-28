"use client";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { SearchParams } from "@/interfaces/props.interface";
import StartModal from "@/components/Modals/StartNowModal";
import { CustomBtn } from "@/components/common/CustomBtn";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { dataLearn } from "@/utils/data";
import styles from "./learn.module.scss";

const Learn = ({ searchParams }: SearchParams) => {
  let initData = dataLearn.map((_, idx) => [idx, false]);
  initData = Object.fromEntries(initData);
  const [hasOpen, setHasOpen] = useState(initData);
  const show = searchParams?.show;
  const router = useRouter();

  return (
    <Fragment>
      {show && <StartModal searchParams={searchParams} />}
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Programming Language Concepts</h4>
          <p>
            Click the below dropdown to learn more about programming concepts
          </p>
        </div>
        <ul className={styles.list}>
          {dataLearn.map((data, idx) => {
            const i = idx.toString();
            const lstIdx = dataLearn.length - 1;
            return (
              <li key={i}>
                <div
                  className={`${styles.title} ${
                    idx === lstIdx && hasOpen[lstIdx] ? styles.active_lst : ""
                  } ${hasOpen[idx] ? styles.active : ""}`}
                  onClick={() =>
                    setHasOpen((prev) => ({ ...prev, [i]: !prev[idx] }))
                  }
                >
                  <h3>{data.concept}</h3>
                  <span>
                    {hasOpen[idx] ? <MdExpandLess /> : <MdExpandMore />}
                  </span>
                </div>
                {hasOpen[idx] && (
                  <div className={styles.content}>
                    <p>{data.desc}</p>
                    <CustomBtn
                      name="Take Quiz"
                      xtraStyle={styles.btnQuiz}
                      onClick={() =>
                        router.replace(
                          `?show=true&concept=${data.concept.toLowerCase()}`,
                          { scroll: false }
                        )
                      }
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Learn;
