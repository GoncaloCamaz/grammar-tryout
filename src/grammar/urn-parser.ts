import * as ohm from 'ohm-js';
import { OHM_ACTIONS_DICT, URN_GRAMMAR } from './grammar';
import {
	EUrnResource,
	IUrnParseResultMap,
	IUrnResourceContentMap,
	UrnParseResult,
} from './types';
import { DeliveryURN, OrderURN, ProductURN, UserURN } from './resources';

export class UrnParser {
	static grammar: ohm.Grammar = ohm.grammar(URN_GRAMMAR);
	static krnInterpreter: ohm.Semantics = UrnParser.grammar
		.createSemantics()
		.addOperation('parse', OHM_ACTIONS_DICT);
	static parseKRN<T extends EUrnResource | unknown>(
		text: string,
		urnResource?: T
	): T extends EUrnResource ? IUrnParseResultMap<T> : UrnParseResult {
		const matchResult = UrnParser.grammar.match(text);
		if (!matchResult.succeeded()) {
			throw new Error('Invalid Urn: ' + matchResult.message);
		}

		const result: T extends EUrnResource
			? IUrnParseResultMap<T>
			: UrnParseResult = UrnParser.krnInterpreter(matchResult).parse();
		if (urnResource !== undefined && result.resource !== urnResource) {
			throw new Error(
				`Invalid Urn: expected '${urnResource}' but received '${result.resource}'`
			);
		}

		return result;
	}
	static buildKRN<T extends EUrnResource>(
		urnResource: T,
		resourceContent: IUrnResourceContentMap[T]
	): string {
		switch (urnResource) {
			case EUrnResource.Delivery:
				return DeliveryURN.toKRN(
					resourceContent as IUrnResourceContentMap[EUrnResource.Delivery]
				);
			case EUrnResource.Order:
				return OrderURN.toKRN(
					resourceContent as IUrnResourceContentMap[EUrnResource.Order]
				);
			case EUrnResource.Product:
				return ProductURN.toKRN(
					resourceContent as IUrnResourceContentMap[EUrnResource.Product]
				);
			case EUrnResource.User:
				return UserURN.toKRN(
					resourceContent as IUrnResourceContentMap[EUrnResource.User]
				);
			default:
				return '';
		}
	}
}
