import { Route, Routes } from "react-router-dom";
import {
  Challenge,
  Home,
  Login,
  Page404,
  Post,
  ProfilePage,
  Register,
} from "./pages";
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
            <Route path="/post" element={<Post />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
