import { atom } from "recoil";
import { ICurrentUser } from "../interfaces/currentUser";

interface AuthAtom {
  currentUser: ICurrentUser | null;
}

const defaultValues: AuthAtom = {
  currentUser: null,
};

export const authAtom = atom({
  key: "authAtom",
  default: defaultValues,
});
