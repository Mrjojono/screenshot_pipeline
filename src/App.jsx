import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bussiness_card from "./component/Bussiness_card.jsx";
import Musique from "./component/Musique.jsx"
import './App.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}  />
          <Route path="/card" element={<Bussiness_card/>}  />
          <Route path="/musique" element={<Musique/>}  />

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
