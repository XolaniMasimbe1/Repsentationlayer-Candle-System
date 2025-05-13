package za.ac.cput.domain;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Order {
    private int orderNumber;
    private Date orderDate;
    private String status;
    private List<OrderItem> items;
    private double totalAmount;
    private Invoice invoice;

    public Order() {

    }

    private Order(Builder builder) {
        this.orderNumber = builder.orderNumber;
        this.orderDate = builder.orderDate;
        this.status = builder.status;
        this.items = builder.items;
        this.totalAmount = builder.totalAmount;
        this.invoice = builder.invoice;
    }

//    public Invoice generateInvoice() {
//        if (this.invoice == null) {
//            this.invoice = new Invoice.Builder()
//                    .setInvoiceNumber(generateInvoiceNumber())
//                    .setInvoiceDate(new Date().toString())
//                    .setTotalAmount(calculateTotal())
//                    .build();
//        }
//        return this.invoice;
//    }


    public int getOrderNumber() { return orderNumber; }

    public Date getOrderDate() { return orderDate; }

    public String getStatus() { return status; }

    public List<OrderItem> getItems() { return items; }

    public double getTotalAmount() { return totalAmount; }

    public Invoice getInvoice() { return invoice; }


    @Override
    public String toString() {
        return "Order{" +
                "orderNumber=" + orderNumber +
                ", orderDate=" + orderDate +
                ", status='" + status + '\'' +
                ", items=" + items +
                ", totalAmount=" + totalAmount +
                ", invoice=" + invoice +
                '}';
    }

    public static class Builder {
        private int orderNumber;
        private Date orderDate;
        private String status;
        private List<OrderItem> items = new ArrayList<>();
        private double totalAmount;
        private Invoice invoice;

        public Builder orderNumber(int orderNumber) {
            this.orderNumber = orderNumber;
            return this;
        }

        public Builder orderDate(Date orderDate) {
            this.orderDate = orderDate;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder items(List<OrderItem> items) {
            this.items = items;
            return this;
        }

        public Builder addItem(OrderItem item) {
            this.items.add(item);
            return this;
        }

        public Builder totalAmount(double totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }

        public Builder invoice(Invoice invoice) {
            this.invoice = invoice;
            return this;
        }
        public Builder copy(Order order) {
            this.orderNumber = order.orderNumber;
            this.orderDate = order.orderDate;
            this.status = order.status;
            this.items = order.items;
            this.totalAmount = order.totalAmount;
            this.invoice = order.invoice;
            return this;
        }
        public Order build() {
            return new Order(this);
        }

//        public Order build() {
//            Order order = new Order(this);
//            if (order.totalAmount == 0) {
//                order.totalAmount = order.calculateTotal();
//            }
//            return order;
//        }
    }
//    private int generateInvoiceNumber() {
//        // In a real system, this would come from a sequence or service
//        return this.orderNumber * 1000 + (int)(Math.random() * 999);
//    }
//
//    public double calculateTotal() {
//        if (items == null) return 0.0;
//        return items.stream()
//                .mapToDouble(OrderItem::getSubtotal)
//                .sum();
//    }
}