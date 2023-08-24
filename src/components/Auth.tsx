import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const Auth: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const tokenUser = localStorage.getItem('userToken');

  if (!tokenUser) {
    return <Navigate to="/login" />;
  } else {
    return children as ReactElement;
  }
};
export default Auth;
