package za.ac.cput.domain;


import za.ac.cput.domain.enums.EmployeeRole;
import za.ac.cput.domain.valueobject.ContactDetails;
import za.ac.cput.domain.valueobject.PersonInfo;

/**
 * Abstract Employee POJO class
 * Author: Siphosenkosi (221140700)
 * Date: 11/05/2025
 */
public class Employee {
    protected  int employeeNumber;
    protected  double salary;
    protected EmployeeRole role;
    protected ContactDetails contactDetails;
    protected PersonInfo personInfo;

   public Employee(){

  }
    public Employee(Builder builder) {
        this.employeeNumber = builder.employeeNumber;
        this.salary = builder.salary;
        this.role = builder.role;
        this.contactDetails = builder.contactDetails;
        this.personInfo = builder.personInfo;
    }

    public int getEmployeeNumber() {
        return employeeNumber;
    }

    public double getSalary() {
        return salary;
    }

    public EmployeeRole getRole() {
        return role;
    }

    public ContactDetails getContactDetails() {
        return contactDetails;
    }

    public PersonInfo getPersonInfo() {
        return personInfo;
    }
    public static class Builder{
        private int employeeNumber;
        private double salary;
        private EmployeeRole role;
        private ContactDetails contactDetails;
        private PersonInfo personInfo;

        public Builder setEmployeeNumber(int employeeNumber) {
            this.employeeNumber = employeeNumber;
            return this;
        }

        public Builder setSalary(double salary) {
            this.salary = salary;
            return this;
        }
        public Builder setRole(EmployeeRole role) {
            this.role = role;
            return this;
        }

        public Builder setContactDetails(ContactDetails contactDetails) {
            this.contactDetails = contactDetails;
            return this;
        }

        public Builder setPersonInfo(PersonInfo personInfo) {
            this.personInfo = personInfo;
            return this;
        }
        public Builder copy(Employee employee) {
            this.employeeNumber = employee.employeeNumber;
            this.salary = employee.salary;
            this.role = employee.role;
            this.contactDetails = employee.contactDetails;
            this.personInfo = employee.personInfo;
            return this;
        }

        public Employee build() {
            return new Employee(this);
        }
    }
}


