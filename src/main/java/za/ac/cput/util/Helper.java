package za.ac.cput.util;

import za.ac.cput.domain.valueobject.ContactDetails;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.UUID;

public class Helper {

    // Method to check if a string is null or empty
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static boolean isValidEmail(String email) {
        if (isNullOrEmpty(email)) {
            return false;
        }
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        return email.matches(emailRegex);
    }
    // isValidPostalCode method - 4 digits with range 1000 to 9999
    public static boolean isValidPostalCode(Long postalCode) {
        if (postalCode < 1000 || postalCode > 9999) {
            return false;
        }
        return true;
    }
    // Method to generate a unique ID
    public static String generateUniqueId() {
        return UUID.randomUUID().toString();
    }

    // Method to validate if an invoice date is in a valid format (e.g., "yyyy-MM-dd")
    public static boolean isValidInvoiceDate(String invoiceDate) {
        if (isNullOrEmpty(invoiceDate)) {
            return false;
        }
        try {
            LocalDate.parse(invoiceDate);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
    // Validate contact details (e.g., must be a single digit within the range 1 to 10)
    public static boolean isValidContactDetails(ContactDetails contactDetails) {
        if (contactDetails == null || contactDetails.getPhoneNumber() == null) {
            return false;
        }
        try {
            int digit = Integer.parseInt(contactDetails.getPhoneNumber());
            return digit >= 1 && digit <= 10;
        } catch (NumberFormatException e) {
            return false;
        }
    }

}
