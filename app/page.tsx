import GetStarted from "@/components/GetStarted";
import styles from "./home.module.scss";
import Image from "next/image";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.txtContainer}>
        <h1>Gamifying Computer Programming Concepts</h1>
        <p>
          A web-based platform that gamifies core computer programming concepts
          like variables, data types, loops, and conditional statements.
        </p>
        <GetStarted />
      </div>
      <div className={styles.imgContainer}>
        <Image src="/image.svg" alt="illustrator" fill className={styles.img} />
      </div>
    </div>
  );
};

export default Home;
