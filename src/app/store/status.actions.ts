import { createAction } from "@ngrx/store";

export const init = createAction(
    '[Status] Init'
)

export const setManagerStatus = createAction(
    '[Status] setManagerStatus'
)

export const setAdvisorStatus = createAction(
    '[Status] setAdvisorStatus'
)

export const setGuestStatus = createAction(
    '[Status] setGuestStatus'
)