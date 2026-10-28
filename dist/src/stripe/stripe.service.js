"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const card_dto_1 = require("../users/card.dto");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2022-08-01',
        });
    }
    async createCharge(amount, total, accountId, customer, capture = false) {
        let newAmount = Math.ceil(amount * 100);
        let newFee = Math.floor(total * 100);
        let transfer = {};
        if (newFee) {
            transfer = {
                transfer_data: {
                    amount: newFee,
                    destination: accountId,
                },
            };
        }
        return (await this.stripe.charges.create(Object.assign({ amount: newAmount, currency: 'CAD', customer,
            capture }, transfer))).id;
    }
    async chargeCustomer(amount, customer) {
        await this.createCharge(amount, 0, null, customer, true);
    }
    async platformCharge(amount, customer) {
        let newAmount = Math.ceil(amount * 100);
        return (await this.stripe.charges.create({
            amount: newAmount,
            currency: 'CAD',
            customer,
            capture: true,
        })).id;
    }
    async cancelCharge(charge, customer) {
        return await this.stripe.refunds.create({
            charge: charge,
            customer: customer,
        });
    }
    async removeCustomer(customer) {
        await this.stripe.customers.del(customer);
    }
    async getCards(customer) {
        try {
            let existing = (await this.stripe.customers.retrieve(customer));
            return (await this.stripe.customers.listSources(customer)).data.map((item) => {
                let card = new card_dto_1.CreditCardDTO();
                card.last4 = item.last4;
                card.digits = item.last4;
                card.brand = item.brand;
                card.id = item.id;
                card.active = item.id == existing.default_source;
                card.expiry = `0${item.exp_month}/${item.exp_year}`.slice(-7);
                card.name = item.name;
                card.csv = 'XXX';
                return card;
            });
        }
        catch (error) {
            return [];
        }
    }
    async deleteCard(customer, card) {
        await this.stripe.customers.deleteSource(customer, card);
    }
    async createCustomer(email) {
        return (await this.stripe.customers.create({
            email,
        })).id;
    }
    async updateCustomer(id, email) {
        return (await this.stripe.customers.update(id, {
            email: email,
        })).id;
    }
    async attach(customer, card) {
        let source = await this.createToken(card);
        return (await this.stripe.customers.createSource(customer, {
            source,
        })).id;
    }
    async getChargeCard(chargeId) {
        var _a, _b;
        let payment = (await this.stripe.charges.retrieve(chargeId))
            .payment_method_details;
        let card = new card_dto_1.CreditCardDTO();
        card.last4 = (_a = payment.card) === null || _a === void 0 ? void 0 : _a.last4;
        card.brand = (_b = payment.card) === null || _b === void 0 ? void 0 : _b.brand;
        return card;
    }
    async addAccount() {
        return (await this.stripe.accounts.create({
            type: 'standard',
        })).id;
    }
    async createAccountLink(accountId) {
        return (await this.stripe.accountLinks.create({
            account: accountId,
            type: 'account_onboarding',
            return_url: 'https://halaleat.ca',
            refresh_url: 'https://halaleat.ca',
        })).url;
    }
    async payAccount(accountId, amount) {
        let newAmount = Math.floor(amount * 100);
        await this.stripe.transfers.create({
            destination: accountId,
            amount: newAmount,
            currency: 'CAD',
        });
    }
    async createIntent(amount, fee, accountId, customer, capture) {
        let newAmount = Math.ceil(amount * 100);
        let newFee = Math.ceil(fee * 100);
        return (await this.stripe.paymentIntents.create({
            amount: newAmount,
            application_fee_amount: newFee,
            customer: customer,
            currency: 'CAD',
            transfer_data: {
                destination: accountId,
            },
        })).id;
    }
    async captureIntent(id) {
        await this.stripe.paymentIntents.capture(id);
    }
    async captureChare(id) {
        await this.stripe.charges.capture(id);
    }
    async makeCardDefault(customer, source_id) {
        await this.stripe.customers.update(customer, { default_source: source_id });
    }
    async refundCharge(id) {
        await this.stripe.refunds.create({
            charge: id,
        });
    }
    async createToken(card) {
        return (await this.stripe.tokens.create({
            card: {
                cvc: card.csv,
                exp_month: `${+card.expiry.split('/')[0]}`,
                exp_year: `${+card.expiry.split('/')[1]}`,
                number: card.digits,
                name: card.name,
            },
        })).id;
    }
};
StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
exports.default = StripeService;
//# sourceMappingURL=stripe.service.js.map