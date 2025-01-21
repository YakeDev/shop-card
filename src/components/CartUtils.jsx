import localForage from 'localforage'

// Ajouter un produit au panier avec gestion de la quantité et du prix total
export const addToCart = async (product, quantity) => {
	try {
		// Validation des données
		if (!product || !product.id || !product.price || quantity <= 0) {
			throw new Error('Produit ou quantité invalide.')
		}

		const existingCart = (await localForage.getItem('cart')) || []

		// Vérifier si le produit est déjà dans le panier
		const productIndex = existingCart.findIndex(
			(item) => item.id === product.id
		)

		if (productIndex >= 0) {
			// Mettre à jour la quantité et le prix total
			existingCart[productIndex].quantity += quantity
			existingCart[productIndex].totalPrice =
				existingCart[productIndex].quantity * product.price
			await localForage.setItem('cart', existingCart)
			await updateCartTotal(existingCart)
			return
		}

		// Ajouter le produit avec la quantité et calculer le prix total
		const updatedCart = [
			...existingCart,
			{
				...product,
				quantity,
				totalPrice: product.price * quantity,
			},
		]

		// Mettre à jour localForage et recalculer le total
		await localForage.setItem('cart', updatedCart)
		await updateCartTotal(updatedCart)
	} catch (err) {
		console.error('Erreur lors de l’ajout au panier :', err)
	}
}

// Obtenir le panier complet
export const getCart = async () => {
	try {
		return (await localForage.getItem('cart')) || []
	} catch (err) {
		console.error('Erreur lors de la récupération du panier :', err)
		return []
	}
}

// Supprimer un produit du panier
export const removeItem = async (productId, setCart, setCartQuantity) => {
	try {
		const existingCart = (await localForage.getItem('cart')) || []

		// Vérifier si le produit existe dans le panier
		if (!existingCart.some((item) => item.id === productId)) {
			console.log('Aucun produit trouvé avec cet ID.')
			return
		}

		// Filtrer les produits pour supprimer celui avec l'ID donné
		const updatedCart = existingCart.filter((item) => item.id !== productId)

		// Mettre à jour localForage
		await localForage.setItem('cart', updatedCart)
		await updateCartTotal(updatedCart)

		// Mettre à jour l'état local si les fonctions sont fournies
		if (typeof setCart === 'function') setCart(updatedCart)
		if (typeof setCartQuantity === 'function') {
			const newCartQuantity = await getCartQuantity()
			setCartQuantity(newCartQuantity)
		}
	} catch (err) {
		console.error('Erreur lors de la suppression du produit :', err)
	}
}

// Vider le panier
export const clearCart = async (setCart, setCartQuantity) => {
	try {
		// Réinitialiser les clés liées au panier
		await localForage.setItem('cart', [])
		await localForage.setItem('cartTotal', '0.00')

		// Réinitialiser l'état local si les fonctions sont fournies
		if (typeof setCart === 'function') setCart([])
		if (typeof setCartQuantity === 'function') setCartQuantity(0)
	} catch (err) {
		console.error('Erreur lors du vidage du panier :', err)
	}
}

// Obtenir la quantité totale d'articles dans le panier
export const getCartQuantity = async () => {
	try {
		const cart = (await localForage.getItem('cart')) || []
		return cart.reduce((total, item) => total + item.quantity, 0)
	} catch (err) {
		console.error('Erreur lors de la récupération de la quantité :', err)
		return 0
	}
}

// Fonction pour mettre à jour le prix total du panier
export const updateCartTotal = async (cart) => {
	try {
		const cartTotal = cart.reduce((total, item) => total + item.totalPrice, 0)
		await localForage.setItem('cartTotal', cartTotal.toFixed(2))
	} catch (err) {
		console.error('Erreur lors de la mise à jour du total :', err)
	}
}

// Obtenir le prix total du panier
export const getCartTotal = async () => {
	try {
		const cartTotal = await localForage.getItem('cartTotal')
		return cartTotal ? parseFloat(cartTotal) : 0
	} catch (err) {
		console.error('Erreur lors de la récupération du total :', err)
		return 0
	}
}

// Fonction pour obtenir le nombre d'items uniques dans le panier
export const getCartItemCount = async () => {
	try {
		const cart = await localForage.getItem('cart')
		if (!cart) return 0

		// Retourner le nombre d'items (produits uniques) dans le panier
		return cart.length
	} catch (err) {
		console.error("Erreur lors de la récupération du nombre d'items :", err)
		return 0
	}
}
