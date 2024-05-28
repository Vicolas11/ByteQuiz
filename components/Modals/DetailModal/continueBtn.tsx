"use client";
import { ContinueBtnProps } from "@/interfaces/props.interface";
import { CustomBtn } from "@/components/common/CustomBtn";
import { usePathname, useRouter } from "next/navigation";
import styles from "./detailmodal.module.scss";

export default function ContinueBtn({
  id,
  userId,
  createdUserId,
  hasSubmitted,
}: ContinueBtnProps) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className={styles.btn_wrapper}>
      {userId === createdUserId || hasSubmitted ? (
        <CustomBtn
          name="Close"
          xtraStyle={styles.btn}
          onClick={() => router.replace(`${pathName}`)}
        />
      ) : (
        <CustomBtn
          name="Continue"
          xtraStyle={styles.btn}
          onClick={() =>
            router.replace(`${pathName}?start=true&id=${id}`, {
              scroll: false,
            })
          }
        />
      )}
    </div>
  );
}
