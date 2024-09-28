import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";

function start() {
  const rootElement = document.getElementById("root")!;

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

// TODO: 백엔드개발 완료되면 DEV로 변경
if (import.meta.env.DEV) {
  enableMocking().then(start);
} else {
  start();
}
