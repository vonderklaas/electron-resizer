## Electron Components

Electron's `main.js` process (backend) is a Node.js environment that has full system access.
On the other hand, `renderer.js` processes (frontend) run web pages and do not run Node.js for security reasons.
To bridge Electron's different process types together, we need a special script called a `preload.js` (context bridge)
A `preload.js` script runs in a context that has access to both the HTML DOM and a limited subset of Node.js and Electron APIs.

Another cornerstone of Electron app is `ipcRenderer` module, which is an EventEmitter. It provides a few methods so you can send synchronous and asynchronous messages from the `renderer.js` (frontend) to the `main.js` process (backend).
Of course you can also receive replies from the main process.