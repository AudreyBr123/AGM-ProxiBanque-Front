import { AddressModel } from "./address.model";

export class PersonModel {
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    address: AddressModel;
    phoneNumber: number;

    constructor(id: number, firstName: String, lastName: String, email: String, address: AddressModel, phoneNumber: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
