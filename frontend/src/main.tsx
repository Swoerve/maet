import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import { StyledEngineProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import './index.css'
import Welcome from './components/welcome/welcome-page.tsx'
import Login from './components/login/login-page.tsx'
import Main from './components/main/Main.tsx'

const router = createBrowserRouter([
  {path: '/', element: <Welcome/>},
  {path: '/login', element: <Login/>},
  {path: '/main', element: <Main/>}
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <RouterProvider router={router}/>
    </StyledEngineProvider>
  </StrictMode>,
)
