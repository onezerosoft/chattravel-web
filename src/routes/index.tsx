import { createFileRoute } from "@tanstack/react-router";
import Badge from "../components/Badge";
import styled from "styled-components";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Wrapper>
      <Badge text="Welcome to Chattravel!" />
      Home
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default Home;
