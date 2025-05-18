package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Manufacture;

import static org.junit.jupiter.api.Assertions.*;

class ManufactureFactoryTest {

    @Test
    void createManufacture() {
        Manufacture manufacture = ManufactureFactory.createManufacture(
                "Anda Matomela",
                "1000"
        );

        assertNotNull(manufacture);
        assertTrue(manufacture.getManufactureNumber() > 0);
        System.out.println(manufacture);
    }
}