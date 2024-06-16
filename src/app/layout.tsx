import { ReactNode } from "react";
import { bebasNeue, roboto } from "./fonts";
import { css } from "@linaria/core";
import FullScreenLoading from "./components/widgets/FullScreenLoading";
import { Provider } from "jotai";
import { ToastContainer } from "react-toastify";
import "../ReactToastify.css";

interface Props extends React.PropsWithChildren {}
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
    min-height: 100vh;
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
  function JotaiProvider({ children }: Props): JSX.Element {
    return <Provider>{children}</Provider>;
  }

  return (
    <html lang="pt-br" className={globalStyle}>
      <body className={roboto.className}>
        <JotaiProvider>
          <FullScreenLoading>{children}</FullScreenLoading>
          <ToastContainer className={bebasNeue.className} />
        </JotaiProvider>
      </body>
    </html>
  );
}
