// vercel-build.js
import fs from "fs";
import fetch from "node-fetch";

const STRAPI_URL = "https://devoted-captain-c1ad6bbc4b.strapiapp.com/api/blogs?populate=*";

async function fetchBlogs() {
  try {
    console.log("📡 Fetching latest blogs from Strapi...");

    const res = await fetch(STRAPI_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    const data = await res.json();

    // Save blogs.json inside "public" (Vercel serves this folder)
    fs.mkdirSync("public", { recursive: true });
    fs.writeFileSync("public/blogs.json", JSON.stringify(data, null, 2));

    console.log("✅ blogs.json updated successfully!");
  } catch (err) {
    console.error("❌ Error updating blogs.json:", err);
    process.exit(1);
  }
}

fetchBlogs();
