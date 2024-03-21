import { useEffect, useState } from "react";
import styled from "styled-components";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import { Link } from "react-router-dom";

const Random = () => {
  const [random, setRandom] = useState([]);

  const getRandomRecipes = async () => {
    const getData = localStorage.getItem("popular");

    if (getData) {
      setRandom(JSON.parse(getData));
    } else {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&number=10`
      );
      const data = await resp.json();
      setRandom(data.recipes);
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      console.log(data.recipes);
    }
  };

  useEffect(() => {
    getRandomRecipes();
  },);
  return (
    <Wrapper>
      <h3 className="text-3xl text-white font-semibold">
      Random {" "}
            <span className="text-yellow-500 font-bold">Picks</span>
      </h3>
      
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
          breakpoints: {
            1024: {
              perPage: 3,
            },
            767: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },
        }}
      >
        {random.map(({ title, id, image }) => (
          <SplideSlide key={id}>
            <div className="card w-100 h-80 bg-base-200 shadow-xl">
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
            
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0;
`;



export default Random;
