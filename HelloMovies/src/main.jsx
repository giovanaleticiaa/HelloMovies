import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Logo from './Logo.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Logo} />
        <Route path='/app' Component={App} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
