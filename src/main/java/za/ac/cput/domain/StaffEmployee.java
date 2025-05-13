package za.ac.cput.domain;

public class StaffEmployee extends Employee{
    private String departmentShift;
    private String shiftTime;

    public StaffEmployee() {
        super();
    }

    private StaffEmployee(Builder builder) {
        super(builder);
        this.departmentShift = builder. departmentShift;
        this.shiftTime = builder.shiftTime;
    }

    public String getDepartmentShift() {
        return departmentShift;
    }

    public String getShiftTime() {
        return shiftTime;
    }

    @Override
    public String toString() {
        return "StaffEmployee{" +
                "departmentShift='" + departmentShift + '\'' +
                ", shiftTime='" + shiftTime + '\'' +
                ", employeeNumber=" + employeeNumber +
                ", salary=" + salary +
                ", position='" + position + '\'' +
                ", contactDetails=" + contactDetails +
                ", personInfo=" + personInfo +
                '}';
    }

    public static class Builder extends Employee.Builder  {
        private String  departmentShift;
        private String shiftTime;

        public Builder departmentShift(String departmentShift) {
            this.departmentShift = departmentShift;
            return this;
        }
        public Builder shiftTime(String shiftTime) {
            this.shiftTime = shiftTime;
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
        public Builder copy(StaffEmployee staffEmployee) {
            super.copy(staffEmployee);
            this.departmentShift = staffEmployee.departmentShift;
            this.shiftTime = staffEmployee.shiftTime;
            return this;
        }


        public StaffEmployee build() {
            return new StaffEmployee(this);
        }


    }

}
