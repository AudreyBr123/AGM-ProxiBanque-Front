export class TransferDtoRequest {
    typeCreditAccount: string;
    typeDebitAccount:string;
    idCreditAccount:number;
    idDebitAccount:number;
    amount:number;

    constructor(typeCreditAccount: string, typeDebitAccount:string, idCreditAccount:number,idDebitAccount:number, amount:number){
        this.typeCreditAccount = typeCreditAccount;
        this.typeDebitAccount = typeDebitAccount;
        this.idCreditAccount = idCreditAccount;
        this.idDebitAccount = idDebitAccount;
        this.amount = amount;
    }

}
