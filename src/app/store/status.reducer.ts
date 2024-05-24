import { createReducer, on } from "@ngrx/store"
import { init } from "./status.actions"

// Par défaut, l'utilisateur est en "GUEST" :
const initialState = "GUEST";

export const statusReducer = createReducer(
    initialState,
    on(init, (state) => state)
)