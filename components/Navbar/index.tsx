"use client";
import { navbarAnimate } from "@/data/localData/animation.data";
import { logoutUserAction } from "@/services/auth/authActions";
import { NavbarProps } from "@/interfaces/props.interface";
import { AnimatePresence, motion } from "framer-motion";
import { CustomBtn } from "../common/CustomBtn";
import { verifyToken } from "@/utils/jwt.util";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./navbar.module.scss";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import NavbarProfile from "../NavbarProfile";
import { useFormState } from "react-dom";

export const Navbar = ({ token, data }: NavbarProps) => {
  const [state, action] = useFormState(logoutUserAction, { data: null });
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(0);
  const isAuth = verifyToken(token);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    });
  }, []);

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        redirect("/");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data]);

  const links = isAuth
    ? [
        { pathname: "/features/learn", title: "Learn", show: true },
        { pathname: "/features/competition", title: "Competition", show: true },
        { pathname: "/features/profile", title: "Profile", show: true },
        { pathname: "/login", title: "Logout", show: true },
      ]
    : [
        { pathname: "/", title: "Home", show: true },
        { pathname: "/about", title: "About", show: true },
        { pathname: "/register", title: "Register", show: true },
        { pathname: "/login", title: "Login", show: true },
      ];

  return (
    <>
      <Toaster />
      <nav className={styles.navbar}>
        <div className={styles.content}>
          {/* LOGO */}
          <div>
            <div className={styles.logo}>
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={80} />
              </Link>
            </div>
          </div>

          {/* Show on Desktop Screen */}
          <ul className={styles.nav_link}>
            {links.map((lnk, idx) => {
              const lstIdx = links.length - 1;
              return (
                <li
                  key={idx}
                  className={
                    idx !== lstIdx
                      ? pathname === lnk.pathname
                        ? styles.active
                        : ""
                      : ""
                  }
                >
                  {idx === lstIdx ? (
                    !isAuth ? (
                      <Link href={lnk.pathname} prefetch={false}>
                        <CustomBtn name="Login" />
                      </Link>
                    ) : (
                      <form action={action}>
                        <CustomBtn name="Logout" xtraStyle={styles.btn} />
                      </form>
                    )
                  ) : (
                    <Link href={lnk.pathname}>{lnk.title}</Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Show Menu on Mobile Screen */}
          {isAuth ? (
            <NavbarProfile
              data={data}
              width={width}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          ) : (
            <span
              className={styles.btnMenu}
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <MdClose size={30} /> : <IoMenu size={30} />}
            </span>
          )}
          <AnimatePresence mode="wait">
            {showMenu && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={navbarAnimate}
                className={styles.mobileNavLink}
              >
                {links.map((lnk, idx) => {
                  const lstIdx = links.length - 1;
                  return (
                    <li
                      key={idx}
                      className={pathname === lnk.pathname ? styles.active : ""}
                      onClick={() => setShowMenu(false)}
                    >
                      {idx === lstIdx ? (
                        !isAuth ? (
                          <CustomBtn
                            className={styles.btn}
                            name="Login"
                            onClick={() => router.push(lnk.pathname)}
                          />
                        ) : (
                          <form action={action}>
                            <CustomBtn className={styles.btn} name="Logout" />
                          </form>
                        )
                      ) : (
                        <Link href={lnk.pathname}>{lnk.title}</Link>
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};
