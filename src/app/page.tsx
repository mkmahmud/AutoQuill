"use client";
import { useState } from "react";
import Image from 'next/image';
import logo from "../assets/logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import InputBox from "@/components/Input";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting
import "highlight.js/styles/github-dark.css";


export default function Home() {
  // Sidebar State
  const [sidebar, setSidebar] = useState(true);

  // Prompt State
  const [prompt, setPrompt] = useState("");

  // Response Loder
  const [responseLoader, setResponseLoader] = useState(false);

  // Content State
  const [result, setResult] = useState();

 
  // getting content form Open API
  const generateContent = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);
    setResponseLoader(false);
  };
  return (

    <div className="flex h-screen overflow-hidden">
      {/* Side Bar */}


      {
        sidebar && <div className=" w-[20%] lg:w-[15%] bg-stone-900 p-4">
          <div className="flex justify-between items-center">

            <div className="cursor-pointer" onClick={() => setSidebar(!sidebar)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <Image alt="Logo" src={logo} width={35} height={35} />
          </div>

          {/* Chat History */}

          <div>
            <div className="my-4 flex justify-between items-center cursor-pointer p-2 rounded-xl">
              <h3>Add new</h3>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="mt-10">
              <p>Yesterday</p>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="cursor-pointer bg-stone-800 p-2 rounded-xl">This is past One</li>
              <li className="cursor-pointer   p-2 rounded-xl">This is past One</li>
            </ul>
          </div>
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
            !result && <div className=" p-4 rounded-md">
              <Image className="my-4 mx-auto" alt="Logo" src={logo} width={100} height={100} />
              <div className="text-2xl font-bold text-center">Welcome to GPT-3 Playground</div>
              <div className="text-lg text-center">Type your prompt and get the result</div>
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
