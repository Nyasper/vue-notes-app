interface BaseResponse {
	success: boolean;
	statusCode?: number;
}

export interface ResponseWithMessage extends BaseResponse {
	message: string;
}

export interface ResponseWithData<T> extends ResponseWithMessage {
	data?: T;
}
