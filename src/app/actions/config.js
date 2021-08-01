

let BASE_URL = "http://localhost:8080"
if (process.env.PUBLIC_URL)
    BASE_URL = process.env.PUBLIC_URL;

export default {
  BASE_URL
}