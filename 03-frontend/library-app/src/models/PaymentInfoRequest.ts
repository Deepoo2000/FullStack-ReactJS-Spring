class PaymentInfoRequest{
    amount: number;
    currency: String;
    receiptEmail: String | undefined;


    constructor(amount: number, currency: String, receiptEmail: String | undefined) {
        this.amount = amount;
        this.currency = currency;
        this.receiptEmail = receiptEmail;
    
    }
}

export default PaymentInfoRequest;