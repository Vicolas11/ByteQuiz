import { getUserDTO } from "@/data/user/getUserDTO";
import StoreProvider from "./store/StoreProvider";
import { getToken } from "@/utils/token.util";
import { Navbar } from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "../components/Footer";
import { Inter } from "next/font/google";
import styles from "./home.module.scss";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { template: "ByteQuiz | %s", default: "ByteQuiz | Home" },
  description: "Gamifying Computer Programming Concepts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getToken();
  const userData = await getUserDTO();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className={styles.home}>
            <Navbar token={token} data={userData?.data} />
            <div className={styles.main}>
              <div></div>
              {children}
              <Footer />
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
