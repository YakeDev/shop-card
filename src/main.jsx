import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './components/root'
import ErrorPage from './Error-page'
import Shop from './components/Shop'
import Beauty from './components/Beauty'
import Fragrances from './components/Fragrances'
import Furnitures from './components/Fournitures'
import Groceries from './components/Groceries'
import SingleProduct from './components/SingleProduct'
import MyCart from './components/MyCart'
import Home from './components/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,

		children: [
			{ index: true, element: <Home /> },
			{
				path: 'Shop',
				element: <Shop />,
			},
			{
				path: 'Beauty',
				element: <Beauty />,
			},
			{
				path: 'Fragrances',
				element: <Fragrances />,
			},
			{
				path: 'Furnitures',
				element: <Furnitures />,
			},
			{
				path: 'Groceries',
				element: <Groceries />,
			},
			{
				path: '/product/:productId',
				element: <SingleProduct />,
			},
			{
				path: '/My-cart', // Fix path here
				element: <MyCart />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
