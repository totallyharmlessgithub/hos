import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Home } from './Pages/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { Search } from './Pages/Search';
import { Profile } from './Pages/Profile';
import { AddMoreClowns } from './Pages/AddMoreClowns';
import { EditMoreClowns } from './Pages/EditTheseClowns';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/search' element={<Search/>}/>
      <Route exact path='/profile' element={<Profile/>}/>
      <Route exact path='/addMoreClowns' element={<AddMoreClowns/>}/>
      <Route exact path='/editMoreClowns' element={<EditMoreClowns/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
