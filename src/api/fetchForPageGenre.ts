import fetchFullListMovie from './fetchFullListMovie'
import fetchGenres from './fetchGenres'

export default async function fetchForPageGenre() {
	try {
		const [resGenres, resFullListMovie] = await Promise.all([fetchGenres(), fetchFullListMovie()])
		return { resGenres, resFullListMovie }
	} catch (error) {
		console.error('Ошибка загрузки фильмов:', error)
		throw new Error(error.message)
	}
}
