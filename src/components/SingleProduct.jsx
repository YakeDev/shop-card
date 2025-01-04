import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addToCart } from './CartUtils'
import CancelButton from './CancelButton'
import { ShoppingCart } from 'lucide-react'

export default function SingleProduct() {
	const { productId } = useParams() // Récupérer l'ID du produit depuis l'URL
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [quantity, setQuantity] = useState(1) // État pour la quantité

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await fetch(
					`https://dummyjson.com/products/${productId}`
				)
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}
				const data = await response.json()
				setProduct(data)
				console.log(data)
			} catch (err) {
				setError('Impossible de récupérer les détails du produit.', err)
			} finally {
				setLoading(false)
			}
		}
		fetchProductDetails()
	}, [productId])

	if (loading) return <p>Chargement...</p>
	if (error) return <p>{error}</p>

	if (!product) return <p>Produit non trouvé</p>

	// Fonction pour gérer la modification de la quantité
	const handleQuantityChange = (e) => {
		setQuantity(Number(e.target.value))
	}

	return (
		<div className='flex flex-col items-center justify-center product-details mt-24'>
			<div className='w-4/5'>
				<div className='mb-12 items-center'>
					<CancelButton />
				</div>
				<div className='flex p-16 border border-gray-950 space-x-8'>
					{/* Image du produit */}
					<div className='flex justify-center basis-1/2 border border-gray-950 px-4 items-center'>
						<img
							src={product.images[0]}
							alt={product.title}
							className='w-auto h-64 object-cover'
						/>
					</div>
					{/* Détails du produit */}
					<div>
						<h1 className='font-medium text-3xl mb-3'>{product.title}</h1>
						<p className='text-gray-500 text-sm font-light'>
							Catégorie:{' '}
							<span className='uppercase text-gray-950 font-medium'>
								{product.category}
							</span>{' '}
							<span> ◆ </span>
							Rating :
							<span className='uppercase text-gray-950 font-medium'>
								★ {product.rating}
							</span>
						</p>
						<p className='font-bold text-2xl my-3'>${product.price}</p>
						{/* Sélecteur de quantité */}
						<div className='quantity-selector uppercase'>
							<input
								type='number'
								id='quantity'
								value={quantity}
								onChange={handleQuantityChange}
								min='1'
								className='w-16 text-center p-1 border border-gray-950 ms-2 my-3'
							/>
						</div>
						<p className='py-4'>{product.description}</p>
						<div className='flex gap-4'>
							<button
								className='mt-2 px-8 py-2 bg-gray-950 text-white hover:bg-gray-800'
								onClick={() => addToCart(product, quantity)}>
								Buy Item
							</button>
							<button
								className='flex items-center mt-2 px-4 py-2 text-gray-950 hover:bg-gray-100 hover:text-gray-900 border border-gray-950'
								onClick={() => addToCart(product, quantity)}>
								<span className='me-2'>
									<ShoppingCart />
								</span>{' '}
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
