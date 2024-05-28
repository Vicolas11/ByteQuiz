"use client";
import { CustomBtn } from "../common/CustomBtn";
import { useRouter } from "next/navigation";
import styles from "@/app/home.module.scss";

export default function GetStarted() {
  const router = useRouter();

  return (
    <div className={styles.btnContainer}>
      <CustomBtn name={"Get Started"} onClick={() => router.push("/login")} />
      <CustomBtn
        name={"Learn More"}
        xtraStyle={styles.btn}
        onClick={() => router.push("/register")}
      />
    </div>
  );
}
