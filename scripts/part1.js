document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded and ready.");
   

firebase.initializeApp(firebaseConfig);
const picsRef = firebase.database().ref('pics');


picsRef.once('value').then(function(snapshot) {
var pics = snapshot.val();
// Update pics in the HTML
if (pics['THE FINAL']) {
document.getElementById('final-img').src = pics['THE FINAL'];
}
if (pics['THE KNOCKOUT STAGE']) {
document.getElementById('knockout-img').src = pics['THE KNOCKOUT STAGE'];
}
if (pics['THE GROUP STAGE']) {
document.getElementById('groupstage-img').src = pics['THE GROUP STAGE'];
}
});
}); 
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fetch data from Firebase Realtime Database
async function fetchData() {
    const snapshot = await database.ref('pics').once('value');
    const data = snapshot.val();
    console.log(data);

    const carouselContent = document.getElementById('carousel-content');
    for (const [key, value] of Object.entries(data)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="card-small">
                <div class="img-small">
                    <img src="${value}" alt="${key}" draggable="false">
                </div>
                <p class="landing-para">${key}</p>
            </div>
        `;
        carouselContent.appendChild(li);
    }

    initializeCarousel();
}

function initializeCarousel() {
    const carouselSmall = document.querySelector(".carousel-small");
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    let currentCardIndex = 0;

    const checkCarouselPosition = () => {
        const cards = document.querySelectorAll('.card-small');
        console.log('Checking carousel position:', currentCardIndex);
        if (currentCardIndex === 0) {
            leftButton.style.display = 'none';
        } else {
            leftButton.style.display = 'block';
        }

        if (currentCardIndex >= cards.length - 1) {
            rightButton.style.display = 'none';
        } else {
            rightButton.style.display = 'block';
        }
    };

    leftButton.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            carouselSmall.scrollLeft -= carouselSmall.firstElementChild.getBoundingClientRect().width;
            console.log('Left button clicked:', currentCardIndex);
        }
        checkCarouselPosition();
    });

    rightButton.addEventListener('click', () => {
        if (currentCardIndex < document.querySelectorAll('.card-small').length - 1) {
            currentCardIndex++;
            carouselSmall.scrollLeft += carouselSmall.firstElementChild.getBoundingClientRect().width;
            console.log('Right button clicked:', currentCardIndex);
        }
        checkCarouselPosition();
    });

    checkCarouselPosition();

    let isDragging = false,
        startX,
        startScrollLeft;

    const dragStart = (e) => {
        isDragging = true;
        carouselSmall.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carouselSmall.scrollLeft;
        console.log('Drag start');
    };

    const dragging = (e) => {
        if (!isDragging) return;
        const x = e.pageX - startX;
        carouselSmall.scrollLeft = startScrollLeft - x;
        console.log('Dragging');
    };

    const dragStop = () => {
        isDragging = false;
        carouselSmall.classList.remove("dragging");
        console.log('Drag stop');
    };

    carouselSmall.addEventListener("mousedown", dragStart);
    carouselSmall.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
}

document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});