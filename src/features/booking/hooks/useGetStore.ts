import useGetStoreIdFromParams from './useGetStoreIdFromParams'
import { useGetStoresByStoreIdQuery } from '../apis/booking.api-gen';

export default function useGetStore() {
	const storeId = useGetStoreIdFromParams();
	const storeQuery = useGetStoresByStoreIdQuery({
		storeId
	}, {
		skip: !storeId
	});
	return {
		storeId,
		storeQuery,
	}
}
