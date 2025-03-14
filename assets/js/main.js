/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*===== ACTIVE AND REMOVE MENU =====*/
const navLinks = document.querySelectorAll(".nav__link");

function linkAction() {
  // Active link
  navLinks.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");

  // Remove menu mobile
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}

navLinks.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: false,
});

/*SCROLL HOME*/
sr.reveal(".home__title", {});
sr.reveal(".home__description", { delay: 200 });
sr.reveal(".home__download", { delay: 400 });
sr.reveal(".home__social", { delay: 600, interval: 200 });
sr.reveal(".home__img", { delay: 400 });

/*SCROLL FEATURES*/
sr.reveal(".feature__card", { interval: 200 });

/*SCROLL ABOUT*/
sr.reveal(".about__img", {});
sr.reveal(".about__subtitle", { delay: 200 });
sr.reveal(".about__text", { delay: 400 });
sr.reveal(".about__button", { delay: 600 });

/*SCROLL TESTIMONIALS*/
sr.reveal(".testimonial__card", { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal(".contact__input", { interval: 200 });
sr.reveal(".contact__button", { delay: 400 });
sr.reveal(".contact__info-item", { interval: 200 });

/*===== THEME TOGGLE =====*/
const themeButton = document.getElementById("iconMS");
const darkTheme = "dark-theme";
const iconTheme = "assets/img/sun.png";
const iconDark = "assets/img/moon.png";

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Validate if user previously chose a theme
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.src = selectedIcon === "sun" ? iconTheme : iconDark;
}

// Activate / deactivate the theme with the button
themeButton.addEventListener("click", () => {
  // Toggle the dark theme class
  document.body.classList.toggle(darkTheme);

  // Toggle the icon
  themeButton.src = themeButton.src.includes("moon.png") ? iconTheme : iconDark;

  // Save theme and icon to localStorage
  localStorage.setItem(
    "selected-theme",
    document.body.classList.contains(darkTheme) ? "dark" : "light"
  );
  localStorage.setItem(
    "selected-icon",
    themeButton.src.includes("sun.png") ? "sun" : "moon"
  );
});

/*===== FORM SUBMISSION =====*/
const form = document.getElementById("my-form");
const formButton = document.getElementById("my-form-button");
const formStatus = document.getElementById("my-form-status");

if (form) {
  async function handleSubmit(event) {
    event.preventDefault();

    // Change button text while submitting
    formButton.innerHTML = "<span>Sending...</span>";
    formButton.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.innerHTML =
          "Thanks for your message! We'll be in touch soon.";
        form.reset();

        // Auto-hide the status message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = "";
        }, 5000);
      } else {
        const json = await response.json();
        if (json.errors) {
          formStatus.innerHTML = json.errors
            .map((error) => error.message)
            .join(", ");
        } else {
          formStatus.innerHTML =
            "Oops! There was a problem submitting your form.";
        }
      }
    } catch (error) {
      formStatus.innerHTML = "Oops! There was a problem submitting your form.";
    }

    // Reset button
    formButton.innerHTML =
      '<span>Send Message</span><i class="bx bx-send"></i>';
    formButton.disabled = false;
  }

  form.addEventListener("submit", handleSubmit);
}

/*===== SCROLL ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/*===== LAZY LOADING IMAGES =====*/
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll(".screenshot__img");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          if (image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute("data-src");
          }
          imageObserver.unobserve(image);
        }
      });
    });

    lazyImages.forEach((image) => {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    lazyImages.forEach((image) => {
      if (image.dataset.src) {
        image.src = image.dataset.src;
        image.removeAttribute("data-src");
      }
    });
  }
});

/*===== BUBBLE BACKGROUND GENERATION =====*/
document.addEventListener("DOMContentLoaded", function () {
  const bubbleContainer = document.querySelector(".bubble-container");
  const bubbleCount = 30; // adjust number of bubbles as desired

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    // Random size between 20px and 80px
    const size = Math.floor(Math.random() * 60) + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    // Random horizontal starting position
    bubble.style.left = Math.floor(Math.random() * 100) + "%";
    // Random animation duration between 6s and 12s
    const duration = Math.floor(Math.random() * 6) + 6;
    bubble.style.animationDuration = `${duration}s`;
    // Random animation delay to avoid uniformity
    bubble.style.animationDelay = Math.random() * 5 + "s";
    bubbleContainer.appendChild(bubble);
  }
});

/*===== SLIDER FUNCTIONALITY =====*/
(function () {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const indicatorsContainer = document.querySelector(".indicators");

  const totalSlides = slides.length;
  const groupSize = 3;
  const groupCount = Math.ceil(totalSlides / groupSize);
  let currentGroup = 0;

  // Build indicator dots for each group
  function buildIndicators() {
    indicatorsContainer.innerHTML = "";
    for (let i = 0; i < groupCount; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === currentGroup) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentGroup = i;
        updateSlider();
      });
      indicatorsContainer.appendChild(dot);
    }
  }

  // Update slider by translating the slider track to show the current group
  function updateSlider() {
    const wrapperWidth = sliderWrapper.clientWidth;
    sliderTrack.style.transform = `translateX(-${
      currentGroup * wrapperWidth
    }px)`;

    // Update active indicator dot
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      if (i === currentGroup) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }

  // Navigation controls
  prevBtn.addEventListener("click", () => {
    currentGroup = currentGroup > 0 ? currentGroup - 1 : groupCount - 1;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentGroup = currentGroup < groupCount - 1 ? currentGroup + 1 : 0;
    updateSlider();
  });

  // Auto-slide every 3 seconds
  setInterval(() => {
    nextBtn.click();
  }, 3000);

  // Update on window resize
  window.addEventListener("resize", updateSlider);

  // Initialize
  buildIndicators();
  updateSlider();
})();

// document.addEventListener("DOMContentLoaded", function () {
//   const bubbleContainer = document.querySelector(".bubble-container");
//   // add z-index to bubble container
//   bubbleContainer.style.zIndex = 9;
//   const bubbleCount = 20;
//   for (let i = 0; i < bubbleCount; i++) {
//     const bubble = document.createElement("div");
//     bubble.classList.add("bubble");
//     const size = Math.floor(Math.random() * 50) + 20;
//     bubble.style.width = size + "px";
//     // add color
//     bubble.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
//     bubble.style.height = size + "px";
//     bubble.style.left = Math.random() * 100 + "%";
//     bubble.style.top = Math.random() * 100 + "%";
//     bubble.style.animationDuration = Math.random() * 4 + 8 + "s";
//     bubble.style.animationDelay = Math.random() * 5 + "s";
//     bubbleContainer.appendChild(bubble);
//   }
// });
