document.addEventListener("DOMContentLoaded", function() {
  
 
  
    const cards = document.querySelectorAll('.card-small');

    const carouselSmall = document.querySelector(".carousel-small");
    const wrapperSmall = document.querySelector(".wrapper-small");

    
    const leftButton = document.getElementById('left');
    const RightButton = document.getElementById('right');

    
    const cardWidth = cards[0].getBoundingClientRect().width;
    let currentCardIndex = 0;

    const checkCarouselPosition = () => {
        if (currentCardIndex === 0) {
            // If the carousel is at the start, hide the left button
            leftButton.style.display = 'none';
        } else {
            // Otherwise, show the left button
            leftButton.style.display = 'block';
        }
    
        if (currentCardIndex >= cards.length-1) {
            // If the carousel is at the end, hide the right button
            RightButton.style.display = 'none';
        } else {
            // Otherwise, show the right button
            RightButton.style.display = 'block';
        }
    };
    
    leftButton.addEventListener('click', () => {
        if (currentCardIndex >= 0) {
            currentCardIndex--;
            carouselSmall.scrollLeft -= cardWidth;

        }
        checkCarouselPosition();
    });
    
    RightButton.addEventListener('click', () => {
        if (currentCardIndex < cards.length - 1) {
            currentCardIndex++;
            carouselSmall.scrollLeft += cardWidth;
        }

        checkCarouselPosition();
    });
    
  
    let isDragging = false,
        startX,
        startScrollLeft;
 
    let isDraggingSmall = false,
        startXSmall,
        startScrollLeftSmall,
        timeoutIdSmall;
 
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };
 
    const dragging = (e) => {
        if (!isDragging) return;
   
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
   
        if (newScrollLeft <= 0 || newScrollLeft >=
            carousel.scrollWidth - carousel.offsetWidth) {
            isDragging = false;
            return;
        }
   
        carousel.scrollLeft = newScrollLeft;
    };
 
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };
 
    const dragStartSmall = (e) => {
        isDraggingSmall = true;
        carouselSmall.classList.add("dragging");
        startXSmall = e.pageX;
        startScrollLeftSmall = carouselSmall.scrollLeft;
    };
 
    const draggingSmall = (e) => {
        if (!isDraggingSmall) return;
   
        const newScrollLeftSmall = startScrollLeftSmall - (e.pageX - startXSmall);
   
        if (newScrollLeftSmall <= 0 || newScrollLeftSmall >=
            carouselSmall.scrollWidth - carouselSmall.offsetWidth) {
            isDraggingSmall = false;
            return;
        }
   
        carouselSmall.scrollLeft = newScrollLeftSmall;
    };
 
    const dragStopSmall = () => {
        isDraggingSmall = false;
        carouselSmall.classList.remove("dragging");
    };
 

 

 
    carouselSmall.addEventListener("mousedown", dragStartSmall);
    carouselSmall.addEventListener("mousemove", draggingSmall);
    document.addEventListener("mouseup", dragStopSmall);
    wrapperSmall.addEventListener("mouseenter", () =>
        clearTimeout(timeoutIdSmall));
    checkCarouselPosition();



});
 