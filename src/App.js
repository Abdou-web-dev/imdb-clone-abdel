import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

// my tmdb api key : c611912a578da3c70cd0f51d4b6c2764
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* this the main page of the app */}
        <Route path="movie/:id" element={<Movie></Movie>} />
        {/* <Route path="/workouts" element={null} /> */}

        {/* <Route path="/*" element={<NoMatch />} /> */}
      </Routes>
    </div>
  );
}

export default App;
