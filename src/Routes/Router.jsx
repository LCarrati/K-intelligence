import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../Pages/LoginPage/LoginPage"
import SignupPage from "../Pages/SignupPage/SignupPage"
import DashboardPage from "../Pages/DashboardPage/DashboardPage"
import PublicPage from "../Pages/PublicPage/PublicPage"
import CongratsPage from "../Pages/CongratsPage/CongratsPage"

const Router = () => {
  return (
    <BrowserRouter basename="/linktree">
        <Routes>
            <Route path="login" element={<LoginPage/>} />
            <Route path="/" element={<LoginPage/>} />
            <Route path="register" element={<SignupPage />} />
            <Route path="links/:userNickname" element={<PublicPage />} />
            <Route path="congrats" element={<CongratsPage />} />
            <Route path="dashboard/:username" element={<DashboardPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router