import { IMove } from '../types/IMove'

export default async function fetchFilmId(filmId: string): Promise<IMove> {
	const res = await fetch(`https://cinemaguide.skillbox.cc/movie/random/${filmId}`)
	const data = await res.json()

	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}`)
	}

	return data
}
