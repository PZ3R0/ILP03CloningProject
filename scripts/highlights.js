

document.addEventListener("DOMContentLoaded", function() { 

    // console.log("Its working")
	const carousel = document.querySelector(".carousel"); 
	const arrowBtns = document.querySelectorAll(".wrapper i"); 
	const wrapper = document.querySelector(".wrapper"); 

	const carouselSmall = document.querySelector(".carousel-small"); 
	const arrowBtnsSmall = document.querySelectorAll(".wrapper-small i"); 
	const wrapperSmall = document.querySelector(".wrapper-small"); 

	const firstCard = carousel.querySelector(".card"); 
	// const firstCardWidth = firstCard.offsetWidth;
    // console.log(firstCardWidth)
    const firstCardWidth = 400 

	const firstCardSmall = carouselSmall.querySelector(".card-small"); 
    // console.log(firstCardSmall)
	// const firstCardSmallWidth = firstCardSmall.offsetWidth; 
    // console.log(firstCardSmallWidth)
    const firstCardSmallWidth = 280

	let isDragging = false, 
		startX, 
		startScrollLeft, 
		timeoutId; 

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

	const autoPlay = () => { 
		if (window.innerWidth < 800) return; 
		
		const totalCardWidth = carousel.scrollWidth; 
		const maxScrollLeft = totalCardWidth - carousel.offsetWidth; 
		
		if (carousel.scrollLeft >= maxScrollLeft) return; 
		
		timeoutId = setTimeout(() => 
			carousel.scrollLeft += firstCardWidth, 2500); 
	}; 

	const autoPlaySmall = () => { 
		if (window.innerWidth < 800) return; 
		
		const totalCardSmallWidth = carouselSmall.scrollWidth; 
		const maxScrollLeftSmall = totalCardSmallWidth - carouselSmall.offsetWidth; 
		
		if (carouselSmall.scrollLeft >= maxScrollLeftSmall) return; 
		
		timeoutIdSmall = setTimeout(() => 
			carouselSmall.scrollLeft += firstCardSmallWidth, 2500); 
	}; 

	carousel.addEventListener("mousedown", dragStart); 
	carousel.addEventListener("mousemove", dragging); 
	document.addEventListener("mouseup", dragStop); 
	wrapper.addEventListener("mouseenter", () => 
		clearTimeout(timeoutId)); 
	wrapper.addEventListener("mouseleave", autoPlay); 

	carouselSmall.addEventListener("mousedown", dragStartSmall); 
	carouselSmall.addEventListener("mousemove", draggingSmall); 
	document.addEventListener("mouseup", dragStopSmall); 
	wrapperSmall.addEventListener("mouseenter", () => 
		clearTimeout(timeoutIdSmall)); 
	wrapperSmall.addEventListener("mouseleave", autoPlaySmall); 

	arrowBtns.forEach(btn => { 
		btn.addEventListener("click", () => { 
			carousel.scrollLeft += btn.id === "left" ? 
				-firstCardWidth : firstCardWidth; 
		}); 
	}); 

	arrowBtnsSmall.forEach(btn => { 
		btn.addEventListener("click", () => { 
			carouselSmall.scrollLeft += btn.id === "left" ? 
				-firstCardSmallWidth : firstCardSmallWidth; 
		}); 
	}); 
}); 
