import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { ProfileProps } from "@/interfaces/props.interface";
import { sliceText } from "@/utils/slicetext.util";
import { FaUserCircle } from "react-icons/fa";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function NavbarProfile({
  showMenu,
  setShowMenu,
  width,
  data,
}: ProfileProps) {
  return (
    <div
      className={styles.profileContainer}
      onClick={() => setShowMenu(!showMenu)}
    >
      <div className={styles.username}>
        <h4>{data?.username ? sliceText(`${data.username}`, 12) : ""}</h4>
        <p>Highscore: {data?.highScore || 0}</p>
      </div>
      <div className={styles.avatar}>
        {data?.avatar ? (
          <Image
            src={data.avatar}
            alt="avatar"
            height={35}
            width={35}
            className={styles.avatarImg}
          />
        ) : (
          <FaUserCircle size={30} />
        )}
        {showMenu ? (
          <RiArrowDropUpFill size={30} />
        ) : (
          <RiArrowDropDownFill size={30} />
        )}
      </div>
    </div>
  );
}
