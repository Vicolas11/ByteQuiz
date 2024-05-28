"use client";
import { LeaderboardProps, dataType } from "@/interfaces/props.interface";
import { usePathname, useRouter } from "next/navigation";
import { tableInfo } from "@/data/localData/table.data";
import { Suspense, useEffect, useState } from "react";
import { sliceText } from "@/utils/slicetext.util";
import { CustomBtn } from "../common/CustomBtn";
import { timeSince } from "@/utils/timeSince";
import styles from "./styles.module.scss";
import CustomTable from "../CustomTable";
import ShowLoader from "../ShowLoader";

export default function LeaderboardCompete({
  currentPg,
  perPage,
  competition,
  isError,
  totalCount,
}: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(currentPg);
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const theadData = tableInfo.headCompete;

  const tbodyData = competition
    ? competition.map((itm, i) => ({
        id: itm.id,
        index: i + 1,
        title: itm.title,
        subtitle: itm.subtitle,
        price: itm.price,
        overallPoint: itm.overallPoint,
        date: itm.createdAt,
        action: "",
      }))
    : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const tableData = (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIdx: number,
    _: number
  ) => {
    const lstIdx = row.length - 1;
    return (
      <td key={colIdx}>
        {colIdx === 1 ? (
          <>{sliceText(data, 20)}</>
        ) : colIdx === 2 ? (
          <>{sliceText(data, 10)}</>
        ) : colIdx === 3 ? (
          <>NGN{data}</>
        ) : colIdx === 5 ? (
          <>{timeSince(new Date(data))}</>
        ) : colIdx === lstIdx ? (
          <div className={styles.btn}>
            <CustomBtn
              name="View Board"
              onClick={() => push(`${pathname}/${id}`)}
            />
          </div>
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
          <h4 className={styles.title}>Leaderboard Competition</h4>
        </div>
        <Suspense fallback={<ShowLoader />}>
          <CustomTable
            isCustomTr={false}
            keysToRemove={["id"]}
            tableDataElem={(id, row, data, colIdx, rowIndex) =>
              tableData(id, row, data, colIdx, rowIndex)
            }
            theadData={theadData}
            tbodyData={tbodyData}
            totalResults={totalCount || 0}
            resultsPerPage={perPage}
            maxVisiblePages={5}
            handlePageChange={handlePageChange}
            emptyText="No Compete Leaderboard"
            isError={isError}
            errMsg={"An error occurred"}
          />
        </Suspense>
      </div>
    </>
  );
}
