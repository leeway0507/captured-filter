/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.consortium.co.uk',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'media.endclothing.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'www.urbanindustry.co.uk',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'www.harresoe.com',
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