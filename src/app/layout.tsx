import { ReactNode } from "react";
import { roboto } from "./fonts";
import { css } from "@linaria/core";

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
    font-size: 2rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

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
    <html lang="en" className={globalStyle}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}