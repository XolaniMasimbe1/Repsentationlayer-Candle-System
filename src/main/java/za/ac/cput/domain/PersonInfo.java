package za.ac.cput.domain;

import java.util.Date;

public class PersonInfo {
    String firstName;
    String lastName;
    private Date dateOfBirth;
    private String gender;

    public PersonInfo(String firstName, String lastName, Date dateOfBirth, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }

}