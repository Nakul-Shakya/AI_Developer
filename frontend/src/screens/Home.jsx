import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();

    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        setIsModalOpen(false);
        setProject([...project, res.data.project]);
        setProjectName("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button
          onClick={logoutHandler}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-medium transition-all"
        >
          Logout
        </button>
      </header>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* New Project Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-gray-500 rounded-lg p-6 flex items-center justify-center hover:bg-gray-800 transition-all"
        >
          <span className="text-lg font-medium">+ New Project</span>
        </button>

        {/* Existing Projects */}
        {project.map((project) => (
          <div
            key={project._id}
            onClick={() =>
              navigate(`/project`, {
                state: { project },
              })
            }
            className="bg-gray-800 p-5 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-sm text-gray-300 flex items-center gap-1">
              <i className="ri-user-line"></i> Collaborators:{" "}
              {project.users.length}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
