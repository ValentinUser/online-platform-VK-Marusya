import { useNavigate } from 'react-router-dom'
import logout from '../../api/auth/fetchLogout'
import { IProfileData } from '../../types/IProfileData'
import Button from '../../ui/button/Button'
import * as style from './Settings.module.scss'
import { useContext } from 'react'
import { MyData } from '../../components/data_provider/DataProvider'
import MailSvg from '../../assets/other/whiteMail.svg'

interface IdataSetting {
	data: IProfileData
}

function Settings({ data }: IdataSetting) {
	const navigate = useNavigate()
	const { setProfile } = useContext(MyData)

	async function out() {
		setProfile(null)
		try {
			const res = await logout()
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<>
			<div className={style.personInfo}>
				<div className={style.nameBlock}>
					<div className={style.ava}>{`${data.name[0].toLocaleUpperCase()} ${data.surname[0].toLocaleUpperCase()}`}</div>
					<div className={style.userData}>
						<span className={style.desc}>Имя Фамилия</span>
						<p className={style.name}>
							{data.name} {data.surname}
						</p>
					</div>
				</div>
				<div className={style.nameBlock}>
					<div className={style.ava}>
						<MailSvg className={style.icoMail} />
					</div>
					<div className={style.userData}>
						<span className={style.desc}>Электронная почта</span>
						<p className={style.mail}>{data.email}</p>
					</div>
				</div>
			</div>
			<Button
				blueMod={true}
				click={() => {
					out()
					navigate('/')
				}}
			>
				<span className={style.personInfoBtn}>Выйти из аккаунта</span>
			</Button>
		</>
	)
}

export default Settings
