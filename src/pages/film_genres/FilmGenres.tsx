import { Link, useLoaderData } from 'react-router-dom'
import * as style from './FilmGenres.module.scss'
import errorPhoto from '../../assets/other/errorPhoto.png'
import { RespGenrePage } from '../../types/RespGenrePage'
import { useContext, useEffect } from 'react'
import { MyData } from '../../components/data_provider/DataProvider'

function FilmGenres() {
	const { resGenres, resFullListMovie }: RespGenrePage = useLoaderData()
	const { setFullListMovie } = useContext(MyData)

	const currentId: Set<number> = new Set()

	const searchCover = (genre: string): string | null => {
		const coverFilm = resFullListMovie.find(element => element.genres.includes(genre) && !currentId.has(element.id))

		if (coverFilm) currentId.add(coverFilm.id)

		return coverFilm ? coverFilm.posterUrl : null
	}

	useEffect(() => {
		setFullListMovie(resFullListMovie)
	}, [])

	function recLocalStor(genre: string): void {
		localStorage.setItem('genre', genre)
	}

	return (
		<div className={style.container}>
			<div className={style.genre}>
				<h2 className={style.titleGenre}>Жанры фильмов</h2>
				<ul className={style.genreList}>
					{resGenres.map((genre, index) => (
						<li key={index} className={style.genreItem}>
							<Link to={`/moviesOfGenre`} className={style.genreLink} onClick={() => recLocalStor(genre)}>
								<img src={searchCover(genre) || errorPhoto} alt='film' width={290} height={220} className={style.genreImg} />
								<span className={style.linkName}>{genre}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default FilmGenres
