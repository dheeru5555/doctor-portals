// imports
import axios from 'axios';
import React from 'react';
import history from '../utils/history';

class API extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // coreUri: 'http://13.126.160.234/oaarogya-admin-test/api/doctor/',
      // mUri: 'http://13.126.160.234/oaarogya-admin-test/api/masterdata',
      coreUri: 'http://103.86.177.208/oaarogya-admin-backend/api/doctor/',
      mUri: 'http://103.86.177.208/oaarogya-admin-backend/api/masterdata',
    };
  }

  CORE_URI = () => {
    const { coreUri } = this.state;
    return axios.create({
      baseURL: coreUri,
    });
  }

  ACCOUNTS_URI = () => {
    const { coreUri } = this.state;

    const userInfoInLocalStorage = localStorage.getItem('userInfo');
    const parsedUserInfo = JSON.parse(userInfoInLocalStorage);

    let bearerToken = '';

    if ((parsedUserInfo !== null)
      && parsedUserInfo.hashedKey
      && (parsedUserInfo.hashedKey.length > 0)) {
      bearerToken = parsedUserInfo.hashedKey;
    } else {
      history.push('/');
    }

    return axios.create({
      baseURL: coreUri,
      headers: { Authorization: `Bearer ${bearerToken}` }
    });
  }

  MASTER_URI = () => {
    const { mUri } = this.state;

    const userInfoInLocalStorage = localStorage.getItem('userInfo');
    const parsedUserInfo = JSON.parse(userInfoInLocalStorage);

    let bearerToken = '';

    if ((parsedUserInfo !== null)
      && parsedUserInfo.hashedKey
      && (parsedUserInfo.hashedKey.length > 0)) {
      bearerToken = parsedUserInfo.hashedKey;
    }

    return axios.create({
      baseURL: mUri,
      headers: { Authorization: `Bearer ${bearerToken}` }
    });
  }
}

export default API;
