import { useContext, useEffect, useState } from 'react'
import fetchProfile from '../../api/auth/fetchProfile'
import * as style from './Profile.module.scss'
import { MyData } from '../../components/data_provider/DataProvider'
import Settings from '../user_settings/Settings'
import Favorites from '../../components/favorites/Favorites'
import FavoritesSvg from '../../assets/user_account_svg/favorites.svg'
import SettingsSvg from '../../assets/user_account_svg/settings.svg'

function Profile() {
	const { profile, setProfile } = useContext(MyData)
	const [onFavorite, setOnFavorite] = useState(true)

	useEffect(() => {
		async function getProfile() {
			try {
				const res = await fetchProfile()
				setProfile(res)
			} catch (error) {
				console.log(error.message)
			}
		}
		getProfile()
	}, [])

	return (
		<div className={style.container}>
			<div className={style.userBlock}>
				<h1 className={style.userSettingTitle}>Мой аккаунт</h1>
				{profile && (
					<div>
						<ul className={style.btnList}>
							<li>
								<button onClick={() => setOnFavorite(true)} className={style.btnItem}>
									<FavoritesSvg className={style.userSvg} /> <span className={style.desktopText}>Избранные фильмы</span>{' '}
									<span className={style.mobileText}>Избранное</span>
								</button>
							</li>
							<li>
								<button onClick={() => setOnFavorite(false)} className={style.btnItem}>
									<SettingsSvg className={style.userSvg} /> <span className={style.desktopText}>Настройка аккаунта</span>{' '}
									<span className={style.mobileText}>Настройки</span>
								</button>
							</li>
						</ul>
						<div className={style.userList}>{onFavorite ? <Favorites /> : <Settings data={profile} />}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Profile
