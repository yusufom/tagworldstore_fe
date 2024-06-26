import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useActivateAccountMutation } from '../../store/apiSlice/authApiSlice';
import { errorToast, successToast } from '../../helpers/toast';

const ActivateAccount = () => {
  const location = useLocation();

  const [activateAccount, { isLoading }] = useActivateAccountMutation();



  // Function to get URL parameters
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const uid = queryParams.get('uid');
    const token = queryParams.get('token');

    if (uid && token) {
      // Make a request to the activation endpoint
      activateAccount({ uid: uid, token: token }).unwrap().then(() => {
        window.location.href = '/login-register';
        successToast("Account activated successfully, Please proceed to login")
      }).catch(() => {
        window.location.href =  '/';
        errorToast("Account activation failed, Please try again later")
      });
    }
  }, [location, activateAccount]);

  return (
    <div>
      <h1>Activating your account...</h1>
    </div>
  );
};

export default ActivateAccount;