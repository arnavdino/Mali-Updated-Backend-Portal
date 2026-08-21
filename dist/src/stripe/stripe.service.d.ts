import { ConfigService } from '@nestjs/config';
import { CreditCardDTO } from 'src/users/card.dto';
import Stripe from 'stripe';
export default class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createCharge(amount: number, total: number, accountId: string, customer: string, capture?: boolean): Promise<string>;
    chargeCustomer(amount: number, customer: string): Promise<void>;
    platformCharge(amount: number, customer: string): Promise<string>;
    cancelCharge(charge: string, customer: string): Promise<Stripe.Response<Stripe.Refund>>;
    removeCustomer(customer: string): Promise<void>;
    getCards(customer: string): Promise<CreditCardDTO[]>;
    deleteCard(customer: string, card: string): Promise<void>;
    createCustomer(email: string): Promise<string>;
    updateCustomer(id: string, email: string): Promise<string>;
    attach(customer: string, card: CreditCardDTO): Promise<string>;
    getChargeCard(chargeId: string): Promise<CreditCardDTO>;
    addAccount(): Promise<string>;
    createAccountLink(accountId: string): Promise<string>;
    payAccount(accountId: string, amount: number): Promise<void>;
    createIntent(amount: number, fee: number, accountId: string, customer: string, capture: boolean): Promise<string>;
    captureIntent(id: string): Promise<void>;
    captureChare(id: string): Promise<void>;
    makeCardDefault(customer: string, source_id: string): Promise<void>;
    refundCharge(id: string): Promise<void>;
    createToken(card: CreditCardDTO): Promise<string>;
}
