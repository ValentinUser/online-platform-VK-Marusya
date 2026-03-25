import { ButtonTypes } from '../../types/ButtonTypes'
import * as style from './Button.module.scss'

function Button({ children, blueMod = false, click }: ButtonTypes) {
	return (
		<>
			<button onClick={click} className={blueMod ? style.btnModBlue : style.btnModDefault}>
				{children}
			</button>
		</>
	)
}

export default Button
