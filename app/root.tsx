import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import styles from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const CatchBoundary = () => {
  const caught = useCatch();
  return (
    <html lang="en">
      <head>
        <title>
          {caught.status} - {caught.statusText}
        </title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="mb-3 text-center text-5xl font-bold tracking-widest text-accent">
            <span className="text-sm text-base-content">Oops... It's </span>
            {caught.status}
          </h1>
          <p>{caught.statusText}</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
