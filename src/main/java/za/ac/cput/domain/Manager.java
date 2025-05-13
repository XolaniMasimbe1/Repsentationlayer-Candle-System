package za.ac.cput.domain;

import za.ac.cput.domain.enums.EmployeeRole;
import za.ac.cput.domain.valueobject.ContactDetails;
import za.ac.cput.domain.valueobject.PersonInfo;

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

    public String getManagerLevel() {
        return managerLevel;
    }

    public int getNumEmployees() {
        return numEmployees;
    }

    @Override
    public String toString() {
        return "Manager{" +
                "managerLevel='" + managerLevel + '\'' +
                ", numEmployees=" + numEmployees +
                ", employeeNumber=" + employeeNumber +
                ", salary=" + salary +
                ", role=" + role +
                ", contactDetails=" + contactDetails +
                ", personInfo=" + personInfo +
                '}';
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
        public Manager.Builder setRole(EmployeeRole role) {
            super.setRole(role);
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

