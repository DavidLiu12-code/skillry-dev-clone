import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { DispatchPage } from "./pages/DispatchPage";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DispatchPage,
});

const splatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$",
  component: DispatchPage,
});

export const routeTree = rootRoute.addChildren([indexRoute, splatRoute]);

const rawBase = import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  basepath: rawBase || undefined,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
