import { AddressModel } from "./address.model";

export class PersonModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: AddressModel;
    phoneNumber: string;

    constructor(id: number, firstName: string, lastName: string, email: string, address: AddressModel, phoneNumber: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}