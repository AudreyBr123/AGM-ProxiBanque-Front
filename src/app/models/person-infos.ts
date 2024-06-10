export class PersonInfos {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    street: String;
    zipCode: String;
    city: String;

    constructor( firstName: string, lastName: string, email: string, phoneNumber: string, street: String, zipCode: String, city: String) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.zipCode = zipCode;
        this.city = city;
    }
}
