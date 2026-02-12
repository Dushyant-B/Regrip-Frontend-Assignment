import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BoardPage from "./pages/BoardPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
