import { AccountModel } from "./account.model";
import { PersonInfos } from "./person-infos";


export class ClientModel {
    id: number | null;
    personInfos: PersonInfos;
    account?: AccountModel;

    constructor(id: number | null, personInfos: PersonInfos, account: AccountModel){
        this.id = id;
        this.personInfos = personInfos;
        this.account = account || null;
    }
}
