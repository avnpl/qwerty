import { ThemeProvider } from 'next-themes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider attribute="class" enableSystem={true}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
)
