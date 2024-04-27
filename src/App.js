import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketList from './components/TicketList';
import './styles/main.css';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Маршрут для главной страницы */}
          <Route path="/" element={<TicketList />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
