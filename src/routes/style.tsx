import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/style")({
  // loader: fetchPosts,
  component: Style,
});

function Style() {
  return <div>Style</div>;
}

export default Style;
