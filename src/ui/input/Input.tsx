import * as style from './Input.module.scss'
import Password from '../../assets/modal_svg/password.svg'
import Mail from '../../assets/modal_svg/mail.svg'
import User from '../../assets/modal_svg/user.svg'
import { IInput } from '../../types/IInput'

function Input({ type, name, placeholder, svg, error, ...props }: IInput) {
	return (
		<div className={style.inputBlock}>
			<input className={error ? style.errorMod : style.input} type={type} name={name} placeholder={placeholder} {...props} />
			{svg === 'user' && <User className={style.inputSvg} />}
			{svg === 'mail' && <Mail className={style.inputSvg} />}
			{svg === 'password' && <Password className={style.inputSvg} />}
		</div>
	)
}

export default Input
