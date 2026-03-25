import { IRegisterRequest } from '../../types/IRegisterRequest'
import { IRegisterResponseData } from '../../types/IRegisterResponseData'

export default async function fetchRegister(body: IRegisterRequest): Promise<IRegisterResponseData> {
	const res = await fetch('https://cinemaguide.skillbox.cc/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})

	if (!res.ok) {
		const data = await res.json()
		throw new Error(`Ошибка регистрации (${res.status}) -- ${data.error}`)
	}

	const data = await res.json()
	return data as IRegisterResponseData
}
