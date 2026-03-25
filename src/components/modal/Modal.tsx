import { ModalFlagsType } from '../../types/ModalFlagsType'
import Button from '../../ui/button/Button'
import ModalEnter from '../modal_enter/ModalEnter'
import ModalRegister from '../modal_register/ModalRegister'
import * as style from './Modal.module.scss'
import { useState } from 'react'

function Modal() {
	const [modalFlag, setModalFlag] = useState<ModalFlagsType>('enter')

	function switchModal(flag: ModalFlagsType): void {
		setModalFlag(flag)
	}

	return (
		<>
			{modalFlag === 'enter' && <ModalEnter switchModal={switchModal} />}
			{modalFlag === 'register' && <ModalRegister switchModal={switchModal} />}
			{modalFlag === 'ready' && (
				<div className={style.ready}>
					<h2 className={style.title}>Регистрация завершена</h2>
					<p className={style.text}>Используйте вашу электронную почту для входа</p>
					<Button blueMod={true} click={() => switchModal('enter')}>
						<span>Войти</span>
					</Button>
				</div>
			)}
		</>
	)
}

export default Modal
