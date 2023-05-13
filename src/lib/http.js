// const domain = "localhost:5000/";
// const methodHttp = "http://";
const domain = "music-simple-v2.onrender.com/";
const methodHttp = "https://";
// const domain = "music-stream.onrender.com/";

export const HTTP = (params) => {
  return fetch(methodHttp + (domain + params).replace(/[/]+/gi, "/"), {
    credentials: "include",
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const HTTPPOST = (params, body) => {
  return fetch(methodHttp + (domain + params).replace(/[/]+/gi, "/"), {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
