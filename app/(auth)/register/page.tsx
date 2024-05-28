import { RegisterForm } from "@/components/RegisterForm";
import styles from "./register.module.scss";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src="/image_2.svg"
            alt="illustrator"
            fill
            className={styles.img}
          />
        </div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
