import withLinaria from "next-with-linaria";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projetos",
        permanent: true,
      },
    ];
  },
};

export default withLinaria(config);
