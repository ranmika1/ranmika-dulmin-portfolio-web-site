/* ============================================================
   Ranmika Dulmin — Portfolio
   Site-wide JavaScript
   ============================================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        /* ---------------------------------------------------------
           1. Mobile navigation toggle
           --------------------------------------------------------- */
        var menuBtn = document.getElementById('mobile-menu-btn');
        var mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', function () {
                var isOpen = !mobileMenu.classList.contains('hidden');
                mobileMenu.classList.toggle('hidden', isOpen);
                menuBtn.setAttribute('aria-expanded', String(!isOpen));
            });

            // Close the menu when a link inside it is clicked
            mobileMenu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    mobileMenu.classList.add('hidden');
                    menuBtn.setAttribute('aria-expanded', 'false');
                });
            });
        }

        /* ---------------------------------------------------------
           2. Navbar background intensifies on scroll
           --------------------------------------------------------- */
        var navbar = document.querySelector('nav.glass');

        if (navbar) {
            var handleScroll = function () {
                navbar.classList.toggle('scrolled', window.scrollY > 20);
            };
            handleScroll();
            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        /* ---------------------------------------------------------
           3. Highlight the nav link for the current page
           --------------------------------------------------------- */
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';

        document.querySelectorAll('nav a[href]').forEach(function (link) {
            var href = link.getAttribute('href');
            // Skip the styled "Contact Me" call-to-action button
            if (link.classList.contains('btn-glow') || link.classList.contains('bg-gradient-to-r')) return;
            if (href === currentPage) {
                link.classList.add('text-cyan-400');
                link.classList.remove('text-slate-300');
            }
        });

        /* ---------------------------------------------------------
           4. Contact form — validate and give feedback
           NOTE: This is a static site with no backend.
           Swap the marked block below for a real endpoint
           (Formspree, Netlify Forms, Web3Forms, etc.) to receive mail.
           --------------------------------------------------------- */
        var form = document.getElementById('contact-form');

        if (form) {
            var statusBox = document.createElement('div');
            statusBox.id = 'form-status';
            statusBox.setAttribute('role', 'status');
            statusBox.setAttribute('aria-live', 'polite');
            form.appendChild(statusBox);

            var showStatus = function (message, type) {
                statusBox.textContent = message;
                statusBox.className = 'visible ' + type;
            };

            form.addEventListener('submit', function (event) {
                event.preventDefault();

                var nameInput = document.getElementById('name');
                var emailInput = document.getElementById('email');
                var messageInput = document.getElementById('message');
                var submitBtn = document.getElementById('submit-btn');

                // Basic validation
                if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                    showStatus('Please fill in every field before sending.', 'error');
                    return;
                }

                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value.trim())) {
                    showStatus('Please enter a valid email address.', 'error');
                    return;
                }

                // --- Replace from here with a real send (fetch to your form endpoint) ---
                var originalLabel = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';

                window.setTimeout(function () {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalLabel;
                    form.reset();
                    showStatus('Thanks ' + nameInput.value.trim().split(' ')[0] +
                        '! Your message has been queued — I’ll reply to ' +
                        emailInput.value.trim() + ' shortly.', 'success');
                }, 900);
                // --- to here ---
            });
        }

        /* ---------------------------------------------------------
           5. Refresh AOS after images finish loading
           (keeps scroll animations correctly positioned)
           --------------------------------------------------------- */
        window.addEventListener('load', function () {
            if (typeof AOS !== 'undefined' && typeof AOS.refreshHard === 'function') {
                AOS.refreshHard();
            }
        });

    });
})();
