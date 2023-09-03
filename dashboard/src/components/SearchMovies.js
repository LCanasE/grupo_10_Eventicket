import React, { useEffect, useState } from 'react';

// import noPoster from '../assets/images/no-poster.jpg';

function SearchMovies(){
	const [movies, setMovies] = useState([]);
	// console.log(setMovies);

	const apiKey = '42d726f2';
	const keyword = 'PELÍCULA DEMO';
	const endpoint = "https://www.omdbapi.com/?i=tt3896198&apikey=42d726f2"

	useEffect(() => {
		const fetchMovies = async (endpoint) => {
			const response = await fetch(endpoint);
			const data = await response.json();
			// const movies = await data.results;
			setMovies(data)
		}

		fetchMovies(endpoint);
	}, []);

	// const movies = [
	// 	{
	// 		"Title": "Parchís",
	// 		"Year": "1983",
	// 		"Poster": "https://m.media-amazon.com/images/M/MV5BYTgxNjg2MTAtYjhmYS00NjQwLTk1YTMtNmZmOTMyNTAwZWUwXkEyXkFqcGdeQXVyMTY5MDE5NA@@._V1_SX300.jpg"
	// 	},
	// 	{
	// 		"Title": "Brigada en acción",
	// 		"Year": "1977",
	// 		"Poster": "N/A"
	// 	},
	// ];

	


	return(
		<>
		{
			movies.length > 0 ? console.log('funciona'): console.log('no funcioan')
		}
		</>
	)
}

export default SearchMovies;
