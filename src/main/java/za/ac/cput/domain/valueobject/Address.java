package za.ac.cput.domain.valueobject;

    public class Address {
        private String street;
        String city;
        private String postalCode;
        String country;

        public Address(String street, String city, String postalCode, String country) {
            this.street = street;
            this.city = city;
            this.postalCode = postalCode;
            this.country = country;
        }
}
