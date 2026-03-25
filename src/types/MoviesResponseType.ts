import type { IMove } from './IMove.ts'

export type MoviesResponseType = {
	randomMovieData: IMove | undefined
	topMoviesData: IMove[] | []
}
