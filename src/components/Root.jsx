import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { CartProvider } from './CartContext' // Assurez-vous d'importer le contexte ici

export default function Root() {
	return (
		<CartProvider>
			<div>
				<Navbar />
				<div id='detail' className='px-12 mt-30'>
					<Outlet />
				</div>
			</div>
		</CartProvider>
	)
}
