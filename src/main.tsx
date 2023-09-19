import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './hooks/useAuth'
import AppRoutes from './routes/Routes'
import GlobalStyle from './styles/global'
import { theme } from './styles/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        <GlobalStyle />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
