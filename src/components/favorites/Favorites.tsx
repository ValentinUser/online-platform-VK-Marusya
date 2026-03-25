import { useContext, useEffect } from 'react'
import * as style from './Favorites.module.scss'
import getMovie from '../../api/favorites/fetchGet'
import ItemMovie from '../../ui/item_movie/ItemMovie'
import { MyData } from '../data_provider/DataProvider'

function Favorites() {
	const { favorites, setFavorites } = useContext(MyData)

	async function fetchFavorites() {
		try {
			const res = await getMovie()
			setFavorites(res)
		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		fetchFavorites()
	}, [])

	if (!favorites) fetchFavorites()

	return (
		<div className={style.favorites}>
			<ul className={style.favoriteList}>
				{favorites && favorites.map(film => <ItemMovie move={film} key={film.id} count={false} btnDel={true} />)}
			</ul>
		</div>
	)
}

export default Favorites
