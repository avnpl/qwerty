import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from 'next-themes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider attribute="class" defaultTheme="light">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
)
