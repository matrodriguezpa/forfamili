// script.js

// 1) Define your slides in one place:
const slides = [
  { src: 'images/slideshow/foto1.jpg', caption: 'Duvan es puto' },
  { src: 'images/slideshow/foto2.jpg', caption: 'Caption Two' },
  { src: 'images/slideshow/foto3.jpg', caption: 'Caption Three' }
];

let slideIndex = 1;
const container     = document.querySelector('.slideshow-container');
const dotsContainer = document.querySelector('.dots-container');
const prevBtn       = container.querySelector('.prev');
const nextBtn       = container.querySelector('.next');

// 2) Build slides + dots dynamically:
//    insert each slide *before* the prev button (so controls stay at bottom)
slides.forEach((s, i) => {
  const slide = document.createElement('div');
  slide.className = 'mySlides fade';
  slide.innerHTML = `
    <div class="numbertext">${i + 1} / ${slides.length}</div>
    <img src="${s.src}">
    <div class="text">${s.caption}</div>
  `;
  container.insertBefore(slide, prevBtn);

  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.addEventListener('click', () => currentSlide(i + 1));
  dotsContainer.appendChild(dot);
});

// 3) Wire up prev/next buttons (now in your HTML)
prevBtn.addEventListener('click', () => plusSlides(-1));
nextBtn.addEventListener('click', () => plusSlides(1));

// 4) Core slideshow logic:
function plusSlides(n)    { showSlides(slideIndex += n); }
function currentSlide(n)  { showSlides(slideIndex  = n); }

function showSlides(n) {
  const slideEls = document.getElementsByClassName("mySlides");
  const dotEls   = document.getElementsByClassName("dot");

  if (n > slideEls.length) slideIndex = 1;
  if (n < 1)                slideIndex = slideEls.length;

  Array.from(slideEls).forEach(s => s.style.display = "none");
  Array.from(dotEls).forEach(d => d.classList.remove("active"));

  slideEls[slideIndex - 1].style.display = "block";
  dotEls[slideIndex - 1].classList.add("active");
}

// 5) Kick off on DOM ready:
document.addEventListener('DOMContentLoaded', () => showSlides(slideIndex));
