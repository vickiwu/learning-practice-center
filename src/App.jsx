import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getModuleByPath } from "./data/modules";
import HomePage from "./pages/HomePage";
import PlaceholderPage from "./pages/PlaceholderPage";
import VerticalCalcPage from "./pages/VerticalCalcPage";

export default function App() {
  const location = useLocation();
  const currentModule = getModuleByPath(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vertical-calc" element={<VerticalCalcPage />} />
      <Route
        path="/literacy"
        element={<PlaceholderPage module={currentModule} />}
      />
      <Route
        path="/poetry"
        element={<PlaceholderPage module={currentModule} />}
      />
      <Route
        path="/english-words"
        element={<PlaceholderPage module={currentModule} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
