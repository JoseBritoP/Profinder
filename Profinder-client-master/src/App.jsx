/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSessionState } from "./services/zustand/useSession";
import Categories from "./views/Categories/Categories";
import HomePage from "../src/views/HomePage/HomePage";
import FromProvider from "./views/FromProvider/FromProvider";
import HowDoesItWork from "../src/components/HowDoesItWork/HowDoesItWork";
import Footer from "./components/Footer/Footer";
import DetailSupplier from "./views/DetailsSupplier/DetailsSupplier";
import UserLogin from "./views/UserLogin/UserLogin";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserRegister from "./views/UserRegister/UserRegister.jsx";
import FormCliente from "./views/FormCliente/FormCliente.jsx";
import DashboardAdmin from "./views/DashboardAdmin/DashboardAdmin";
import DashboardSuppliers from "./views/DashboardSuppliers/Home/Home";
import DashboardClient from "./views/DashboardClient/DashboardClient/DashboardClient.jsx";
import FeedbackForm from "./components/Feedback/FormFeedback.jsx";
import LoggedNavbar from "./components/LoggedNavbar/LoggedNavbar.jsx";
import Navbar from "./components/navBar/Navbar";
import DashboardClientEditForm from "./views/DashboardClient/DashboarClientEditForm/DashboardClientEditForm";
import DashboardClientTopPro from "./views/DashboardClient/DashboardClientTopPro/DashboardClientTopPro";
import DashboardClientCategories from "./views/DashboardClient/DashboardClientCategories/DashboardClientCategories";
import DashboardClientFeedbackForm from "./views/DashboardClient/DashboardClientFeedbackForm/DashboardClientFeedbackForm";
import DashboardClientHelp from "./views/DashboardClient/DashboardClientHelp/DashboardClientHelp";
// import DashboardClientFavorite from "./views/DashboardClient/DashBoardClientFavorite/DashBoardClientFavorite";
import FormServicio from "../src/views/FormServicio/FormServicio";
import PasarelaPagos from "./views/PasarelaPagos/PasarelaPagos";
import PostsSuppliers from "./views/DashboardSuppliers/PostSuppliers/PostsSuppliers";
import CustomChatBot from "./components/CustomChatBot/CustomChatBot";
import SupplierPost from "./components/SupplierPost/SupplierPost";
import UpdatePost from "./views/DashboardSuppliers/UpdatePost/UpdatePost";
import FormUpdateProfile from "./views/DashboardSuppliers/formUpdateProfile/FormUpdateProfile";
import AboutUs from "./views/AboutUs/AboutUs";
import Certificates from "./views/DashboardSuppliers/Certificates/Certiificates";
import SupplierReview from "./components/SupplierPost/SuplierReview";
import AdminProtectedRoutes from "./router/AdminProtectedRoutes";
import SupplierProtectedRoutes from './router/SupplierProtectedRoutes'
import ClientProtectedRoutes from './router/ClientProtectedRoutes'

function App() {
  const setSessionState = useSessionState((state) => state.setSessionState);
  const session = useSessionState((state) => state.session);
  const location = useLocation();

  useEffect(() => {
    const userSession = window.localStorage.getItem("userSession");
    if (userSession) {
      const user = JSON.parse(userSession);
      setSessionState(user);
    }
  }, []);
  const isHomePage = location.pathname === "/";

  return (
    <div>
      {session.status ? <LoggedNavbar /> : <Navbar />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/feedback" element={<FeedbackForm />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/comofunciona" element={<HowDoesItWork />} />
        <Route exact path="/registerProvider" element={<FromProvider />} />
        <Route exact path="/registerCliente" element={<FormCliente />} />
        <Route exact path="/detail/:id" element={<DetailSupplier />} />
        <Route exact path="/detail/suplier1/:id" element={<SupplierReview />} />
        <Route exact path="/detail/suplier2/:id" element={<SupplierPost />} />
        <Route exact path="/userLogin" element={<UserLogin />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/userRegister" element={<UserRegister />} />

        <Route element={<AdminProtectedRoutes />}>
          <Route
            exact
            path="/dashboardAdmin/manageClient"
            element={<DashboardAdmin />}
          />
          <Route
            exact
            path="/dashboardAdmin/manageProfesional"
            element={<DashboardAdmin />}
          />
          <Route
            exact
            path="/dashboardAdmin/managePost"
            element={<DashboardAdmin />}
          />
        </Route>

        {/* Dash Profesional */}
        <Route element={<SupplierProtectedRoutes />}>
          <Route
            exact
            path="/dashboardSuppliers"
            element={<DashboardSuppliers />}
          />
          <Route
            exact
            path="/dashboardSuppliers/publicaciones"
            element={<FormServicio />}
          />
          <Route
            exact
            path="dashboardSuppliers/updateprofile/:id"
            element={<FormUpdateProfile />}
          />
          <Route
            exact
            path="/dashboardSuppliers/pasarela"
            element={<PasarelaPagos />}
          />
          <Route
            exact
            path="/dashboardSuppliers/nuevas-publicaciones"
            element={<PostsSuppliers />}
          />
          <Route
            exact
            path="/dashboardSuppliers/help"
            element={<CustomChatBot />}
          />
          <Route
            exact
            path="/dashboardSuppliers/updatepost/:id"
            element={<UpdatePost />}
          />
          <Route
            exact
            path="/dashboardSuppliers/certificados"
            element={<Certificates />}
          />
        </Route>

        <Route element={<ClientProtectedRoutes />}>
          <Route
            exact
            path="/dashboardClient"
            element={<DashboardClient />}
          />
          <Route
            exact
            path="/dashboardClient/editForm"
            element={<DashboardClientEditForm />}
          />
          <Route
            exact
            path="/dashboardClient/recomended"
            element={<DashboardClientTopPro />}
          />
          {/* <Route
            exact
            path="/dashboardClient/favorites"
            element={<DashboardClientFavorite />}
          /> */}
          <Route
            exact
            path="/dashboardClient/categories"
            element={<DashboardClientCategories />}
          />
          <Route
            exact
            path="/dashboardClient/feedbackform"
            element={<DashboardClientFeedbackForm />}
          />{" "}
          exact
          <Route
            exact
            path="/dashboardClient/help"
            element={<DashboardClientHelp />}
          />
        </Route>
        <Route
          path='*'
          element={<Navigate to='/' />}
        />

      </Routes>
      {!isHomePage && <Footer />}
    </div>
  );
}

export default App;
