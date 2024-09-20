import { useNavigate } from "react-router-dom";
import "./Css/styles.css";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getHomePageContents, updateHomePageContents } from "../Services/api";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Image","Title", "Description", "SEO Keywords", "Update"];

export default function PageCMS() {
  const [contents,setContent] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      const response = await getHomePageContents();
      console.log(response.data);
      
      const content = response.data;
      setContent(content)
    };

    fetchContent();
  }, []);

  // const handleUpdate = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("seoKeywords", seoKeywords);

  //   if (banner) {
  //     formData.append("banner", banner);
  //   }
  //   console.log("he", formData);

  //   // Call the update function from your api.js
  //   const response = await updateHomePageContents(formData);

  //   if (response) {
  //     toast.success("Home page content updated successfully!");
  //   } else {
  //     toast.error("Failed to update home page content.");
  //   }
  // };
  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3">Admin Panel</a>

        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group"></div>
        </div>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem("token");
                    toast.success("Logout successfully");
                    navigate("/admin/login");
                  }}
                  className="dropdown-item"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <a
                  onClick={() => navigate("/admin/dashboard")}
                  className="nav-link cursor-pointer"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </a>
                <a
                  onClick={() => navigate("/admin/cms")}
                  className="nav-link cursor-pointer"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  CMS
                </a>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Administrator
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Content Management</h1>
              <ol className="breadcrumb mb-4"></ol>

              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {contents.map((data, index) => (
                      <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.banner}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.title}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.description}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.seoKeywords}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            Edit
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2024
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
