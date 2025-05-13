package za.ac.cput.domain;
/* Invoice.java

     Invoice POJO class

     Author: X Masimbe (222410817)

     Date: 11 May 2025 */
public class Invoice {
    private int invoiceNumber;
    private String invoiceDate;
    private double totalAmount;

    public Invoice() {
    }

    public Invoice(Builder builder) {
        this.invoiceNumber = builder.invoiceNumber;
        this.invoiceDate = builder.invoiceDate;
        this.totalAmount = builder.totalAmount;
    }

    public int getInvoiceNumber() {
        return invoiceNumber;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "invoiceNumber='" + invoiceNumber + '\'' +
                ", invoiceDate='" + invoiceDate + '\'' +
                ", totalAmount=" + totalAmount +
                '}';
    }

    public static class Builder {
        private int invoiceNumber;
        private String invoiceDate;
        private double totalAmount;

        public Builder setInvoiceNumber(int invoiceNumber) {
            this.invoiceNumber = invoiceNumber;
            return this;
        }

        public Builder setInvoiceDate(String invoiceDate) {
            this.invoiceDate = invoiceDate;
            return this;
        }

        public Builder setTotalAmount(double totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }

        public Invoice build() {
            return new Invoice(this);
        }
    }
}
