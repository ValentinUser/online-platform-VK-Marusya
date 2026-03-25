import { useRouteError } from 'react-router-dom'
import * as style from './ErrorBoundary.module.scss'

function ErrorBoundary() {
	const error = useRouteError() as unknown as Error | null

	if (!error || !error.message) return null

	return (
		<div className={style.container}>
			<h1>Ошибка!</h1>
			<p>{error.message}</p>
		</div>
	)
}

export default ErrorBoundary
