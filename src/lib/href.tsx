import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export function AppLink({
  to,
  ...props
}: { to: string } & Omit<ComponentProps<"a">, "href">) {
  return <Link to={to as LinkProps["to"]} {...(props as object)} />;
}
