import { URN_PARTS_SEPARATOR, URN_TOKEN, URN_TOKEN_SEPARATOR } from '../config';
import { EUrnResource, IDeliveryUrnResource } from '../types';

export class DeliveryURN implements IDeliveryUrnResource {
	orderId: number;
	address: string;

	constructor({ orderId, address }: IDeliveryUrnResource) {
		this.orderId = orderId;
		this.address = address;
	}

	static toKRN({ orderId, address }: IDeliveryUrnResource): string {
		return `${URN_TOKEN}${EUrnResource.Delivery}${URN_TOKEN_SEPARATOR}${orderId}${URN_PARTS_SEPARATOR}${address}`;
	}
}
