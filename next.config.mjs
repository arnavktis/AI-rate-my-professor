/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      PINECONE_API_KEY: process.env.PINECONE_API_KEY,
      PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
      PINECONE_INDEX: process.env.PINECONE_INDEX,
      NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
  };
  
  export default nextConfig;