package za.ac.cput.factory;

import za.ac.cput.domain.Manufacture;
import za.ac.cput.util.Helper;

public class ManufactureFactory {

    public static Manufacture createManufacture(String manufactureName, String inventoryStock) {

        if (Helper.isNullOrEmpty(manufactureName)) {
            return null;
        }

        if (Helper.isNullOrEmpty(inventoryStock)) {
            return null;
        }

        String manufactureNumber = Helper.generateUniqueId();

        return new Manufacture.Builder()
                .setManufactureNumber(Integer.parseInt(manufactureNumber))
                .setManufactureName(manufactureName)
                .setInventoryStock(inventoryStock)
                .build();
    }
}
