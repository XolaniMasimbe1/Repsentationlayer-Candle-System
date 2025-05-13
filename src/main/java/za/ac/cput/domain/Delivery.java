package za.ac.cput.domain;

import org.junit.jupiter.api.Order;

import java.util.Date;

public class Delivery {

    private int deliveryNumber;
    private String distrubutionLocation;
    private Date deliveryDate;
    private String deliveryStatus;
    private String driverName;
    private String trackingNumber;
    private Order order;
    private ContactDetails driverContactDetails;



    public Delivery() {
    }

    public Delivery(Builder builder) {
        this.deliveryNumber = builder.deliveryNumber;
        this.distrubutionLocation = builder.distrubutionLocation;
        this.deliveryDate = builder.deliveryDate;
        this.deliveryStatus = builder.deliveryStatus;
        this.driverName = builder.driverName;
        this.trackingNumber = builder.trackingNumber;
        this.order = builder.order;
        this.driverContactDetails = builder.driverContactDetails;
    }

    public int getDeliveryNumber() {
        return deliveryNumber;
    }

    public String getDistrubutionLocation() {
        return distrubutionLocation;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public String getDriverName() {
        return driverName;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public Order getOrder() {
        return order;
    }

    public ContactDetails getDriverContactDetails() {
        return driverContactDetails;
    }

    public void updateDeliveryStatus(String status) {
        this.deliveryStatus = status;
    }

    @Override
    public String toString() {
        return "Delivery{" +
                "deliveryNumber=" + deliveryNumber +
                ", distrubutionLocation='" + distrubutionLocation + '\'' +
                ", deliveryDate=" + deliveryDate +
                ", deliveryStatus='" + deliveryStatus + '\'' +
                ", driverName='" + driverName + '\'' +
                ", trackingNumber='" + trackingNumber + '\'' +
                ", order=" + order +
                ", driverContactDetails=" + driverContactDetails +
                '}';
    }
    public static class Builder {
        private int deliveryNumber;
        private String distrubutionLocation;
        private Date deliveryDate;
        private String deliveryStatus;
        private String driverName;
        private String trackingNumber;
        private Order order;
        private ContactDetails driverContactDetails;

        public Builder setDeliveryNumber(int deliveryNumber) {
            this.deliveryNumber = deliveryNumber;
            return this;
        }

        public Builder setDistrubutionLocation(String distrubutionLocation) {
            this.distrubutionLocation = distrubutionLocation;
            return this;
        }

        public Builder setDeliveryDate(Date deliveryDate) {
            this.deliveryDate = deliveryDate;
            return this;
        }

        public Builder setDeliveryStatus(String deliveryStatus) {
            this.deliveryStatus = deliveryStatus;
            return this;
        }

        public Builder setDriverName(String driverName) {
            this.driverName = driverName;
            return this;
        }

        public Builder setTrackingNumber(String trackingNumber) {
            this.trackingNumber = trackingNumber;
            return this;
        }

        public Builder setOrder(Order order) {
            this.order = order;
            return this;
        }

        public Builder setDriverContactDetails(ContactDetails driverContactDetails) {
            this.driverContactDetails = driverContactDetails;
            return this;
        }
        public Builder copy(Delivery delivery) {
            this.deliveryNumber = delivery.deliveryNumber;
            this.distrubutionLocation = delivery.distrubutionLocation;
            this.deliveryDate = delivery.deliveryDate;
            this.deliveryStatus = delivery.deliveryStatus;
            this.driverName = delivery.driverName;
            this.trackingNumber = delivery.trackingNumber;
            this.order = delivery.order;
            this.driverContactDetails = delivery.driverContactDetails;
            return this;
        }

        public Delivery build() {
            return new Delivery(this);
        }
    }
}