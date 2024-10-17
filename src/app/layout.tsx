import { type ReactNode } from "react";
import { Provider } from "jotai";
import FullScreenLoading from "~/components/widgets/FullScreenLoading";
import { roboto } from "~/assets/fonts/fonts";
import { css } from "@linaria/core";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

type Props = React.PropsWithChildren;

function JotaiProvider({ children }: Props): JSX.Element {
  return <Provider>{children}</Provider>;
}
const globalStyle = css`
  :root {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button,
  a {
    cursor: pointer;
  }

  body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    max-height: none;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fffdfd;

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    button,
    span,
    strong {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={globalStyle}>
      <body className={roboto.className}>
        <TRPCReactProvider>
          <JotaiProvider>
            <ClerkProvider>
              <Toaster
                position="bottom-right"
                expand={true}
                richColors
                closeButton
              />
              <FullScreenLoading>{children}</FullScreenLoading>
            </ClerkProvider>
          </JotaiProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
