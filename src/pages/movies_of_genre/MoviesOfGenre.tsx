import * as style from './MoviesOfGenre.module.scss'
import { useEffect, useState } from 'react'
import { IMove } from '../../types/IMove'
import ItemMovie from '../../ui/item_movie/ItemMovie'
import Button from '../../ui/button/Button'
import fetchMovieOfGenre from '../../api/fetchMovieOfGenre'

function MoviesOfGenre() {
	const [genre, setGenre] = useState<string>('')
	const [listFilm, setListFilm] = useState<IMove[] | null>(null)
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		setGenre(localStorage.getItem('genre'))

		async function dataFilmGenre() {
			try {
				const data = await fetchMovieOfGenre(genre, page)

				if (!listFilm) {
					setListFilm(data)
				} else {
					setListFilm(listFilm => [...listFilm, ...data])
				}
			} catch (error) {
				console.log(error.message)
			}
		}

		genre && dataFilmGenre()
	}, [genre, page])

	const addMovie = () => {
		setPage(page => (page += 1))
	}

	return (
		<div className={style.container}>
			<div className={style.genre}>
				<h2 className={style.titleGenre}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
				<ul className={style.genreList}>
					{listFilm && listFilm.map(film => <ItemMovie move={film} key={film.id} count={false} />)}
				</ul>
				<div className={style.addBtn}>
					<Button blueMod={true} click={addMovie}>
						<span className={style.addBtnText}>Показать ещё</span>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default MoviesOfGenre
