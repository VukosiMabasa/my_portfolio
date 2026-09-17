/* =========================================================
  VUKOSI MABASA PORTFOLIO
  JAVASCRIPT
========================================================= */


/* =========================================================
  MOBILE NAVIGATION
========================================================= */

const menuButton = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");

if (menuButton && navMenu) {

   menuButton.addEventListener("click", function () {

       navMenu.classList.toggle("active");

       const isOpen =
           navMenu.classList.contains("active");

       menuButton.setAttribute(
           "aria-expanded",
           isOpen
       );

       const icon =
           menuButton.querySelector("i");

       if (icon) {

           icon.classList.toggle(
               "fa-bars",
               !isOpen
           );

           icon.classList.toggle(
               "fa-xmark",
               isOpen
           );
       }

   });

}


/* =========================================================
  CLOSE MOBILE MENU AFTER CLICK
========================================================= */

const navLinks =
   document.querySelectorAll(".nav-links a");

const projectsSection =
   document.querySelector("#projects");

const revealProjects = function () {

   if (!projectsSection) return;

   projectsSection.classList.add("is-visible");

   setTimeout(function () {

       projectsSection.scrollIntoView({
           behavior: "smooth",
           block: "start"
       });

   }, 50);

};

navLinks.forEach(function (link) {

   link.addEventListener("click", function (event) {

       const targetId =
           link.getAttribute("href");

       if (targetId === "#projects") {

           event.preventDefault();
           revealProjects();
       }

       if (!navMenu) return;

       navMenu.classList.remove("active");

       if (menuButton) {

           menuButton.setAttribute(
               "aria-expanded",
               "false"
           );

           const icon =
               menuButton.querySelector("i");

           if (icon) {

               icon.classList.remove("fa-xmark");

               icon.classList.add("fa-bars");
           }
       }

   });

});

const primaryProjectCta =
   document.querySelector('a[href="#projects"].btn-primary');

if (primaryProjectCta) {

   primaryProjectCta.addEventListener("click", function (event) {

       event.preventDefault();
       revealProjects();

   });

}

const moreSkillsSection =
   document.getElementById("moreSkills");

const viewMoreButton =
   document.querySelector(".view-more-skills");

if (moreSkillsSection && viewMoreButton) {

   viewMoreButton.addEventListener("click", function () {

       const isOpen =
           moreSkillsSection.classList.toggle("is-open");

       viewMoreButton.classList.toggle("is-open", isOpen);
       viewMoreButton.setAttribute("aria-expanded", String(isOpen));

       viewMoreButton.querySelector("span").textContent =
           isOpen ? "Hide Skills" : "View More Skills";

   });

}


/* =========================================================
  ACTIVE NAVIGATION LINK
========================================================= */

const sections =
   document.querySelectorAll("section[id]");

const navigationLinks =
   document.querySelectorAll(".nav-links a");


const observerOptions = {

   root: null,

   rootMargin:
       "-30% 0px -60% 0px",

   threshold: 0

};


const sectionObserver =
   new IntersectionObserver(
       function (entries) {

           entries.forEach(function (entry) {

               if (entry.isIntersecting) {

                   navigationLinks.forEach(
                       function (link) {

                           link.classList.remove(
                               "active"
                           );

                           if (
                               link.getAttribute("href")
                               ===
                               "#" + entry.target.id
                           ) {

                               link.classList.add(
                                   "active"
                               );
                           }

                       }
                   );

               }

           });

       },
       observerOptions
   );


sections.forEach(function (section) {

   sectionObserver.observe(section);

});


/* =========================================================
  CURSOR GLOW
========================================================= */

const cursorGlow =
   document.querySelector(".cursor-glow");


if (
   cursorGlow &&
   window.matchMedia(
       "(pointer: fine)"
   ).matches
) {

   window.addEventListener(
       "mousemove",
       function (event) {

           cursorGlow.style.left =
               event.clientX + "px";

           cursorGlow.style.top =
               event.clientY + "px";

       }
   );

}


/* =========================================================
  PROJECT CARD TILT
========================================================= */

const projectCards =
   document.querySelectorAll(".project-card");


if (
   window.matchMedia(
       "(pointer: fine)"
   ).matches
) {

   projectCards.forEach(function (card) {

       card.addEventListener(
           "mousemove",
           function (event) {

               const rect =
                   card.getBoundingClientRect();

               const x =
                   event.clientX - rect.left;

               const y =
                   event.clientY - rect.top;

               const rotateY =
                   ((x / rect.width) - 0.5) * 4;

               const rotateX =
                   ((y / rect.height) - 0.5) * -4;

               card.style.transform =
                   `perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)`;

           }
       );


       card.addEventListener(
           "mouseleave",
           function () {

               card.style.transform = "";

           }
       );

   });

}


/* =========================================================
  SCROLL REVEAL
========================================================= */

const revealElements =
   document.querySelectorAll(
       ".skill-card, .project-card, .stat, .contact-item"
   );


const revealObserver =
   new IntersectionObserver(
       function (entries, observer) {

           entries.forEach(function (entry) {

               if (entry.isIntersecting) {

                   entry.target.classList.add(
                       "revealed"
                   );

                   observer.unobserve(
                       entry.target
                   );
               }

           });

       },
       {
           threshold: 0.1
       }
   );


revealElements.forEach(
   function (element) {

       element.style.opacity = "0";

       element.style.transform =
           "translateY(20px)";

       element.style.transition =
           "opacity .6s ease, transform .6s ease";

       revealObserver.observe(element);

   }
);


/* =========================================================
  REVEAL CLASS
========================================================= */

const revealStyle =
   document.createElement("style");

revealStyle.textContent = `

   .revealed {
       opacity: 1 !important;
       transform: translateY(0) !important;
   }

`;

document.head.appendChild(revealStyle);