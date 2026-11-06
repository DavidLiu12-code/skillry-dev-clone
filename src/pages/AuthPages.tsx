import { useState } from "react";
import { toast } from "sonner";
import { AppLink } from "../lib/href";
import { useApp } from "../context/AppContext";

export function AuthPage({ mode }: { mode: "login" | "register" | "forgot" }) {
  const { tt, link } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const title = mode === "register" ? tt("auth_common_signup") : mode === "forgot" ? tt("auth_forgot_password_title") : tt("auth_login_title");
  const desc =
    mode === "forgot"
      ? tt("auth_forgot_password_description")
      : mode === "register"
        ? "Create an account to install Skills."
        : tt("auth_login_description");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="mb-6 size-10 rounded-[10px] dark:hidden" />
      <img src={`${import.meta.env.BASE_URL}logo-dark.png`} alt="" className="mb-6 hidden size-10 rounded-[10px] dark:block" />
      <h1 className="text-3xl font-semibold tracking-[-0.04em]">{title}</h1>
      <p className="mt-2 text-sm text-black/55 dark:text-white/58">{desc}</p>
      <form
        className="mt-8 grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast("This clone has no auth backend (skillry.dev uses better-auth). Account actions are not connected.");
        }}
      >
        <label className="grid gap-1.5 text-sm">
          {tt("auth_login_email")}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={tt("auth_login_placeholder_email")}
            className="h-11 rounded-xl border border-black/15 bg-white px-3 outline-none dark:border-white/15 dark:bg-white/8"
          />
        </label>
        {mode !== "forgot" ? (
          <label className="grid gap-1.5 text-sm">
            {tt("auth_login_password")}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={tt("auth_login_placeholder_password")}
              className="h-11 rounded-xl border border-black/15 bg-white px-3 outline-none dark:border-white/15 dark:bg-white/8"
            />
          </label>
        ) : null}
        <button type="submit" className="h-11 rounded-full bg-[#121313] text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
          {mode === "forgot" ? tt("auth_forgot_password_send") : mode === "register" ? tt("auth_common_signup") : tt("auth_login_sign_in")}
        </button>
      </form>
      <div className="mt-6 space-y-2 text-sm text-black/55">
        {mode === "login" ? (
          <>
            <AppLink to={link("/auth/forgot-password")} className="block hover:underline">
              {tt("auth_login_forgot_password")}
            </AppLink>
            <AppLink to={link("/auth/register")} className="block hover:underline">
              {tt("auth_login_sign_up_hint")}
            </AppLink>
          </>
        ) : (
          <AppLink to={link("/auth/login")} className="block hover:underline">
            {tt("auth_forgot_password_back_to_login")}
          </AppLink>
        )}
      </div>
    </div>
  );
}

export function AccountWallPage({ title }: { title: string }) {
  const { link } = useApp();
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/40">Sign in required</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{title}</h1>
      <p className="mt-4 leading-7 text-black/60 dark:text-white/62">
        {title} on skillry.dev requires an authenticated session (better-auth). This clone shows the login wall only and does not forge account access.
      </p>
      <AppLink to={link("/auth/login")} className="mt-8 inline-flex h-11 items-center rounded-full bg-[#121313] px-5 text-sm font-semibold text-white dark:bg-[#f4ff71] dark:text-[#121313]">
        Sign In
      </AppLink>
    </div>
  );
}
