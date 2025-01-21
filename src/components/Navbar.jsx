import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from './CartContext'

export default function Navbar() {
	const { cartItems } = useCart() // Use context
	// console.log(cartItems.length)

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev)
	}

	return (
		<nav className='fixed top-0 left-0 w-full flex justify-between items-center h-14 px-12 border-b border-gray-950 bg-white z-50'>
			<div className='logo-container'>
				<Link to={'/'}>
					<h2 className='text-xl font-bold font-michroma uppercase text-outline'>
						shopcart
					</h2>
				</Link>
			</div>

			<ul className='hidden md:flex justify-center space-x-4 uppercase text-sm'>
				<li>
					<Link to={'/Shop'}>Shop</Link>
				</li>
				<li>
					<Link to={'/Beauty'}>Beauty</Link>
				</li>
				<li>
					<Link to={'/Fragrances'}>Fragrances</Link>
				</li>
				<li>
					<Link to={'/Furnitures'}>Furnitures</Link>
				</li>
				<li>
					<Link to={'/Groceries'}>Groceries</Link>
				</li>
			</ul>

			<div className='flex items-center space-x-4'>
				<div className='cart-container relative'>
					<Link to={`/My-cart`} aria-label='View Cart'>
						<ShoppingCart size={30} />
						{cartItems.length > 0 && (
							<span className='bg-gray-950 text-white text-center rounded-full h-5 w-5 text-sm absolute -top-1 -right-2'>
								{cartItems.length}
							</span>
						)}
					</Link>
				</div>

				<div className='md:hidden'>
					<button onClick={toggleMenu} className='text-xl'>
						{isMenuOpen ? <X size={30} /> : <Menu size={30} />}
					</button>
				</div>
			</div>

			<ul
				className={`flex flex-col space-y-4 md:hidden ${
					isMenuOpen ? 'block' : 'hidden'
				} absolute top-14 right-0 w-full bg-white uppercase text-sm shadow-md`}>
				<li>
					<Link to={'/Home'}>Home</Link>
				</li>
				<li>
					<Link to={'/Shop'}>Shop</Link>
				</li>
				<li>
					<Link to={'/Beauty'}>Beauty</Link>
				</li>
				<li>
					<Link to={'/Fragrances'}>Fragrances</Link>
				</li>
				<li>
					<Link to={'/Furnitures'}>Furnitures</Link>
				</li>
				<li>
					<Link to={'/Groceries'}>Groceries</Link>
				</li>
			</ul>
		</nav>
	)
}
