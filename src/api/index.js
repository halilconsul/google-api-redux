const CLIENT_ID = '988380261093-1cn4l4jh3v7nqtlhvsq6cjlls7oip6a6.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];

export default {
   authorize(params) {
      return new Promise((resolve, reject) => {
         gapi.auth.authorize(
            {
               'client_id': CLIENT_ID,
               'scope': SCOPES,
               'immediate': params.immediate,
               'cookie_policy': 'single_host_origin'
            },
            authResult => {
               if (authResult.error) {
                  return reject(authResult.error);
               }
               return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
            }
         );
      });
   }
}
