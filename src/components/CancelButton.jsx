import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function CancelButton() {
	const navigate = useNavigate()

	return (
		<p>
			<button
				className='flex justify-center text-white  bg-gray-950 px-8 py-2 mt-5'
				type='button'
				onClick={() => {
					navigate(-1)
				}}>
				<ArrowLeft /> Go Back
			</button>
		</p>
	)
}
