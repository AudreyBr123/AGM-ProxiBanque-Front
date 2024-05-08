export class AddressModel {
    street: String;
    zipCode: String;
    city: String;

    constructor(street: String, zipCode: String, city: String) {
        this.street = street;
        this.zipCode = zipCode;
        this.city = city;
    }
}
