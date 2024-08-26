import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import FormCreator from './FormCreator';
import FormDetail from './FormDetail';
import FormBuilder from './FormBuilder ';
import FormDisplay from './FormDisplay';
import DisplayFormData from './DisplayFormData';

function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<FormBuilder/>} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<FormCreator />} />
        <Route path="/detail/:id" element={<FormDetail />} />
        <Route path='/form-display' element={ <FormDisplay/>} />
        <Route path="/display" element={<DisplayFormData/>} />
      </Routes>
    </Router>
  );
}

export default App;
