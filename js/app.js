const usersSkeletonEl = document.querySelector(".users-skeleton");
const userWrapperEl = document.querySelector(".users-wrapper");

function fetchData(endpoint, callback, closeUserSkeleton) {
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
      closeUserSkeleton();
    });
}

function closeUserSkeleton() {
  usersSkeletonEl.style.display = "none";
}

fetchData("/users?limit=4", createUser, closeUserSkeleton);

function createUser(data) {
  data?.users?.forEach((item) => {
    console.log(item);
    const cardEL = document.createElement("div");
    cardEL.className = "users-card";

    cardEL.innerHTML = `
      <div class="users-card__img">
                <img src=${item.image} loading="lazy" alt="" />
              </div>
              <div class="users-card__body">
                <h3>${item.firstName} ${item.lastName}</h3>
                <p>${item.email}</p>
                <p>${item.age}</p>
                <p>${item.birthDate}</p>
                <p>${item.gender}</p>
                <p>${item.phone}</p>
              </div>
    `;

    userWrapperEl.appendChild(cardEL);
  });
}

let offset = 0;

function seeMore() {
  offset++;
  usersSkeletonEl.style.display = "grid";
  fetchData(`/users?limit=4&skip=${offset * 4}`, createUser, closeUserSkeleton);
}
