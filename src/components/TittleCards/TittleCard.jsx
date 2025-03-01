import './TittleCard.css'
// import cards_data from '../../assets/cards/Cards_data'
import { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const TittleCard = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTAxNmE5YjNhYThlYjVkZGIyOGNjZGMyOGU5ZTllMSIsIm5iZiI6MTc0MDQ5MzA1OS40MTEsInN1YiI6IjY3YmRkMTAzZWY0YWUyOWRmYjJkYmM1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SafvPTFNqn0OpeEl61S5GARtfxI-CBSvxbnr2edumnA'
    }
  };
  


  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  },// eslint-disable-next-line react-hooks/exhaustive-deps
  [])


  return (
    <div className='tittlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TittleCard