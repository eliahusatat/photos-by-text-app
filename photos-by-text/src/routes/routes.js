import { Route, Routes, BrowserRouter  } from "react-router-dom";

import SearchPage from "../pages/SearchPage/SearchPage";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<SearchPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
