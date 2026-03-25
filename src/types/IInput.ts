export interface IInput {
	type: string
	name: string
	placeholder: string
	svg: 'user' | 'mail' | 'password'
	error?: string | undefined
}
