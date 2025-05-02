import { Outlet } from 'react-router'
import useLoadStore from './index/hooks/useLoadStore'

export default function StoreLayout() {
	useLoadStore();
	return (
		<Outlet />
	)
}
