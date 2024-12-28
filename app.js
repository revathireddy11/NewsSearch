const apikey = '6492f71f7165462f896cafb210bc136e';

const blogContainer = document.getElementById("blog-container");
const searchField = document.querySelector(".search-input");
const searcButton = document.querySelector(".search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=15&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching random news.", error);
        return[];
    }
}

searcButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if(query != "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch(error) {
            console.error("Error fetching news by query", error);
            
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error) {
        console.error("Error fetching random news.", error);
        return[];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 10) + "..." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch(error) {
        console.error("Error fetching random news", error);
    }
})();