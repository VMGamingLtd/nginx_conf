export async function post(url, data) {

  let response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error(`fetch failed, POST ${url}`, err);
    console.log('data:');
    console.dir(data);
    throw new Error('fetch() failed');
  }

  if (!response.ok) {
    console.error(`fetch failed, POST ${url}, status: ${response.status}`);
    console.log('data:');
    console.dir(data);
    throw new Error(`fetch() failed, status: ${response.status}`);
  }

  let json;

  try {
    json = response.json();
  } catch (err) {
    console.error(`fetch failed, response.json() failed, POST ${url}`, err);
    console.log('data:');
    console.dir(data);
    throw new Error('fetch() failed, response.json() failed');
  }

  return json;
}

function objectToQueryString(obj) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    }
  }
  return keyValuePairs.join('&');
}

export async function get(url, query) {

  let response;

  let queryStr = objectToQueryString(query); 

  let _url = `${url}?${queryStr}`

  try {
    response = await fetch(_url, {
      method: 'GET',
    });
  } catch (err) {
    console.error(`fetch failed, GET ${url}`, err);
    console.log('query:');
    console.dir(query);
    throw new Error('fetch() failed');
  }

  if (!response.ok) {
    console.error(`fetch failed, GET ${url}, status: ${response.status}`);
    console.log('query:');
    console.dir(query);
    throw new Error(`fetch() failed, GET status: ${response.status}`);
  }

  let json;

  try {
    json = response.json();
  } catch (err) {
    console.error(`fetch failed, response.json() failed, GET ${url}`, err);
    console.log('query:');
    console.dir(query);
    throw new Error('fetch() failed, response.json() failed');
  }

  return json;
}
