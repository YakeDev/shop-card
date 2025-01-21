import { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import {
	addToCart as addToCartUtil,
	removeItem,
	clearCart,
	getCart,
	getCartQuantity,
	getCartTotal,
	getCartItemCount,
} from './CartUtils' // Utilities use localForage

export const CartContext = createContext({
	cartItemCount: 0,
	cartItems: [],
})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([])
	const [cartQuantity, setCartQuantity] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)
	const [cartItemCount, setCartItemCount] = useState(0)

	// Synchronize cart state with localForage
	const updateCart = async () => {
		try {
			const items = await getCart()
			const quantity = await getCartQuantity()
			const total = await getCartTotal()
			const itemCount = await getCartItemCount()

			setCartItems(items)
			setCartQuantity(quantity)
			setCartTotal(total)
			setCartItemCount(itemCount)
		} catch (error) {
			console.error('Failed to update cart:', error)
		}
	}

	// Add an item to the cart
	const addToCart = async (product, quantity) => {
		await addToCartUtil(product, quantity)
		await updateCart()
	}

	// Remove an item from the cart
	const removeFromCart = async (productId) => {
		await removeItem(productId)
		await updateCart()
	}

	// Clear the cart
	const clearCartItems = async () => {
		await clearCart()
		await updateCart()
	}

	// Initialize cart state on mount
	useEffect(() => {
		updateCart()
	}, [])

	return (
		<CartContext.Provider
			value={{
				cartItems,
				cartQuantity,
				cartTotal,
				cartItemCount,
				addToCart,
				removeFromCart,
				clearCartItems,
			}}>
			{children}
		</CartContext.Provider>
	)
}

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
