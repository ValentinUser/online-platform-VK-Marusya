import { IMove } from '../types/IMove'

export default async function fetchSearchMovie(title: string): Promise<IMove[]> {
	const res = await fetch(`https://cinemaguide.skillbox.cc/movie?title=${title}&count=5&page=1`)
	const data = await res.json()

	if (!res.ok) {
		throw new Error(`Ошибка загрузки поиска фильмов: ${res.status}`)
	}

	return data
}
