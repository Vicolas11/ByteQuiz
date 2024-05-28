"use client";
import { LeaderboardProps, dataType } from "@/interfaces/props.interface";
import { usePathname, useRouter } from "next/navigation";
import { tableInfo } from "@/data/localData/table.data";
import { Suspense, useEffect, useState } from "react";
import { formatDate } from "@/utils/formatdate.util";
import { CustomBtn } from "../common/CustomBtn";
import styles from "./styles.module.scss";
import CustomTable from "../CustomTable";
import ShowLoader from "../ShowLoader";

export default function FeedbackCompete({
  currentPg,
  perPage,
  joinedCompetition,
  isError,
  totalCount,
}: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(currentPg);
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const theadData = tableInfo.headJoined;

  const tbodyData = joinedCompetition
    ? joinedCompetition.map((itm, i) => ({
        id: itm.id,
        index: i + 1,
        title: itm.title,
        point: itm.point,
        position: itm.position,
        remark: itm.remark,
        author: itm.authorUsername,
        date: itm.joinedDate,
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
        {colIdx === 6 ? (
          <>{formatDate(data)}</>
        ) : colIdx === lstIdx ? (
          <div className={styles.btn}>
            <CustomBtn
              name="Feedback"
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
          <h4 className={styles.title}>Feedback Competition</h4>
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
            emptyText="No Feedback"
            isError={isError}
            errMsg={"An error occurred"}
          />
        </Suspense>
      </div>
    </>
  );
}
