const URL_LOCAL = "http://192.168.1.3:8000/api"

export  const URL_BASE = URL_LOCAL;

export function get(resource){
  let url = `${URL_BASE}${resource}`
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(async function (response) {
    let resData = await response.json();
    if (!response.ok) {
      return Promise.reject(resData);
    }    
    return resData;
  })
}

export function del(resource){
    let url = `${URL_BASE}${resource}`
    return fetch(url, {
      method: 'DELETE',
    }).then(async function (response) {
      if (!response.ok) {
        return Promise.reject(response);
      }    
      return response;
    })
  }

export function post(resource, body){
  let url = `${URL_BASE}${resource}`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  }).then(async function (response) {
    let resData = await response.json();
    if (!response.ok) {
      return Promise.reject(resData);
    }    
    return resData;
  })
}

export function put(resource, body){
  let url = `${URL_BASE}${resource}`
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  }).then(async function (response) {
    let resData = await response.json();
    if (!response.ok) {
      return Promise.reject(resData);
    }    
    return resData;
  })
}

export default { get, post, del, put };