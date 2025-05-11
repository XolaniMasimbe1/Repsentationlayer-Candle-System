package za.ac.cput.domain;

/**
 * Manager POJO class extending Employee
 * Author: Siphosenkosi (221140700)
 * Date: 11/05/2025
 */
public class Manager extends Employee {
    private final String managerLevel;
    private final int numEmployees;

    private Manager(Builder builder) {
        super(builder);
        this.managerLevel = builder.managerLevel;
        this.numEmployees = builder.numEmployees;
    }


    public static class Builder extends Employee.Builder<Builder> {
        private String managerLevel;
        private int numEmployees;

        public Builder managerLevel(String managerLevel) {
            this.managerLevel = managerLevel;
            return this;
        }

        public Builder numEmployees(int numEmployees) {
            this.numEmployees = numEmployees;
            return this;
        }

        @Override
        protected Builder self() {
            return this;
        }

        @Override
        public Manager build() {
            return new Manager(this);
        }
    }
}

