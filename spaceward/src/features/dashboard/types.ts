import type { CommonActions } from "@/utils/common";
import type { Dispatch } from "react";
type ModalType = "select-key" | "deposit";

export interface DashboardState {
	modal?: ModalType;
}

export type DashboardDispatch = Dispatch<CommonActions<DashboardState>>;
