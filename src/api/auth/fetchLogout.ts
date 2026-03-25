export default async function logout() {
	const res = await fetch('https://cinemaguide.skillbox.cc/auth/logout', {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		throw new Error('Error')
	}

	return
}
