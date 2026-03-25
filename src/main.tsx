import DataProvider from './components/data_provider/DataProvider'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './main.module.scss'
import App from './App'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<DataProvider>
			<App />
		</DataProvider>
	</StrictMode>,
)
