import { useState } from 'react'
import './style.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Gallery from './pages/Gallery'
import Viewer from './pages/Viewer'
import AuthRegistration from './pages/Auth.registration'
import AuthLogin from './pages/Auth.login'
import ProtectedRoute from './protectedRoute/Protected.route'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <AuthLogin />
          } />
          <Route path="/registration" element={<AuthRegistration />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          } />
          <Route path="/viewer/:id" element={
            <ProtectedRoute>
              <Viewer />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
