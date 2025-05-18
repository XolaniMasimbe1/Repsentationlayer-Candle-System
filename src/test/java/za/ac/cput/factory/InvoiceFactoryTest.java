package za.ac.cput.factory;

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