import * as ohm from 'ohm-js';

import { URN_TOKEN_SEPARATOR, URN_TOKEN, URN_PARTS_SEPARATOR } from './config';
import {
	EUrnResource,
	IDeliveryUrnResource,
	IOrderUrnResource,
	IProductUrnResource,
	IUrnParseResultMap,
	IUserUrnResource,
	UrnParseResult,
	UrnResourceContent,
} from './types';

export const URN_GRAMMAR: string = String.raw`G {
	URN = "${URN_TOKEN}" "${URN_TOKEN_SEPARATOR}" URNResource
	URNResource = "${EUrnResource.User}" "${URN_TOKEN_SEPARATOR}" User
		| "${EUrnResource.Product}" "${URN_TOKEN_SEPARATOR}" Product
		| "${EUrnResource.Order}" "${URN_TOKEN_SEPARATOR}" Order
		| "${EUrnResource.Delivery}" "${URN_TOKEN_SEPARATOR}" Delivery

	User = UserId "${URN_PARTS_SEPARATOR}" Phone "${URN_PARTS_SEPARATOR}" Email
	UserId = DIGITS
	Email = USERNAME
	Phone = Prefix Number
	Prefix = "+(" digit digit digit ")"
	Number = digit digit digit digit digit digit digit digit digit 

	Product = Category "${URN_PARTS_SEPARATOR}" ProductId "${URN_PARTS_SEPARATOR}" ProductName
	ProductId = DIGITS
	Category = TEXT
	ProductName = TEXT

	Order = OrderId "${URN_PARTS_SEPARATOR}" ProductId "${URN_PARTS_SEPARATOR}" UserId "${URN_PARTS_SEPARATOR}" Date
	OrderId = DIGITS
	Date = digit digit "-" digit digit "-" digit digit digit digit

	Delivery = OrderId "${URN_PARTS_SEPARATOR}" Address
	Address = any+

	TEXT = letter+
	DIGITS = digit+
	USERNAME = any+
}`;

export const OHM_ACTIONS_DICT: ohm.ActionDict<any> = {
	URN(_grammarName, _sp, content): UrnParseResult {
		return content.parse();
	},
	URNResource(name, _sp, content): IUrnParseResultMap {
		return {
			resource: name.source.contents as EUrnResource,
			resourceContent: content.parse() as UrnResourceContent,
		};
	},
	User(userId, _slash1, phone, _slash2, email): IUserUrnResource {
		return {
			userId: userId.parse(),
			email: email.parse(),
			phone: phone.parse(),
		};
	},
	Product(
		category,
		_slash1,
		productId,
		_slash2,
		productName
	): IProductUrnResource {
		return {
			category: category.parse(),
			productId: productId.parse(),
			productName: productName.parse(),
		};
	},
	Order(
		orderId,
		_slash1,
		productId,
		_slash2,
		userId,
		_slash3,
		date
	): IOrderUrnResource {
		return {
			orderId: orderId.parse(),
			productId: productId.parse(),
			userId: userId.parse(),
			date: date.parse(),
		};
	},
	Delivery(orderId, _slash, address): IDeliveryUrnResource {
		return {
			orderId: orderId.parse(),
			address: address.parse(),
		};
	},
	UserId(userId): string {
		return userId.parse();
	},
	Email(email): string {
		return email.parse();
	},
	Phone(prefix, number): string {
		return `${prefix.parse()}${number.parse()}`;
	},
	Prefix(_open, digit1, digit2, digit3, _close): string {
		return `+(${digit1.source.contents}${digit2.source.contents}${digit3.source.contents})`;
	},
	Number(d1, d2, d3, d4, d5, d6, d7, d8, d9): string {
		return `${d1.source.contents}${d2.source.contents}${d3.source.contents}${d4.source.contents}${d5.source.contents}${d6.source.contents}${d7.source.contents}${d8.source.contents}${d9.source.contents}`;
	},
	Address(address): string {
		return address.source.contents;
	},
	DIGITS(digits): string {
		return digits.source.contents;
	},
	TEXT(digits): string {
		return digits.source.contents;
	},
	USERNAME(match): string {
		return match.source.contents;
	},
	Date(d1, d2, _dash1, m1, m2, _dash2, a1, a2, a3, a4): string {
		return `${d1.source.contents}${d2.source.contents}-${m1.source.contents}${m2.source.contents}-${a1.source.contents}${a2.source.contents}${a3.source.contents}${a4.source.contents}`;
	},
};
