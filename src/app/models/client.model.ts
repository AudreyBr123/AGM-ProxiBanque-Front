import { AccountModel } from "./account.model";
import { PersonInfos } from "./person-infos";


export class ClientModel {
    id: number;
    personInfos: PersonInfos;
    account?: AccountModel;

    constructor(id: number, personInfos: PersonInfos, account: AccountModel){
        this.id = id;
        this.personInfos = personInfos;
        this.account = account || null;
    }
}
