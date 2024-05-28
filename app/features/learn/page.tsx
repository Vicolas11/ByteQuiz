import { SearchParams } from "@/interfaces/props.interface";
import Learn from "@/components/Learn/page";
import styles from "./styles.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn",
};

const LearnPage = ({ searchParams }: SearchParams) => {
  return (
    <div className={styles.container}>
      <Learn searchParams={searchParams} />
    </div>
  );
};

export default LearnPage;
