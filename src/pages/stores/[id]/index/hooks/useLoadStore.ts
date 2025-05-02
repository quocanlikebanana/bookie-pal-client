import useGetStoreIdFromParams from '../../../../../features/booking/hooks/useGetStoreIdFromParams'
import { useGetStoresByStoreIdQuery, useGetStoresByStoreIdServicesQuery } from '../../../../../features/booking/apis/booking.api-gen';
import { useAppDispatch } from '@/app/store/hooks';
import { useEffect } from 'react';
import storeSlice from '@/features/booking/stores/storeSlice';

export default function useLoadStore() {
	const storeId = useGetStoreIdFromParams();
	const storeQuery = useGetStoresByStoreIdQuery({
		storeId
	}, {
		skip: !storeId,
	});
	const servicesQuery = useGetStoresByStoreIdServicesQuery({
		storeId,
		page: 1,
		limit: 1000,
	}, {
		skip: !storeId
	});
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (
			storeQuery.isSuccess &&
			storeQuery.data &&
			servicesQuery.isSuccess &&
			servicesQuery.data) {
			dispatch(storeSlice.actions.setCurrentStore({
				store: storeQuery.data,
				services: servicesQuery.data.services,
				pagedServices: servicesQuery.data.pagination,
			}));
		}
		else if (storeQuery.isError || servicesQuery.isError) {
			dispatch(storeSlice.actions.clearCurrentStore());
		}
	}, [storeQuery, servicesQuery, dispatch]);
}
