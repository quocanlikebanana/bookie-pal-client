import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ParsedError = {
	statusCode: number | null;
	message: string;
	type: 'FETCH_ERROR' | 'PARSING_ERROR' | 'CUSTOM_ERROR' | 'HTTP_ERROR' | 'UNKNOWN';
	raw: unknown;
};

export function parseBaseQueryError(error: FetchBaseQueryError | SerializedError): ParsedError {
	if (
		typeof error === 'object' &&
		error !== null &&
		'status' in error
	) {
		const status = (error as any).status;
		const raw = error;

		if (typeof status === 'number') {
			// HTTP error (e.g., 400, 500)
			return {
				statusCode: status,
				message: (error as any).data?.message || 'Unexpected server error',
				type: 'HTTP_ERROR',
				raw,
			};
		}

		if (status === 'FETCH_ERROR') {
			console.error('Network error', error);
			return {
				statusCode: null,
				message: 'Network error',
				type: 'FETCH_ERROR',
				raw,
			};
		}

		if (status === 'PARSING_ERROR') {
			console.error('Response parsing error', error);
			return {
				statusCode: null,
				message: 'Response parsing error',
				type: 'PARSING_ERROR',
				raw,
			};
		}

		if (status === 'CUSTOM_ERROR') {
			console.error('Custom error', error);
			return {
				statusCode: null,
				message: 'Unexpected custom error',
				type: 'CUSTOM_ERROR',
				raw,
			};
		}
	}

	// Unknown error structure
	return {
		statusCode: null,
		message: 'An unknown error occurred',
		type: 'UNKNOWN',
		raw: error,
	};
}
