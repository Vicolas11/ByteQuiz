import { getAllCompetitions } from "@/data/competition/getCompetition";
import LeaderboardCompete from "@/components/LeaderboardCompete";
import { SearchParams } from "@/interfaces/props.interface";
import ShowLoader from "@/components/ShowLoader";
import styles from "./leaderboard.module.scss";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
};

const LeaderboardCompetePage = async ({ searchParams }: SearchParams) => {
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 8;
  const competitions = await getAllCompetitions({ currentPage, perPage });

  return (
    <>
      <div className={styles.container}>
        {competitions?.data ? (
          <Suspense fallback={<ShowLoader />}>
            <LeaderboardCompete
              currentPg={currentPage}
              perPage={perPage}
              totalCount={competitions.totalCount}
              competition={competitions.data}
              isError={!competitions.status}
            />
          </Suspense>
        ) : (
          <h2>No Leaderboard Competition Found!</h2>
        )}
      </div>
    </>
  );
};

export default LeaderboardCompetePage;
