import { useParams } from "react-router";

export default function useGetStoreIdFromParams() {
	const { storeId } = useParams();
	if (!storeId) {
		throw new Error("Store ID is not defined in the URL.");
	}
	return storeId;
}