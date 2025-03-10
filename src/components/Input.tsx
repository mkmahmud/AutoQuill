"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

interface InputBoxProps {
    prompt: string;
    setPrompt: (value: string) => void;
    responseLoader: boolean;
    setResponseLoader: (value: boolean) => void;
    generateContent: any;
}

export default function InputBox({ prompt, setPrompt, responseLoader, setResponseLoader, generateContent }: InputBoxProps) {
    return (
        <div className="flex items-center border border-gray-700 p-2 rounded-md">
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-2 outline-none"
                placeholder="Type your prompt here..."
            />
            {responseLoader ? (
                <div className="flex items-center justify-center ml-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-700"></div>
                </div>
            ) : <button type="submit" onClick={() => { setResponseLoader(true), setPrompt(''), generateContent() }} className="cursor-pointer ml-2 p-2 bg-gray-700 text-white rounded-md">
                <FontAwesomeIcon icon={faArrowUp} className="h-6 w-6" />
            </button>}


        </div>
    )
}