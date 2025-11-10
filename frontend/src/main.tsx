import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import { StyledEngineProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import './index.css'
import Login from './login-page.tsx'
import Welcome from './welcome-page.tsx'

const router = createBrowserRouter([
  {path: '/', element: <Welcome/>},
  {path: '/login', element: <Login/>},
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <RouterProvider router={router}/>
    </StyledEngineProvider>
  </StrictMode>,
)
