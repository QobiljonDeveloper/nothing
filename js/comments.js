const commentsSkeletonEl = document.querySelector(".comments-skeleton");
const commentWrapperEl = document.querySelector(".comments-wrapper");

function fetchData(endpoint, callback, closeCommentsSkeleton) {
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
      closeCommentsSkeleton();
    });
}

function closeCommentsSkeleton() {
  commentsSkeletonEl.style.display = "none";
}

fetchData("/comments?limit=8", createComment, closeCommentsSkeleton);

function createComment(data) {
  console.log(data);
  data?.comments?.forEach((item) => {
    console.log(item);
    const cardEL = document.createElement("div");
    cardEL.className = "comments-card";

    cardEL.innerHTML = `
              <div class="comments-card__body">
                <h3>${item.body}</h3>
          <span>👍 ${item.likes}</span>
          <p>${item.user.fullName}</p>
              </div>
    `;

    commentWrapperEl.appendChild(cardEL);
  });
}

let offset = 0;

function seeMore() {
  offset++;
  commentsSkeletonEl.style.display = "grid";
  fetchData(
    `/comments?limit=4&skip=${offset * 4}`,
    createComment,
    closeCommentsSkeleton
  );
}
