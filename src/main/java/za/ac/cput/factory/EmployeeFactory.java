package za.ac.cput.factory;

import za.ac.cput.domain.StaffEmployee;
import za.ac.cput.domain.valueobject.Address;
import za.ac.cput.domain.valueobject.ContactDetails;
import za.ac.cput.domain.valueobject.PersonInfo;

public class EmployeeFactory {
    public static StaffEmployee build(int employeeNumber,
                                      double salary,
                                      String position,
                                      String departmentShift,
                                      String shiftTime,
                                      ContactDetails contactDetails,
                                      PersonInfo personInfo) {

        return new StaffEmployee.Builder()
                .setEmployeeNumber(employeeNumber)
                .setSalary(salary)
                .setPosition(position)
                .setContactDetails(contactDetails)
                .setPersonInfo(personInfo)
                .departmentShift(departmentShift)
                .shiftTime(shiftTime)
                .build();
    }
}
