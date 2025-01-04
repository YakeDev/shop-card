import { useRouteError } from 'react-router-dom'
import Navbar from './components/Navbar'
import CancelButton from './components/CancelButton'

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<>
			<Navbar />
			<div
				id='error-page'
				className='flex justify-center items-center h-screen text-center'>
				<div className='flex flex-col items-center'>
					<h1 className='text-4xl font-bold'>404</h1>
					<p className='my-4'>Sorry, an unexpected error has occurred.</p>
					<p className='text-gray-400'>
						<i>{error.statusText || error.message}</i>
					</p>
					{/* Centrage du bouton */}
					<div className='mt-6'>
						<CancelButton />
					</div>
				</div>
			</div>
		</>
	)
}
