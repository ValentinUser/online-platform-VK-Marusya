import { useForm } from 'react-hook-form'
import Button from '../../ui/button/Button'
import Input from '../../ui/input/Input'
import * as style from './ModalEnter.module.scss'
import { useContext, useState } from 'react'
import { MyData } from '../data_provider/DataProvider'
import { IRegisterRequest } from '../../types/IRegisterRequest'
import { ErrorType } from '../../types/ErrorType'
import { IModalProps } from '../../types/IModalProps'
import fetchProfile from '../../api/auth/fetchProfile'
import fetchLogin from '../../api/auth/fetchLogin'

const ModalEnter = ({ switchModal }: IModalProps) => {
	const [error, setError] = useState<boolean>(false)
	const { setIsModal, setProfile, profile } = useContext(MyData)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ErrorType>({ mode: 'onChange' })

	const onSubmit = async (data: IRegisterRequest) => {
		try {
			setError(false)
			const res = await fetchLogin(data)
			if (res.result) {
				const resProfile = await fetchProfile()
				setProfile(resProfile)
				setIsModal(false)
			}
		} catch (error) {
			setError(true)
			console.log(error.message)
		}
	}

	return (
		<div className={style.authBlock}>
			{error && <span className={style.error}>Ошибка входа</span>}
			<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
				<fieldset className={style.fieldset}>
					<Input
						type='email'
						name='email'
						placeholder='Электронная почта'
						svg='mail'
						error={errors.email?.message}
						{...register('email', { required: 'err' })}
					/>
					<Input
						type='password'
						name='password'
						placeholder='Пароль'
						svg='password'
						error={errors.password?.message}
						{...register('password', { required: 'err' })}
					/>
				</fieldset>
				<Button blueMod={true}>Войти</Button>
			</form>
			<button className={style.btn} onClick={() => switchModal('register')}>
				Регистрация
			</button>
		</div>
	)
}

export default ModalEnter
