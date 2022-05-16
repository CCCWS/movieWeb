import React from "react";
import { API_URL, API_KEY, IMG_URL } from "../config";

import "./Category.css";

function Category() {
    const getApi = async() => {
        
    }
  const movieGenre = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=ko`;
  const tvGenre = `${API_URL}genre/tv/list?api_key=${API_KEY}&language=ko`;

  return <div>Category</div>;
}

export default Category;
