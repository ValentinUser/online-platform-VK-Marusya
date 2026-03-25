import * as style from './Footer.module.scss'
import Vk from '../../assets/footer_link_svg/vk.svg'
import Ok from '../../assets/footer_link_svg/ok.svg'
import Telegram from '../../assets/footer_link_svg/telegram.svg'
import Youtube from '../../assets/footer_link_svg/youtube.svg'
import { Link } from 'react-router-dom'

function Footer() {
	return (
		<footer>
			<div className={style.container}>
				<ul className={style.list}>
					<li>
						<Link
							to='https://vk.com'
							target='_blank'
							rel='noopener noreferrer'
							className={style.itemLink}
							aria-label='ссылка на контакт'
						>
							<Vk className={style.contactLink} />
						</Link>
					</li>
					<li>
						<Link
							to='https://youtube.com'
							target='_blank'
							rel='noopener noreferrer'
							className={style.itemLink}
							aria-label='ссылка на youtube'
						>
							<Youtube className={style.contactLink} />
						</Link>
					</li>
					<li>
						<Link
							to='https://ok.ru'
							target='_blank'
							rel='noopener noreferrer'
							className={style.itemLink}
							aria-label='ссылка на одноклассники'
						>
							<Ok className={style.contactLink} />
						</Link>
					</li>
					<li>
						<Link
							to='https://web.telegram.org'
							target='_blank'
							rel='noopener noreferrer'
							className={style.itemLink}
							aria-label='ссылка на telegram'
						>
							<Telegram className={style.contactLink} />
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
