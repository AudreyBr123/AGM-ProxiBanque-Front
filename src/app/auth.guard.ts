// ====================================================
// V2 : base pour une future implémentation des guards
// ====================================================

// import { inject } from "@angular/core";
// import { Router } from "@angular/router";
// import { Store } from "@ngrx/store";
// import { selectStatus } from "./store/status.selectors";

// export const AuthGuard = () => {
//     const store = inject(Store)
//     const router = inject(Router)

//     const userStatusFromStore$ = store.select(selectStatus)
//     let userStatus$ = ""
//     userStatusFromStore$.subscribe((status: string) => {
//         userStatus$ = status
//     })

//     if (userStatus$ === 'GUEST') {
//         return false
//     }

//     return true
// }