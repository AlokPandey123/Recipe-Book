import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${searchTerm}`);
  };

  return (
    <Form onSubmit={submitHandler}>
      <div className="navbar bg-base-100">
      
        <div className="flex-1">
        <h3 className="text-3xl text-white font-semibold">
        Recipe    {" "}
            <span className="text-yellow-500 font-bold m-1">Book</span>
      </h3>
          <div role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-20 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://pluspng.com/img-png/food-png-restaurant-food-dish-png-image-2951-443.png" />
              </div>
        </div>
        </div>
        
        <div className="flex-none gap-2">
          <div className="form-control">
            
            <input
              type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
        </div>
      </div>
    </Form>
  );
};

const Form = styled.form`
  
`;
export default Search;
