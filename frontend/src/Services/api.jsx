import axios from "axios";

const AdminAPIs = axios.create({
  baseURL: "http://localhost:5000",
});

export async function adminLogin(loginData) {
  try {
    const response = await AdminAPIs.post("/admin/login", loginData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function dashboard() {
  try {
    const response = await AdminAPIs.get("/admin/dashboard");
    return response;
  } catch (error) {
    console.log("Error fetching dashboard data", error);
  }
}

export async function getHomePageContents() {
  try {
    const response = await AdminAPIs.get("/admin/content");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateHomePageContents(data) {
  try {
    const response = await AdminAPIs.post("/admin/content", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
