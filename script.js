/* =========================================================
   NOVA — FAST & SMOOTH INTERACTION ENGINE
   FINAL FULL FUNCTIONAL VERSION
   Original functionality preserved
   Duplicate login/modal systems removed
========================================================= */

"use strict";


/* =========================================================
   SELECTORS
========================================================= */

const body = document.body;

const navbar = document.querySelector(".navbar");

const mobileMenu = document.getElementById("mobileMenu");
const mobileNav = document.getElementById("mobileNav");

const themeToggle = document.getElementById("themeToggle");

const faqItems = document.querySelectorAll(".faq-item");

const billingButtons =
    document.querySelectorAll(".billing-option");

const dashboard =
    document.querySelector(".dashboard-window");

const aiInput =
    document.querySelector(".ai-input");

const aiInputText =
    aiInput?.querySelector("span");

const aiInputButton =
    aiInput?.querySelector("button");

const navLinks =
    document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const newProject =
    document.querySelector(
        ".new-project"
    );

const reviewButton =
    document.querySelector(
        ".ai-suggestion button"
    );


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {

    mobileNav?.classList.remove("open");

    mobileMenu?.classList.remove("active");

    body.classList.remove("menu-open");

}


function toggleMobileMenu() {

    if (!mobileNav || !mobileMenu) {
        return;
    }


    const isOpen =
        mobileNav.classList.toggle("open");


    mobileMenu.classList.toggle(
        "active",
        isOpen
    );


    body.classList.toggle(
        "menu-open",
        isOpen
    );

}


mobileMenu?.addEventListener(
    "click",
    toggleMobileMenu
);


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !mobileNav ||
            !mobileMenu
        ) {
            return;
        }


        if (
            !mobileNav.classList.contains("open")
        ) {
            return;
        }


        const insideMenu =
            mobileNav.contains(event.target);


        const insideButton =
            mobileMenu.contains(event.target);


        if (
            !insideMenu &&
            !insideButton
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

let ticking = false;


function updateNavbar() {

    if (!navbar) {
        return;
    }


    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 25
    );


    ticking = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateNavbar
            );

            ticking = true;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   THEME SYSTEM
========================================================= */

const savedTheme =
    localStorage.getItem(
        "nova-theme"
    );


if (
    savedTheme === "light"
) {

    body.classList.add(
        "light-mode"
    );

}


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }


    const isLight =
        body.classList.contains(
            "light-mode"
        );


    themeToggle.textContent =
        isLight
            ? "☀"
            : "☾";


    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
    );


    themeToggle.setAttribute(
        "title",
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
    );

}


themeToggle?.addEventListener(
    "click",
    () => {

        body.classList.toggle(
            "light-mode"
        );


        const theme =
            body.classList.contains(
                "light-mode"
            )
                ? "light"
                : "dark";


        localStorage.setItem(
            "nova-theme",
            theme
        );


        updateThemeIcon();

    }
);


/* =========================================================
   FAQ ACCORDION
========================================================= */

faqItems.forEach(
    item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) {
            return;
        }


        question.addEventListener(
            "click",
            () => {

                const wasOpen =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "active"
                        );

                    }
                );


                if (!wasOpen) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   BILLING TOGGLE
========================================================= */

const pricingData = {

    monthly: {

        creator: "19",

        scale: "49"

    },

    yearly: {

        creator: "15",

        scale: "39"

    }

};


function updatePricing(
    billing
) {

    const prices =
        pricingData[billing] ||
        pricingData.monthly;


    document
        .querySelectorAll(".price-card")
        .forEach(
            card => {

                const heading =
                    card.querySelector(
                        "h3"
                    );


                const price =
                    card.querySelector(
                        ".price-value strong, .monthly-price strong"
                    );


                if (
                    !heading ||
                    !price
                ) {
                    return;
                }


                const plan =
                    heading.textContent
                        .trim()
                        .toLowerCase();


                if (
                    plan.includes(
                        "creator"
                    )
                ) {

                    price.textContent =
                        prices.creator;

                }


                if (
                    plan.includes(
                        "scale"
                    )
                ) {

                    price.textContent =
                        prices.scale;

                }

            }
        );

}


billingButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                billingButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const billing =
                    button.dataset.billing ||
                    "monthly";


                updatePricing(
                    billing
                );

            }
        );

    }
);


const activeBilling =
    document.querySelector(
        ".billing-option.active"
    );


updatePricing(
    activeBilling?.dataset.billing ||
    "monthly"
);


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    closeMobileMenu();


                    const navHeight =
                        navbar?.offsetHeight ||
                        0;


                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        navHeight
                        -
                        20;


                    window.scrollTo({

                        top:
                            Math.max(
                                0,
                                targetPosition
                            ),

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const currentId =
                            entry.target.id;


                        navLinks.forEach(
                            link => {

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    href ===
                                    `#${currentId}`
                                );

                            }
                        );

                    }
                );

            },
            {

                rootMargin:
                    "-35% 0px -55% 0px",

                threshold:
                    0

            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================================
   DASHBOARD 3D MICRO INTERACTION
========================================================= */

if (
    dashboard &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    let rafId = null;


    dashboard.addEventListener(
        "pointermove",
        event => {

            if (rafId) {
                return;
            }


            rafId =
                requestAnimationFrame(
                    () => {

                        const rect =
                            dashboard.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height;


                        const rotateY =
                            (x - 0.5) * 4;


                        const rotateX =
                            (y - 0.5) * -4;


                        dashboard.style.transform =
                            `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;


                        rafId = null;

                    }
                );

        },
        {
            passive: true
        }
    );


    dashboard.addEventListener(
        "pointerleave",
        () => {

            dashboard.style.transform =
                "rotateY(-3deg) rotateX(2deg)";

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        `
        .feature-card,
        .price-card,
        .step,
        .testimonial-section,
        .workflow-window
        `
    );


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
) {

    revealElements.forEach(
        element => {

            element.style.opacity =
                "0";


            element.style.transform =
                "translateY(24px)";


            element.style.transition =
                "opacity .65s ease, transform .65s cubic-bezier(.22,1,.36,1)";

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        revealObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {

                threshold:
                    0.08,

                rootMargin:
                    "0px 0px -50px 0px"

            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.style.opacity =
                "1";


            element.style.transform =
                "none";

        }
    );

}


/* =========================================================
   AI ASSISTANT DEMO
========================================================= */

if (
    aiInput &&
    aiInputButton &&
    aiInputText
) {

    aiInputButton.addEventListener(
        "click",
        () => {

            if (
                aiInputButton.disabled
            ) {
                return;
            }


            aiInputText.textContent =
                "Thinking...";


            aiInputButton.disabled =
                true;


            setTimeout(
                () => {

                    aiInputText.textContent =
                        "Your AI response is ready ✦";


                    aiInputButton.disabled =
                        false;

                },
                1000
            );

        }
    );


    aiInput.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    "button"
                )
            ) {
                return;
            }


            aiInputText.textContent =
                "Ask NOVA anything...";

        }
    );

}


/* =========================================================
   DEMO PROJECT BUTTON
========================================================= */

if (newProject) {

    newProject.setAttribute(
        "aria-live",
        "polite"
    );


    newProject.addEventListener(
        "click",
        () => {

            if (
                newProject.disabled
            ) {
                return;
            }


            const original =
                newProject.textContent;


            newProject.textContent =
                "Creating...";


            newProject.disabled =
                true;


            setTimeout(
                () => {

                    newProject.textContent =
                        "Project created ✓";


                    setTimeout(
                        () => {

                            newProject.textContent =
                                original;


                            newProject.disabled =
                                false;

                        },
                        1400
                    );

                },
                700
            );

        }
    );

}


/* =========================================================
   AI SUGGESTION BUTTON
========================================================= */

if (reviewButton) {

    reviewButton.addEventListener(
        "click",
        () => {

            const original =
                reviewButton.textContent;


            reviewButton.textContent =
                "Opened ✓";


            setTimeout(
                () => {

                    reviewButton.textContent =
                        original;

                },
                1200
            );

        }
    );

}


/* =========================================================
   NOVA AUTH SYSTEM
   ONE SYSTEM ONLY
   LOGIN + CREATE ACCOUNT
========================================================= */

let activeNovaAuth =
    null;


/* =========================================================
   CLOSE AUTH SCREEN
========================================================= */

function closeNovaAuth() {

    if (!activeNovaAuth) {
        return;
    }


    const screen =
        activeNovaAuth;


    activeNovaAuth =
        null;


    screen.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";


    setTimeout(
        () => {

            if (
                screen &&
                screen.parentNode
            ) {

                screen.remove();

            }

        },
        250
    );

}


/* =========================================================
   CREATE ACCOUNT SCREEN
========================================================= */

function novaCreateAccount(
    plan = ""
) {

    /* Remove any existing auth screen */

    if (activeNovaAuth) {

        activeNovaAuth.remove();

        activeNovaAuth = null;

    }


    const old =
        document.querySelector(
            ".nova-auth-screen"
        );


    if (old) {
        old.remove();
    }


    const screen =
        document.createElement(
            "div"
        );


    screen.className =
        "nova-auth-screen";


    screen.innerHTML = `

        <div class="nova-auth-backdrop"></div>

        <div
            class="nova-auth-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="novaCreateTitle"
        >

            <button
                class="nova-auth-close"
                type="button"
                aria-label="Close"
            >
                ×
            </button>


            <div class="nova-auth-brand">

                <span>N</span>

                <strong>NOVA</strong>

            </div>


            <div class="nova-auth-heading">

                <small>
                    GET STARTED
                </small>


                <h1 id="novaCreateTitle">
                    Create your account
                </h1>


                <p>
                    Start building faster with NOVA.
                    Create your free workspace in seconds.
                </p>

            </div>


            ${
                plan
                    ? `
                        <div class="nova-selected-plan">
                            Selected plan:
                            <strong>${plan}</strong>
                        </div>
                      `
                    : ""
            }


            <form class="nova-auth-form">

                <label>

                    Full name

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        autocomplete="name"
                        required
                    >

                </label>


                <label>

                    Email address

                    <input
                        type="email"
                        placeholder="you@example.com"
                        autocomplete="email"
                        required
                    >

                </label>


                <label>

                    Password

                    <input
                        type="password"
                        placeholder="Create a password"
                        autocomplete="new-password"
                        minlength="6"
                        required
                    >

                </label>


                <button
                    type="submit"
                    class="nova-auth-submit"
                >
                    Create account →
                </button>

            </form>


            <div class="nova-auth-footer">

                Already have an account?

                <button
                    type="button"
                    class="nova-switch-login"
                >
                    Log in
                </button>

            </div>


            <div class="nova-auth-note">

                Free to start · No credit card required

            </div>

        </div>
    `;


    document.body.appendChild(
        screen
    );


    activeNovaAuth =
        screen;


    document.body.style.overflow =
        "hidden";


    requestAnimationFrame(
        () => {

            screen.classList.add(
                "show"
            );

        }
    );


    /* -----------------------------------------------------
       CLOSE BUTTON
    ----------------------------------------------------- */

    screen
        .querySelector(
            ".nova-auth-close"
        )
        ?.addEventListener(
            "click",
            closeNovaAuth
        );


    /* -----------------------------------------------------
       BACKDROP
    ----------------------------------------------------- */

    screen
        .querySelector(
            ".nova-auth-backdrop"
        )
        ?.addEventListener(
            "click",
            closeNovaAuth
        );


    /* -----------------------------------------------------
       SWITCH TO LOGIN
    ----------------------------------------------------- */

    screen
        .querySelector(
            ".nova-switch-login"
        )
        ?.addEventListener(
            "click",
            () => {

                screen.remove();

                activeNovaAuth =
                    null;

                document.body.style.overflow =
                    "";

                novaLogin();

            }
        );


    /* -----------------------------------------------------
       CREATE ACCOUNT
    ----------------------------------------------------- */

    const form =
        screen.querySelector(
            ".nova-auth-form"
        );


    form?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const button =
                form.querySelector(
                    ".nova-auth-submit"
                );


            if (!button) {
                return;
            }


            button.disabled =
                true;


            button.textContent =
                "Creating account...";


            setTimeout(
                () => {

                    button.textContent =
                        "Account created ✓";


                    setTimeout(
                        () => {

                            closeNovaAuth();

                        },
                        1000
                    );

                },
                1000
            );

        }
    );


    /* -----------------------------------------------------
       FOCUS FIRST INPUT
    ----------------------------------------------------- */

    setTimeout(
        () => {

            screen
                .querySelector(
                    "input"
                )
                ?.focus();

        },
        150
    );

}


/* =========================================================
   LOGIN SCREEN
========================================================= */

function novaLogin() {

    /* Remove any existing auth screen */

    if (activeNovaAuth) {

        activeNovaAuth.remove();

        activeNovaAuth = null;

    }


    const old =
        document.querySelector(
            ".nova-auth-screen"
        );


    if (old) {
        old.remove();
    }


    const screen =
        document.createElement(
            "div"
        );


    screen.className =
        "nova-auth-screen";


    screen.innerHTML = `

        <div class="nova-auth-backdrop"></div>

        <div
            class="nova-auth-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="novaLoginTitle"
        >

            <button
                class="nova-auth-close"
                type="button"
                aria-label="Close"
            >
                ×
            </button>


            <div class="nova-auth-brand">

                <span>N</span>

                <strong>NOVA</strong>

            </div>


            <div class="nova-auth-heading">

                <small>
                    WELCOME BACK
                </small>


                <h1 id="novaLoginTitle">
                    Log in to NOVA
                </h1>


                <p>
                    Enter your credentials to continue
                    to your NOVA workspace.
                </p>

            </div>


            <form class="nova-auth-form">

                <label>

                    Email address

                    <input
                        type="email"
                        placeholder="you@example.com"
                        autocomplete="email"
                        required
                    >

                </label>


                <label>

                    Password

                    <input
                        type="password"
                        placeholder="Enter your password"
                        autocomplete="current-password"
                        required
                    >

                </label>


                <div class="nova-forgot">

                    <button
                        type="button"
                        class="forgot-password"
                    >
                        Forgot password?
                    </button>

                </div>


                <button
                    type="submit"
                    class="nova-auth-submit"
                >
                    Log in →
                </button>

            </form>


            <div class="nova-auth-footer">

                Don't have an account?

                <button
                    type="button"
                    class="nova-switch-signup"
                >
                    Create one
                </button>

            </div>


            <div class="nova-auth-note">

                Demo login · No real account required

            </div>

        </div>
    `;


    document.body.appendChild(
        screen
    );


    activeNovaAuth =
        screen;


    document.body.style.overflow =
        "hidden";


    requestAnimationFrame(
        () => {

            screen.classList.add(
                "show"
            );

        }
    );


    /* -----------------------------------------------------
       CLOSE BUTTON
    ----------------------------------------------------- */

    screen
        .querySelector(
            ".nova-auth-close"
        )
        ?.addEventListener(
            "click",
            closeNovaAuth
        );


    /* -----------------------------------------------------
       BACKDROP
    ----------------------------------------------------- */

    screen
        .querySelector(
            ".nova-auth-backdrop"
        )
        ?.addEventListener(
            "click",
            closeNovaAuth
        );


    /* -----------------------------------------------------
       SWITCH TO CREATE ACCOUNT
    ----------------------------------------------------- */

    screen
        .querySelector(
            ".nova-switch-signup"
        )
        ?.addEventListener(
            "click",
            () => {

                screen.remove();

                activeNovaAuth =
                    null;

                document.body.style.overflow =
                    "";

                novaCreateAccount();

            }
        );


    /* -----------------------------------------------------
       FORGOT PASSWORD
    ----------------------------------------------------- */

    screen
        .querySelector(
            ".forgot-password"
        )
        ?.addEventListener(
            "click",
            () => {

                alert(
                    "Password recovery will be available soon."
                );

            }
        );


    /* -----------------------------------------------------
       LOGIN
    ----------------------------------------------------- */

    const form =
        screen.querySelector(
            ".nova-auth-form"
        );


    form?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const button =
                form.querySelector(
                    ".nova-auth-submit"
                );


            if (!button) {
                return;
            }


            button.disabled =
                true;


            button.textContent =
                "Signing in...";


            setTimeout(
                () => {

                    button.textContent =
                        "Welcome back ✓";


                    setTimeout(
                        () => {

                            closeNovaAuth();

                        },
                        1000
                    );

                },
                1000
            );

        }
    );


    /* -----------------------------------------------------
       FOCUS FIRST INPUT
    ----------------------------------------------------- */

    setTimeout(
        () => {

            screen
                .querySelector(
                    "input"
                )
                ?.focus();

        },
        150
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        closeMobileMenu();


        if (activeNovaAuth) {

            closeNovaAuth();

        }

    }
);


/* =========================================================
   BUTTON HELPERS
========================================================= */

function isRealHashLink(
    button
) {

    if (!button) {
        return false;
    }


    const href =
        button.getAttribute(
            "href"
        );


    return (
        href &&
        href.startsWith("#") &&
        href !== "#"
    );

}


/* =========================================================
   GET STARTED BUTTONS
========================================================= */

const startButtons =
    document.querySelectorAll(
        `
        .nav-cta,
        .mobile-cta,
        .hero-primary,
        .final-cta .btn-primary
        `
    );


startButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                if (
                    isRealHashLink(
                        button
                    )
                ) {
                    return;
                }


                event.preventDefault();


                event.stopPropagation();


                closeMobileMenu();


                novaCreateAccount();

            }
        );

    }
);


/* =========================================================
   LOGIN BUTTONS
========================================================= */

const loginButtons =
    document.querySelectorAll(
        `
        .login-btn,
        .nav-login,
        .mobile-login
        `
    );


loginButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                if (
                    isRealHashLink(
                        button
                    )
                ) {
                    return;
                }


                event.preventDefault();


                event.stopPropagation();


                closeMobileMenu();


                novaLogin();

            }
        );

    }
);


/* =========================================================
   TEXT-BASED LOGIN FALLBACK
   Works even if Login has a different class
========================================================= */

document
    .querySelectorAll(
        ".nav-actions a, .nav-actions button, .mobile-nav a, .mobile-nav button"
    )
    .forEach(
        button => {

            const text =
                button.textContent
                    .trim()
                    .toLowerCase();


            if (
                text !== "log in"
            ) {
                return;
            }


            if (
                button.matches(
                    ".login-btn, .nav-login, .mobile-login"
                )
            ) {
                return;
            }


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    closeMobileMenu();

                    novaLogin();

                }
            );

        }
    );


/* =========================================================
   SEE HOW IT WORKS
========================================================= */

const demoButtons =
    document.querySelectorAll(
        `
        .hero-secondary,
        .see-how-it-works
        `
    );


demoButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                const workflow =
                    document.querySelector(
                        "#workflow"
                    );


                if (!workflow) {
                    return;
                }


                event.preventDefault();


                const navHeight =
                    navbar?.offsetHeight ||
                    0;


                const position =
                    workflow
                        .getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    navHeight
                    -
                    20;


                window.scrollTo({

                    top:
                        Math.max(
                            0,
                            position
                        ),

                    behavior:
                        "smooth"

                });

            }
        );

    }
);


/* =========================================================
   PRICING BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".price-btn"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    event.stopPropagation();


                    const card =
                        button.closest(
                            ".price-card"
                        );


                    let plan =
                        "NOVA Plan";


                    const heading =
                        card?.querySelector(
                            "h3"
                        );


                    if (heading) {

                        plan =
                            heading.textContent
                                .trim();

                    }


                    novaCreateAccount(
                        plan
                    );

                }
            );

        }
    );


/* =========================================================
   FAQ KEYBOARD ACCESS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            event.target.matches(
                ".faq-question"
            )
        ) {

            event.target.click();

        }

    }
);


/* =========================================================
   AI INPUT KEYBOARD SUPPORT
========================================================= */

if (
    aiInput &&
    aiInputText
) {

    aiInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();


                aiInputButton?.click();

            }

        }
    );

}


/* =========================================================
   RESIZE SAFETY
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    if (
                        window.innerWidth >
                        800
                    ) {

                        closeMobileMenu();

                    }


                    updateThemeIcon();

                },
                150
            );

    },
    {
        passive: true
    }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        body.classList.add(
            "page-loaded"
        );


        updateThemeIcon();


        updateNavbar();


        const activeBilling =
            document.querySelector(
                ".billing-option.active"
            );


        updatePricing(
            activeBilling?.dataset.billing ||
            "monthly"
        );

    }
);


/* =========================================================
   INITIAL THEME ICON
========================================================= */

updateThemeIcon();


/* =========================================================
   NOVA CONSOLE
========================================================= */

console.log(
    "%cNOVA AI",
    "font-size:24px;font-weight:700;"
);


console.log(
    "%cFast. Smooth. Intelligent.",
    "font-size:12px;color:#8066f5;"
);