import { createReducer, on } from "@ngrx/store"
import { init, setAdvisorStatus, setGuestStatus, setManagerStatus } from "./status.actions"

// Par défaut, l'utilisateur est en "GUEST" :
const initialState = "GUEST";

export const statusReducer = createReducer(
    initialState,
    on(init, (state) => state),
    on(setManagerStatus, () => "MANAGER"),
    on(setAdvisorStatus, () => "ADVISOR"),
    on(setGuestStatus, () => "GUEST")
)