const API_BASE_URL = "https://example.com/api"; // استبدل بعنوان API الخاص بك

// عناصر DOM
const navbar = document.getElementById("navbar");
const gamesList = document.getElementById("gamesList");
const details = document.getElementById("details");

// جلب الفئات من API
async function fetchCategories() {
  try {
    const response = await fetch(`https://www.freetogame.com/api/games?category=${category}`);
    const categories = await response.json();

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.dataset.category = category.id;
      button.onclick = () => fetchGames(category.id);
      navbar.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// جلب الألعاب بناءً على الفئة
async function fetchGames(categoryId) {
  try {
    details.style.display = "none";
    gamesList.innerHTML = ""; // تفريغ القائمة

    const response = await fetch(`https://www.freetogame.com/api/games?category=${categoryId}`);
    const games = await response.json();

    games.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.className = "game-card";
      gameCard.textContent = game.name;
      gameCard.onclick = () => fetchGameDetails(game.id);
      gamesList.appendChild(gameCard);
    });
  } catch (error) {
    console.error("Error fetching games:", error);
  }
}

// جلب تفاصيل اللعبة
async function fetchGameDetails(gameId) {
  try {
    gamesList.innerHTML = ""; // إخفاء قائمة الألعاب
    const response = await fetch(`https://www.freetogame.com/api/game?id=${gameId}`);
    const game = await response.json();

    details.style.display = "block";
    details.innerHTML = `
      <h2>${game.name}</h2>
      <p>${game.description}</p>
      <button onclick="goBack()">عودة</button>
    `;
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
}

// الرجوع للقائمة
function goBack() {
  details.style.display = "none";
  gamesList.innerHTML = ""; // إعادة ملء الألعاب
}

// تهيئة الصفحة
fetchCategories();
