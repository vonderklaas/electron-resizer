### Description

The file named `main.js` operates as a server process within a `Node.js` environment, granted full system access. Contrarily, processes named `renderer.js`, which serve as the frontend, execute web pages without running `Node.js` to enhance security.

To facilitate communication between the disparate process types in Electron, a specialized script known as `preload.js` or a context bridge is employed. This `preload.js` script operates within a context that allows access to both the HTML DOM and a limited selection of `Node.js` and Electron APIs.

Another fundamental component of an Electron application is the `ipcRenderer` module, functioning as an `EventEmitter`. It offers several methods enabling the sending of both synchronous and asynchronous messages from the `renderer.js` (frontend) to the `main.js` process (backend), as well as the receipt of responses from the main process.
