// script.js
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    const slideCount = slides.length;
  
    function updateSlides(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlides(currentIndex);
    });
  
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlides(currentIndex);
    });
  
    // Auto-play cada 5 segundos
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlides(currentIndex);
    }, 5000);
  });
  