/*jslint browser: true, devel: true */
/*global document, setInterval, jQuery */

// ==================== DROPDOWN MENU FUNCTIONALITY ====================

function toggleDropdown(event) {
    "use strict";
    event.preventDefault();
    event.stopPropagation();
    var dropdown = event.target.closest('.dropdown');
    if (!dropdown) {
        return;
    }
    dropdown.classList.toggle('open');
}

// ==================== MENU FUNCTIONALITY ====================
// রেস্পন্সিভ মেনু টগল (মোবাইল ডিভাইসের জন্য)
function toggleMenu() {
    "use strict";
    var navMenu = document.querySelector(".nav-menu"),
        barIcon = document.querySelector(".show-bar"),
        timesIcon = document.querySelector(".hide-times"),
        topBar = document.querySelector(".top-bar");

    if (!navMenu || !barIcon || !timesIcon || !topBar) {
        return;
    }

    navMenu.classList.toggle("show");
    topBar.classList.toggle("responsive");

    if (navMenu.classList.contains("show")) {
        barIcon.style.display = "none";
        timesIcon.style.display = "block";
    } else {
        barIcon.style.display = "block";
        timesIcon.style.display = "none";
    }
}


// ==================== HISTORY TABS FUNCTIONALITY ====================
// টাইমলাইন ট্যাবস (About Us Two পেজের জন্য)
function showHistory(periodId, element) {
    "use strict";
    var contents = document.querySelectorAll(".history-content"),
        tabs = document.querySelectorAll(".timeline-item"),
        targetContent,
        i;

    // সব হিস্টোরি কন্টেন্ট হাইড করুন
    for (i = 0; i < contents.length; i += 1) {
        contents[i].classList.remove("historyactive");
    }

    // সব ট্যাব ডি-একটিভ করুন
    for (i = 0; i < tabs.length; i += 1) {
        tabs[i].classList.remove("timeactive");
    }

    // সিলেক্টেড পিরিয়ডের কন্টেন্ট শো করুন
    targetContent = document.getElementById(periodId);
    if (targetContent) {
        targetContent.classList.add("historyactive");
    }

    // কারেন্ট ট্যাব একটিভ করুন
    element.classList.add("timeactive");
}

// ==================== ACCORDION FUNCTIONALITY ====================
// এ্যাকর্ডিয়ান (About Us One পেজের FAQ সেকশনের জন্য)
function accordionClickHandler() {
    "use strict";
    var panel = this.nextElementSibling;
    this.classList.toggle("accactive");

    // প্যানেল টগল (শো/হাইড)
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

function initAccordion() {
    "use strict";
    var acc = document.getElementsByClassName("accordion"),
        i;

    if (acc.length === 0) {
        return;
    }

    for (i = 0; i < acc.length; i += 1) {
        acc[i].addEventListener("click", accordionClickHandler);
    }
}

// ==================== TIMELINE FUNCTIONALITY ====================
// টাইমলাইন ক্লিক হ্যান্ডলার
function timelineClickHandler() {
    "use strict";
    var onclickAttr = this.getAttribute('onclick'),
        periodId = onclickAttr.split("'")[1];
    showHistory(periodId, this);
}

// টাইমলাইন ইনিশিয়ালাইজেশন
function initTimeline() {
    "use strict";
    var timelineItems = document.querySelectorAll('.timeline-item'),
        i;

    if (timelineItems.length === 0) {
        return;
    }

    // প্রতিটি টাইমলাইন আইটেমে ক্লিক ইভেন্ট যোগ করুন
    for (i = 0; i < timelineItems.length; i += 1) {
        timelineItems[i].addEventListener('click', timelineClickHandler);
    }
}

// ==================== COUNTER FUNCTIONALITY ====================
// কাউন্টার আপ (About Us পেজের Some Facts সেকশনের জন্য)
function initCounter() {
    "use strict";

    // jQuery এবং counterUp প্লাগিন আছে কিনা চেক করুন
    if (window.jQuery && window.jQuery.fn.counterUp) {
        window.jQuery('.counter').counterUp({
            delay: 20,
            time: 1000
        });
    }
}

// ==================== CALENDAR FUNCTIONALITY ====================
// ক্যালেন্ডার (Blog পেজের সাইডবারের জন্য)
function highlightToday() {
    "use strict";
    var today = new Date(),
        currentDate = today.getDate(),
        calendarDays = document.querySelectorAll(".calendar-grid div"),
        i;

    if (calendarDays.length === 0) {
        return;
    }

    // আগের টুডে ক্লাস রিমুভ করুন
    for (i = 0; i < calendarDays.length; i += 1) {
        calendarDays[i].classList.remove("today");
    }

    // আজকের তারিখে টুডে ক্লাস যোগ করুন
    for (i = 0; i < calendarDays.length; i += 1) {
        if (i > 6 && parseInt(calendarDays[i].textContent, 10) === currentDate) {
            calendarDays[i].classList.add("today");
        }
    }
}

function initCalendar() {
    "use strict";
    highlightToday();
    // প্রতি মিনিটে আপডেট করুন
    setInterval(highlightToday, 60000);
}

// ==================== SLIDER FUNCTIONALITY ====================
// টিম মেম্বার স্লাইডার (About Us Two পেজের Management Team সেকশনের জন্য)
var currentIndex = 0;

function showSlide(index) {
    "use strict";
    var slides = document.querySelectorAll(".slide"),
        slidesWrapper = document.querySelector(".slides");

    if (!slidesWrapper) {
        return;
    }

    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    slidesWrapper.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
}

function moveSlide(step) {
    "use strict";
    showSlide(currentIndex + step);
}

function initSlider() {
    "use strict";
    var slides = document.querySelectorAll(".slide");
    if (slides.length === 0) {
        return;
    }

    showSlide(currentIndex);

    window.sliderInterval = setInterval(function () {
        moveSlide(1);
    }, 5000);
}

function cleanupSlider() {
    "use strict";
    if (window.sliderInterval) {
        clearInterval(window.sliderInterval);
    }
}

// ==================== MAIN INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    // Initialize all components
    initAccordion();     // FAQ এ্যাকর্ডিয়ান
    initTimeline();      // টাইমলাইন ট্যাবস
    initCounter();       // কাউন্টার এনিমেশন
    initSlider();        // টিম স্লাইডার
    initCalendar();      // ক্যালেন্ডার হাইলাইট
});