import axios from "axios";

const AdminAPIs = axios.create({
  baseURL: "http://localhost:5000",
});

AdminAPIs.interceptors.request.use(
  (config) => {
    if (config && config.url && config.url.includes("admin")) {
      const adminToken = localStorage.getItem("token");
      if (adminToken) {
        config.headers["Authorization"] = `Bearer ${adminToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// CMS APIs
export async function getContentSections() {
  try {
    const response = await AdminAPIs.get("/admin/cms/content-sections");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error fetching content sections", error);
  }
}

export async function updateContentSection(id, sectionData) {
  try {
    console.log("ivan", sectionData);

    const response = await AdminAPIs.put(
      `/admin/cms/content-sections/${id}`,
      sectionData
    );
    return response.data;
  } catch (error) {
    console.log("Error updating content section", error);
  }
}

export async function getBanners() {
  try {
    const response = await AdminAPIs.get("/admin/cms/banners");
    return response.data;
  } catch (error) {
    console.log("Error fetching banners", error);
  }
}

export async function updateBanner( image) {
  try {
    
    const response = await AdminAPIs.put(
      `/admin/cms/banners/${1}`,
      {image}
    );
    return response.data;
  } catch (error) {
    console.log("Error updating banner", error);
  }
}

export async function getSeoMeta() {
  try {
    const response = await AdminAPIs.get("/admin/cms/seo");
    return response.data;
  } catch (error) {
    console.log("Error fetching SEO meta", error);
  }
}

export async function updateSeoMeta(seoData) {
  try {
    const response = await AdminAPIs.put("/admin/cms/seo", seoData);
    return response.data;
  } catch (error) {
    console.log("Error updating SEO meta", error);
  }
}
