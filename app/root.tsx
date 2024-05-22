import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
// @ts-ignore: TODO: How to handle this properly
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesheet },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600&display=swap",
    },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-center text-5xl font-bold tracking-widest text-accent">
        <span className="text-sm text-base-content">Oops... It's </span>
        {error.status}
      </h1>
      <p>{error.statusText}</p>
    </div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 text-center text-5xl font-bold tracking-widest text-accent">
        Oops...
      </h1>
      <p>Something went wrong.</p>
    </div>
  );
}

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
