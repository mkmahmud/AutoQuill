"use client";
import { useState } from "react";




export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
console.log(result)
  const generateContent = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div className="text-4xl font-bold text-center flex justify-center items-center h-screen  ">
      <div className="max-w-2xl mx-auto p-6">
        <textarea className="w-full border p-2" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={generateContent} className="mt-4 bg-blue-500 text-white px-4 py-2">Generate</button>
        {result && <div className="mt-4 p-4 bg-gray-100">{result}</div>}
      </div>
    </div>
  );
}
