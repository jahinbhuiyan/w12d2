// export async function restoreCSRF() {
//   const response = await csrfFetch("/api/session");
//   storeCSRFToken(response);
//   return response;
// }

const csrfFetch = async (url, options = {}) => {
  options.method ||= 'GET';
  options.headers ||= {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['Accept'] = 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
  }

  const res = await fetch(url, options);
  return res;
}

export default csrfFetch;