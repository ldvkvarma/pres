// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// 1. Scroll Smoother Initialization
const smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.2,
  effects: true,
  smoothTouch: 0.1
});

// 2. ScrollTo Navigation
window.scrollToSection = function (id) {
  const el = document.getElementById(id);
  if (el) {
    smoother.scrollTo(el, { duration: 1, ease: "power2.inOut" });
    setActiveNav(id);
  }
};

// 3. Nav Highlighting
const navLinks = document.querySelectorAll(".nav-link[data-link]");
const sectionIds = [
  'intro',
  'home',
  'about-us',
  'Zynga',
  'showcase',
  'works',
  'value',
  'collaboration',
  'contact'
];

function setActiveNav(id) {
  navLinks.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.link === id);
  });
}

sectionIds.forEach(id => {
  ScrollTrigger.create({
    trigger: `#${id}`,
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => setActiveNav(id),
    onEnterBack: () => setActiveNav(id),
  });
});

// 4. Section Cards Scroll Animation
document.querySelectorAll(".section-content").forEach(container => {
  const cards = container.querySelectorAll(".card");
  cards.forEach((card, i) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        x: i % 2 === 0 ? "-60vw" : "60vw",
        rotate: i % 2 === 0 ? -15 : 15
      },
      {
        x: 0,
        opacity: 1,
        rotate: 0,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 50%",
          scrub: true
        }
      }
    );
  });
});

// 5. Reveal Text Animation (staggered)
document.querySelectorAll(".reveal-text").forEach(container => {
  const elements = container.children.length
    ? container.children
    : [container]; // handle if applied directly to a single element

  gsap.from(elements, {
    y: 50,
    opacity: 0,
    ease: "power3.out",
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});

// 6. Banner Placeholder Scale-in
document.querySelectorAll(".banner-placeholder").forEach(el => {
  gsap.fromTo(
    el,
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    }
  );
});

// 7. Video Lightbox
const lightbox = document.getElementById("videoLightbox");
const lightboxVideo = document.getElementById("lightboxVideo");

document.querySelectorAll('.play-now-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.video;
    if (src) {
      lightbox.classList.add("active");
      lightboxVideo.src = src;
      lightboxVideo.currentTime = 0;
      lightboxVideo.play();
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxVideo.pause();
  lightboxVideo.src = "";
}

window.addEventListener("keydown", (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// 8. Password Modal Logic (Secure Auth)
const PASS_KEY = "site_pass_auth_v1";
const passwordModal = document.getElementById('authModal');
const passwordInput = document.getElementById('authPasswordInput');
const passwordSubmit = document.getElementById('authPasswordSubmit');
const passInfo = document.getElementById('authPassInfo');

if (sessionStorage.getItem(PASS_KEY) === "granted") {
  hideAuthModal();
} else {
  showAuthModal();
}

function showAuthModal() {
  passwordModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => passwordInput.focus(), 150);
}

function hideAuthModal() {
  passwordModal.style.display = 'none';
  document.body.style.overflow = '';
}

function verifyAuthPassword() {
  const userInput = passwordInput.value.trim();

  fetch('https://pres-2.onrender.com/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: userInput })
  })
  .then(res => {
    if (!res.ok) throw new Error("Invalid");
    return res.json();
  })
  .then(data => {
    sessionStorage.setItem(PASS_KEY, "granted");
    hideAuthModal();
  })
  .catch(() => {
    passInfo.textContent = "❌ Incorrect password. Please try again.";
    passwordInput.value = '';
    passwordInput.focus();
  });
}

passwordSubmit.addEventListener('click', verifyAuthPassword);
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    verifyAuthPassword();
  }
});
