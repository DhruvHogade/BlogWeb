import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogCreate from './components/BlogCreate';
import Home from './components/Home';
import Blogs from './components/Blogs';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="blogcreate" element={
              <ProtectedRoute>
              <BlogCreate />
              </ProtectedRoute>} 
              />
            <Route path="blog" element={
              <ProtectedRoute>
              <Blogs />
              </ProtectedRoute>
              } />
            <Route path="profile" element={
              <ProtectedRoute>
              <Profile />
              </ProtectedRoute>
              } />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;