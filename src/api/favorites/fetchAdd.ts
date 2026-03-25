import { IRegisterResponseData } from '../../types/IRegisterResponseData'

export default async function addMovie(id: string): Promise<IRegisterResponseData> {
	const res = await fetch('https://cinemaguide.skillbox.cc/favorites', {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id: id,
		}),
	})

	if (!res.ok) {
		throw new Error('Ошибка добавления в избранное')
	}

	const data = await res.json()
	return data
}
