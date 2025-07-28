package za.ac.cput.domain.valueobject;
/**

        * Author: Njabulo N Mathabela
 * Date: 18/05/2025
        */
    public class Address {
        private String street;
        private String city;
        private Long postalCode;
        private String country;

        public Address(String s, String capeTown, String number, String southAfrica) {
        }

        private Address(Builder builder) {
            this.street = builder.street;
            this.city = builder.city;
            this.postalCode = builder.postalCode;
            this.country = builder.country;
        }
        public String getStreet() {
            return street;
        }
        public String getCity() {
            return city;
        }
        public Long getPostalCode() {
            return postalCode;
        }
        public String getCountry() {
            return country;
        }
        @Override
        public String toString() {
            return "Address{" +
                    "street='" + street + '\'' +
                    ", city='" + city + '\'' +
                    ", postalCode=" + postalCode +
                    ", country='" + country + '\'' +
                    '}';
        }
        public static class Builder {
            private String street;
            private String city;
            private Long postalCode;
            private String country;

            public Builder setStreet(String street) {
                this.street = street;
                return this;
            }

            public Builder setCity(String city) {
                this.city = city;
                return this;
            }

            public Builder setPostalCode(Long postalCode) {
                this.postalCode = postalCode;
                return this;
            }

            public Builder setCountry(String country) {
                this.country = country;
                return this;
            }
            public Builder copy(Address address) {
                this.street = address.street;
                this.city = address.city;
                this.postalCode = address.postalCode;
                this.country = address.country;
                return this;
            }

            public Address build() {
                return new Address(this);
            }
        }
}
