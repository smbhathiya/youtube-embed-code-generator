"use client"
import React, { useState } from 'react';
import YouTubeLinkInput from "@/app/components/YouTubeLinkInput";
import EmbedCodeDisplay from "@/app/components/EmbedCodeDisplay";

const YouTubeEmbedGenerator = () => {
    const [videoId, setVideoId] = useState('');

    const handleGenerateEmbed = (id) => {
        setVideoId(id);
    };

    return (
        <div className="container mx-auto p-6 ">
            <h1 className="text-4xl font-extrabold mb-8 text-blue-600">
                YouTube Embed Code Generator
            </h1>
            <div className="bg-white  rounded-lg ">
                <YouTubeLinkInput onGenerate={handleGenerateEmbed} />
                {videoId && <EmbedCodeDisplay videoId={videoId} />}
            </div>
        </div>
    );
};

export default YouTubeEmbedGenerator;
