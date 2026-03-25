import * as style from './ErrorPage.module.scss'

function ErrorPage() {
	return (
		<div className={style.container}>
			<div className={style.message}>
				<h1>Error 404</h1>
				<p>Страница не существует</p>
			</div>
		</div>
	)
}

export default ErrorPage
