import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/common/Header";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>NOT FOUND</p>
        <Link to="/">홈으로</Link>
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
