const items = [
  {
    title: "Браслет «Сверкающее сердце»",
    description: "Камень: кубический цирконий",
    tags: ["Браслет", "Silver"],
    price: 3320,
    img: "./img/1.jpg",
    rating: 4.4,
  },
  {
    title: "Серьги-кольца",
    description: "14-каратная позолоченная уникальная металлическая смесь",
    tags: ["Серьги"],
    price: 1900,
    img: "./img/2.jpg",
    rating: 4.1,
  },
  {
    title: "Браслет-цепочка",
    description: "Стерлинговое серебро",
    tags: ["Браслет", "Silver"],
    price: 1300,
    img: "./img/3.jpg",
    rating: 5.0,
  },
  {
    title: "Ожерелье",
    description: "Уникальная смесь металлов из 14-каратного розового золота",
    tags: ["Ожерелье", "Gold"],
    price: 1660,
    img: "./img/4.jpg",
    rating: 4.7,
  },
  {
    title: "Браслет-цепочка Pandora ME Link",
    description: "14-каратная позолоченная уникальная металлическая смесь",
    tags: ["Браслет", "Gold"],
    price: 1400,
    img: "./img/5.jpg",
    rating: 4.9,
  },
  {
    title: "Браслет-цепочка с шипами Pandora Momentsк",
    description: "14-каратная позолоченная уникальная металлическая смесь",
    tags: ["Браслет", "Gold"],
    price: 2200,
    img: "./img/6.jpg",
    rating: 4.2,
  },
  {
    title: "Браслет-бестселлер Pandora",
    description: "Стерлинговое серебро",
    tags: ["Браслет", "Silver"],
    price: 1300,
    img: "./img/7.jpg",
    rating: 4.9,
  },
  {
    title: "Ожерелье-подвеска Pandora Moments U-Shape Charm",
    description: "Стерлинговое серебро",
    tags: ["Ожерелье", "Silver"],
    price: 1500,
    img: "./img/8.jpg",
    rating: 4.4,
  },
  {
    title: "Ожерелье-подвеска Pandora Signature Intertwined Pavé",
    description: "Стерлинговое серебро",
    tags: ["Ожерелье", "Silver"],
    price: 1500,
    img: "./img/9.jpg",
    rating: 4.8,
  },
  {
    title: "Браслет-цепочка Sparkling Endless Hearts",
    description: "Стерлинговое серебро, кубический цирконий",
    tags: ["Браслет", "Silver"],
    price: 1800,
    img: "./img/10.jpg",
    rating: 4.2,
  },
  {
    title: "Двухцветный разделительный шарм дружбы Pandora",
    description: "Уникальная смесь стерлингового серебра и 14-каратного золота",
    tags: ["Шарм", "Silver"],
    price: 3500,
    img: "./img/11.jpg",
    rating: 3.7,
  },
  {
    title: "100-летие Диснея Симба Дангл Шарм",
    description: "Стерлинговое серебро и 14-каратное золото",
    tags: ["Шарм", "Silver"],
    price: 2800,
    img: "./img/12.jpg",
    rating: 4.1,
  },
];



let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}


renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}P`;

  const ratingContainer = item.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");
  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });
  return item;
}


const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();
  currentState = items.filter((el) => el.title.toLowerCase().includes(searchString));
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});
