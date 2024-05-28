import { SearchParams } from "@/interfaces/props.interface";
import { getUserDTO } from "@/data/user/getUserDTO";
import UserProfile from "@/components/UserProfile";
import styles from "./styles.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function UserProfilePage({ searchParams }: SearchParams) {
  const userData = await getUserDTO();
  const scroll = searchParams?.scroll;

  return (
    <div className={styles.container}>
      <UserProfile userData={userData?.data} scroll={scroll} />
    </div>
  );
}
