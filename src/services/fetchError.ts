import type { ResponseWithData } from './response.type';

export class FetchError extends Error implements ResponseWithData<null> {
	public readonly status: number;

	public readonly success: boolean = false;
	public readonly data: null = null;

	constructor(messageParam: string, statusParam: number) {
		super(messageParam);
		this.status = statusParam;
	}
}
