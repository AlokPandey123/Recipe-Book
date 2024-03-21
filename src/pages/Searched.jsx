import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const parmas = useParams();

  const getSearchedRecipes = async (search) => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&query=${search}`
    );
    const data = await resp.json();

    return data.results;
  };

  useEffect(() => {
    let isMounted = true;
    getSearchedRecipes(parmas.search).then((data) => {
      if (isMounted) setSearchedRecipes(data);
    });

    return () => {
      isMounted = false;
    };
  }, [parmas.search]);
  return (
    <Grid>
      {searchedRecipes.map(({ title, id, image }) => (
        <div className="card w-100 h-80 bg-base-200 shadow-xl" key={id}>
        <figure className="px-10 pt-10">
          <img src={image} alt={title} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <Link to={`/recipe/${id}`}>
          <div className="card-actions">
            <button className="btn btn-primary">View Details</button>
          </div></Link>

        </div>
      </div>
        
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  text-align: center;
  gap: 3rem;
`;


export default Searched;
