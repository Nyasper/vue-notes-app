interface BaseResponse {
	success: boolean;
}

interface Status {
	status: number;
}

export interface ResponseWithMessage extends BaseResponse, Status {
	message: string;
}

export interface ResponseWithData<T> extends ResponseWithMessage, Status {
	data: T | null;
}
