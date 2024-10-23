import ReactDOM from "react-dom/client";
import App from "./App";

function start() {
  const rootElement = document.getElementById("root")!;

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  }
}

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

if (import.meta.env.DEV) {
  // enableMocking().then(start);
  start();
} else {
  start();
}
