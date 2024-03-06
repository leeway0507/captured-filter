/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.consortium.co.uk',
                pathname: '**',
            },
        ],
    },
}

export default nextConfig;


// "kream-phinf.pstatic.net",
//     "www.sevenstore.com",
//     "cdn.afew-store.com",
//     "d1r7wlqxs7xy7.cloudfront.net",
//     "www.urbanindustry.co.uk",
//     "www.18montrose.com",
//     "harresoe.com",
//     "media.endclothing.com",
//     "img.ssensemedia.com",