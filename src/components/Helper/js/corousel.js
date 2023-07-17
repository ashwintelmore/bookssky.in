export default  ()=>{
    
    const corousel = document.querySelector('.corousel');
    
    // const corousel = document.querySelector(".corousel__track-controller")
    const track = document.querySelector(".corousel__track")
    const slides = Array.from(track.children);
    const previousBtn = document.querySelector(".corousel__button--left");
    const nextBtn = document.querySelector(".corousel__button--right");
    const slidesWidth = slides[0].getBoundingClientRect().width;
    const dotNav = document.querySelector(".corousole_nav");
    const dots = Array.from(dotNav.children)

    slides.forEach((slide, index) => {
        slide.style.left = slidesWidth * index + "px";
    });


    function targetSlide(track, currentSlide, targetSlide) {

        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');

    }
    function updateDots(currentDot, targetDot) {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }
    function hideShowBtns(slides, targetIndex, previousBtn, nextBtn) {
        if (targetIndex === 0) {
            previousBtn.classList.add("is-hidden");
            nextBtn.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            previousBtn.classList.remove("is-hidden");
            nextBtn.classList.add('is-hidden');
        } else {
            previousBtn.classList.remove("is-hidden");
            nextBtn.classList.remove('is-hidden');
        }

    }
    nextBtn.addEventListener('click', () => {
        const currentSilde = track.querySelector(".current-slide");
        const nextSlide = currentSilde.nextElementSibling;
        const currentDot = dotNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        targetSlide(track, currentSilde, nextSlide);
        updateDots(currentDot, nextDot)
        hideShowBtns(slides, nextIndex, previousBtn, nextBtn);
    })


    previousBtn.addEventListener('click', () => {
        const currentSilde = track.querySelector(".current-slide");
        const prevSlide = currentSilde.previousElementSibling;
        const currentDot = dotNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        targetSlide(track, currentSilde, prevSlide);
        updateDots(currentDot, prevDot)
        hideShowBtns(slides, prevIndex, previousBtn, nextBtn);
    })


    dotNav.addEventListener("click", e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSilde = track.querySelector('.current-slide');
        const currentDot = dotNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlideByDot = slides[targetIndex];

        targetSlide(track, currentSilde, targetSlideByDot);
        updateDots(currentDot, targetDot);

        hideShowBtns(slides, targetIndex, previousBtn, nextBtn);
    })

}