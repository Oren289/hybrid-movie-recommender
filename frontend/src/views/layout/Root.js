import DemoNavbar from 'components/Navbars/DemoNavbar';
import React, { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { getTokenDuration } from 'util/auth';

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <DemoNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
