import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Root() {
	return (
		<div>
			<Navbar />
			<div id='detail' className='px-12 mt-30'>
				<Outlet />
			</div>
		</div>
	)
}
