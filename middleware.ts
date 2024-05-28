import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./utils/jwt.util";
const { redirect, next } = NextResponse;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const getToken = verifyToken(token);
  const { pathname } = request.nextUrl;
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/about",
    "/resetpassword",
    "/forgetpassword",
    "/resendforgetpassword",
  ];

  if (pathname.startsWith("/features") && !getToken) {
    return redirect(new URL("/login", request.url));
  }

  if (publicRoutes.includes(pathname) && getToken) {
    return redirect(new URL("/features", request.url));
  }

  return next();
}
