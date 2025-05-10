package za.ac.cput.domain;


import org.junit.jupiter.api.Order;

import java.util.List;

public class RetailStore {
    private String storeNumber;
    private String storeName;
    private String conctactPerson;
    private contactDetails ContactDetails;
    private List<Order> orders;

    private RetailStore(){

    }
    public RetailStore(Builder builder) {
        this.storeNumber = builder.storeNumber;
        this.storeName = builder.storeName;
        this.conctactPerson = builder.conctactPerson;
        this.ContactDetails = builder.ContactDetails;
    }

    public String getStoreNumber() {
        return storeNumber;
    }

    public String getStoreName() {
        return storeName;
    }

    public String getConctactPerson() {
        return conctactPerson;
    }

    public contactDetails getContactDetails() {
        return ContactDetails;
    }
    public void placeOrder(Order order) {

            System.out.println("Order placed successfully." + order);//deal with it later

    }

    @Override
    public String toString() {
        return "RetailStore{" +
                "storeNumber='" + storeNumber + '\'' +
                ", storeName='" + storeName + '\'' +
                ", conctactPerson='" + conctactPerson + '\'' +
                ", ContactDetails=" + ContactDetails +
                '}';
    }
    public static class Builder{
        private String storeNumber;
        private String storeName;
        private String conctactPerson;
        private contactDetails ContactDetails;

        public Builder setStoreNumber(String storeNumber) {
            this.storeNumber = storeNumber;
            return this;
        }

        public Builder setStoreName(String storeName) {
            this.storeName = storeName;
            return this;
        }

        public Builder setConctactPerson(String conctactPerson) {
            this.conctactPerson = conctactPerson;
            return this;
        }

        public Builder setContactDetails(contactDetails contactDetails) {
            ContactDetails = contactDetails;
            return this;
        }


        public RetailStore copy() {
            RetailStore retailStore = new RetailStore();
            retailStore.storeNumber = this.storeNumber;
            retailStore.storeName = this.storeName;
            retailStore.conctactPerson = this.conctactPerson;
            retailStore.ContactDetails = this.ContactDetails;
            return retailStore;
        }
        public RetailStore build() {
            return new RetailStore(this);
        }
    }
}
