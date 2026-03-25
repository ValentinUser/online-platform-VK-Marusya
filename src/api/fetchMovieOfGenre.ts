import { IMove } from '../types/IMove'

export default async function fetchMovieOfGenre(genre: string, page: number): Promise<IMove[]> {
	const res = await fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genre}&count=15&page=${page}`)
	const data = await res.json()

	if (!res.ok) {
		throw new Error(`Ошибка загрузки фильмов по жанру: ${res.status}`)
	}

	return data
}
