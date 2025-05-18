package za.ac.cput.factory;

import za.ac.cput.domain.valueobject.Address;

public class AddressFactory {
    public static Address build(String street, String city, String postalCode,  String country) {
        return new Address(street, city, postalCode,country);
    }
}
