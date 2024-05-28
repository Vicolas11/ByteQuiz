import { getAllCompetitions } from "@/data/competition/getCompetition";
import CompetitionDetailModal from "@/components/Modals/DetailModal";
import { SearchParams } from "@/interfaces/props.interface";
import StartModal from "@/components/Modals/StartNowModal";
import CompetitionCard from "@/components/CompetitionCard";
import DeleteModal from "@/components/Modals/DeleteModal";
import styles from "./compete.module.scss";
import Paginate from "./Paginate";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competition",
};

const CompetitionPage = async ({ searchParams }: SearchParams) => {
  const showModal = searchParams?.detail;
  const showStart = searchParams?.start;
  const showDel = searchParams?.del;
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 9;
  const competitions = await getAllCompetitions({ currentPage, perPage });

  return (
    <>
      {showModal && <CompetitionDetailModal searchParams={searchParams} />}
      {showStart && <StartModal searchParams={searchParams} />}
      {showDel && <DeleteModal searchParams={searchParams} />}
      <div className={styles.container}>
        <div className={styles.content}>
          {competitions?.data && competitions.data.length > 0 ? (
            <Suspense fallback={<h1 className={styles.loading}>Loading...</h1>}>
              <div className={styles.header}>
                <h4>Competitions</h4>
                <p>
                  Compete in exciting competitions to appear on the Leaderboard
                  and also to learn more about programming concepts
                </p>
              </div>
              <ul className={styles.list}>
                {Array.from(competitions.data).map((data) => (
                  <CompetitionCard
                    key={data.id}
                    id={data.id}
                    price={data.price}
                    title={data.title}
                    imgSrc={data.imgCover}
                    subTitle={data.subtitle}
                    dateCreated={data.createdAt}
                    numOfCompetitors={data.joinedUsers.length}
                  />
                ))}
              </ul>
              <Paginate
                perPage={perPage}
                maxVisiblePages={5}
                currentPg={currentPage}
                totalResults={competitions.totalCount || 0}
              />
            </Suspense>
          ) : (
            <h2 className={styles.notFound}>No Competition Found!</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default CompetitionPage;
