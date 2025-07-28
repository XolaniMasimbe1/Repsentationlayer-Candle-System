package za.ac.cput.factory;
/* InvoiceFactory.java

     Invoice Factory class

     Author: X Masimbe (222410817)

     Date: 18 May 2025 */

import za.ac.cput.domain.Invoice;
import za.ac.cput.util.Helper;

public class InvoiceFactory {
    public static Invoice createInvoice(String invoiceDate, double totalAmount) {

        if (invoiceDate == null || invoiceDate.isEmpty()) {
            return null;
        }
        if (totalAmount <= 0) {
            return null;
        }
        if (!Helper.isValidInvoiceDate(invoiceDate)) {
            return null;
        }

        String invoiceNumber = Helper.generateUniqueId();

        return new Invoice.Builder()
                .setInvoiceNumber(invoiceNumber)
                .setInvoiceDate(invoiceDate)
                .setTotalAmount(totalAmount)
                .build();
    }
}
