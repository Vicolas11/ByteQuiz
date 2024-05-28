import { CustomBtn } from "@/components/common/CustomBtn";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="errContent">
      <h1>404</h1>
      <p>Page Not Found!</p>
      <Link href="/">
        <CustomBtn name="Go Home" />{" "}
      </Link>
    </div>
  );
}
