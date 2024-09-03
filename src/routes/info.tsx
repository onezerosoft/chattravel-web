import { createFileRoute } from "@tanstack/react-router";
import PageTemplate from "../components/common/PageTemplate";

export const Route = createFileRoute("/info")({
  component: () => <div>Hello /info!</div>,
});

function Info() {
  return (
    <PageTemplate pageName="Info" badgeText="Select details!"></PageTemplate>
  );
}

export default Info;
