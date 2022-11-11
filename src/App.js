import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
