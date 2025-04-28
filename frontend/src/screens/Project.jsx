import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/user.context";
import { useLocation } from "react-router-dom"; //useNavigate
import axios from "../config/axios";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import { getWebContainer } from "../config/WebContainer";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  React.useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}

const Project = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set()); // Initialized as Set
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messageBox = React.createRef();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // New state variable for messages
  const [fileTree, setFileTree] = useState({});

  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);

  const [webContainer, setWebContainer] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null);

  const [runProcess, setRunProcess] = useState(null);

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const send = () => {
    sendMessage("project-message", {
      message,
      sender: user,
    });
    setMessages((prevMessages) => [...prevMessages, { sender: user, message }]); // Update messages state
    setMessage("");
  };

  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message);

    return (
      <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
        <Markdown
          children={messageObject.text}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    initializeSocket(project._id);

    if (!webContainer) {
      getWebContainer().then((container) => {
        setWebContainer(container);
        console.log("container started");
      });
    }

    receiveMessage("project-message", (data) => {
      console.log(data);

      if (data.sender._id == "ai") {
        const message = JSON.parse(data.message);

        console.log(message);

        webContainer?.mount(message.fileTree);

        if (message.fileTree) {
          setFileTree(message.fileTree || {});
        }
        setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
      } else {
        setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
      }
    });

    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
        setFileTree(res.data.project.fileTree || {});
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function saveFileTree(ft) {
    axios
      .put("/projects/update-file-tree", {
        projectId: project._id,
        fileTree: ft,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function scrollToBottom() {
  //     messageBox.current.scrollTop = messageBox.current.scrollHeight
  // }

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col w-full md:w-96 h-screen bg-zinc-900 text-zinc-100 border-r border-zinc-800">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-zinc-800 border-b border-zinc-700">
          <button
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ri-add-fill text-lg"></i>
            <span>Add Collaborator</span>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="text-zinc-400 hover:text-white"
          >
            <i className="ri-group-fill text-xl"></i>
          </button>
        </header>

        {/* Chat Area */}
        <div className="conversation-area flex flex-col flex-grow overflow-hidden relative pt-2 pb-16">
          {/* Messages */}
          <div
            ref={messageBox}
            className="message-box flex-grow overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-zinc-700"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`w-fit max-w-[85%] md:max-w-[75%] px-4 py-2 rounded-lg shadow ${
                  msg.sender._id === user._id.toString()
                    ? "ml-auto bg-blue-600 text-white"
                    : msg.sender._id === "ai"
                    ? "bg-zinc-700 text-zinc-100"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                <small className="block text-xs text-zinc-400 mb-1">
                  {msg.sender.email}
                </small>
                <div className="text-sm leading-relaxed break-words">
                  {msg.sender._id === "ai" ? (
                    WriteAiMessage(msg.message)
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="absolute bottom-0 left-0 w-full p-3 bg-zinc-800 border-t border-zinc-700 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow bg-zinc-700 text-white px-3 py-2 rounded-md text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter message"
            />
            <button
              onClick={send}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white text-sm"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        {/* Collaborator Side Panel */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-zinc-900 z-40 transition-transform duration-300 ease-in-out ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="flex justify-between items-center p-4 bg-zinc-800 border-b border-zinc-700">
            <h2 className="text-lg font-semibold text-white">Collaborators</h2>
            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <i className="ri-close-fill text-xl"></i>
            </button>
          </header>
          <div className="p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-zinc-700">
            {project.users?.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded hover:bg-zinc-800 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <i className="ri-user-fill text-lg"></i>
                </div>
                <span className="text-sm font-medium text-white">
                  {user.email}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="right flex-grow h-screen flex bg-zinc-900 text-white">
        {/* Explorer */}
        <div className="explorer h-full max-w-64 min-w-52 bg-zinc-800 border-r border-zinc-700 overflow-y-auto">
          <div className="file-tree w-full">
            {Object.keys(fileTree).map((file, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentFile(file);
                  setOpenFiles;
                  setOpenFiles([...new Set([...openFiles, file])]);
                }}
                className="tree-element w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-zinc-700 transition-colors"
              >
                <p className="font-medium text-sm truncate">{file}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Code Editor */}
        <div className="code-editor flex flex-col flex-grow h-full">
          {/* Open Files */}
          <div className="top flex justify-between items-center bg-zinc-800 px-2 py-2 border-b border-zinc-700">
            <div className="files flex gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600">
              {openFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFile(file)}
                  className={`p-2 px-4 rounded-t-md text-sm whitespace-nowrap ${
                    currentFile === file
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                >
                  {file}
                </button>
              ))}
            </div>

            <div className="actions flex items-center gap-2 pr-2">
              <button
                onClick={async () => {
                  await webContainer.mount(fileTree);

                  const installProcess = await webContainer.spawn("npm", [
                    "install",
                  ]);
                  installProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  if (runProcess) runProcess.kill();

                  const tempRunProcess = await webContainer.spawn("npm", [
                    "start",
                  ]);
                  tempRunProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  setRunProcess(tempRunProcess);

                  webContainer.on("server-ready", (port, url) => {
                    setIframeUrl(url);
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Run
              </button>
            </div>
          </div>

          {/* Code Area */}
          <div className="bottom flex-grow overflow-auto bg-zinc-900 p-2">
            {fileTree[currentFile] && (
              <div className="code-editor-area h-full overflow-auto flex-grow bg-zinc-900 border border-zinc-700 rounded-md">
                <pre className="hljs h-full">
                  <code
                    className="hljs h-full outline-none block p-4"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updatedContent = e.target.innerText;
                      const ft = {
                        ...fileTree,
                        [currentFile]: {
                          file: {
                            contents: updatedContent,
                          },
                        },
                      };
                      setFileTree(ft);
                      saveFileTree(ft);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(
                        "javascript",
                        fileTree[currentFile].file.contents
                      ).value,
                    }}
                    style={{
                      whiteSpace: "pre-wrap",
                      paddingBottom: "25rem",
                    }}
                  />
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Iframe Preview */}
        {iframeUrl && webContainer && (
          <div className="flex flex-col h-full min-w-96 border-l border-zinc-800 bg-zinc-800">
            <div className="address-bar border-b border-zinc-700">
              <input
                type="text"
                onChange={(e) => setIframeUrl(e.target.value)}
                value={iframeUrl}
                className="w-full p-2 px-4 bg-zinc-700 text-white outline-none"
              />
            </div>
            <iframe src={iframeUrl} className="w-full h-full" />
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Select User</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-300 p-2 hover:text-white transition-colors"
              >
                <i className="ri-close-fill text-2xl"></i>
              </button>
            </header>

            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`user cursor-pointer hover:bg-zinc-700 rounded-md p-3 flex gap-3 items-center ${
                    Array.from(selectedUserId).indexOf(user._id) !== -1
                      ? "bg-zinc-700"
                      : "bg-zinc-800"
                  }`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-4 text-white bg-zinc-600">
                    <i className="ri-user-fill absolute text-lg"></i>
                  </div>
                  <h1 className="font-medium text-lg text-white">
                    {user.email}
                  </h1>
                </div>
              ))}
            </div>

            {/* Add Collaborators Button */}
            <button
              onClick={addCollaborators}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
