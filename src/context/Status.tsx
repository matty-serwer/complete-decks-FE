import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Account';

const Status = () => {
  const [status, setStatus] = useState(false);

  const { getSession } = useContext(AccountContext)

  useEffect(() => {
    getSession().then((session: any) => {
      console.log("Session: ", session);
      setStatus(true);
    })
  }, []);

  return <div>{status ? "You are logged in" : "Please login"}</div>
}

export default Status

