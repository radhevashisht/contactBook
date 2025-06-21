import axios from "axios";

// This is the URL for the local development server
// export default axios.create({ baseURL: "http://localhost:3001" });

// This is the URL for the deployed version, using My JSON Server
export default axios.create({
  baseURL: "https://my-json-server.typicode.com/radhevashisht/contactBook",
});
