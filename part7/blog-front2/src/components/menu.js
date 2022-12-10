/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './logout';

function Menu({ username }) {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" style={padding}>blogs</Nav.Link>
          <Nav.Link href="/users" style={padding}>users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand>
        {' '}
        <b>{username}</b>
        {' '}
        is logged in
        {' '}
        <Logout />
      </Navbar.Brand>
    </Navbar>
  );
}
export default Menu;
