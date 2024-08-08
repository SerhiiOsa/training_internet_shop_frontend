import React, {useContext, useState} from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..' 

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Input your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Input your password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
          <Row className='d-flex align-items-center mt-3'>
            {
              isLogin ?
              <Col className='d-flex align-items-center'>
                Do not have an account?
                <NavLink to={REGISTRATION_ROUTE} style={{marginLeft: '5px'}}>Sign up!</NavLink>
              </Col> 
              :
              <Col className='d-flex align-items-center'>
                Do you have an account?
                <NavLink to={LOGIN_ROUTE} style={{marginLeft: '5px'}}>Sign in!</NavLink>
              </Col>
            }
            <Col className='d-flex justify-content-end'>
              <Button 
                variant='outline-success'
                onClick={click}
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;