
import {  Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
 

function App() {
  return (
   
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
             
            
          </Routes>
        </div>
      </div>
   
  );
}

export default App;
