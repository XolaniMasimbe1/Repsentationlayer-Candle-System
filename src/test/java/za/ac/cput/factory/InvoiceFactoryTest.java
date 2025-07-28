package za.ac.cput.factory;
/* InvoiceFactoryTest.java

     Invoice Factory class

     Author: X Masimbe (222410817)

     Date: 18 May 2025 */
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Invoice;

import static org.junit.jupiter.api.Assertions.*;
class InvoiceFactoryTest {

    private static Invoice invoice = InvoiceFactory.createInvoice("2025-05-11", 1000.00);
    @Test
    void createInvoice() {
        assertNotNull(invoice.getInvoiceNumber());
        System.out.println(invoice);
    }
}