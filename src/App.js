import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import KakaoCallback from "./pages/LoginModal/KakaoCallback";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/v1/oauth/kakao" element={<KakaoCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
