import { useCart } from './CartContext'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'

export default function ProductListByCategory({ categoryName }) {
	const { addToCart } = useCart() // Utilisez le contexte ici pour ajouter au panier
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const getProduct = async () => {
			try {
				const response = await fetch(
					`https://dummyjson.com/products/category/${categoryName}`
				)
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}
				const data = await response.json()
				setProducts(data.products)
			} catch (err) {
				console.error('Erreur lors de la récupération des produits :', err)
				setError(
					'Impossible de récupérer les produits. Veuillez réessayer plus tard.'
				)
			} finally {
				setLoading(false)
			}
		}
		getProduct()
	}, [categoryName])

	if (!loading && products.length === 0) {
		return (
			<p className='text-center text-gray-500'>
				No products found in this category.
			</p>
		)
	}

	const handleAddToCart = (product) => {
		addToCart(product, 1) // Utilisez le addToCart du contexte
	}

	return (
		<div className='my-28'>
			<div className='text-center text-xl lg:text-3xl font-michroma mb-10 uppercase'>
				{categoryName} Products
			</div>
			{error && <p className='text-red-500 text-center'>{error}</p>}
			{loading ? (
				<div className='flex justify-center items-center h-96 w-screen overflow-hidden'>
					<div className='text-center'>
						<p className='text-2xl text-gray-600'>Loading...</p>
					</div>
				</div>
			) : (
				<div className='main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{products.map((el) => (
						<div key={el.id} className='p-6 border border-gray-950'>
							<Link to={`/product/${el.id}`}>
								<div className='flex justify-center items-center h-60 w-full mb-2'>
									<img
										src={el.thumbnail}
										className='object-cover h-60 w-auto'
										alt={`Image de ${el.title}`}
										onError={(e) => (e.target.src = 'default-image.jpg')}
									/>
								</div>

								<h3 className='font-medium text-gray-800 uppercase mb-2'>
									{el.title}
								</h3>
								<p className='text-xl font-semibold text-gray-950 mb-2'>
									${el.price}
								</p>
								<p className='text-sm text-gray-500 mb-1'>
									{el.description.length > 40
										? `${el.description.substring(0, 40)}...`
										: el.description}
								</p>
							</Link>

							<button
								className='flex justify-center mt-4 px-8 py-2 bg-gray-950 text-white hover:bg-gray-900 w-full'
								onClick={() => handleAddToCart(el)}>
								<span className='me-2'>
									<ShoppingCart />
								</span>
								Add to Cart
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

// Validation des props avec prop-types
ProductListByCategory.propTypes = {
	categoryName: PropTypes.string.isRequired,
}
