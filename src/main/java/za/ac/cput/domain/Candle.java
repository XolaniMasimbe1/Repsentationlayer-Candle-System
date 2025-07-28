package za.ac.cput.domain;


public class Candle {
    private int candleNumber;
    private String name;
    private String scent;
    private double price;
    private String color;
    private String category;

    private Candle(Builder builder) {
        this.candleNumber = builder.candleNumber;
        this.name = builder.name;
        this.scent = builder.scent;
        this.price = builder.price;
        this.color = builder.color;
        this.category = builder.category;
    }

//    public void produceCandles() {
//        // Business logic
//    }
//
//    public void updateInventory() {
//        // Inventory logic
//    }

    public int getCandleNumber() {
        return candleNumber;
    }

    public String getName() {
        return name;
    }

    public String getScent() {
        return scent;
    }

    public double getPrice() {
        return price;
    }

    public String getColor() {
        return color;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        return "Candle{" +
                "candleNumber=" + candleNumber +
                ", name='" + name + '\'' +
                ", scent='" + scent + '\'' +
                ", price=" + price +
                ", color='" + color + '\'' +
                ", category='" + category + '\'' +
                '}';
    }

    public static class Builder {
        private int candleNumber;
        private String name;
        private String scent;
        private double price;
        private String color;
        private String category;

        public Builder candleNumber(int candleNumber) {
            this.candleNumber = candleNumber;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder scent(String scent) {
            this.scent = scent;
            return this;
        }

        public Builder price(double price) {
            this.price = price;
            return this;
        }

        public Builder color(String color) {
            this.color = color;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }
        public Builder copy(Candle candle) {
            this.candleNumber = candle.candleNumber;
            this.name = candle.name;
            this.scent = candle.scent;
            this.price = candle.price;
            this.color = candle.color;
            this.category = candle.category;
            return this;
        }

        public Candle build() {
            return new Candle(this);
        }
    }
}