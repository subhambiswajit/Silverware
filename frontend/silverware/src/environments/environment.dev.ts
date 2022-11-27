// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBuFCG7LAjhRx1oJBCpf8aZqd2CjSeXhzc",
    authDomain: "silverware-2315e.firebaseapp.com",
    projectId: "silverware-2315e",
    storageBucket: "silverware-2315e.appspot.com",
    messagingSenderId: "840383312064",
    appId: "1:840383312064:web:bf50c1c0d04de3f9a83d25",
    measurementId: "G-7KT90GFH61"
  },
  apiServer: 'https://backend-yopxzgdubq-uc.a.run.app',
  apiUrls: {
    registerUser: '/users/register/',
    loginUser: '/signin/',
    user: {
        userbyid: '/users/user/',
        updateUser: '/users/user/update/'
    },
  },
};