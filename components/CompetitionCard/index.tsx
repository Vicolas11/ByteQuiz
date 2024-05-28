"use client";
import { CompetitionCardProps } from "@/interfaces/props.interface";
import { usePathname, useRouter } from "next/navigation";
import { sliceText } from "@/utils/slicetext.util";
import { timeSince } from "@/utils/timeSince";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function CompetitionCard({
  id,
  imgSrc,
  title,
  price,
  subTitle,
  dateCreated,
  numOfCompetitors,
}: CompetitionCardProps) {
  const [width, setWidth] = useState(0);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    });
  }, []);

  return (
    <li
      className={styles.card}
      onClick={() =>
        router.replace(`${pathName}?detail=true&id=${id}`, {
          scroll: true,
        })
      }
    >
      <div className={styles.imgCover}>
        <Image src={imgSrc} fill alt="Image Cover" />
      </div>
      <div className={styles.body}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subTitle}>
          {sliceText(
            `${subTitle}`,
            width >= 768 && width < 1280
              ? width * 0.1
              : width >= 1280
              ? width * 0.041
              : width * 0.3
          )}
        </p>
      </div>
      <div className={styles.footer}>
        <div>
          <p className={styles.users}>{numOfCompetitors} Competitor(s)</p>
        </div>
        <p className={styles.price}>NGN{price}</p>
        <p className={styles.time}>{timeSince(new Date(dateCreated))} ago</p>
      </div>
    </li>
  );
}
