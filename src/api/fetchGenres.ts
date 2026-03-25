import { IMove } from '../types/IMove'

export default async function fetchGenres(): Promise<IMove[]> {
	const res = await fetch('https://cinemaguide.skillbox.cc/movie/genres')
	const data = await res.json()

	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}`)
	}

	return data
}
