export default async function deleteMovie(id: string) {
	const res = await fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	})

	if (!res.ok) {
		throw new Error('Ошибка удаления из избранного')
	}

	const data = await res.json()
	return data
}
