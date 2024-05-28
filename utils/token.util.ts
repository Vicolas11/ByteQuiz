import { cookies } from "next/headers";

export function getToken() {
  const token = cookies().get("token")?.value;
  return token;
}
