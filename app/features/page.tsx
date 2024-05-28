import { FaGamepad, FaQuestionCircle, FaComments } from "react-icons/fa";
import { FaBookOpen, FaChalkboardUser } from "react-icons/fa6";
import { SearchParams } from "@/interfaces/props.interface";
import StartModal from "@/components/Modals/StartNowModal";
import { BsFillTrophyFill } from "react-icons/bs";
import ShowLoader from "@/components/ShowLoader";
import { dataFeature } from "../../utils/data";
import styles from "./features.module.scss";
import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features",
};

const Features = ({ searchParams }: SearchParams) => {
  const showModal = searchParams?.modal;
  const iconFeat = [
    <FaBookOpen key={1} />,
    <FaGamepad key={2} />,
    <FaChalkboardUser key={3} />,
    <BsFillTrophyFill key={4} />,
    <FaComments key={5} />,
    <FaQuestionCircle key={6} />,
  ];

  return (
    <>
      {showModal && <StartModal searchParams={searchParams} />}
      <Suspense fallback={<ShowLoader />}>
        <div className={styles.container}>
          <div className={styles.cardWrapper}>
            {dataFeature.map((itm, idx) => (
              <Link
                key={idx}
                href={itm.link}
                prefetch={false}
                className={styles.card}
              >
                {iconFeat[idx]}
                <h4>{itm.title}</h4>
                <p>{itm.details}</p>
              </Link>
            ))}
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Features;
