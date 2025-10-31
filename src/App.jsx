import React from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Candidates from './pages/Candidates'
import JobProfile from './pages/JobProfile';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CandidateProfile from './pages/CandidateProfile'
import { useState } from 'react'
import Kanban from './pages/Kanban'
import Assessments from './pages/Assessments'
const App = () => {
  
  return (
      <div>It works!</div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="/jobs/:jobId/profile" element={<JobProfile />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="candidates/:id" element={<CandidateProfile />} />
          <Route path="kanban" element={<Kanban />} /> {/* Replace with real Kanban page */}
          <Route path="assessments" element={<Assessments />} />
        </Route>
      </Routes>
    
  )
}

export default App
