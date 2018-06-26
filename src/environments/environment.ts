// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyD0qEw4lG5sPBphnCWBz6Y79ymxRdCdNb8',
        authDomain: 'angular-db-tutorial.firebaseapp.com',
        databaseURL: 'https://angular-db-tutorial.firebaseio.com',
        projectId: 'angular-db-tutorial',
        storageBucket: 'angular-db-tutorial.appspot.com',
        messagingSenderId: '127701576687'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
