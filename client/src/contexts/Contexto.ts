import { createContext } from "react";
import { Calls } from "../types";

export const ContextoCall = createContext<Calls>({} as Calls)
