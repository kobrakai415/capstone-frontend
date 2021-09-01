import React, { useState } from 'react';
import { Col, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { login, setAuthenticated, setUser } from '../redux/actions';
import axios from 'axios';


const ApiUrl = process.env.REACT_APP_MY_API

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    setAuthenticated: (boolean) => dispatch(setAuthenticated(boolean))
})

const LoginPage = ({ routerProps: { history }, loginUser, setUser, setAuthenticated }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = async (e) => {
        e.preventDefault()
        try {

            const details = {
                email: email,
                password: password,
            };

            const res = await axios.post(`${ApiUrl}/users/login`, details, { withCredentials: true })
            if (res.statusText === "OK") {
                setAuthenticated(true)
                setUser(res.data)
                console.log(res.data)
                history.push("/")

            } else {
                alert("Wrong credentials, try again!");
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >

            <Col md={4} >
                <Form onSubmit={(e) => login(e)} className='register-form p-md-5 p-4'>
                    <h3>Sign in</h3>
                    <Form.Group className='mb-3' controlId='username'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            placeholder='Enter email'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            placeholder='Enter password'
                        />
                    </Form.Group>

                    <Button type="submit" variant='primary'>
                        Login
                    </Button>
                    <Link to="/register">
                        <Button

                            className='ms-3'
                            variant='primary'
                            type='button'>
                            SignUp
                        </Button>
                    </Link>
                </Form>
            </Col>

        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
