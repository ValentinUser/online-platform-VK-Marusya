import Button from '../../ui/button/Button'
import Input from '../../ui/input/Input'
import * as style from './ModalRegister.module.scss'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { IModalProps } from '../../types/IModalProps'
import { IRegisterRequest } from '../../types/IRegisterRequest'
import { ErrorType } from '../../types/ErrorType'
import fetchRegister from '../../api/auth/fetchRegistr'

function ModalRegister({ switchModal }: IModalProps) {
	const [error, setError] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ErrorType>({ mode: 'onChange' })

	const password = watch('password')

	const onSubmit = async (data: IRegisterRequest) => {
		try {
			setError(false)
			delete data.confirmPassword

			const cleanedData = Object.fromEntries(
				Object.entries(data).map(([key, value]) => {
					if (typeof value === 'string') {
						return [key, value.trim().replace(/\s+/g, ' ')]
					}
					return [key, value]
				}),
			) as IRegisterRequest

			const res = await fetchRegister(cleanedData)
			if (res.success) {
				switchModal('ready')
			}
		} catch (error) {
			setError(true)
			console.log(error.message)
		}
	}

	return (
		<div className={style.authBlock}>
			{error && <span className={style.error}>Ошибка регистрации</span>}
			<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
				<fieldset className={style.fieldset}>
					<Input
						type={'email'}
						name={'email'}
						placeholder={'Электронная почта'}
						svg='mail'
						error={errors.email?.message}
						{...register('email', { required: 'err' })}
					></Input>
					<Input
						type={'text'}
						name={'name'}
						placeholder={'Имя'}
						svg='user'
						error={errors.name?.message}
						{...register('name', { required: 'err' })}
					></Input>
					<Input
						type={'text'}
						name={'surname'}
						placeholder={'Фамилия'}
						svg='user'
						error={errors.surname?.message}
						{...register('surname', { required: 'err' })}
					></Input>
					<Input
						type={'password'}
						name={'password'}
						placeholder={'Пароль'}
						svg='password'
						error={errors.password?.message}
						{...register('password', { required: 'err', minLength: { value: 6, message: 'err' } })}
					></Input>
					<Input
						type={'password'}
						name={'confirmPassword'}
						placeholder={'Подтвердите пароль'}
						svg='password'
						error={errors.confirmPassword?.message}
						{...register('confirmPassword', {
							required: 'err',
							validate: value => value === password || 'err',
						})}
					></Input>
				</fieldset>
				<Button blueMod={true}>Создать аккаунт</Button>
			</form>
			<button className={style.btn} onClick={() => switchModal('enter')}>
				У меня есть пароль
			</button>
		</div>
	)
}

export default ModalRegister
