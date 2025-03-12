"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import logo from "../../assets/logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
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


  // getting content form Open API
  const generateContent = async () => {
    const res = await fetch("../api/generate", {
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
              <div className="my-4 flex justify-between items-center cursor-pointer p-2 rounded-xl">
                <h3>Add new</h3>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              
              <ul className="mt-4 space-y-2">
                <ul>
                  {data.map((message, index) => (
                    <li key={index}>
                      {/* @ts-ignore */}
                      <li className="cursor-pointer hover:bg-stone-800   p-2 rounded-xl">{message.chatName}</li> {/* Display the message object */}
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


// Understanding Deforestation: Causes, Effects, and Solutions
// Deforestation, the widespread clearing of forested land, remains a pressing environmental issue with profound global impacts. Forests are essential to the planet, contributing to biodiversity, the water cycle, soil conservation, and climate regulation. Here, we explore the causes, effects, and potential solutions to deforestation.

// Causes of Deforestation
// 1. Agricultural Expansion
// The largest driver of deforestation is the expansion of agricultural land for crops and livestock. In regions such as the Amazon, vast areas of forest are cleared for soybean production and cattle ranching.

// 2. Logging
// Commercial logging, which involves the cutting down of trees for timber and pulp, often leads to deforestation. Illegal logging, in particular, exacerbates the problem, as it is unregulated and unsustainably damages forests.

// 3. Infrastructure Development
// The construction of roads, dams, and other infrastructure projects typically requires significant deforestation. These developments fragment habitats and open previously inaccessible areas to further exploitation.

// 4. Urban Expansion
// As global populations grow, cities expand, leading to the clearing of forests for residential and commercial development.

// Effects of Deforestation
// 1. Biodiversity Loss
// Forests are home to over 80% of terrestrial species. Deforestation leads to habitat loss, driving many species to extinction. This loss of biodiversity reduces resilience and the ability of ecosystems to respond to environmental changes.

// 2. Climate Change
// Forests are significant carbon sinks; they absorb CO2 from the atmosphere, mitigating climate change. When forests are destroyed, not only is this CO2 absorption capacity reduced, but the carbon stored in trees is released back into the atmosphere, exacerbating global warming.

// 3. Soil Erosion
// Without tree cover, the soil is more vulnerable to erosion by wind and rain. Erosion can lead to poorer soil quality, which affects agricultural productivity and can lead to further deforestation.

// 4. Water Cycle Disruption
// Forests play a critical role in the water cycle by returning water vapor back into the atmosphere. Without trees, areas may become drier, which can affect weather patterns and lead to reduced agricultural yields.

// Solutions to Deforestation
// 1. Sustainable Agriculture
// Practices such as agroforestry, permaculture, and sustainable farming can significantly reduce the need for