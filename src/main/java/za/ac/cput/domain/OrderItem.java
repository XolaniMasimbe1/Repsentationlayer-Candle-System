package za.ac.cput.domain;


public class OrderItem {
    private int quantity;
    private double unitPrice;
    private double subtotal;
    private Order order;
    private Candle candle;
    private String category;

    private OrderItem(Builder builder) {
        this.quantity = builder.quantity;
        this.unitPrice = builder.unitPrice;
        this.subtotal = builder.subtotal;
        this.order = builder.order;
        this.candle = builder.candle;
        this.category = builder.category;
    }

    public double calculateSubtotal() {
        return quantity * unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public Order getOrder() {
        return order;
    }

    public Candle getCandle() {
        return candle;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                ", subtotal=" + subtotal +
                ", order=" + (order != null ? order.getOrderNumber() : null) +
                ", candle=" + (candle != null ? candle.getName() : null) +
                ", category='" + category + '\'' +
                '}';
    }

    public static class Builder {
        private int quantity;
        private double unitPrice;
        private double subtotal;
        private Order order;
        private Candle candle;
        private String category;


        public Builder quantity(int quantity) {
            this.quantity = quantity;
            return this;
        }

        public Builder unitPrice(double unitPrice) {
            this.unitPrice = unitPrice;
            return this;
        }

        public Builder order(Order order) {
            this.order = order;
            return this;
        }

        public Builder candle(Candle candle) {
            this.candle = candle;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public OrderItem build() {
            this.subtotal = quantity * unitPrice;
            return new OrderItem(this);
        }
    }
}