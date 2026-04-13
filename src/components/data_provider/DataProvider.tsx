import { createContext, useState } from 'react'
import { IMove } from '../../types/IMove'
import { IMyDataValue } from '../../types/MyDataValueType'
import { DataProviderProps } from '../../types/DataProviderProps'

const initialState: IMove = {
	id: undefined,
	title: '',
	language: '',
	releaseYear: 0,
	genres: [],
	plot: '',
	runtime: 0,
	budget: null,
	revenue: null,
	posterUrl: '',
	backdropUrl: null,
	trailerUrl: '',
	trailerYouTubeId: '',
	tmdbRating: 0,
	director: '',
	production: null,
	awardsSummary: null,
}

export const MyData = createContext<IMyDataValue | undefined>(undefined)

function DataProvider({ children }: DataProviderProps) {
	const [dataMovie, setDataMovie] = useState(initialState)
	const [isModal, setIsModal] = useState(false)
	const [fullListMovie, setFullListMovie] = useState(null)
	const [profile, setProfile] = useState(null)
	const [favorites, setFavorites] = useState(null)

	return (
		<MyData.Provider
			value={{
				dataMovie,
				setDataMovie,
				fullListMovie,
				setFullListMovie,
				isModal,
				setIsModal,
				profile,
				setProfile,
				favorites,
				setFavorites,
			}}
		>
			{children}
		</MyData.Provider>
	)
}

export default DataProvider
