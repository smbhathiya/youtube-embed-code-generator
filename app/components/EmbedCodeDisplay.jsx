import React, { useState } from 'react';

const EmbedCodeDisplay = ({ videoId }) => {
    const [buttonText, setButtonText] = useState('Copy Embed Code');

    const embedCode = `<!-- Embed Code for YouTube Video Player with Plyr -->
<div id="player-container" style="max-width: 1000px; margin: 0 auto;"></div>

<script>
(function() {
    function initPlyrPlayer(videoId, containerId) {
        if (!document.getElementById(containerId)) {
            console.error(\`Container with id "\${containerId}" not found.\`);
            return;
        }

        if (!document.querySelector('link[href="https://cdn.plyr.io/3.7.2/plyr.css"]')) {
            const plyrCSS = document.createElement('link');
            plyrCSS.rel = 'stylesheet';
            plyrCSS.href = 'https://cdn.plyr.io/3.7.2/plyr.css';
            document.head.appendChild(plyrCSS);
        }

        if (!document.querySelector('script[src="https://cdn.plyr.io/3.7.2/plyr.js"]')) {
            const plyrScript = document.createElement('script');
            plyrScript.src = 'https://cdn.plyr.io/3.7.2/plyr.js';
            document.body.appendChild(plyrScript);
            plyrScript.onload = () => setupPlayer(videoId, containerId);
        } else {
            setupPlayer(videoId, containerId);
        }
    }

    function setupPlayer(videoId, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = \`
            <div class="plyr__video-embed" id="player">
                <iframe src="https://www.youtube.com/embed/\${videoId}?rel=0&showinfo=0&modestbranding=1&enablejsapi=1&origin=*&playlist=\${videoId}&loop=1&iv_load_policy=3"
                        allowfullscreen
                        allow="autoplay; encrypted-media">
                </iframe>
            </div>
        \`;

        const style = document.createElement('style');
        style.textContent = \`
            #\${containerId} .plyr__video-embed iframe {
                aspect-ratio: 16 / 9;
                width: 100%;
            }
            #\${containerId} .plyr__video-embed iframe {
                pointer-events: none;
            }
        \`;
        document.head.appendChild(style);

        new Plyr(\`#\${containerId} .plyr__video-embed\`, {
            youtube: {
                noCookie: true,
                rel: 0,           
                showinfo: 0,     
                iv_load_policy: 3,
                modestbranding: 1 
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initPlyrPlayer('${videoId}', 'player-container');
    });
})();
</script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode).then(() => {
            // Change button text to "Copied" for 2 seconds
            setButtonText('Copied');
            setTimeout(() => {
                setButtonText('Copy Embed Code');
            }, 2000);
        });
    };

    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            {/* Title and Button in the same row */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Generated Embed Code</h2>
                <button
                    onClick={handleCopy}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {buttonText}
                </button>
            </div>

            {/* Embed code display */}
            <pre className="bg-gray-100 p-4 rounded border overflow-x-auto">
                <code>{embedCode}</code>
            </pre>
        </div>
    );
};

export default EmbedCodeDisplay;
