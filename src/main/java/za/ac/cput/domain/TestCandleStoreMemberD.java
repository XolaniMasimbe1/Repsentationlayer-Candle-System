package za.ac.cput.domain;

import za.ac.cput.domain.valueobject.Address;
import za.ac.cput.domain.valueobject.ContactDetails;
import za.ac.cput.domain.valueobject.PersonInfo;

import java.util.Date;

public class TestCandleStoreMemberD {
    public static void main(String[] args) {
        // Create Address
        Address address = new Address("123 Main St", "Cape Town", "8000", "South Africa");

        // Create ContactDetails
        ContactDetails contactDetails = new ContactDetails("staff@example.com", "0123456789", address);

        // Create PersonInfo
        PersonInfo personInfo = new PersonInfo("John", "Doe", new Date(), "Male");

        // Create StaffEmployee using Builder pattern
        StaffEmployee staff = new StaffEmployee.Builder()
                .setEmployeeNumber(101)
                .setSalary(15000.00)
                .setPosition("Sales Assistant")
                .setContactDetails(contactDetails)
                .setPersonInfo(personInfo)
                .departmentShift("Morning")
                .shiftTime("08:00-16:00")
                .build();


    }
}
