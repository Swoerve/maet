import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import { CssBaseline } from '@mui/material'
import './index.css'
import Welcome from './components/welcome/welcome-page.tsx'
import Login from './components/login/login-page.tsx'
import Main from './components/main/Main.tsx'
import Board from './components/board/board.tsx'
import Root from './components/Root/Root.tsx'
import Policy from './components/policy.tsx'

const theme = createTheme({
  colorSchemes: {
    dark: true,
  }
});

const router = createBrowserRouter([
  {index: true, element: <Welcome/>},
  {path: 'privacy', Component: Policy},
  {path: 'login', element: <Login/>},
  {path: 'main', Component: Root, children: [
    {index: true, Component: Main},
    {path: 'board/:board_id', Component: Board}
  ]},
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router}/>
        </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
)
