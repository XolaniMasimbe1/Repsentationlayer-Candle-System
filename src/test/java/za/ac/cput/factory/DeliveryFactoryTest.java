package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Delivery;
import za.ac.cput.domain.Order;
import za.ac.cput.domain.enums.DeliveryStatus;
import za.ac.cput.domain.valueobject.ContactDetails;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DeliveryFactoryTest {
    static ContactDetails driverContactDetails = new ContactDetails.Builder()
            .setEmail("driver@example.com")
            .setPhoneNumber("021-555-1234")
            .build();

    static List<Order> orders = new ArrayList<>();

    static {
        Order order = new Order.Builder()
                .orderNumber(1001)
                .orderDate(new Date())
                .totalAmount(1500.00)
                .build();
        orders.add(order);
    }

    static Delivery delivery = DeliveryFactory.createDelivery(
            "Cape Town Warehouse",
            new Date(),
            "Anda Matomela",
            DeliveryStatus.DELIVERED,
            orders,
            driverContactDetails
    );

    @Test
    void createDelivery() {
        assertNotNull(delivery);
        assertNotNull(delivery.getDeliveryNumber());
        assertEquals(DeliveryStatus.DELIVERED, delivery.getDeliveryStatus());
        System.out.println(delivery);
    }
}