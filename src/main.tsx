import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
});

function start() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // suspense: false,
      },
    },
  });

  const rootElement = document.getElementById("root")!;

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  }
}

// TODO: 백엔드개발 완료되면 DEV로 변경
if (import.meta.env.PRO) {
  enableMocking().then(start);
} else {
  start();
}

async function enableMocking() {
  const { worker } = await import("../src/mocks/browser");
  await worker.start();
}
