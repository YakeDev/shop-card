import { createContext, useState, useEffect } from 'react'
import localForage from 'localforage'
import PropTypes from 'prop-types' // Importation de PropTypes

// Créez un contexte pour le panier
export const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cartItemCount, setCartItemCount] = useState(0)

	// Fonction pour mettre à jour le nombre d'items dans le panier
	const updateCartItemCount = async () => {
		try {
			const cart = await localForage.getItem('cart')
			setCartItemCount(cart ? cart.length : 0)
		} catch (err) {
			console.error('Erreur lors de la mise à jour du panier :', err)
			setCartItemCount(0)
		}
	}

	// Mettre à jour le panier au montage du composant
	useEffect(() => {
		updateCartItemCount()
	}, [])

	return (
		<CartContext.Provider value={{ cartItemCount, updateCartItemCount }}>
			{children}
		</CartContext.Provider>
	)
}

// Définir les PropTypes pour le CartProvider
CartProvider.propTypes = {
	children: PropTypes.node.isRequired, // Les enfants doivent être un élément React
}
