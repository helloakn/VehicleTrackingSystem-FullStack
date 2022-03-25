/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   NEXT_PUBLIC_AppDomain:    process.env.NEXT_PUBLIC_AppDomain,
//   NEXT_PUBLIC_ApiDomain:    process.env.NEXT_PUBLIC_ApiDomain,
//   NEXT_PUBLIC_ImageDomain:  process.env.NEXT_PUBLIC_ImageDomain
// }
module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/ads.txt',
  //       destination: 'https://srv.adstxtmanager.com/29571/aungkyawnyunt.com',
  //       permanent: true,
  //     },
  //   ]
  // },
  compilerOptions: {
   noImplicitReturns: true,
   noImplicitAny: false,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    NEXT_PUBLIC_AppDomain:    process.env.NEXT_PUBLIC_AppDomain,
    NEXT_PUBLIC_ApiDomain:    process.env.NEXT_PUBLIC_ApiDomain,
    NEXT_PUBLIC_ImageDomain:  process.env.NEXT_PUBLIC_ImageDomain 
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_AppDomain:    process.env.NEXT_PUBLIC_AppDomain,
    NEXT_PUBLIC_ApiDomain:    process.env.NEXT_PUBLIC_ApiDomain,
    staticFolder: '/static',
  }
}

//module.exports = nextConfig;
