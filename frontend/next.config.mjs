/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
          beforeFiles: [
            // These rewrites are checked after headers/redirects
            // and before all files including _next/public files which
            // allows overriding page files
            {
                source: '/:path(_next/image)',
                destination: 'https://we-captured.kr/:path*',
            },
            // {
            //   source: '/:path*',
            //   destination: 'https://we-captured.kr/:path*',
              
            // },
          ],
          afterFiles: [
            // These rewrites are checked after pages/public files
            // are checked but before dynamic routes
            {
                source: '/:path([^/]+\.js)',
                destination: 'https://we-captured.kr/:path*',
            },
            {
                source: '/:path([^/]+\.css)',
                destination: 'https://we-captured.kr/:path*',
            },
          ],
          fallback: [
            // These rewrites are checked after both pages/public files
            // and dynamic routes are checked
            {
                source: '/:path*',
                destination: 'https://we-captured.kr/:path*',
            },
          ],
        }
      },
  };

export default nextConfig;
