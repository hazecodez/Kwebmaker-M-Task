import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  getSeoMeta,
  getBanners,
  getContentSections,
  updateSeoMeta,
  updateBanner,
  updateContentSection,
} from "../Services/api";

const PageCMS = () => {
  const [seoMeta, setSeoMeta] = useState({
    title: "",
    description: "",
    keywords: "",
  });

  const [banner, setBanner] = useState("");
  const [contentSection, setContentSection] = useState({
    title: "",
    description: "",
  });
  const [preview, setpreview] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial data for SEO, banners, and content sections
    const fetchData = async () => {
      const seoData = await getSeoMeta();

      if (seoData) setSeoMeta(seoData);

      const bannerData = await getBanners();
      if (bannerData) setBanner(bannerData);
      console.log(bannerData);

      const contentData = await getContentSections();

      if (contentData) setContentSection(contentData);
    };

    fetchData();
  }, [banner,contentSection,seoMeta]);

  const handleSeoChange = (e) => {
    const { name, value } = e.target;

    setSeoMeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSeoMeta = async () => {
    const response = await updateSeoMeta(seoMeta);
    if (response) {
      toast.success("SEO Meta updated successfully!");
    } else {
      toast.error("Failed to update SEO Meta.");
    }
  };

  const handleUpdateBanners = async () => {
    const response = await updateBanner(preview);
    if (response) {
      toast.success("Banners updated successfully!");
    } else {
      toast.error("Failed to update banners.");
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setpreview(reader.result);
      };
    }
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;

    console.log(name);
    setContentSection((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateContentSections = async () => {
    const response = await updateContentSection(1, contentSection);
    if (response) {
      toast.success("Content sections updated successfully!");
    } else {
      toast.error("Failed to update content sections.");
    }
  };

  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3">Admin Panel</a>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
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
          <nav className="sb-sidenav accordion sb-sidenav-dark">
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
      </div>

      <div className="container mx-auto mt-10 p-6 space-y-6">
        {/* SEO Meta Section */}
        <div
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-3xl ml-auto"
          style={{ width: "75%", marginLeft: "20%" }}
        >
          <h2 className="text-xl font-semibold mb-4">SEO Meta Tags</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={seoMeta.title}
                onChange={handleSeoChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={seoMeta.description}
                onChange={handleSeoChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Keywords</label>
              <input
                type="text"
                name="keywords"
                value={seoMeta.keywords}
                onChange={handleSeoChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <button
              onClick={handleUpdateSeoMeta}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Update SEO Meta
            </button>
          </div>
        </div>

        {/* Banners Section */}
        <div
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-3xl ml-auto"
          style={{ width: "75%", marginLeft: "20%" }}
        >
          <h2 className="text-xl font-semibold mb-4">Banners</h2>

          <div key="1" className="mb-4">
            <label className="block text-sm font-bold mb-2">Banner Image</label>
            {banner ? (
              <img
                className="h-60 w-5/6"
                src={`https://res.cloudinary.com/doac4pi2c/image/upload/${banner[0].image}`}
                alt=""
              />
            ) : (
              <>
                <img className="h-60 w-5/6" src={preview} alt="" />
              </>
            )}
            {}
            <input
              type="file"
              value={banner.title}
              onChange={handleBannerChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Banner URL"
            />
          </div>

          <button
            onClick={handleUpdateBanners}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Update Banners
          </button>
        </div>

        {/* Content Sections */}
        <div
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-3xl ml-auto"
          style={{ width: "75%", marginLeft: "20%" }}
        >
          <h2 className="text-xl font-semibold mb-4">Content Sections</h2>

          <div key="1" className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Section Title
            </label>
            <input
              name="title"
              type="text"
              value={contentSection.title}
              onChange={handleContentChange}
              className="w-full p-3 border rounded-lg"
            />
            <label className="block text-sm font-bold mb-2 mt-2">
              Section Description
            </label>
            <textarea
              name="description"
              value={contentSection.description}
              onChange={handleContentChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            onClick={handleUpdateContentSections}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Update Content Sections
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageCMS;
