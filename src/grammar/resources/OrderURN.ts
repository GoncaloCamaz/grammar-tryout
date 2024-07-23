import { URN_PARTS_SEPARATOR, URN_TOKEN, URN_TOKEN_SEPARATOR } from '../config';
import { EUrnResource, IOrderUrnResource } from '../types';

export class OrderURN implements IOrderUrnResource {
	orderId: number;
	productId: number;
	userId: number;
	date: string;

	constructor({ orderId, productId, userId, date }: IOrderUrnResource) {
		this.orderId = orderId;
		this.productId = productId;
		this.userId = userId;
		this.date = date;
	}

	static toKRN({
		orderId,
		productId,
		userId,
		date,
	}: IOrderUrnResource): string {
		return `${URN_TOKEN}${EUrnResource.Order}${URN_TOKEN_SEPARATOR}${orderId}${URN_PARTS_SEPARATOR}${productId}${URN_PARTS_SEPARATOR}${userId}${URN_PARTS_SEPARATOR}${date}`;
	}
}
