import * as ohm from 'ohm-js';

import { URN_TOKEN_SEPARATOR, URN_TOKEN, URN_PARTS_SEPARATOR } from './config';
import {
	EUrnResource,
	IUrnParseResultMap,
	IUserUrnResource,
	UrnParseResult,
	UrnResourceContent,
} from './types';

export const KRN_GRAMMAR: string = String.raw`G {
	URN = "${URN_TOKEN}" "${URN_TOKEN_SEPARATOR}" URNResource
	URNResource = "${EUrnResource.User}" "${URN_TOKEN_SEPARATOR}" User
		| "${EUrnResource.Product}" "${URN_TOKEN_SEPARATOR}" Product
		| "${EUrnResource.Order}" "${URN_TOKEN_SEPARATOR}" Order
		| "${EUrnResource.Delivery}" "${URN_TOKEN_SEPARATOR}" Delivery

	User = UserId "${URN_PARTS_SEPARATOR}" Email "${URN_PARTS_SEPARATOR}" Phone
	UserId = DIGITS
	Email = USERNAME
	Phone = Prefix Number
	Prefix = "+(" digit{3} ")"
	Number = digit{9}

	Product = Category "${URN_PARTS_SEPARATOR}" ProductId "${URN_PARTS_SEPARATOR}" ProductName
	ProductId = DIGITS
	Category = TEXT
	ProductName = TEXT

	Order = OrderId "${URN_PARTS_SEPARATOR}" ProductId "${URN_PARTS_SEPARATOR}" UserId "${URN_PARTS_SEPARATOR}" Date
	OrderId = DIGITS
	ProductId = DIGITS
	Date = digit{2} "-" digit{2} "-" digit{4}

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
	User(userId, _slash1, email, _slash2, phone): IUserUrnResource {
		return {
			userId: userId.parse(),
			email: email.parse(),
			phone: phone.parse(),
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
	Prefix(_plus, _open, digits, _close): string {
		return `+(${digits.source.contents})`;
	},
	Number(digits): string {
		return digits.source.contents;
	},
	DIGITS(digits): string {
		return digits.source.contents;
	},
	USERNAME(match): string {
		return match.source.contents;
	},
};
