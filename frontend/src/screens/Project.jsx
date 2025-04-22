import React, { useState } from "react";
import { useLocation } from "react-router-dom";  //, useNavigate

const Project = () => {

    const location = useLocation();

    const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)

    console.log(location.state);

  return (
        <main
            className="h-screen w-screen flex"
        >

            <section
                className="left relative flex flex-col h-full min-w-72 bg-[#6B8F71]"
            >

            <header className="flex justify-end p-2 px-2 w-full bg-[#0D2B1D]">

                <button 
                    onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)}
                    className="p-2 bg-amber-100 rounded-xl px-3"
                >

                    <i className="ri-group-fill"></i>
                    {/* <i className="ri-group-line"></i> */}

                </button>


            </header>

            <div className="conversation-area flex-grow flex flex-col">

                <div className="message-box flex-grow flex flex-col gap-1 p-1"> 


                    <div className="massage max-w-56 flex flex-col p-2 bg-[#E3EFD3] w-fit rounded-md">
                        <small className="opacity-100 text-xs">exanpal@gmail.com</small>
                        <p className="text-sm">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
                    </div>

                    <div className="ml-auto massage max-w-56 flex flex-col p-2 bg-[#E3EFD3] w-fit rounded-md">
                        <small className="opacity-100 text-xs">exanpal@gmail.com</small>
                        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>


                </div>

                <div className="inputFliet w-full flex bg-[#E3EFD3]">

                    <input
                    className="p-2 px-4 border-none outline-none"
                    type="text" placeholder="Enter massage" name="" id="" />

                    <button className="flex-grow px-3">
                        <i className="ri-send-plane-fill"></i>
                    </button>
                    
                </div>

            </div>

            <div className="{`sidePanel w-36 h-60 bg-red-600 absolute transition-all ${ isSidePanelOpen ? 'translate-x-0' : '-translate-x-full' } top-0`}">  </div>
{/*                 <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${ isSidePanelOpen ? 'translate-x-0' : '-translate-x-full' } top-0`}> */}
            </section>

        </main>
    );
};

export default Project;
