package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Order;
import za.ac.cput.domain.RetailStore;
import za.ac.cput.domain.enums.OrderStatus;
import za.ac.cput.domain.valueobject.Address;
import za.ac.cput.domain.valueobject.ContactDetails;
/* RetailFactory.java

     Retail Factory class

     Author: X Masimbe (222410817)

     Date: 18 May 2025 */
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RetailStoreFactoryTest {
    static Address address = new Address.Builder()
            .setStreet("123 Main Street")
            .setCity("Cape Town")
            .setCountry("South Africa")
            .setPostalCode(808L)
            .build();


    static ContactDetails contactDetails = new ContactDetails.Builder()
            .setEmail("store@example.com")
            .setPhoneNumber("021-123-4567")
            .setAddress(address)
            .build();

    static List<Order> orders = new ArrayList<>();

    static {
        Order order = new Order.Builder()
                .orderNumber(67777777)
                .orderDate(Date.from(java.time.Instant.now()))
                .status(OrderStatus.PENDING)
                .totalAmount(100.00)
                .build();
        orders.add(order);
    }

    static RetailStore retailStore = RetailStoreFactory.createRetailStore(
            "PicknPay",
            "Xolani Masimbe",
            contactDetails,
            orders
    );

    @Test
    void createRetailStore() {
        assertNotNull(retailStore.getStoreNumber());
        System.out.println(retailStore);
    }
}