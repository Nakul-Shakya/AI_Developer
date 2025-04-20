import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Project = () => {

  const location = useLocation();

  console.log(location.state);

  return (
        <main
            className="h-scree h-scree flex"
        >

            <section
                className="left h-full min-w-60"
            >

            </section>

        </main>
    );
};

export default Project;
