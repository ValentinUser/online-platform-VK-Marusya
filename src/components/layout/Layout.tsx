import { Outlet, useNavigation } from 'react-router-dom'
import * as style from './Layout.module.scss'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Loading from '../loading/Loading'

function Layout() {
	const navigation = useNavigation()
	return (
		<div className={style.screen}>
			<Header />
			<main>{navigation.state === 'loading' ? <Loading /> : <Outlet />}</main>
			<Footer />
		</div>
	)
}

export default Layout
