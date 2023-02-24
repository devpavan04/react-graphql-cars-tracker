import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, PersonPage } from './pages';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/person/:personID' element={<PersonPage />} />
      </Routes>
    </Router>
  );
};
