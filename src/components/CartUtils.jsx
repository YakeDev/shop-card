import localForage from 'localforage'

// Ajouter un produit au panier avec gestion de la quantité et du prix total
export const addToCart = async (product, quantity) => {
	try {
		const existingCart = (await localForage.getItem('cart')) || []

		// Vérifier si le produit est déjà dans le panier
		const productIndex = existingCart.findIndex(
			(item) => item.id === product.id
		)

		if (productIndex >= 0) {
			console.log('Produit déjà dans le panier, quantité non modifiée.')
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

		// console.log('Produit ajouté au panier avec succès!')
	} catch (err) {
		console.error('Erreur lors de l’ajout au panier :', err)
	}
}

// Obtenir le panier complet
export const getCart = async () => {
	try {
		const cart = (await localForage.getItem('cart')) || []
		return cart
	} catch (err) {
		console.error('Erreur lors de la récupération du panier :', err)
		return []
	}
}

// Supprimer un produit du panier
export const removeItem = async (productId, setCart, setCartQuantity) => {
	try {
		const existingCart = (await localForage.getItem('cart')) || []

		// Filtrer les produits pour supprimer celui avec l'ID donné
		const updatedCart = existingCart.filter((item) => item.id !== productId)

		// Mettre à jour localForage
		await localForage.setItem('cart', updatedCart)
		await updateCartTotal(updatedCart)

		// Mettre à jour l'état local
		setCart(updatedCart)

		// Mettre à jour la quantité globale
		const newCartQuantity = await getCartQuantity()
		setCartQuantity(newCartQuantity)

		console.log('Produit supprimé du panier avec succès')
	} catch (err) {
		console.error('Erreur lors de la suppression du produit :', err)
	}
}

// Vider le panier
export const clearCart = async (setCart, setCartQuantity) => {
	try {
		// Supprimer toutes les données
		await localForage.clear()

		// Réinitialiser l'état local
		setCart([])
		setCartQuantity(0)

		// console.log('Panier vidé avec succès.')
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
const updateCartTotal = async (cart) => {
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
