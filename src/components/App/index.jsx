import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useStore from '@/store';
import Home from '../Home';
import Menu from '../Menu';
import Login from '../Login';
import Video from '../Video';
import ProtectedRoute from '../../containers/ProtectedRoute';

const App = () => {
  const init = useStore((state) => state.init);
  useEffect(() => {
    init();
  }, []); // eslint-disable-line

  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/video"
              element={
                <ProtectedRoute>
                  <Video />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
