import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BoardModal from "./pages/BoardModal/BoardModal";
import CreateService from "./pages/BoardCreateModal/CreateService";
import KakaoCallback from "./pages/LoginModal/KakaoCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/new" element={<CreateService />} />
        <Route path="/board/:boardId" element={<BoardModal />} />
        <Route path="/login" element={<KakaoCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
