import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import ErrorPage from './pages/ErrorPage';
import PrivateOutlet from './components/PrivateOutlate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/admin/:nid" element={<AdminPage />}></Route>


        <Route path="/user/:nid" element={<UserPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
