import { IMove } from './IMove'
import { IProfileData } from './IProfileData'

export interface MyDataValueType {
	dataMovie: IMove | null
	setDataMovie: React.Dispatch<React.SetStateAction<IMove>>
	fullListMovie: IMove[] | null
	setFullListMovie: React.Dispatch<React.SetStateAction<IMove[] | null>>
	isModal: boolean
	setIsModal: React.Dispatch<React.SetStateAction<boolean>>
	profile: IProfileData | null
	setProfile: React.Dispatch<React.SetStateAction<IProfileData | null>>
	favorites: IMove[] | null
	setFavorites: React.Dispatch<React.SetStateAction<IMove[] | null>>
}
