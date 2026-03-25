import { IMove } from './IMove'

export interface ISearchMovie {
	movie: IMove
	closed: () => void
}
