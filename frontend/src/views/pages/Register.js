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
import React from 'react';

// reactstrap components
import { Card, CardHeader, CardBody, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import { Form, json, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { map } from 'jquery';

function Register() {
  return (
    <>
      <DemoNavbar />
      <main>
        <section className='section section-shaped section-lg'>
          <div className='shape shape-style-1 bg-gradient-default'>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className='pt-lg-7'>
            <Row className='justify-content-center'>
              <Col lg='5'>
                <Card className='bg-secondary shadow border-0'>
                  <CardHeader className='bg-white text-center'>
                    <img className='mb-3' alt='...' src={require('assets/img/brand/TonTon_blue.png')} style={{ width: '100px' }} />
                    <p className='m-0'>Please sign up to continue</p>
                  </CardHeader>
                  <CardBody className='px-lg-5 pb-lg-5 pt-lg-4'>
                    <div className='text-center text-muted mb-4'>
                      <small>Sign up with credentials</small>
                    </div>
                    <Form method='POST'>
                      <FormGroup>
                        <InputGroup className='input-group-alternative mb-3'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-hat-3' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder='Username' type='text' name='username' />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className='input-group-alternative mb-3'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-email-83' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder='Email' type='email' name='email' />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className='input-group-alternative'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-lock-circle-open' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder='Password' type='password' autoComplete='off' name='password' />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className='input-group-alternative'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-calendar-grid-58' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder='Date of birth' type='date' name='dob' />
                        </InputGroup>
                      </FormGroup>
                      <Row className='my-4'>
                        <Col xs='12'>
                          <div className='custom-control custom-control-alternative custom-checkbox'>
                            <input className='custom-control-input' id='customCheckRegister' type='checkbox' />
                            <label className='custom-control-label' htmlFor='customCheckRegister'>
                              <span>
                                I agree with the{' '}
                                <a href='#pablo' onClick={(e) => e.preventDefault()}>
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <div className='text-center'>
                        <button type='submit' className='mt-4 btn btn-primary btn-block' color='primary'>
                          Create account
                        </button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default Register;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    email: data.get('email'),
    password: data.get('password'),
    dob: data.get('dob'),
  };

  const response = await fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  const resData = await response.json();

  if (response.status === 422 || response.status === 400) {
    resData.errors.map((error) =>
      toast.error(error.msg, {
        position: 'bottom-right',
        autoClose: 2500,
      })
    );

    return resData;
  }

  if (!response.ok) {
    throw json({ message: 'Cannot register user' }, { status: 500 });
  }

  const token = resData.token;
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}
