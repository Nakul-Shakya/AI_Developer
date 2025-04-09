import React, { useContext } from "react";
import { UserContext } from "../context/user.context";

function Home() {
  const { user } = useContext(UserContext);
  const [ismodalOpen, setIsmodalOpen] = useState(false);

  function createProject() {
    console.log("Create Project");
  }

  return (
    <div>
      <main className="p-4">
        <div className="projects">
          <button className="project p-8 border border-slate-300 rounded-md">
            <i className="ri-link"></i>
          </button>
        </div>

        <div className=""></div>
      </main>
    </div>
  );
}

export default Home;
