"use client";
import { ActionBtnProps } from "@/interfaces/props.interface";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./detailmodal.module.scss";
import { BiTrash } from "react-icons/bi";

export default function ActionBtn({ id, showBtnEdit }: ActionBtnProps) {
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <span className={styles.btnGroup}>
      <BiTrash
        size={20}
        onClick={() =>
          replace(`${pathname}?del=true&id=${id}`, {
            scroll: false,
          })
        }
      />
      {!showBtnEdit && (
        <MdOutlineEdit
          size={20}
          onClick={() =>
            replace(`/features/question/${id}`, {
              scroll: false,
            })
          }
        />
      )}
    </span>
  );
}
