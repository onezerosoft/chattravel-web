import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

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
      <div>
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to={"/chat"}>Chat</Link>
        <Link to={"/style"}>Style</Link>
      </div>
      <Outlet />
    </>
  );
}
