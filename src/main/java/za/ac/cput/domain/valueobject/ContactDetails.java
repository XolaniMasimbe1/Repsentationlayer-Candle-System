package za.ac.cput.domain.valueobject;

public class ContactDetails {
    public String email;
    private String phoneNumber;
    private Address address;
    protected ContactDetails() {
    }

    private ContactDetails(Builder builder) {
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
        this.address = builder.address;
    }
    public String getEmail() {
        return email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public Address getAddress() {
        return address;
    }
    @Override
    public String toString() {
        return "ContactDetails{" +
                "email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address=" + address +
                '}';
    }
    public static class Builder{
        private String email;
        private String phoneNumber;
        private Address address;

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder setAddress(Address address) {
            this.address = address;
            return this;
        }
        public Builder copy(ContactDetails contactDetails) {
            this.email = contactDetails.email;
            this.phoneNumber = contactDetails.phoneNumber;
            this.address = contactDetails.address;
            return this;
        }

        public ContactDetails build() {
            return new ContactDetails(this);
        }
    }

}

