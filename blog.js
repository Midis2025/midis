document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blogs-container");

  try {
    const response = await fetch("https://devoted-captain-c1ad6bbc4b.strapiapp.com/api/blogs?populate=*");
    const result = await response.json();

    console.log("📌 Blogs API response:", result); // Debugging

    if (!result.data || result.data.length === 0) {
      container.innerHTML = "<p>No blogs available right now.</p>";
      return;
    }

    result.data.forEach(blog => {
      const blogId = blog.id;
      const attrs = blog.attributes || {};

      const title = attrs.title || "Untitled Blog";
      const description = attrs.shortDescription || "Read more about this article.";
      const imageUrl = attrs.image?.data?.attributes?.url;

      // ✅ If Strapi has an image, prepend domain, else use local placeholder
      const fullImageUrl = imageUrl
        ? `https://devoted-captain-c1ad6bbc4b.strapiapp.com${imageUrl}`
        : "./assets/images/blog-placeholder.jpg"; // <-- Use your local fallback image

      // Create blog card
      const card = document.createElement("div");
      card.classList.add("blog-card");

      card.innerHTML = `
        <img src="${fullImageUrl}" alt="${title}">
        <div class="blog-content">
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="blog-single.html?id=${blogId}">Read More →</a>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    container.innerHTML = "<p>Failed to load blogs. Please try again later.</p>";
  }
});
