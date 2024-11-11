import React, { useState } from 'react';

const YouTubeLinkInput = ({ onGenerate }) => {
    const [inputUrl, setInputUrl] = useState('');

    const handleGenerateClick = () => {
        try {
            const url = new URL(inputUrl);
            const params = new URLSearchParams(url.search);
            const videoId = params.get('v') || url.pathname.split('/').pop();
            onGenerate(videoId);
        } catch (error) {
            alert('Please enter a valid YouTube URL');
        }
    };

    return (
        <div className="flex items-center space-x-4 mb-6">
            <input
                type="text"
                placeholder="Paste YouTube URL here"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
                onClick={handleGenerateClick}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
                Generate Embed
            </button>
        </div>
    );
};

export default YouTubeLinkInput;
