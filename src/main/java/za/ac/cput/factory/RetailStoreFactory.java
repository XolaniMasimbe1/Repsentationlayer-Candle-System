package za.ac.cput.factory;

import za.ac.cput.domain.Order;
import za.ac.cput.domain.RetailStore;
import za.ac.cput.domain.valueobject.ContactDetails;
import za.ac.cput.util.Helper;

import java.util.List;

public class RetailStoreFactory {
    public static RetailStore createRetailStore( String storeName, String conctactPerson, ContactDetails contactDetails, List<Order> orders) {
        if ( storeName == null || conctactPerson == null || contactDetails == null || orders == null) {
            return null;
        }
        if (storeName.isEmpty() || conctactPerson.isEmpty()) {
            return null;
        }
        String storeNumber = Helper.generateUniqueId();
        return new RetailStore.Builder()
                .setStoreNumber(storeNumber)
                .setStoreName(storeName)
                .setConctactPerson(conctactPerson)
                .setContactDetails(contactDetails)
                .setOrders(orders)
                .build();
    }
}
