const API_KEY = "17dee48b-5886-40d2-97bb-c550ae1afe1b";

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=4";

const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;

const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

const spanError = document.querySelector("#error");

const loadRandomCats = async () => {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un Error: " + res.status + data.message;
  } else {
    const img1 = document.querySelector("#img1");
    const img2 = document.querySelector("#img2");
    const img3 = document.querySelector("#img3");
    const img4 = document.querySelector("#img4");
    const btn1 = document.querySelector("#btn1");
    const btn2 = document.querySelector("#btn2");
    const btn3 = document.querySelector("#btn3");
    const btn4 = document.querySelector("#btn4");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;

    btn1.onclick = () => saveFavoriteCat(data[0].id);
    btn2.onclick = () => saveFavoriteCat(data[1].id);
    btn3.onclick = () => saveFavoriteCat(data[2].id);
    btn4.onclick = () => saveFavoriteCat(data[3].id);
  }
};

const loadFavoriteCats = async () => {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("favorite");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un Error: " + res.status + data.message;
  } else {
    const section = document.getElementById("FavoriteCats");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Mi michi colección");
    const div = document.createElement("div");
    div.classList.add("container")
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((cat) => {
      const article = document.createElement("article");
      article.classList.add("card");
      const img = document.createElement("img");
      img.classList.add("photo");
      const btn = document.createElement("button");
      btn.classList.add("delete");
      const btnText = document.createTextNode("X");

      btn.appendChild(btnText);
      btn.onclick = () => removeFavoriteCat(cat.id);
      img.src = cat.image.url;
      article.appendChild(btn);
      article.appendChild(img);
      div.appendChild(article);
      section.appendChild(div);
    });
  }
};

const saveFavoriteCat = async (id) => {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("save");
  console.log(res);
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un Error: " + res.status + data.message;
  } else {
    loadFavoriteCats();
  }
};

const removeFavoriteCat = async (id) => {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un Error: " + res.status + data.message;
  } else {
    console.log("Eliminado en favoritos");
    loadFavoriteCats();
  }
};

async function uploadCatPhoto() {
  const form = document.querySelector("#uploadingForm");
  const formData = new FormData(form);
  console.log(formData.get("file"));

  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      //'Content-Type': 'multipart/form-data',
      "X-API-KEY": "17dee48b-5886-40d2-97bb-c550ae1afe1b",
    },
    body: formData,
  });

  const data = await res.json();

  console.log("save");
  console.log(res);
  if (res.status !== 201) {
    spanError.innerHTML = "Hubo un Error: " + res.status + data.message;
  } else {
    console.log("subio");
    loadFavoriteCats();
    saveFavoriteCat(data.id);
  }
}

loadRandomCats();
loadFavoriteCats();
