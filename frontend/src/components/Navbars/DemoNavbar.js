/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
import { Link, useRouteLoaderData, useSubmit, NavLink } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import { Button, UncontrolledCollapse, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Media, NavbarBrand, Navbar, NavItem, Nav, Container, Row, Col, UncontrolledTooltip } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { getTokenPayload } from 'util/auth';

function DemoNavbar() {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();
  const [username, setUsername] = useState('');

  useEffect(() => {
    let headroom = new Headroom(document.getElementById('navbar-main'));
    // initialise
    headroom.init();

    if (token) {
      const tokenPayload = getTokenPayload(token);
      setUsername(tokenPayload.username);
    }
  }, [token]);

  const [collapseClasses, setCollapseClasses] = useState('');
  // const [collapseOpen, setCollapseOpen] = useState(false);

  const onExiting = () => {
    setCollapseClasses('collapsing-out');
  };

  const onExited = () => {
    setCollapseClasses('');
  };

  const handleSignOut = () => {
    submit(null, { action: '/logout', method: 'post' });
  };

  return (
    <>
      <header className='header-global'>
        <Navbar className='navbar-main navbar-transparent navbar-light headroom' expand='lg' id='navbar-main'>
          <Container>
            <NavbarBrand className='mr-lg-5 mb-2' to='/' tag={Link}>
              <img alt='...' src={require('assets/img/brand/TonTon_white.png')} />
            </NavbarBrand>
            <button className='navbar-toggler' id='navbar_global'>
              <span className='navbar-toggler-icon' />
            </button>
            <UncontrolledCollapse toggler='#navbar_global' navbar className={collapseClasses} onExiting={onExiting} onExited={onExited}>
              <div className='navbar-collapse-header'>
                <Row>
                  <Col className='collapse-brand' xs='6'>
                    <Link to='/'>
                      <img alt='...' src={require('assets/img/brand/argon-react.png')} />
                    </Link>
                  </Col>
                  <Col className='collapse-close' xs='6'>
                    <button className='navbar-toggler' id='navbar_global'>
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className='navbar-nav-hover align-items-lg-center' navbar>
                <NavItem>
                  <NavLink className='nav-link' to='/'>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/films'>
                    Films
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/recommend'>
                    Recommend
                  </NavLink>
                </NavItem>
                {/* <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className='ni ni-ui-04 d-lg-none mr-1' />
                    <span className='nav-link-inner--text'>Components</span>
                  </DropdownToggle>
                  <DropdownMenu className='dropdown-menu-xl'>
                    <div className='dropdown-menu-inner'>
                      <Media className='d-flex align-items-center' href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar' target='_blank'>
                        <div className='icon icon-shape bg-gradient-primary rounded-circle text-white'>
                          <i className='ni ni-spaceship' />
                        </div>
                        <Media body className='ml-3'>
                          <h6 className='heading text-primary mb-md-1'>Getting started</h6>
                          <p className='description d-none d-md-inline-block mb-0'>Learn how to use Argon compiling Scss, change brand colors and more.</p>
                        </Media>
                      </Media>
                      <Media className='d-flex align-items-center' href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar' target='_blank'>
                        <div className='icon icon-shape bg-gradient-success rounded-circle text-white'>
                          <i className='ni ni-palette' />
                        </div>
                        <Media body className='ml-3'>
                          <h6 className='heading text-primary mb-md-1'>Foundation</h6>
                          <p className='description d-none d-md-inline-block mb-0'>Learn more about colors, typography, icons and the grid system we used for Argon.</p>
                        </Media>
                      </Media>
                      <Media className='d-flex align-items-center' href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar' target='_blank'>
                        <div className='icon icon-shape bg-gradient-warning rounded-circle text-white'>
                          <i className='ni ni-ui-04' />
                        </div>
                        <Media body className='ml-3'>
                          <h5 className='heading text-warning mb-md-1'>Components</h5>
                          <p className='description d-none d-md-inline-block mb-0'>Browse our 50 beautiful handcrafted components offered in the Free version.</p>
                        </Media>
                      </Media>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className='ni ni-collection d-lg-none mr-1' />
                    <span className='nav-link-inner--text'>Examples</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem to='/landing-page' tag={Link}>
                      Landing
                    </DropdownItem>
                    <DropdownItem to='/profile-page' tag={Link}>
                      Profile
                    </DropdownItem>
                    <DropdownItem to='/login-page' tag={Link}>
                      Login
                    </DropdownItem>
                    <DropdownItem to='/register-page' tag={Link}>
                      Register
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>
              <div className='ml-lg-auto'>
                {!token && (
                  <NavItem className='d-none d-lg-block ml-lg-4'>
                    <Link to='/signin'>
                      <Button className='btn-neutral' color='default'>
                        Sign In
                      </Button>
                    </Link>
                    <Link to='/signup' className='ml-2'>
                      <Button className='btn-outline-info' color='default'>
                        Sign Up
                      </Button>
                    </Link>
                  </NavItem>
                )}
                {token && (
                  <Nav className='navbar-nav-hover align-items-lg-center' navbar>
                    <UncontrolledDropdown nav>
                      <DropdownToggle className='d-flex justify-content-center align-items-center' nav>
                        <i className='fa fa-user-circle' style={{ fontSize: '1.5rem' }} />
                        <span className='nav-link-inner--text'>{username || ''}</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className='d-flex justify-content-start align-items-center' to='/my-profile' tag={Link}>
                          <i className='fa fa-user-o mr-2' />
                          <span>Profile</span>
                        </DropdownItem>
                        <DropdownItem className='d-flex justify-content-start align-items-center' to='/my-watched-list' tag={Link}>
                          <i class='fa-solid fa-film mr-2'></i>
                          <span>My Watched List</span>
                        </DropdownItem>
                        <DropdownItem onClick={handleSignOut} className='d-flex justify-content-start align-items-center text-danger' tag={Link}>
                          <i className='fa fa-power-off mr-2' />
                          <span>Sign Out</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                )}
              </div>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default DemoNavbar;
