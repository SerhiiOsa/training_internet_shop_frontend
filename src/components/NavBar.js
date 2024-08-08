import React, { useContext } from 'react';
import { Context } from '..';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { logout } from '../http/userApi';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleClickAdmin = () => {
    navigate(ADMIN_ROUTE);
  }

  const handleClickBasket = () => {
    navigate(BASKET_ROUTE);
  }

  const handleSignOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    logout();
  } 
  
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid style={{ padding: "0 20px" }}>
        <NavLink to={SHOP_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
          Buy product
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            { 
              user.user.role === 'ADMIN'
              &&
              <Button 
                variant="outline-light"
                style={{ marginRight: '10px' }}
                onClick={handleClickAdmin}
              >
                Admin dashboard
              </Button>
            }
              <Button
                variant="outline-light"
                style={{ marginRight: '10px' }}
                onClick={handleClickBasket}
              >
              Basket
            </Button>
            <Button
              variant="outline-light"
              onClick={handleSignOut}
            >
              Log out
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button 
              variant="outline-light"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Authorization</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;