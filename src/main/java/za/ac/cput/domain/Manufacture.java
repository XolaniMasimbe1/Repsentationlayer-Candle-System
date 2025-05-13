package za.ac.cput.domain;

import java.util.List;

public class Manufacture {
    private  int manufactureNumber;
    private  String manufactureName;
    private  String inventoryStock;
    private  ContactDetails contactDetails;
    private  List<Candle> candles;
    private  List<Delivery> deliveries;

    private Manufacture() {

    }

    private Manufacture(Builder builder) {
        this.manufactureNumber = builder.manufactureNumber;
        this.manufactureName = builder.manufactureName;
        this.inventoryStock = builder.inventoryStock;
        this.contactDetails = builder.contactDetails;
        this.candles = builder.candles;
        this.deliveries = builder.deliveries;
    }

    public int getManufactureNumber() {

        return manufactureNumber;
    }

    public String getManufactureName() {

        return manufactureName;
    }

    public String getInventoryStock() {

        return inventoryStock;
    }

    public ContactDetails getContactDetails() {

        return contactDetails;
    }

    public List<Candle> getCandles() {

        return candles;
    }

    public List<Delivery> getDeliveries() {
        return deliveries;
    }

    @Override
    public String toString() {
        return "Manufacture{" +
                "manufactureNumber=" + manufactureNumber +
                ", manufactureName='" + manufactureName + '\'' +
                ", inventoryStock='" + inventoryStock + '\'' +
                ", contactDetails=" + contactDetails +
                ", candles=" + candles +
                ", deliveries=" + deliveries +
                '}';
    }

    public static class Builder {
        private int manufactureNumber;
        private String manufactureName;
        private String inventoryStock;
        private ContactDetails contactDetails;
        private List<Candle> candles;
        private List<Delivery> deliveries;

        public Builder setManufactureNumber(int manufactureNumber) {
            this.manufactureNumber = manufactureNumber;
            return this;
        }

        public Builder setManufactureName(String manufactureName) {
            this.manufactureName = manufactureName;
            return this;
        }

        public Builder setInventoryStock(String inventoryStock) {
            this.inventoryStock = inventoryStock;
            return this;
        }

        public Builder setContactDetails(ContactDetails contactDetails) {
            this.contactDetails = contactDetails;
            return this;
        }

        public Builder setCandles(List<Candle> candles) {
            this.candles = candles;
            return this;
        }

        public Builder setDeliveries(List<Delivery> deliveries) {
            this.deliveries = deliveries;
            return this;
        }

        public Builder copy(Manufacture manufacture) {
            this.manufactureNumber = manufacture.manufactureNumber;
            this.manufactureName = manufacture.manufactureName;
            this.inventoryStock = manufacture.inventoryStock;
            this.contactDetails = manufacture.contactDetails;
            this.candles = manufacture.candles;
            this.deliveries = manufacture.deliveries;
            return this;
        }

        public Manufacture build() {
            return new Manufacture(this);
        }
    }
}