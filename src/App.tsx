import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import loadable from '@loadable/component';
import { AppConfig } from './AppConfig';
import MasterLayout from './layout/Master';
import Auth from './components/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = loadable(() => import('./pages/home'));
const Products = loadable(() => import('./pages/products'));
const Login = loadable(() => import('./pages/login'));
const Search = loadable(() => import('./pages/search'));
const Cart = loadable(() => import('./pages/carts'));
const Single = loadable(() => import('./pages/singleproduct'));

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1000} />
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense fallback={<></>}>
          <Routes>
            {/* <Route
							path="*"
							element={<NotFound />}
						/>
						<Route
							path="/layout-guard-roles"
							element={<NotAuthorized />}
						/> */}

            <Route
              path="/home"
              element={
                <Navigate
                  replace
                  to="/"
                />
              }
            />
            <Route
              path="/"
              element={
                <MasterLayout>
                  <Home />
                </MasterLayout>
              }
            />
            <Route
              path="/products/*"
              element={
                <MasterLayout>
                  <Products />
                </MasterLayout>
              }
            />
            <Route
              path="/singleproduct/:id"
              element={
                <MasterLayout>
                  <Single />
                </MasterLayout>
              }
            />
            <Route
              path="/products/:type/:detail"
              element={
                <MasterLayout>
                  <Products />
                </MasterLayout>
              }
            />
            <Route
              path="/search"
              element={
                <MasterLayout>
                  <Search />
                </MasterLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <MasterLayout>
                  <Auth>
                    <Cart />
                  </Auth>
                </MasterLayout>
              }
            />
            <Route
              path="/login"
              element={
                <MasterLayout>
                  <Login />
                </MasterLayout>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
