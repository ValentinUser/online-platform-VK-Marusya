import { useContext, useEffect } from 'react'
import * as style from './MoviePage.module.scss'
import { MyData } from '../../components/data_provider/DataProvider'
import DescMovie from '../../components/description_movie/DescMovie'
import { useNavigate } from 'react-router-dom'

function MoviePage() {
	const { dataMovie } = useContext(MyData)
	const navigate = useNavigate()

	useEffect(() => {
		if (!dataMovie.id) {
			navigate('/', { replace: true })
		}
	}, [])

	return (
		<div className={style.container}>
			<DescMovie btnFlag={false} />
			<div>
				<h2 className={style.detailsTitle}>О фильме</h2>
				<ul className={style.detailsList}>
					<li className={style.detailsItem}>
						<span className={style.name}>Язык оригинала</span>
						<span className={style.line}></span>
						<p>{dataMovie.language}</p>
					</li>
					<li className={style.detailsItem}>
						<span className={style.name}>Бюджет</span>
						<span className={style.line}></span>
						<p>{dataMovie.budget}</p>
					</li>
					<li className={style.detailsItem}>
						<span className={style.name}>Выручка</span>
						<span className={style.line}></span>
						<p>{dataMovie.awardsSummary}</p>
					</li>
					<li className={style.detailsItem}>
						<span className={style.name}>Режиссёр</span>
						<span className={style.line}></span>
						<p>{dataMovie.director}</p>
					</li>
					<li className={style.detailsItem}>
						<span className={style.name}>Продакшен</span>
						<span className={style.line}></span>
						<p>{dataMovie.production}</p>
					</li>
					<li className={style.detailsItem}>
						<span className={style.name}>Награды</span>
						<span className={style.line}></span>
						<p>{dataMovie.awardsSummary}</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MoviePage
