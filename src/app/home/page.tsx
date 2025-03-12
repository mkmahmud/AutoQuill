"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import logo from "../../assets/logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import InputBox from "@/components/Input";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting
import "highlight.js/styles/github-dark.css";
import { handleLogOut } from "@/utls/logout";


import { useRouter } from 'next/navigation';

export default function Home() {

  // Handle Router    
  const router = useRouter();

  // Check if user is already logged in or not
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, []);

  // Sidebar State
  const [sidebar, setSidebar] = useState(true);
  // Prompt State
  const [prompt, setPrompt] = useState("");
  // Response Loder
  const [responseLoader, setResponseLoader] = useState(false);
  // Content State
  const [result, setResult] = useState();
  // Sidebar Content
  const [data, setData] = useState([]);
  // Selected Content
  const [selectedContentId, setSelectedContentId] = useState('');
  const [selectedContent, setSelectedContent] = useState([]);



  // Create New Chat
  const handleCreateNewChat = async (e: any) => {
    e.preventDefault();
    const chatName = e.target.chatName.value.trim();
    if (chatName.split(' ').length < 2) {
      alert("Chat name must be at least 2 words.");
      return;
    }
    setSelectedContent([]);
    setSelectedContentId('');
    setPrompt('');
    const res = await fetch("../api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, chatName }),
    });
    const data = await res.json();  
    setSelectedContentId(data.id);
    e.target.reset(); // Reset the input field
  }

  // Get Chat History
  useEffect(() => {
    if (selectedContentId) {
      fetch(`../api/chats/getchat?chatId=${selectedContentId}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.messages)) {
            setSelectedContent(data.messages);
          } else {
            console.error("Expected data.messages to be an array");
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedContentId]);

  // Get All CHats 
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`../api/chats/getchats?userId=${userId}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.messages)) {
            setData(data.messages);
          } else {
            console.error("Expected data.messages to be an array");
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, []);





  // getting content form Open API and save to DB
  const generateContent = async () => {



    const res = await fetch("../api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);

    const saveToDB = await fetch("../api/chats/saveaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId: selectedContentId, content: prompt, aiResponse: data.result }),
    });

    const saveintoDB = await saveToDB.json();
    setResponseLoader(false);
  };

  return (

    <div className="flex h-screen overflow-hidden">
      {/* Side Bar */}


      {
        sidebar && <div className=" w-[20%] lg:w-[15%] bg-stone-900 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">

              <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <Image alt="Logo" src={logo} width={35} height={35} />
            </div>

            {/* Chat History */}

            <div>
              <form onSubmit={handleCreateNewChat} className="mt-2 flex justify-between items-center cursor-pointer p-2 rounded-xl">
                <input className="my-2 w-full  mr-2 outline-none border rounded pl-2 text-lg" placeholder="Enter Chat Name" type="text" name="chatName" id="" />
                <button type="submit" className="cursor-pointer">

                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </form>

              <h3 className="text-white font-bold">Chat History</h3>

              <ul className="mt-4 space-y-2">
                <ul>
                  {data.map((message, index) => (
                    <li key={index}>
                      {/* @ts-ignore */}
                      <li onClick={() => setSelectedContentId(message.id)} className="cursor-pointer hover:bg-stone-800   p-2 rounded-xl">{message.chatName}</li> {/* Display the message object */}
                    </li>
                  ))}
                </ul>

              </ul>
            </div>

          </div>
          {
            token && <button onClick={handleLogOut} className="cursor-pointer bg-red-500 text-white rounded-full px-4 py-2 mr-2">
              Log Out
            </button>
          }

        </div>
      }

      {/* Content */}
      <div className="flex-1 p-4 relative">
        <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
          {
            !sidebar && <div><FontAwesomeIcon icon={faArrowRight} /></div>
          }
        </div>

        {/* Content Box */}
        <div className=" overflow-y-auto h-[80vh] p-4 rounded-md  ">

          {/* Data Display */}
          {
            !result || !selectedContent && <div className=" p-4 rounded-md">
              <Image className="my-4 mx-auto" alt="Logo" src={logo} width={100} height={100} />
              <div className="text-2xl font-bold text-center">Welcome to GPT-3 Playground</div>
              <div className="text-lg text-center">Type your prompt and get the result</div>
            </div>
          }

          {
            selectedContent.length > 1 && <div className="p-4 rounded-md text-white">
              {
                selectedContent.map((message, index) => (
                  <div key={index} className="my-4 p-2   rounded-xl overflow-y-auto">
                    {
                      // @ts-ignore
                      message.sender == "user" ? <div className="text-base text-right">{message.content}</div> :

                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                          {/* @ts-ignore */}
                          {message.content}
                        </ReactMarkdown>

                    }

                  </div>
                ))
              }
            </div>
          }

          {
            result && <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {result}
            </ReactMarkdown>
          }
        </div>




        {/* Prompt Box */}
        <div className="absolute   bottom-4  left-[15%] w-[70%]">
          <InputBox prompt={prompt} setPrompt={setPrompt} responseLoader={responseLoader} setResponseLoader={setResponseLoader} generateContent={generateContent} />
        </div>

      </div>
    </div>
  );
}


