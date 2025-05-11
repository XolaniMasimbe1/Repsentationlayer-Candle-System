package za.ac.cput.domain;

/**
 * Abstract Employee POJO class
 * Author: Siphosenkosi (221140700)
 * Date: 11/05/2025
 */
public abstract class Employee {
    protected final int employeeNumber;
    protected final double salary;
    protected final String position;
    protected final contactDetails contactDetails;
    protected final PersonalInfo personInfo;

    protected Employee(Builder<?> builder) {
        this.employeeNumber = builder.employeeNumber;
        this.salary = builder.salary;
        this.position = builder.position;
        this.contactDetails = builder.contactDetails;
        this.personInfo = builder.personInfo;
    }

    // Getters omitted for brevity

    public abstract static class Builder<T extends Builder<T>> {
        private int employeeNumber;
        private double salary;
        private String position;
        private contactDetails contactDetails;
        private PersonalInfo personInfo;

        public T employeeNumber(int employeeNumber) {
            this.employeeNumber = employeeNumber;
            return self();
        }

        public T salary(double salary) {
            this.salary = salary;
            return self();
        }

        public T position(String position) {
            this.position = position;
            return self();
        }

        public T contactDetails(contactDetails contactDetails) {
            this.contactDetails = contactDetails;
            return self();
        }

        public T personInfo(PersonalInfo personInfo) {
            this.personInfo = personInfo;
            return self();
        }

        protected abstract T self();
        public abstract Employee build();
    }
}


