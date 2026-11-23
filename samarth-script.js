/**
 * Samarth Sugandhi — Portfolio Script
 * - Keyboard navigation (Enter/Space → navigate)
 * - Footer panel indicator on hover
 * - GitHub API integration (public data only)
 * - Mobile scroll reveal
 * - Modal: Escape key + click-outside to close
 * - Contact form: Formspree submission with validation
 */

(function () {
    'use strict';

    /* ================================================================
       PRELOADER — Terminal Boot Screen
       ================================================================ */
    function initPreloader() {
        var preloader = document.getElementById('preloader');
        if (!preloader) return;

        /* Skip on revisit within same session */
        if (sessionStorage.getItem('ss_loaded')) {
            preloader.style.display = 'none';
            return;
        }

        var linesEl  = document.getElementById('preloader-lines');
        var barEl    = document.getElementById('preloader-bar');
        var pctEl    = document.getElementById('preloader-pct');
        var readyEl  = document.getElementById('preloader-ready');

        /* Boot sequence lines: [text, class-suffix, delay-ms, progress-%] */
        var sequence = [
            ['> Booting portfolio OS v2.0.26...',      'prompt', 0,    8 ],
            ['> CPU: 12-core | RAM: 32 GB DDR5',       'dim',    260,  16],
            ['> Mounting filesystem /dev/samarth...',  'prompt', 500,  25],
            ['> Loading modules: projects ✓',          '',       780,  34],
            ['> Loading modules: hackathons [4 wins]', '',       980,  43],
            ['> Loading modules: journey ✓',           '',       1140, 52],
            ['> Loading modules: engineering ✓',       '',       1290, 61],
            ['> Loading modules: github-sync ✓',       '',       1430, 70],
            ['> Running diagnostics... PASSED',        'ok',     1620, 82],
            ['> Connecting to samarth.portfolio...',   'prompt', 1830, 92],
            ['> Authentication: OK | ENV: PRODUCTION', 'ok',    2040, 100],
        ];

        /* Animate progress smoothly */
        function setProgress(pct) {
            barEl.style.width = pct + '%';
            pctEl.textContent = pct + '%';
        }

        /* Append one line to the terminal */
        function addLine(text, cls) {
            var el = document.createElement('div');
            el.className = 'preloader__line' + (cls ? ' preloader__line--' + cls : '');
            el.textContent = text;
            linesEl.appendChild(el);
            /* Keep last lines visible — scroll terminal */
            linesEl.scrollTop = linesEl.scrollHeight;
        }

        /* Schedule each boot line */
        sequence.forEach(function (item) {
            var text = item[0], cls = item[1], delay = item[2], pct = item[3];
            setTimeout(function () {
                addLine(text, cls);
                setProgress(pct);
            }, delay);
        });

        /* Show "SYSTEM READY" banner */
        setTimeout(function () {
            if (readyEl) {
                readyEl.classList.add('preloader__ready--show');
            }
        }, 2300);

        /* Dismiss the preloader */
        setTimeout(function () {
            preloader.classList.add('preloader--done');
            sessionStorage.setItem('ss_loaded', '1');
            /* Remove from DOM after transition ends */
            preloader.addEventListener('transitionend', function () {
                preloader.style.display = 'none';
            }, { once: true });
        }, 2900);
    }

    /* Run immediately — no need to wait for DOMContentLoaded
       since the preloader element is the first thing in <body> */
    initPreloader();

    /* ── GitHub API ── */
    const GH_USER = 'samarthsugandhi';
    const ghStat    = document.getElementById('gh-stat');
    const ghRepoTag = document.getElementById('gh-repos-tag');

    function fetchGitHub() {
        fetch(`https://api.github.com/users/${GH_USER}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        })
        .then(function (res) {
            if (!res.ok) throw new Error('GitHub API error: ' + res.status);
            return res.json();
        })
        .then(function (data) {
            var repos = data.public_repos || '—';
            if (ghStat) {
                ghStat.textContent = repos + ' Public Repos · Contributions';
            }
            if (ghRepoTag) {
                ghRepoTag.textContent = repos + ' Repos';
            }
        })
        .catch(function () {
            /* Silently fail — placeholder text remains */
            if (ghStat)    ghStat.textContent    = 'Contributions · Repositories';
            if (ghRepoTag) ghRepoTag.textContent = 'Repos';
        });
    }

    fetchGitHub();

    /* ── Footer panel indicator ── */
    var panels = document.querySelectorAll('article.panel');
    var footerIndicator = document.getElementById('footer-panel');

    panels.forEach(function (panel) {
        panel.addEventListener('mouseenter', function () {
            if (footerIndicator) {
                footerIndicator.textContent = (panel.dataset.panel || '—') + ' / 05';
            }
        });
        panel.addEventListener('mouseleave', function () {
            if (footerIndicator) {
                footerIndicator.textContent = '— / 05';
            }
        });
    });

    /* ── Keyboard navigation ── */
    panels.forEach(function (panel) {
        panel.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                var href = panel.dataset.href;
                if (!href) return;

                /* Expand the panel visually, then navigate */
                panel.style.flex = '1 0 100vw';
                panel.style.transition = 'flex 0.6s cubic-bezier(0.77, 0, 0.175, 1)';

                setTimeout(function () {
                    if (href.startsWith('http')) {
                        window.open(href, '_blank', 'noopener,noreferrer');
                        /* Reset */
                        panel.style.flex = '';
                        panel.style.transition = '';
                    } else {
                        window.location.href = href;
                    }
                }, 500);
            }
        });

        /* Click navigation with cinematic transition */
        panel.addEventListener('click', function (e) {
            /* Allow CTA links to handle themselves */
            if (e.target.closest('a')) return;

            var href = panel.dataset.href;
            if (!href) return;

            /* Expand to full viewport */
            document.querySelectorAll('article.panel').forEach(function (p) {
                p.style.transition = 'flex 0.6s cubic-bezier(0.77, 0, 0.175, 1)';
                p.style.flex = '0';
            });
            panel.style.flex = '1 0 100vw';

            setTimeout(function () {
                if (href.startsWith('http')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                    /* Reset all panels */
                    document.querySelectorAll('article.panel').forEach(function (p) {
                        p.style.flex = '';
                        p.style.transition = '';
                    });
                } else {
                    window.location.href = href;
                }
            }, 600);
        });
    });

    /* ── Modal: Escape key ── */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && window.location.hash) {
            history.pushState('', document.title, window.location.pathname + window.location.search);
        }
    });

    /* ── Modal: click overlay to close ── */
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                history.pushState('', document.title, window.location.pathname + window.location.search);
            }
        });
    });

    /* ── Contact Form: Client Validation & Formspree Submission ── */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        var nameInput    = document.getElementById('cf-name');
        var emailInput   = document.getElementById('cf-email');
        var messageInput = document.getElementById('cf-message');
        var nameErr      = document.getElementById('cf-name-err');
        var emailErr     = document.getElementById('cf-email-err');
        var messageErr   = document.getElementById('cf-message-err');
        var statusBox    = document.getElementById('cform-status');
        var submitBtn    = document.getElementById('cform-btn');
        var submitLabel  = contactForm.querySelector('.cform__submit-label');
        var submitSpinner= contactForm.querySelector('.cform__submit-spinner');
        var submitArrow  = contactForm.querySelector('.cform__submit-arrow');

        var isSubmitting = false;

        function clearErrors() {
            if (nameErr)    nameErr.textContent = '';
            if (emailErr)   emailErr.textContent = '';
            if (messageErr) messageErr.textContent = '';
        }

        // Live error clearing on input
        if (nameInput) {
            nameInput.addEventListener('input', function () {
                if (nameErr) nameErr.textContent = '';
            });
        }
        if (emailInput) {
            emailInput.addEventListener('input', function () {
                if (emailErr) emailErr.textContent = '';
            });
        }
        if (messageInput) {
            messageInput.addEventListener('input', function () {
                if (messageErr) messageErr.textContent = '';
            });
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (isSubmitting) return;

            clearErrors();
            if (statusBox) {
                statusBox.hidden = true;
                statusBox.textContent = '';
                statusBox.className = 'cform__status';
            }

            var nameVal    = (nameInput ? nameInput.value : '').trim();
            var emailVal   = (emailInput ? emailInput.value : '').trim();
            var messageVal = (messageInput ? messageInput.value : '').trim();

            var hasError = false;

            if (!nameVal) {
                if (nameErr) nameErr.textContent = 'Please enter your name.';
                hasError = true;
            }

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal) {
                if (emailErr) emailErr.textContent = 'Please enter your email address.';
                hasError = true;
            } else if (!emailPattern.test(emailVal)) {
                if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
                hasError = true;
            }

            if (!messageVal) {
                if (messageErr) messageErr.textContent = 'Please enter your message.';
                hasError = true;
            }

            if (hasError) return;

            var actionUrl = contactForm.getAttribute('action') || '';

            // Check if user has replaced placeholder with their actual Formspree endpoint
            if (!actionUrl || actionUrl.indexOf('YOUR_FORM_ID') !== -1) {
                if (statusBox) {
                    statusBox.hidden = false;
                    statusBox.className = 'cform__status cform__status--error';
                    statusBox.textContent = 'Formspree endpoint not configured. Replace YOUR_FORM_ID in index.html with your Formspree ID, or use the direct email link above.';
                }
                return;
            }

            // Set loading state
            isSubmitting = true;
            if (submitBtn) submitBtn.disabled = true;
            if (submitLabel) submitLabel.textContent = 'Sending...';
            if (submitSpinner) submitSpinner.hidden = false;
            if (submitArrow) submitArrow.style.display = 'none';

            var formData = new FormData(contactForm);

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function (res) {
                return res.json().then(function (data) {
                    return { ok: res.ok, status: res.status, data: data };
                }).catch(function () {
                    return { ok: res.ok, status: res.status, data: null };
                });
            })
            .then(function (result) {
                if (result.ok) {
                    // Success
                    if (statusBox) {
                        statusBox.hidden = false;
                        statusBox.className = 'cform__status cform__status--success';
                        statusBox.textContent = 'Message sent successfully! Thank you for reaching out.';
                    }
                    contactForm.reset();
                } else {
                    // Formspree error
                    var errMsg = 'Unable to send message. Please try again or use direct email.';
                    if (result.data && Array.isArray(result.data.errors) && result.data.errors.length > 0) {
                        errMsg = result.data.errors.map(function (err) { return err.message; }).join(', ');
                    }
                    if (statusBox) {
                        statusBox.hidden = false;
                        statusBox.className = 'cform__status cform__status--error';
                        statusBox.textContent = errMsg;
                    }
                }
            })
            .catch(function () {
                if (statusBox) {
                    statusBox.hidden = false;
                    statusBox.className = 'cform__status cform__status--error';
                    statusBox.textContent = 'Network error. Please check your connection or email directly at samarthsugandhi04@gmail.com.';
                }
            })
            .finally(function () {
                isSubmitting = false;
                if (submitBtn) submitBtn.disabled = false;
                if (submitLabel) submitLabel.textContent = 'Send Message';
                if (submitSpinner) submitSpinner.hidden = true;
                if (submitArrow) submitArrow.style.display = '';
            });
        });
    }

    /* ── Mobile: horizontal snap dot indicators + panel tracking ── */
    function initMobile() {
        var isMobile = window.innerWidth <= 960;
        var track = document.querySelector('main.track');
        var mobileDots = document.getElementById('mobile-dots');
        var dots = mobileDots ? mobileDots.querySelectorAll('.mobile-dot') : [];
        var panels = document.querySelectorAll('article.panel');

        /* Hide dots entirely on desktop */
        if (mobileDots) {
            mobileDots.style.display = isMobile ? 'flex' : 'none';
        }

        if (!isMobile || !track) return;

        /* Disable the click-based panel-expand animation on mobile
           (panels are full-screen; CTA buttons handle navigation) */
        panels.forEach(function (panel) {
            panel.style.cursor = 'default';
        });

        /* IntersectionObserver on the horizontal scroll track */
        if ('IntersectionObserver' in window && dots.length > 0) {
            var options = {
                root: track,
                threshold: 0.5
            };

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var panelIndex = Array.prototype.indexOf.call(panels, entry.target);
                        dots.forEach(function (dot, i) {
                            dot.classList.toggle('is-active', i === panelIndex);
                        });

                        /* Update footer panel indicator if visible */
                        var footerIndicator = document.getElementById('footer-panel');
                        if (footerIndicator) {
                            var num = entry.target.dataset.panel || (panelIndex + 1);
                            footerIndicator.textContent = num + ' / 05';
                        }
                    }
                });
            }, options);

            panels.forEach(function (panel) { observer.observe(panel); });
        }

        /* Entrance animation — panels slide in from right on load */
        panels.forEach(function (panel, i) {
            panel.style.opacity = '0';
            panel.style.transform = 'translateX(28px)';
            panel.style.transition = 'opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ' + (i * 0.07) + 's, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ' + (i * 0.07) + 's';
        });

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                panels.forEach(function (panel) {
                    panel.style.opacity = '1';
                    panel.style.transform = 'translateX(0)';
                });
            });
        });
    }

    /* ── Mobile Menu Controller ── */
    function initMobileMenu() {
        var menuToggle = document.getElementById('menu-toggle');
        var mobileMenu = document.getElementById('mobile-menu');
        var menuClose = document.getElementById('menu-close');
        var menuBackdrop = document.getElementById('menu-backdrop');

        if (!menuToggle || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('is-active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuToggle.classList.add('is-open');
            menuToggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            mobileMenu.classList.remove('is-active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuToggle.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }

        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('is-active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (menuClose) {
            menuClose.addEventListener('click', function (e) {
                e.stopPropagation();
                closeMenu();
            });
        }

        if (menuBackdrop) {
            menuBackdrop.addEventListener('click', function () {
                closeMenu();
            });
        }

        /* Close menu smoothly on clicking any link */
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        /* Close on Escape key */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
                closeMenu();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initMobile();
        initMobileMenu();
    });

})();
