export interface IUrnParseResultMap<T extends EUrnResource = EUrnResource> {
	resource: T;
	resourceContent: IUrnResourceContentMap[T];
}

export type UrnParseResult =
	| IUrnParseResultMap<EUrnResource.User>
	| IUrnParseResultMap<EUrnResource.Product>
	| IUrnParseResultMap<EUrnResource.Order>
	| IUrnParseResultMap<EUrnResource.Delivery>;

export type UrnResourceContent =
	| IUserUrnResource
	| IProductUrnResource
	| IOrderUrnResource
	| IDeliveryUrnResource;

export enum EUrnResource {
	User = 'user',
	Product = 'product',
	Order = 'order',
	Delivery = 'delivery',
}

export interface IUserUrnResource {
	userId: number;
	email: string;
	phone: string;
}

export interface IProductUrnResource {
	category: string;
	productId: number;
	productName: string;
}

export interface IOrderUrnResource {
	orderId: number;
	productId: number;
	userId: number;
	date: string;
}

export interface IDeliveryUrnResource {
	orderId: number;
	address: string;
}

export interface IUrnResourceContentMap
	extends Record<EUrnResource, UrnResourceContent> {
	[EUrnResource.User]: IUserUrnResource;
	[EUrnResource.Product]: IProductUrnResource;
	[EUrnResource.Order]: IOrderUrnResource;
	[EUrnResource.Delivery]: IDeliveryUrnResource;
}
