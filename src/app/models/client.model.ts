import { CurrentAccountModel } from "./current-account.model";
import { PersonInfos } from "./person-infos";
import { SavingAccountModel } from "./saving-account.model";


export class ClientModel {
    id: number;
    personInfos: PersonInfos;
    currentAccount?: CurrentAccountModel | null;
    savingAccount?: SavingAccountModel | null;

    constructor(id: number, personInfos: PersonInfos, currentAccount: CurrentAccountModel | null, savingAccount: SavingAccountModel | null){
        this.id = id;
        this.personInfos = personInfos;
        this.currentAccount = currentAccount;
        this.savingAccount = savingAccount;
    }
}
