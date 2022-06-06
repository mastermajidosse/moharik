import { getCookie } from "cookies-next";
import { ICurrentUser } from "../interfaces/currentUser";

export function getToken(): string | null {
  const cookie = getCookie("currentUser");
  if (cookie) {
    const cr = JSON.parse(cookie.toString() as string) as ICurrentUser;
    return cr.token;
  }
  return null;
}
