/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "images.ctfassets.net"
            }
        ]
    }
    
}

module.exports = nextConfig
