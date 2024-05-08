export class AddressModel {
    street: String;
    streetNumber: number;
    zipCode: number;
    city: String;

    constructor(street: String, streetNumber: number, zipCode: number, city: String) {
        this.street = street;
        this.streetNumber = streetNumber;
        this.zipCode = zipCode;
        this.city = city;
    }
}
