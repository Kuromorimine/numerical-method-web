import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GraphicalPage from './pages/GraphicalPage.jsx'
import BisectionPage from './pages/BisectionPage.jsx'
import FalsepositionPage from './pages/FalsepositionPage.jsx'
import OnepointPage from './pages/OnepointPage.jsx'
import NewtonraphsonPage from './pages/NewtonraphsonPage.jsx'
import SecantPage from './pages/SecantPage.jsx'
import CramerRulePage from './pages/CramerRulePage.jsx'
import NewtonDividedPage from './pages/NewtonDividedPage.jsx'
import LangangePage from './pages/LangangePage.jsx'
import SplinePage from './pages/SplinePage.jsx'
import LinearPage from './pages/LinearPage.jsx'
import PolynomialRegressionPage from './pages/PolynomialRegressionPage.jsx'
import TrapezoidalPage from './pages/TrapezoidalPage.jsx'
import CompositeTrapezoidalPage from './pages/CompositeTrapezoidalPage.jsx'
import SimpsonPage from './pages/SimpsonPage.jsx'
import CompositeSimpsonPage from './pages/CompositeSimpsonPage.jsx'
import GaussPage from './pages/GaussPage.jsx'
import GaussJordanPage from './pages/GaussJordanPage.jsx'
import MatrixInversionPage from './pages/MatrixInversionPage.jsx'
import LUPage from './pages/LUPage.jsx'
import JacobiPage from './pages/JacobiPage.jsx'
import GaussSeidelPage from './pages/GaussSeidelPage.jsx'
import ConjugateGradient from './components/AXB/ConjugateGradient.jsx'
import ConjogateGradientPage from './pages/ConjugateGradientPage.jsx'
const router=createBrowserRouter([
  {path:"/",element:<Home/>},
  {path:"/graphical",element:<GraphicalPage/>},
  {path:"/bisection",element:<BisectionPage/>},
  {path:"/falseposition",element:<FalsepositionPage/>},
  {path:"/onepoint",element:<OnepointPage/>},
  {path:"/newtonraphson",element:<NewtonraphsonPage/>},
  {path:"/secant",element:<SecantPage/>},
  {path:"/cramer",element:<CramerRulePage/>},
  {path:"/gauss",element:<GaussPage/>},
  {path:"/gaussjordan",element:<GaussJordanPage/>},
  {path:"/matrixinversion",element:<MatrixInversionPage/>},
  {path:"/lu",element:<LUPage/>},
  {path:"/jacobi",element:<JacobiPage/>},
  {path:"/gaussseidel",element:<GaussSeidelPage/>},
  {path:"/conjugategradient",element:<ConjogateGradientPage/>},
  {path:"/newtondivided",element:<NewtonDividedPage />},
  {path:"/langange",element:<LangangePage />},
  {path:"/spline",element:<SplinePage />},
  {path:"/linear",element:<LinearPage />},
  {path:"/polynomial",element:<PolynomialRegressionPage />},
  {path:"/trapezoidal",element:<TrapezoidalPage />},
  {path:"/compositetrapezoidal",element:<CompositeTrapezoidalPage/>},
  {path:"/simpson",element:<SimpsonPage/>},
  {path:"/compositesimpson",element:<CompositeSimpsonPage/>}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
)
