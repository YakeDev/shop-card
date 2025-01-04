import localForage from 'localforage'
import { useEffect, useState } from 'react'
import { clearCart } from './CartUtils'
import { X, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MyCart() {
	const [cart, setCart] = useState([])

	useEffect(() => {
		// Récupérer le panier depuis localForage
		localForage
			.getItem('cart')
			.then((storedCart) => {
				if (storedCart && storedCart.length > 0) {
					setCart(storedCart) // Si le panier contient des articles, mettre à jour l'état
				} else {
					setCart([]) // Si le panier est vide ou inexistant, définir un tableau vide
				}
			})
			.catch((err) => {
				console.error('Erreur lors de la récupération du panier:', err)
			})
	}, [])

	// Fonction pour augmenter la quantité d'un produit
	const increaseQuantity = (productId) => {
		const updatedCart = cart.map((product) => {
			if (product.id === productId) {
				product.quantity += 1
				product.totalPrice = product.price * product.quantity // Recalculer le prix total du produit
			}
			return product
		})
		setCart(updatedCart)
		updateCartInLocalStorage(updatedCart)
	}

	// Fonction pour diminuer la quantité d'un produit
	const decreaseQuantity = (productId) => {
		const updatedCart = cart.map((product) => {
			if (product.id === productId && product.quantity > 1) {
				product.quantity -= 1
				product.totalPrice = product.price * product.quantity // Recalculer le prix total du produit
			}
			return product
		})
		setCart(updatedCart)
		updateCartInLocalStorage(updatedCart)
	}

	// Fonction pour mettre à jour le panier dans localForage
	const updateCartInLocalStorage = (updatedCart) => {
		localForage.setItem('cart', updatedCart).catch((err) => {
			console.error('Erreur de mise à jour du panier:', err)
		})
	}

	// Calcul du prix total du panier
	const getTotalPrice = () => {
		return cart.reduce((total, product) => total + product.totalPrice, 0)
	}

	//Calcul tax
	const getTax = () => {
		return (getTotalPrice() * (16 / 100)).toFixed(2)
	}
	// Calcul Total du panier
	const getTotalCart = () => {
		// Assurez-vous que getTax() et getTotalPrice() retournent des nombres
		const taxAmount = parseFloat(getTax()) || 0
		const totalPrice = parseFloat(getTotalPrice()) || 0

		// Additionnez et arrondissez à deux décimales
		return (taxAmount + totalPrice).toFixed(2)
	}

	// Fonction de suppression du produit
	const handleRemoveItem = (productId) => {
		const updatedCart = cart.filter((product) => product.id !== productId)
		setCart(updatedCart)
		updateCartInLocalStorage(updatedCart)
	}

	// Suppression du contenu du panier
	const handleRemoveAllItems = () => {
		clearCart(setCart) // Passer directement la fonction setCart
	}

	return (
		<div className='flex justify-center mt-20'>
			<div className='w-5/6'>
				{cart.length === 0 ? (
					<div className='flex justify-center items-center h-screen'>
						<div className='text-center'>
							<p className='text-2xl text-gray-600'>Votre panier est vide.</p>
							<div className='mt-10'>
								<Link
									to={`/Shop`}
									className='text-white bg-gray-950 px-7 py-3 uppercase '>
									Visit the shop
								</Link>
							</div>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-3 gap-28 items-start mt-12'>
						<div className='col-span-2'>
							<ul>
								<div className='flex flex-auto justify-between items-center w-full mb-6'>
									<h2 className='text-2xl font-bold font-michroma uppercase'>
										Shopping cart
									</h2>
									{/* Appeler handleRemoveAllItems seulement lorsque le bouton est cliqué */}
									<button
										className='flex items-center px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 border border-red-600'
										onClick={handleRemoveAllItems}>
										<Trash2 size={18} />{' '}
										<span className='ps-1'>Clean Cart</span>
									</button>
								</div>
								{cart.map((product) => (
									<li
										key={`${product.id}-${product.quantity}`}
										className='flex py-6 border-b border-gray-950 space-x-8'>
										<div className='border border-gray-950 px-4'>
											<img
												src={
													product.images && product.images[0]
														? product.images[0]
														: 'default-image.jpg'
												}
												alt={product.title}
												className='w-auto h-24 object-cover p-2'
											/>
										</div>
										<div className='flex flex-col flex-auto justify-between w-full '>
											<div className='flex justify-between items-start w-full'>
												<h3 className='uppercase text-lg font-medium'>
													{product.title}
												</h3>
												{/* Bouton pour supprimer le produit */}
												<button
													className='px-2 py-1 text-red-600 rounded ml-4'
													onClick={() => handleRemoveItem(product.id)}>
													<X />
												</button>
											</div>
											<div className='flex justify-between items-center'>
												<div className='flex gap-8'>
													<div className='border border-gray-950 px-2 py-1 items-center mt-1'>
														<button
															className='px-3 py-1'
															onClick={() => decreaseQuantity(product.id)}>
															-
														</button>
														<span className='px-2'>{product.quantity}</span>
														<button
															className='px-3 py-1'
															onClick={() => increaseQuantity(product.id)}>
															+
														</button>
													</div>
													<div className='border border-gray-950 px-4 py-2 items-center mt-1'>
														<p className='text-gray-500 '>
															PU :{' '}
															<span className='font-base text-gray-900'>
																${product.price}
															</span>
														</p>
													</div>
												</div>
												<div>
													<p className='text-gray-500 text-lg'>
														<span className='font-bold text-gray-900'>
															${product.totalPrice.toFixed(2)}
														</span>
													</p>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>

						<div className='p-5 border border-gray-950 sticky top-28'>
							<h3 className='text-lg font-bold uppercase mb-6'>Cart summary</h3>
							<div className='flex justify-between text-gray-400 uppercase text-sm py-1'>
								<p>Subtotal</p>{' '}
								<span className='font-bold text-gray-950'>
									${getTotalPrice().toFixed(2)}
								</span>
							</div>
							<div className='flex justify-between text-gray-400 uppercase text-sm py-1'>
								<p>Tax</p>{' '}
								<span className='font-bold text-gray-950'>${getTax()}</span>
							</div>
							<div className='flex justify-between text-gray-400 uppercase text-sm py-1'>
								<p>Total</p>{' '}
								<span className='font-bold text-gray-950'>
									${getTotalCart()}
								</span>
							</div>
							<div className='mt-6'>
								<button
									type='button'
									className='bg-gray-950 text-white w-full p-3 text-sm uppercase '>
									Checkout
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
