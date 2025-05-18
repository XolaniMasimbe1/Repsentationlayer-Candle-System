package za.ac.cput.factory;

import za.ac.cput.domain.ContactDetails;
import za.ac.cput.domain.valueobject.Address;

public class ContactDetailsFactory {
    public static ContactDetails build(String phoneNumber, String email, Address address) {
        return new ContactDetails(phoneNumber, email,address);
    }
}
