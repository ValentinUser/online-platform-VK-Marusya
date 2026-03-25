export default async function getMovie() {
	const res = await fetch('https://cinemaguide.skillbox.cc/favorites', {
		method: 'GET',
		credentials: 'include',
	})

	if (!res.ok) {
		throw new Error('Ошибка получения избранного')
	}

	const data = await res.json()
	return data
}
