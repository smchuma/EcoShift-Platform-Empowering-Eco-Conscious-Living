import { Route, Routes } from "react-router-dom";
import { Feed, Home, Login, Page404, Profile, Register } from "./pages";
import { RequireAuth, DashLayout } from "./components";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route element={<DashLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
