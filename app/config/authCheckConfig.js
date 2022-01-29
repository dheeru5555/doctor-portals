
export default function beartocken() {
  const userInfoInLocalStorage = localStorage.getItem('userInfo');
  const parsedUserInfo = JSON.parse(userInfoInLocalStorage);
  let bearerToken = '';
  if ((parsedUserInfo !== null)
    && parsedUserInfo.hashedKey
    && (parsedUserInfo.hashedKey.length > 0)) {
    bearerToken = parsedUserInfo.hashedKey;
  }
  return bearerToken;
}



/* export default {
  bearerToken,
  header: { Authorization: `Bearer ${bearerToken}` }
}; */


