import { GetTeamsByTeamIdAvailabilityApiResponse } from "@/features/store/apis/store.api-gen"
import generateMockAvailability from "@/mocks/workTime"

const mockBasedOnUrl = (url: string) => {
	if (url.match(/^\/teams\/[^/]+\/availability$/)) {
		const teamAvailability: GetTeamsByTeamIdAvailabilityApiResponse = generateMockAvailability();
		return {
			data: teamAvailability,
			error: undefined,
			meta: undefined,
		}
	}
	return null;
}

export default mockBasedOnUrl;