"use client";
import { PaginateProps } from "@/interfaces/props.interface";
import Pagination from "@/components/Pagination";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Paginate({
  currentPg,
  perPage,
  totalResults,
  maxVisiblePages,
}: PaginateProps) {
  const [currentPage, setCurrentPage] = useState(currentPg);
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    replace(`${pathname}?page=${currentPage}`);
  }, [currentPage, pathname, perPage, replace]);

  return (
    <Pagination
      totalResults={totalResults}
      resultsPerPage={perPage}
      onPageChange={handlePageChange}
      maxVisiblePages={maxVisiblePages}
    />
  );
}
