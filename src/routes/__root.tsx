import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
