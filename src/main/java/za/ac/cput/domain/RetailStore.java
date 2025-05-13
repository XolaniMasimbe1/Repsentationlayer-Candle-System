package za.ac.cput.domain;
/* RetailStore.java

     RetailStore POJO class

     Author: X Masimbe (222410817)

     Date: 11 May 2025 */
import java.util.List;

public class RetailStore {
    private String storeNumber;
    private String storeName;
    private String conctactPerson;
    private ContactDetails contactDetails;
    private List<Order> orders;

    private RetailStore(){

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

    public ContactDetails getContactDetails() {
        return contactDetails;
    }

    public List<Order> getOrders() {
        return orders;
    }

    @Override
    public String toString() {
        return "RetailStore{" +
                "storeNumber='" + storeNumber + '\'' +
                ", storeName='" + storeName + '\'' +
                ", conctactPerson='" + conctactPerson + '\'' +
                ", contactDetails=" + contactDetails +
                ", orders=" + orders +
                '}';
    }
    public static class Builder {
        private String storeNumber;
        private String storeName;
        private String conctactPerson;
        private ContactDetails contactDetails;
        private List<Order> orders;

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

        public Builder setContactDetails(ContactDetails contactDetails) {
            this.contactDetails = contactDetails;
            return this;
        }

        public Builder setOrders(List<Order> orders) {
            this.orders = orders;
            return this;
        }

        public RetailStore build() {
            RetailStore retailStore = new RetailStore();
            retailStore.storeNumber = this.storeNumber;
            retailStore.storeName = this.storeName;
            retailStore.conctactPerson = this.conctactPerson;
            retailStore.contactDetails = this.contactDetails;
            retailStore.orders = this.orders;

            return retailStore;

        }
        public Builder copy(RetailStore retailStore) {
            this.storeNumber = retailStore.storeNumber;
            this.storeName = retailStore.storeName;
            this.conctactPerson = retailStore.conctactPerson;
            this.contactDetails = retailStore.contactDetails;
            this.orders = retailStore.orders;

            return this;
        }
        public static Builder builder(){
            return new Builder();
        }
    }
}
