import { getACompetition } from "@/data/competition/getCompetition";
import { getLeaderboard } from "@/data/competition/getLeaderboard";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Params } from "@/interfaces/props.interface";
import styles from "./leaderboard.module.scss";
import { revalidateTag } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
};

const LeaderboardDetailPage = async ({ searchParams, params }: Params) => {
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 9;
  const competition = await getACompetition(params.id);
  const leaderboard = await getLeaderboard(params.id, { currentPage, perPage });
  revalidateTag("competition");

  return (
    <>
      <div className={styles.container}>
        {competition?.data && leaderboard && leaderboard.data ? (
          <LeaderboardTable
            title={competition.data.title}
            currentPg={currentPage}
            perPage={perPage}
            totalCount={leaderboard.totalCount}
            leaderboard={leaderboard.data}
            isError={!leaderboard.status}
          />
        ) : (
          <h2>No Leaderboard Competition Found!</h2>
        )}
      </div>
    </>
  );
};

export default LeaderboardDetailPage;
