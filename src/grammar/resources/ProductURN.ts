import { URN_PARTS_SEPARATOR, URN_TOKEN, URN_TOKEN_SEPARATOR } from '../config';
import { EUrnResource, IProductUrnResource } from '../types';

export class ProductURN implements IProductUrnResource {
	productId: number;
	productName: string;
	category: string;

	constructor({ productId, productName, category }: IProductUrnResource) {
		this.productId = productId;
		this.productName = productName;
		this.category = category;
	}

	static toKRN({
		category,
		productId,
		productName,
	}: IProductUrnResource): string {
		return `${URN_TOKEN}${EUrnResource.Product}${URN_TOKEN_SEPARATOR}${category}${URN_PARTS_SEPARATOR}${productId}${URN_PARTS_SEPARATOR}${productName}`;
	}
}
