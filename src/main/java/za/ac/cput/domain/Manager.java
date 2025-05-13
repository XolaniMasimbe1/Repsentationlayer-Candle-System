package za.ac.cput.domain;

/**
 * Manager POJO class extending Employee
 * Author: Siphosenkosi (221140700)
 * Date: 11/05/2025
 */
public class Manager extends Employee {
    private  String managerLevel;
    private  int numEmployees;

    public Manager() {
        super();
    }

    private Manager(Builder builder) {
        super(builder);
        this.managerLevel = builder.managerLevel;
        this.numEmployees = builder.numEmployees;
    }


    public static class Builder extends Employee.Builder {
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
        public Builder setEmployeeNumber(int employeeNumber) {
            super.setEmployeeNumber(employeeNumber);
            return this;
        }
        @Override
        public Builder setSalary(double salary) {
            super.setSalary(salary);
            return this;
        }
        @Override
        public Builder setPosition(String position) {
            super.setPosition(position);
            return this;
        }
        @Override
        public Builder setContactDetails(ContactDetails contactDetails) {
            super.setContactDetails(contactDetails);
            return this;
        }
        @Override
        public Builder setPersonInfo(PersonInfo personInfo) {
            super.setPersonInfo(personInfo);
            return this;
        }

        public Builder copy(Manager manager) {
            super.copy(manager);
            this.managerLevel = manager.managerLevel;
            this.numEmployees = manager.numEmployees;
            return this;
        }
        @Override
        public Manager build() {
            return new Manager(this);
        }
    }
}

