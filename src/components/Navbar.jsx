import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { getCartItemCount } from './CartUtils' // Remplacez par la nouvelle fonction

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [cartItemCount, setCartItemCount] = useState(0)

	// Fonction pour mettre à jour le nombre d'items uniques
	const updateCartItemCount = async () => {
		const itemCount = await getCartItemCount()
		setCartItemCount(itemCount)
	}

	// Mettre à jour le nombre d'items uniques lors du chargement et lorsque le panier change
	useEffect(() => {
		updateCartItemCount()
	}, [])

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

			{/* Menu navigation */}
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

			{/* Cart and menu */}
			<div className='flex items-center space-x-4'>
				{/* Cart */}
				<div className='cart-container relative'>
					<Link to={`/My-cart`} aria-label='View Cart'>
						<ShoppingCart size={30} />
						{cartItemCount > 0 && (
							<span className='bg-gray-950 text-white text-center rounded-full h-5 w-5 text-sm absolute -top-1 -right-2'>
								{cartItemCount}
							</span>
						)}
					</Link>
				</div>

				{/* Burger menu */}
				<div className='md:hidden'>
					<button onClick={toggleMenu} className='text-xl'>
						{isMenuOpen ? <X size={30} /> : <Menu size={30} />}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
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
