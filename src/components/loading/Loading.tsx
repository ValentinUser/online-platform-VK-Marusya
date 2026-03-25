import * as style from './Loading.module.scss'

function Loading() {
	return (
		<div className={style.container}>
			<div className={style.loaderBox}>
				<div className={style.loader}></div>
			</div>
		</div>
	)
}

export default Loading
