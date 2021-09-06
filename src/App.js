import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './views/SearchPage';
import StockPage from './views/StockPage';
import SignUpPage from './views/SignUpPage';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import PortfolioPage from './views/PortfolioPage';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import { Container, Row } from 'react-bootstrap';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import WatchlistPage from './views/WatchlistPage';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const ApiUrl = process.env.REACT_APP_MY_API

function App() {
  const { data: { authenticated } } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()

  axios.defaults.withCredentials = true

  const refreshAuthLogic = failedRequest => axios.post(`${ApiUrl}/users/refreshToken`, {withCredentials: true}).then(tokenRefreshResponse => {
    console.log(tokenRefreshResponse)
    return Promise.resolve();
  });

  createAuthRefreshInterceptor(axios, refreshAuthLogic);


  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async () => {
    try {
      console.log("hello")
      const response = await axios.post(`${process.env.REACT_APP_MY_API}/users/checkAccessToken`)

      if (response.statusText === "OK") {
        console.log(response)

        dispatch({
          type: "SET_AUTHENTICATED",
          payload: true
        })
        dispatch({
          type: "SET_USER",
          payload: response.data
        })

      }
    } catch (error) {
      console.log(error)
      history.push("/login")
      dispatch({
        type: "SET_AUTHENTICATED",
        payload: false
      })
    }
  }

  return (

    <Switch>
      <Route path="/login" exact render={(routerProps) => <LoginPage routerProps={routerProps} />} />
      <Route path="/register" exact render={(routerProps) => <SignUpPage routerProps={routerProps} />} />

      <>
        <Container fluid className="app">
          <Row className="">
            {authenticated && <>
              <Banner />
              <Navbar />
              <Route path="/" exact render={(routerProps) => <HomePage routerProps={routerProps} />} />
              <Route path="/search" exact render={(routerProps) => <SearchPage routerProps={routerProps} />} />
              <Route path="/watchlists" exact render={(routerProps) => <WatchlistPage routerProps={routerProps} />} />
              <Route path="/portfolio" exact render={(routerProps) => <PortfolioPage routerProps={routerProps} />} />
              <Route path="/stock/:symbol" exact render={(routerProps) => <StockPage routerProps={routerProps} />} />
            </>
            }
          </Row>
        </Container>
      </>


    </Switch>



  );
}

export default withRouter(App);
