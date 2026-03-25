import { useLoaderData } from 'react-router-dom'
import * as style from './Home.module.scss'
import { MoviesResponseType } from '../../types/MoviesResponseType'
import { useContext, useEffect } from 'react'
import DescMovie from '../../components/description_movie/DescMovie'
import { MyData } from '../../components/data_provider/DataProvider'
import ItemMovie from '../../ui/item_movie/ItemMovie'

function Home() {
	const { randomMovieData, topMoviesData }: MoviesResponseType = useLoaderData()

	const { setDataMovie } = useContext(MyData)

	useEffect(() => {
		setDataMovie(randomMovieData)
	}, [])

	return (
		<div className={style.container}>
			<DescMovie />
			<div>
				<h2 className={style.titleTop}>Топ 10 фильмов</h2>
				<ul className={style.filmBlock}>
					{topMoviesData.map((move, index) => (
						<ItemMovie move={move} index={index + 1} key={move.id} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default Home
