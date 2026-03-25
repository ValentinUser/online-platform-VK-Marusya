import { Link } from 'react-router-dom'
import errorPhoto from '../../assets/other/errorPhoto.png'
import * as style from './SearchItemMovie.module.scss'
import Star from '../../assets/other/ratingStar.svg'
import { useContext } from 'react'
import { MyData } from '../../components/data_provider/DataProvider'
import { ISearchMovie } from '../../types/ISearchMovie'

function SearchItemMovie({ movie, closed }: ISearchMovie) {
	const { setDataMovie } = useContext(MyData)

	const renderMovie = () => {
		setDataMovie(movie)
		closed()
	}

	const ratingColor = (): string => {
		if (movie.tmdbRating < 6.3) return `${style.rating} ${style.rRed}`
		if (movie.tmdbRating >= 6.3 && movie.tmdbRating < 7.5) return `${style.rating} ${style.rGrey}`
		if (movie.tmdbRating >= 7.5 && movie.tmdbRating < 8.6) return `${style.rating} ${style.rGreen}`
		if (movie.tmdbRating >= 8.6) return `${style.rating} ${style.rGold}`
	}

	return (
		<li className={style.item}>
			<Link to={'/moviePage'} className={style.linkItem} onClick={renderMovie}>
				<img
					src={movie.posterUrl ? movie.posterUrl : errorPhoto}
					className={style.poster}
					width={40}
					height={52}
					alt='movie poster'
				/>
				<div className={style.infoBlock}>
					<div className={style.info}>
						<span className={ratingColor()}>
							<Star />
							{movie.tmdbRating.toFixed(1)}
						</span>
						<span className={style.movieInf}>{movie.releaseYear}</span>
						<span className={style.movieInf}>{movie.genres[0]}</span>
						<span className={style.movieInf}>{`${Math.floor(movie.runtime / 60)}ч  ${movie.runtime % 60} мин`}</span>
					</div>
					<h3 className={style.titleMovie}>{movie.title}</h3>
				</div>
			</Link>
		</li>
	)
}

export default SearchItemMovie
