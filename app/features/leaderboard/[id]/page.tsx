import { getACompetition } from "@/data/competition/getCompetition";
import { getLeaderboard } from "@/data/competition/getLeaderboard";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Params } from "@/interfaces/props.interface";
import ShowLoader from "@/components/ShowLoader";
import styles from "./leaderboard.module.scss";
import { revalidateTag } from "next/cache";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Leaderboard",
};

const LeaderboardDetailPage = async ({ searchParams, params }: Params) => {
  revalidateTag("competition");
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 9;
  const competition = await getACompetition(params.id);
  const leaderboard = await getLeaderboard(params.id, { currentPage, perPage });

  return (
    <>
      <div className={styles.container}>
        {competition?.data && leaderboard && leaderboard.data ? (
          <Suspense fallback={<ShowLoader />}>
            <LeaderboardTable
              title={competition.data.title}
              currentPg={currentPage}
              perPage={perPage}
              totalCount={leaderboard.totalCount}
              leaderboard={leaderboard.data}
              isError={!leaderboard.status}
            />
          </Suspense>
        ) : (
          <div className={styles.notFoundContent}>
            <h2>No Leaderboard Competition Found!</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default LeaderboardDetailPage;
