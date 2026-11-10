import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import Footer from "#/components/footer";
import Header from "#/components/header";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        href: appCss,
        rel: "stylesheet",
      },
    ],
    meta: [
      {
        charSet: "utf8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        content:
          "A collection of random Chuck Norris jokes. Refresh every 5 seconds, and save your favorites.",
        name: "description",
      },
      {
        title: "Chuck Norris jokes",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col overflow-y-scroll bg-slate-300">
        <Header />
        <main className="px-3">{children}</main>
        <Footer />
        <Toaster richColors position="top-center" />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
