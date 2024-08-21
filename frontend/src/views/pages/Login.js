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

// reactstrap components
import { Card, CardHeader, CardBody, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
import { Form, Link, json, redirect, useActionData } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const response = useActionData();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (response) {
      setIsChanged(false);
    }
  }, [response]);

  const handleInputChange = () => {
    setIsChanged(true);
  };

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
                    <p className='m-0'>Please sign in to continue</p>
                  </CardHeader>
                  <CardBody className='px-lg-5 pb-lg-5 pt-lg-4'>
                    <div className='text-center text-muted mb-4'>
                      <small>Sign in with credentials</small>
                    </div>
                    <Form method='POST'>
                      <FormGroup className={response && !isChanged ? 'mb-3 has-danger' : 'mb-3'}>
                        <InputGroup className='input-group-alternative'>
                          <InputGroupAddon addonType='append'>
                            <InputGroupText>
                              <i className='ni ni-single-02' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input className={response && !isChanged ? 'has-danger' : ''} placeholder='Username' type='text' name='username' />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className={response && !isChanged ? 'has-danger' : ''}>
                        <InputGroup className='input-group-alternative'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-lock-circle-open' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input className={response && !isChanged ? 'is-invalid' : ''} placeholder='Password' type='password' name='password' autoComplete='off' onChange={handleInputChange} />
                        </InputGroup>
                      </FormGroup>
                      <div className='custom-control custom-control-alternative custom-checkbox'>
                        <input className='custom-control-input' id=' customCheckLogin' type='checkbox' />
                        <label className='custom-control-label' htmlFor=' customCheckLogin'>
                          <span>Remember me</span>
                        </label>
                      </div>
                      <div className='text-center d-flex flex-column'>
                        <button className='mt-4 mb-3 btn btn-primary btn-block' color='primary'>
                          Sign in
                        </button>
                        <p
                          onClick={() => {
                            toast('Login successfull!');
                          }}
                        >
                          or
                        </p>
                        <Link to='/signup'>
                          <small>Create new account</small>
                        </Link>
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

export default Login;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:5000/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    toast.error('Wrong username or password!', {
      position: 'bottom-right',
      autoClose: 1500,
    });
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Cannot authenticate user' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  toast.success('Signed In!', { position: 'bottom-right', autoClose: 2000, toastId: 'login-toast' });

  return redirect('/');
}
