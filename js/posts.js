const postsSkeletonEl = document.querySelector(".posts-skeleton");
const postsWrapperEl = document.querySelector(".posts-wrapper");

function fetchData(endpoint, callback, closePostsSkeleton) {
  const promise = fetch(`https://dummyjson.com${endpoint}`);

  promise
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nmadur xatolik yuz berdi");
      }
      return response.json();
    })
    .then((res) => callback(res))
    .catch((err) => console.log(err))
    .finally(() => {
      closePostsSkeleton();
    });
}

function closePostsSkeleton() {
  postsSkeletonEl.style.display = "none";
}

fetchData("/posts?limit=4", createPosts, closePostsSkeleton);

function createPosts(data) {
  data?.posts?.forEach((item) => {
    const cardEL = document.createElement("div");
    cardEL.className = "posts-card";

    const tagsHTML = item.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join(" ");

    cardEL.innerHTML = `
      <div class="posts-card__body">
        <h3>${item.title}</h3>
        <p>${item.body}</p>

        <div class="posts-card__tags">
          ${tagsHTML}
        </div>

        <div class="posts-card__info">
          <p><strong>Views:</strong> ${item.views}</p>
        </div>

        <div class="posts-card__reactions">
          <span>👍 ${item.reactions.likes}</span>
          <span>👎 ${item.reactions.dislikes}</span>
        </div>
      </div>
    `;

    postsWrapperEl.appendChild(cardEL);
  });
}

let offset = 0;

function seeMore() {
  offset++;
  postsSkeletonEl.style.display = "grid";
  fetchData(
    `/posts?limit=4&skip=${offset * 4}`,
    createPosts,
    closePostsSkeleton
  );
}
