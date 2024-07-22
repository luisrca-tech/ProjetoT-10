import withLinaria from 'next-with-linaria'

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default withLinaria(config)