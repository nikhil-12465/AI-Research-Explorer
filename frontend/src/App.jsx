import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Documents from "./pages/Documents";
import Activity from "./pages/Activity";
import Query from "./pages/Query";
import TopicExplorer from "./pages/TopicExplorer";
import LiteratureReview from "./pages/LiteratureReview";
import ResearchGap from "./pages/ResearchGap";
import ComparePaper from "./pages/ComparePaper";
import Summarize from "./pages/Summarize";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
    path="/"
    element={<LandingPage />}
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
    path="/summarize"
    element={
        <ProtectedRoute>
            <Summarize />
        </ProtectedRoute>
    }
/>
        <Route
          path="/compare-papers"
          element={
              <ProtectedRoute>
                  <ComparePaper />
              </ProtectedRoute>
          }
      />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        />
        <Route
    path="/query"
    element={
        <ProtectedRoute>
            <Query />
        </ProtectedRoute>
    }
/>
<Route
    path="/topic"
    element={
        <ProtectedRoute>
            <TopicExplorer />
        </ProtectedRoute>
    }
/>
<Route
    path="/literature-review"
    element={
        <ProtectedRoute>
            <LiteratureReview />
        </ProtectedRoute>
    }
/>
<Route
    path="/research-gap"
    element={
        <ProtectedRoute>
            <ResearchGap />
        </ProtectedRoute>
    }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;