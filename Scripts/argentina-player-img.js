// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7xlna3AUhnAQ-ucRWyJkbP-LHgwiXHq0",
  authDomain: "fifa2022-1f27d.firebaseapp.com",
  databaseURL: "https://fifa2022-1f27d-default-rtdb.firebaseio.com",
  projectId: "fifa2022-1f27d",
  storageBucket: "fifa2022-1f27d.appspot.com",
  messagingSenderId: "970965857308",
  appId: "1:970965857308:web:a9ce29ca1d40e299b81bd9",
  measurementId: "G-L1LYGV2C12",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("image-container");
  const categories = [
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Forward",
    "Manager",
  ];

  // Fetch player images from JSON
  fetch("../Server/argentina-player-img.json")
    .then((response) => response.json())
    .then((imageData) => {
      categories.forEach((category) => {
        database
          .ref(`PlayerNames/argentina/${category}`)
          .once("value")
          .then((snapshot) => {
            const players = snapshot.val();
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("category");

            const heading = document.createElement("h2");
            heading.textContent = category;
            categoryDiv.appendChild(heading);

            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");

            const images = imageData[category];
            Object.values(players).forEach((player, index) => {
              const card = document.createElement("div");
              card.classList.add("card");

              // Add the flag image
              const flag = document.createElement("div");
              flag.classList.add("flag-arg");
              card.appendChild(flag);

              const img = document.createElement("img");
              img.src = images[index] || "placeholder_image.jpg";
              img.alt = "Player Image";
              img.loading = "lazy";

              const firstNameDiv = document.createElement("div");
              firstNameDiv.textContent = player.firstName;
              firstNameDiv.classList.add("first-name");

              const lastNameDiv = document.createElement("div");
              lastNameDiv.textContent = player.lastName;
              lastNameDiv.classList.add("last-name");

              const positionDiv = document.createElement("div");
              positionDiv.textContent = player.position;
              positionDiv.classList.add("position");

              card.appendChild(img);
              card.appendChild(firstNameDiv);
              card.appendChild(lastNameDiv);
              card.appendChild(positionDiv);

              cardContainer.appendChild(card);
            });

            categoryDiv.appendChild(cardContainer);
            container.appendChild(categoryDiv);
          })
          .catch((error) => console.error("Error fetching data:", error));
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});
