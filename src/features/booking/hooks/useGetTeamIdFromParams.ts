import { useParams } from "react-router";

export default function useGetTeamIdFromParams() {
	const { teamId } = useParams();
	if (!teamId) {
		throw new Error("Team ID is not defined in the URL.");
	}
	return teamId;
}