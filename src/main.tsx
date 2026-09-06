import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import { AppProvider } from './context/AppContext'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { ActivityDetailPage } from './pages/ActivityDetailPage'
import { CreatePage } from './pages/CreatePage'
import { CreationsPage } from './pages/CreationsPage'
import { HomePage } from './pages/HomePage'
import { InfoPage } from './pages/InfoPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProgressPage } from './pages/ProgressPage'
import { SettingsPage } from './pages/SettingsPage'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><ErrorBoundary><BrowserRouter><AppProvider><Routes><Route element={<Layout />}><Route path="/" element={<HomePage />} /><Route path="/activities" element={<ActivitiesPage />} /><Route path="/activity/:id" element={<ActivityDetailPage />} /><Route path="/create/:id" element={<CreatePage />} /><Route path="/creations" element={<CreationsPage />} /><Route path="/progress" element={<ProgressPage />} /><Route path="/settings" element={<SettingsPage />} /><Route path="/about" element={<InfoPage />} /><Route path="/privacy" element={<InfoPage />} /><Route path="/safety" element={<InfoPage />} /><Route path="/help" element={<InfoPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes></AppProvider></BrowserRouter></ErrorBoundary></StrictMode>,
)
