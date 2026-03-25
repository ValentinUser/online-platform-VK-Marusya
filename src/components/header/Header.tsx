import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import * as style from './Header.module.scss'
import logo from '../../assets/header_images/logo.png'
import Search from '../../assets/header_images/search.svg'
import SearchMobile from '../../assets/header_images/mobile_svg/search.svg'
import Menu from '../../assets/header_images/mobile_svg/menu.svg'
import User from '../../assets/header_images/mobile_svg/user.svg'
import UserLoginOn from '../../assets/header_images/mobile_svg/userLoginOn.svg'
import SearchItemMovie from '../../ui/search_item_movie/SearchItemMovie'
import fetchSearchMovie from '../../api/fetchSearchMovie'
import Closed from '../../assets/modal_svg/closed.svg'
import ClosedForm from '../../assets/header_images/closed.svg'
import { MyData } from '../data_provider/DataProvider'
import { FormValues } from '../../types/FormValues'
import { useForm } from 'react-hook-form'
import Modal from '../modal/Modal'

function Header() {
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
	const [searchClosed, setSearchClosed] = useState<boolean>(false)
	const { register, watch, reset } = useForm<FormValues>()
	const { isModal, setIsModal, profile } = useContext(MyData)
	const [itemMovie, setItemMovie] = useState([])
	const refSearch = useRef(null)
	const [mobileSearch, setMobileSearch] = useState<boolean>(false)

	const watchedValue = watch('search')

	useEffect(() => {
		if (!watchedValue || !watchedValue.trim()) return

		const timer = setTimeout(async () => {
			try {
				const res = await fetchSearchMovie(watchedValue.trim())
				if (res.length > 0) {
					setSearchClosed(true)
					setItemMovie(res)
				}
			} catch (err) {
				console.error(err)
			}
		}, 800)

		if (timeoutId !== null && timeoutId !== timer) {
			clearTimeout(timeoutId)
		}

		setTimeoutId(timer)

		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [watchedValue])

	function closed() {
		setSearchClosed(false)
		setMobileSearch(false)
		reset({
			search: '',
		})
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (refSearch.current && !refSearch.current.contains(event.target)) {
				closed()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<header>
			<div className={style.container}>
				<div className={style.headerNav}>
					<Link to='/' className={style.logoLink}>
						<img src={logo} width='43' height='56' alt='logo' />
						<span className={style.logoName}>маруся</span>
					</Link>
					<Link to='/' className={style.logoLinkMobile}>
						<img src={logo} width='14' height='18' alt='logo' />
						<span className={style.logoName}>маруся</span>
					</Link>
					<nav className={style.nav}>
						<ul className={style.linkList}>
							<li className={style.linkItem}>
								<Link to='/'>Главная</Link>
							</li>
							<li className={style.linkItem}>
								<Link to='/filmGenres'>Жанры</Link>
							</li>
						</ul>
					</nav>
					<form className={style.headerForm}>
						<div className={style.inputSearch}>
							<input className={style.input} type='search' autoComplete='off' placeholder='Поиск' {...register('search')} />
							<Search className={style.searchSvg} />
							<button
								className={style.closedForm}
								type='button'
								onClick={() => {
									setSearchClosed(false)
								}}
							>
								<ClosedForm width='24' height='24' />
							</button>
							{searchClosed && (
								<div>
									<ul className={style.resp} ref={refSearch}>
										{itemMovie.map(movie => (
											<SearchItemMovie movie={movie} key={movie.id} closed={closed} />
										))}
									</ul>
								</div>
							)}
						</div>
					</form>
					{profile ? (
						<Link to={'/profile'} className={style.linkName}>
							<span className={style.profileName}>{profile.name}</span>
						</Link>
					) : (
						<button className={style.btn} onClick={() => setIsModal(isModal => !isModal)}>
							<span className={style.textBtn}>Войти</span>
						</button>
					)}
					<ul className={style.mobileVersion}>
						<li>
							<Link className={style.mobileSvgElem} to='/filmGenres'>
								<Menu width='24' height='24' />
							</Link>
						</li>
						<li>
							<button className={style.mobileSvgElem} onClick={() => setMobileSearch(true)}>
								{!mobileSearch && <SearchMobile width='24' height='24' />}
							</button>
							{mobileSearch && (
								<form className={style.mobileForm}>
									<div className={style.inputSearch}>
										<input className={style.input} type='search' autoComplete='off' placeholder='Поиск' {...register('search')} />
										<Search className={style.searchSvg} />
										<button
											className={style.closedForm}
											type='button'
											onClick={() => {
												setMobileSearch(false)
											}}
										>
											<ClosedForm width='24' height='24' />
										</button>
										{searchClosed && (
											<div>
												<ul className={style.resp} ref={refSearch}>
													{itemMovie.map(movie => (
														<SearchItemMovie movie={movie} key={movie.id} closed={closed} />
													))}
												</ul>
											</div>
										)}
									</div>
								</form>
							)}
						</li>
						<li>
							{profile ? (
								<Link to={'/profile'} className={style.mobileSvgElem}>
									<UserLoginOn width='24' height='24' />
								</Link>
							) : (
								<button className={style.mobileSvgElem} onClick={() => setIsModal(isModal => !isModal)}>
									<User width='24' height='24' />
								</button>
							)}
						</li>
					</ul>
					{isModal && (
						<div className={style.modalView}>
							<div className={style.modal}>
								<button className={style.modalClosed} onClick={() => setIsModal(isModal => !isModal)}>
									<Closed />
								</button>
								<div className={style.modalLogo}>
									<img src={logo} width='43' height='56' alt='logo' />
									<span className={style.logoNameModal}>маруся</span>
								</div>
								<Modal />
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
