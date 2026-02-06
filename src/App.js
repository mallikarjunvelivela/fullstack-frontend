import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Footer from './layout/Footer';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import AllUsers from './users/AllUsers';
import Account from './pages/Account';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext'; 
import IdleTimeoutModal from './components/IdleTimeoutModal';

const AppRoutes = () => {
  const { auth } = useContext(AuthContext); 

  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/signin' element={<AddUser/>}/>
      <Route exact path='/account' element={auth.user ? <Account/> : <Navigate to="/signin" />}/>
      <Route exact path='/edituser/:id' element={auth.user ? <EditUser/> : <Navigate to="/signin" />}/>
      <Route exact path='/viewuser/:id' element={auth.user ? <ViewUser/> : <Navigate to="/signin" />}/>
      <Route exact path='/allusers' element={auth.user && auth.user.role === 'Admin' ? <AllUsers/> : (auth.user ? <Navigate to="/" /> : <Navigate to="/signin" />)}/>
    </Routes>
  );
};

function App() {
  const { isIdle, countdown, handleContinueSession, handleSignOut } = useContext(AuthContext);

  return (
    <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Router>
        <Navbar/>
        <AppRoutes />
        <IdleTimeoutModal show={isIdle} onContinue={handleContinueSession} onSignOut={handleSignOut} countdown={countdown} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;