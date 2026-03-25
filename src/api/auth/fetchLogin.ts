import { IRegisterRequest } from '../../types/IRegisterRequest'
import { IRegisterResponseData } from '../../types/IRegisterResponseData'

export default async function fetchLogin(body: IRegisterRequest): Promise<IRegisterResponseData> {
	const res = await fetch('https://cinemaguide.skillbox.cc/auth/login', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(`Ошибка входа (${res.status}) -- ${data.error}`)
	}

	return data as IRegisterResponseData
}
