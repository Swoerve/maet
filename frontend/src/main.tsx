import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import { StyledEngineProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import './index.css'
//import App from './App.tsx'
import Login from './login-page.tsx'
import Main from './components/main/Main.tsx'

const router = createBrowserRouter([
  {path: '/login', element: <Login/>},
  {path: '/', element: <Main/>}
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <RouterProvider router={router}/>
    </StyledEngineProvider>
  </StrictMode>,
)
