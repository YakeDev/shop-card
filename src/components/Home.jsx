import { Link } from 'react-router-dom'
import sofa from '../assets/sofa.png'

export default function Home() {
	return (
		<>
			<div className='flex justify-between items-center border border-gray-950 mt-24 h-full p-20'>
				<div className='flex flex-col flex-1 '>
					<h1 className='text-6xl font-semibold'>
						<span>Up to 50% off</span> <br />
						<span>selected furnitures</span>
					</h1>
					<p className='text-gray-600 text-lg font-light mt-4 w-4/5'>
						Explore our stylish and comfortable furniture collection at
						unbeatable prices. From modern to classic designs, each piece is
						crafted with high-quality materials for durability and style in your
						home or office.
					</p>
					<div className=' mt-16'>
						<Link
							to={`/Shop`}
							className='bg-gray-950 text-white text-base  p-4 px-8'>
							Shop now
						</Link>
					</div>
				</div>
				<div className='flex justify-end items-end flex-1 relative '>
					<img src={sofa} alt='hero sofa image' className='h-96 w-auto' />

					<div className='flex items-center justify-center absolute top-1 right-2'>
						<div className='flex flex-col items-center justify-center uppercase text-white text-xs bg-gray-950 h-28 w-28 rounded-full'>
							<span className='leading-none -mb-1 text-left'>up to</span>
							<span className='font-bold text-3xl'>50%</span>
							<span className='leading-none font-semibold text-lg -mt-1'>
								off
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
