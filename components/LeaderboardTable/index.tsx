"use client";
import { LeaderboardProps, dataType } from "@/interfaces/props.interface";
import { usePathname, useRouter } from "next/navigation";
import { tableInfo } from "@/data/localData/table.data";
import { Suspense, useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { timeSince } from "@/utils/timeSince";
import { GiStarMedal } from "react-icons/gi";
import { PiMedalFill } from "react-icons/pi";
import styles from "./styles.module.scss";
import { FaMedal } from "react-icons/fa";
import { BiMedal } from "react-icons/bi";
import CustomTable from "../CustomTable";
import ShowLoader from "../ShowLoader";
import Image from "next/image";

export default function LeaderboardTable({
  currentPg,
  perPage,
  leaderboard,
  title,
  isError,
  totalCount,
}: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(currentPg);
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const theadData = tableInfo.headTable;

  const tbodyData = leaderboard
    ? leaderboard.map((itm, i) => ({
        index: itm.index,
        user: itm.user,
        medal: "",
        position: itm.position,
        point: itm.point,
        action: itm.joinedDate,
        isUser: itm.isUser,
      }))
    : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const tableData = (
    _: dataType,
    row: dataType[],
    data: dataType,
    colIdx: number,
    rowIdx: number
  ) => {
    const lstIdx = row.length - 1;
    return (
      <td key={colIdx}>
        {colIdx === 1 ? (
          <div className={styles.userProfile}>
            <div className={styles.imgProfile}>
              <Image
                src={data.avatar || "/passport.jpg"}
                alt="Profile img"
                fill
              />
            </div>
            <span className={styles.username}>{data.username}</span>
          </div>
        ) : colIdx === 2 ? (
          rowIdx === 0 ? (
            <GiStarMedal size={30} color="#FFD700" />
          ) : rowIdx === 1 ? (
            <FaMedal size={23} color="#C0C0C0" />
          ) : rowIdx === 2 ? (
            <BiMedal size={30} color="#CD7F32" />
          ) : (
            <PiMedalFill size={25} />
          )
        ) : colIdx === lstIdx ? (
          <>{timeSince(new Date(data))} ago</>
        ) : (
          data
        )}
      </td>
    );
  };

  useEffect(() => {
    replace(`${pathname}?page=${currentPage}`);
  }, [currentPage, pathname, perPage, replace]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>
            <span
              className={styles.btnBack}
              onClick={() => push(`/features/leaderboard`)}
            >
              <MdKeyboardBackspace />
            </span>
            {title}
          </h4>
        </div>
        <Suspense fallback={<ShowLoader />}>
          <CustomTable
            isCustomTr={false}
            keysToRemove={["isUser"]}
            tableDataElem={(id, row, data, colIdx, rowIndex) =>
              tableData(id, row, data, colIdx, rowIndex)
            }
            theadData={theadData}
            tbodyData={tbodyData}
            totalResults={totalCount || 0}
            resultsPerPage={perPage}
            maxVisiblePages={5}
            handlePageChange={handlePageChange}
            emptyText="No User on the Leaderboard"
            isError={isError}
            errMsg={"An error occurred"}
          />
        </Suspense>
      </div>
    </>
  );
}
