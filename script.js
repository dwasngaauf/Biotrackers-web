// ================= SLIDER AWARDS =================
let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
  // xử lý vòng lặp
  if (index >= totalSlides) currentSlide = 0;
  if (index < 0) currentSlide = totalSlides - 1;

  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === currentSlide) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);
}

// Auto slide (tự chạy)
let autoSlide = setInterval(nextSlide, 6000);

// Pause khi hover
const slider = document.querySelector(".slider");

slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", () => {
  autoSlide = setInterval(nextSlide, 6000);
});
