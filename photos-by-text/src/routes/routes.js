import { Route, Routes, BrowserRouter  } from "react-router-dom";

import SearchPage from "../pages/SearchPage/SearchPage";
import SinglePhoto from "../pages/SinglePhoto/SinglePhoto";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<SearchPage />} />
            <Route  path="/singlePhoto" element={<SinglePhoto />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
