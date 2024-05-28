import { getStats } from "@/data/user/getStats";
import styles from "./about.module.scss";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = async () => {
  const stats = (await getStats()).data;

  return (
    <div className={styles.container}>
      <div className={styles.txtContainer}>
        <h3>About ByteQuiz</h3>
        <h1>
          Learning computer programming can be challenging and overwhelming,
          especially for beginners.
        </h1>
        <p>
          This web application aims to leverage the power of gamification to
          create a more engaging and effective learning experience for computer
          programming education. By incorporating game mechanics, fostering a
          sense of accomplishment, and providing personalized feedback, the
          proposed platform has the potential to empower individuals of all ages
          and backgrounds to learn and master the fundamentals of computer
          programming.
        </p>
        <div className={styles.stats}>
          <div className={styles.row}>
            <strong>
              <h4>{stats?.users || 0}+</h4>
            </strong>
            <p>Users</p>
          </div>
          <div className={styles.row}>
            <h4>{stats?.competitions || 0}+</h4>
            <p>Competitions</p>
          </div>
          <div className={styles.row}>
            <h4>{stats?.questions || 0}+</h4>
            <p>Questions</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/image_1.svg"
          alt="illustrator"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;
