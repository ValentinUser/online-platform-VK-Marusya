import { useContext } from 'react'
import errorPhoto from '../../assets/other/errorPhoto.png'
import { MoveProps } from '../../types/MovePropsTypes'
import * as style from './ItemMovie.module.scss'
import { MyData } from '../../components/data_provider/DataProvider'
import { Link } from 'react-router-dom'
import Closed from '../../assets/modal_svg/closed.svg'
import deleteMovie from '../../api/favorites/fetchDelete'
import getMovie from '../../api/favorites/fetchGet'

function ItemMovie({ move, index = 0, count = true, btnDel = false }: MoveProps) {
	const { setDataMovie, setFavorites, dataMovie } = useContext(MyData)

	async function fetchFavorites() {
		setFavorites(null)
		try {
			const res = await getMovie()
			setFavorites(res)
		} catch (error) {
			console.log(error.message)
		}
	}

	const renderMovie = () => {
		setDataMovie(move)
	}

	return (
		<li>
			{!move.posterUrl ? (
				<Link to={'/moviePage'} className={style.posterCard} onClick={renderMovie}>
					{count && <span className={style.posterNumber}>{index}</span>}
					<img width={224} height={336} src={errorPhoto} className={style.poster}></img>
					{btnDel && (
						<button
							className={style.delMovie}
							onClick={e => {
								e.preventDefault()
								deleteMovie(move.id.toString())
								fetchFavorites()
							}}
						>
							<Closed />
						</button>
					)}
				</Link>
			) : (
				<Link to={'/moviePage'} className={style.posterCard} onClick={renderMovie}>
					{count && <span className={style.posterNumber}>{index}</span>}
					<img width={224} height={336} src={move.posterUrl} className={style.poster}></img>
					{btnDel && (
						<button
							className={style.delMovie}
							onClick={e => {
								e.preventDefault()
								deleteMovie(move.id.toString())
								fetchFavorites()
							}}
						>
							<Closed />
						</button>
					)}
				</Link>
			)}
		</li>
	)
}

export default ItemMovie
