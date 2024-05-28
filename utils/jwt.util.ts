import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string | null | undefined) => {
  if (!token) {
    return null;
  }

  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const isExpired = decodedToken.exp > currentTimeInSeconds;

    if (!isExpired) {
      return null;
    }

    return token;
  } catch (error) {
    return null;
  }
};
