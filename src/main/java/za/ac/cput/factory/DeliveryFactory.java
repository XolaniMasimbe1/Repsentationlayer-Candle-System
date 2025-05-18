package za.ac.cput.factory;

import za.ac.cput.domain.Delivery;
import za.ac.cput.domain.enums.DeliveryStatus;
import za.ac.cput.util.Helper;
import java.util.Date;

public class DeliveryFactory {

    public static Delivery createDelivery(
            String distributionLocation,
            Date deliveryDate,
            String driverName,
            DeliveryStatus deliveryStatus) {

        // Validation checks
        if (Helper.isNullOrEmpty(distributionLocation) ||
                deliveryDate == null ||
                Helper.isNullOrEmpty(driverName) ||
                deliveryStatus == null) {
            return null;
        }

        // Create and return Delivery object
        return new Delivery.Builder()
                .setDeliveryNumber(Integer.parseInt(Helper.generateUniqueId()))
                .setDistrubutionLocation(distributionLocation)
                .setDeliveryDate(deliveryDate)
                .setDriverName(driverName)
                .setDeliveryStatus(deliveryStatus)  // Correct method name
                .build();
    }
}