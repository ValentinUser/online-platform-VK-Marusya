import fetchFilms from './fetchFilms'
import fetchRandomFilm from './fetchRandomFilm'

export default async function fetchToHome() {
	try {
		const [randomMovieData, topMoviesData] = await Promise.all([fetchRandomFilm(), fetchFilms()])
		return { randomMovieData, topMoviesData }
	} catch (error) {
		console.error('Ошибка загрузки фильмов:', error)
		throw new Error(error.message)
	}
}
