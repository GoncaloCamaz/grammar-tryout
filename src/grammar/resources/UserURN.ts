import { URN_PARTS_SEPARATOR, URN_TOKEN, URN_TOKEN_SEPARATOR } from '../config';
import { EUrnResource, IUserUrnResource } from '../types';

export class UserURN implements IUserUrnResource {
	userId: number;
	phone: string;
	email: string;

	constructor({ userId, phone, email }: IUserUrnResource) {
		this.userId = userId;
		this.phone = phone;
		this.email = email;
	}

	static toKRN({ userId, phone, email }: IUserUrnResource): string {
		return `${URN_TOKEN}${EUrnResource.User}${URN_TOKEN_SEPARATOR}${userId}${URN_PARTS_SEPARATOR}${phone}${URN_PARTS_SEPARATOR}${email}`;
	}
}
