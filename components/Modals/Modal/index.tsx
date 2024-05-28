"use client";
import { usePathname, useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import styles from "./modal.module.scss";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  xtraStyle?: string;
};

const Modal = ({ children, xtraStyle }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <dialog className={styles.backdrop}>
      <div className={`${styles.modal} ${xtraStyle}`}>
        <span
          className={styles.closeBtn}
          onClick={() => router.replace(pathname, { scroll: false })}
        >
          <MdClose size={20} />
        </span>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
