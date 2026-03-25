import * as style from './DescMovie.module.scss'
import { useContext, useEffect, useState } from 'react'
import Like from '../../assets/other/Like.svg'
import LikeActive from '../../assets/other/likeActive.svg'
import errorPhoto from '../../assets/other/errorPhoto.png'
import Reload from '../../assets/other/reload.svg'
import fetchRandomFilm from '../../api/fetchRandomFilm'
import { MyData } from '../data_provider/DataProvider'
import Button from '../../ui/button/Button'
import { Link } from 'react-router-dom'
import addMovie from '../../api/favorites/fetchAdd'
import getMovie from '../../api/favorites/fetchGet'
import deleteMovie from '../../api/favorites/fetchDelete'
import Closed from '../../assets/modal_svg/closed.svg'
import Star from '../../assets/other/ratingStar.svg'

function DescMovie({ btnFlag = true }) {
	const [isLike, setIsLike] = useState<boolean>(false)
	const { dataMovie, setDataMovie, profile, setIsModal, favorites, setFavorites } = useContext(MyData)
	const [playTrailer, setPlayTrailer] = useState<boolean>(false)

	function checkLike() {
		const findMovie = favorites?.some(movie => movie.id === dataMovie.id)
		if (findMovie) return true

		return false
	}

	// запрос по фаворитам
	async function fetchFavorites() {
		try {
			const res = await getMovie()
			setFavorites(res) // установка фаворитов
		} catch (error) {
			console.log(error.message)
		}
	}

	// вход в профиль запустит запрос по фаворитам
	useEffect(() => {
		if (profile) fetchFavorites()
	}, [profile])
	// }, [dataMovie])

	useEffect(() => {
		if (profile) {
			const like = checkLike() // сравнение с фаворитами
			setIsLike(like) // установка флага лайк/нет
		}
	}, [favorites])

	// нажат лайк, если в профите то добавить/удалить в избранное или войти
	const like = () => {
		if (profile) {
			if (isLike) {
				setIsLike(false)
				deleteMovie(dataMovie.id.toString())
			} else {
				setIsLike(true)
				addMovie(dataMovie.id.toString())
			}
		} else {
			setIsModal(isModal => !isModal)
		}
	}

	//  подгрузит новый фильм
	const reloadMovie = async () => {
		setIsLike(false)
		const res = await fetchRandomFilm()
		setDataMovie(res)
	}

	const ratingColor = (): string => {
		if (dataMovie?.tmdbRating < 6.3) return `${style.rating} ${style.rRed}`
		if (dataMovie?.tmdbRating >= 6.3 && dataMovie?.tmdbRating < 7.5) return `${style.rating} ${style.rGrey}`
		if (dataMovie?.tmdbRating >= 7.5 && dataMovie?.tmdbRating < 8.6) return `${style.rating} ${style.rGreen}`
		if (dataMovie?.tmdbRating >= 8.6) return `${style.rating} ${style.rGold}`
	}

	return (
		<div className={style.desc}>
			<div className={style.detailedDesc}>
				<div className={style.properties}>
					<span className={ratingColor()}>
						<Star />
						{dataMovie.tmdbRating.toFixed(1)}
					</span>
					<span>{dataMovie.releaseYear}</span>
					<span>{dataMovie.genres[0]}</span>
					<span>{`${Math.floor(dataMovie.runtime / 60)} ч ${dataMovie.runtime % 60} мин`}</span>
				</div>
				<h2 className={style.title}>{dataMovie.title}</h2>
				<p className={style.plot}>{dataMovie.plot}</p>
				<div className={style.btnBlock}>
					<Button blueMod={true} click={() => setPlayTrailer(true)}>
						<span className={`${style.btnText} ${style.mobileBlueBtn}`}>Трейлер</span>
					</Button>
					{btnFlag && (
						<Link to={'/moviePage'} className={style.descLink}>
							<span className={style.btnText}>О фильме</span>
						</Link>
					)}
					<Button click={like}>
						{isLike ? <LikeActive className={style.activeLike} width={24} height={24} /> : <Like width={24} height={24} />}
					</Button>
					{btnFlag && (
						<Button click={reloadMovie}>
							<Reload width={24} height={24} />
						</Button>
					)}
				</div>
				{playTrailer && (
					<div className={style.playerScreen}>
						<div className={style.player}>
							<button className={style.modalClosed} onClick={() => setPlayTrailer(false)}>
								<Closed />
							</button>
							<iframe
								className={style.frame}
								src={`https://youtube.com/embed/${dataMovie.trailerYouTubeId}`}
								title={dataMovie.title}
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							/>
						</div>
					</div>
				)}
			</div>
			{dataMovie.backdropUrl ? (
				<img src={dataMovie.backdropUrl} className={style.titleImg} width={680} height={552} alt='Обложка фильма' />
			) : (
				<img src={errorPhoto} className={style.titleImg} width={680} height={552} alt='Фото не найдено' />
			)}
		</div>
	)
}

export default DescMovie
