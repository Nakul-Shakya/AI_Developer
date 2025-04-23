import React, { useState } from "react";
import { useLocation } from "react-router-dom";  //, useNavigate

const Project = () => {

    const location = useLocation();

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);

    const users = [
        { id: 1, name: "User One" },
        { id: 2, name: "User Two" },
        { id: 3, name: "User Three" },
        { id: 4, name: "User Four" },
        { id: 5, name: "User Five" },
        { id: 6, name: "User Six" },
        { id: 7, name: "User Seven" },
        { id: 8, name: "User Eight" },
        { id: 9, name: "User Nine" },
        { id: 10, name: "User Ten" },
    ];


    const handleUserClick = (id) => {
            setSelectedUserId([...selectedUserId, id]);
    };
    

    console.log(location.state);

    return (
        <main className="h-screen w-screen flex">
            <section className="left relative flex flex-col h-full min-w-96 bg-[#6B8F71]">
                <header className="flex justify-between items-center p-2 px-2 w-full bg-[#0D2B1D]">
                    <button
                        className="flex gap-2 text-white"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <i className="ri-add-fill mr-1"></i>
                        <p className="">Add collaborator</p>
                    </button>

                    <button
                        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
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
                        className="p-2 px-4 border-none outline-none flex-grow"
                        type="text" placeholder="Enter massage" name="" id="" />

                        <button className="px-5 bg-slate-950 text-white">
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${ isSidePanelOpen ? 'translate-x-0' : '-translate-x-full' } top-0`}>  
                    <header className="flex justify-end p-4 px-3 bg-slate-200">
                        <button
                            onClick={()=>{
                                setIsSidePanelOpen(!isSidePanelOpen)
                            }}
                        >
                        <i className="ri-close-fill"></i>
                        </button>
                    </header>

                    <div className="users flex flex-col gap-2">
                        <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                            <div 
                              className="aspect-square rounded-full w-fit h-fit flex justify-center items-center p-4 text-white bg-slate-600"
                            >
                                <i className="ri-user-fill absolute"></i>
                            </div>
                            <h1 className="font-semibold text-lg">UserName</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-11/12 max-w-md p-4 relative">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Select a User</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className={`user cursor-pointer hover:bg-slate-200 ${selectedUserId.indexOf(user.id) !== -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center border rounded-md`}

                                    onClick={() => {
                                        handleUserClick(user.id)
                                    }}
                                >
                                        <div className="aspect-square rounded-full w-10 h-10 flex justify-center items-center text-white bg-slate-600">
                                            <i className="ri-user-fill"></i>
                                        </div>
                                        <h1 className="font-semibold text-lg">{user.name}</h1>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => alert('Add Collaborators clicked')}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>


                    </div>
                </div>
            )}
        </main>
    );
};

export default Project;
