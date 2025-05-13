package za.ac.cput.domain;



/**
 * Abstract Employee POJO class
 * Author: Siphosenkosi (221140700)
 * Date: 11/05/2025
 */
public class Employee {
    protected  int employeeNumber;
    protected  double salary;
    protected  String position;
    protected  ContactDetails contactDetails;
    protected  PersonInfo personInfo;

   public Employee(){

  }
    public Employee(Builder builder) {
        this.employeeNumber = builder.employeeNumber;
        this.salary = builder.salary;
        this.position = builder.position;
        this.contactDetails = builder.contactDetails;
        this.personInfo = builder.personInfo;
    }

    public int getEmployeeNumber() {
        return employeeNumber;
    }

    public double getSalary() {
        return salary;
    }

    public String getPosition() {
        return position;
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
        private String position;
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

        public Builder setPosition(String position) {
            this.position = position;
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
            this.position = employee.position;
            this.contactDetails = employee.contactDetails;
            this.personInfo = employee.personInfo;
            return this;
        }

        public Employee build() {
            return new Employee(this);
        }
    }
}


