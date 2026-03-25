export default async function fetchProfile() {
	const res = await fetch(`https://cinemaguide.skillbox.cc/profile`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = await res.json()

	if (!res.ok) {
		console.log(res)
		throw new Error('Error')
	}

	return data
}
