"use client";
import { usePathname } from "next/navigation";
import styles from "./footer.module.scss";

const Footer = () => {
  const pathname = usePathname();
  const showFooter = pathname === "/features/learn";

  return (
    <footer className={styles.footer}>
      {!showFooter && (
        <>
          <h6>ByteQuiz</h6>
          <p>Copyright. All right reserve &copy; 2024</p>
        </>
      )}
    </footer>
  );
};

export default Footer;
