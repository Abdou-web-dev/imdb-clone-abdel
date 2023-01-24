import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

// my tmdb api key : c611912a578da3c70cd0f51d4b6c2764
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<Movie></Movie>} />
      </Routes>
    </div>
  );
}

export default App;
