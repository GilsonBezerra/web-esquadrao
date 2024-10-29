// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyCVDXH69cCNv-zxKvdVNV0c53r2yaVjvFg",
      authDomain: "web-esquadrao.firebaseapp.com",
      projectId: "web-esquadrao",
      storageBucket: "web-esquadrao.appspot.com",
      messagingSenderId: "739913956547",
      appId: "1:739913956547:web:2c07e6d8343d2d65ef3676"
  },
  endPoint: 'http://localhost:3000',
  serviceURL: 'http://localhost:8080',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
