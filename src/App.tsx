import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import ErrorBoundary from './components/error/ErrorBoundary'
import fetchToHome from './api/fetchToHome'
import ErrorPage from './pages/Error_page/ErrorPage'
import FilmGenres from './pages/film_genres/FilmGenres'
import Layout from './components/layout/Layout'
import MoviePage from './pages/movie_page/MoviePage'
import fetchForPageGenre from './api/fetchForPageGenre'
import MoviesOfGenre from './pages/movies_of_genre/MoviesOfGenre'
import fetchMovieOfGenre from './api/fetchMovieOfGenre'
import Profile from './pages/profile/Profile'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
				loader: fetchToHome,
				errorElement: <ErrorBoundary />,
			},
			{
				path: '/filmGenres',
				element: <FilmGenres />,
				loader: fetchForPageGenre,
				errorElement: <ErrorBoundary />,
			},
			{
				path: '/moviePage',
				element: <MoviePage />,
			},
			{
				path: '/moviesOfGenre',
				element: <MoviesOfGenre />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '*',
				element: <ErrorPage></ErrorPage>,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
