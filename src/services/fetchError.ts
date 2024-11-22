import type { ResponseWithData, ResponseWithMessage } from './response.type';

export class FetchError extends Error implements ResponseWithMessage {
	public readonly statusCode: number;
	public readonly success: boolean = false;

	constructor(messageParam: string, statusCodeParam: number) {
		super(messageParam);
		this.statusCode = statusCodeParam;
	}
}
