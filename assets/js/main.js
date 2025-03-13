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

/*===== INITIALIZE SWIPER =====*/
document.addEventListener("DOMContentLoaded", function () {
  const swiperContainer = document.querySelector(".swiper-container");

  if (swiperContainer) {
    const swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide: 1,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // Responsive breakpoints
      breakpoints: {
        // when window width is <= 576px
        576: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is <= 768px
        768: {
          slidesPerView: "auto",
          spaceBetween: 30,
        },
      },
    });
  }
});

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
