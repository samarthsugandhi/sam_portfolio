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
       PRELOADER — Neural Compile
       Sections:
         1. Matrix rain (Canvas)
         2. Compile ring (SVG arc + rotating spark)
         3. Text scramble (name subtitle + status line)
         4. Glitch burst (random flashes + name shake)
         5. Dismiss with horizontal slice shatter
       ================================================================ */
    function initPreloader() {
        var preloader  = document.getElementById('preloader');
        if (!preloader) return;

        /* Skip on revisit within same session */
        if (sessionStorage.getItem('ss_loaded')) {
            preloader.style.display = 'none';
            return;
        }

        /* ── DOM refs ── */
        var canvas    = document.getElementById('matrix-canvas');
        var arcEl     = document.getElementById('preloader-arc');
        var sparkEl   = document.getElementById('preloader-spark');
        var pctEl     = document.getElementById('preloader-pct');
        var subtitleEl= document.getElementById('preloader-subtitle');
        var statusEl  = document.getElementById('preloader-status');
        var nameEl    = document.getElementById('preloader-name');
        var flashEl   = document.getElementById('preloader-flash');
        var slicesEl  = document.getElementById('preloader-slices');

        /* ── 1. MATRIX RAIN ── */
        var ctx   = canvas.getContext('2d');
        var CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/*+-=#!?REACT NODE NEXT.JS MONGO TYPESCRIPT'.split('');
        var cols, drops, matrixRaf;

        function resizeMatrix() {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            cols  = Math.floor(canvas.width / 16);
            drops = Array(cols).fill(1);
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(14,14,14,0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '14px "Space Mono", monospace';
            for (var i = 0; i < drops.length; i++) {
                var bright = Math.random() > 0.95;
                ctx.fillStyle = bright ? '#FFFFFF' : (Math.random() > 0.6 ? '#DFFF00' : 'rgba(223,255,0,0.3)');
                ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 16, drops[i] * 16);
                if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            matrixRaf = requestAnimationFrame(drawMatrix);
        }

        resizeMatrix();
        window.addEventListener('resize', resizeMatrix);
        drawMatrix();

        /* ── 2. COMPILE RING ── */
        var CIRCUMFERENCE = 2 * Math.PI * 62; /* r=62 → ≈389.56 */
        var currentPct    = 0;
        var targetPct     = 0;
        var sparkAngle    = -Math.PI / 2; /* start at top (arc starts at -90°) */
        var sparkRaf;

        function setProgress(pct) {
            targetPct = pct;
        }

        function animRing() {
            /* Smooth number chase */
            if (currentPct < targetPct) {
                currentPct = Math.min(currentPct + 0.6, targetPct);
                var offset = CIRCUMFERENCE * (1 - currentPct / 100);
                arcEl.style.strokeDashoffset = offset;
                pctEl.textContent = Math.floor(currentPct);
                /* Rotate spark to match arc progress */
                var angle = -Math.PI / 2 + (2 * Math.PI * currentPct / 100);
                var cx = 70 + 62 * Math.cos(angle);
                var cy = 70 + 62 * Math.sin(angle);
                sparkEl.setAttribute('cx', cx);
                sparkEl.setAttribute('cy', cy);
            }
            sparkRaf = requestAnimationFrame(animRing);
        }
        animRing();

        /* ── 3. TEXT SCRAMBLE ── */
        var SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&';
        function scramble(el, finalText, duration, cb) {
            var frame = 0;
            var totalFrames = Math.round(duration / 1000 * 60);
            var interval = setInterval(function () {
                var out = '';
                for (var i = 0; i < finalText.length; i++) {
                    if (finalText[i] === ' ') { out += ' '; continue; }
                    if (frame / totalFrames > i / finalText.length) {
                        out += finalText[i];
                    } else {
                        out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    }
                }
                el.textContent = out;
                frame++;
                if (frame >= totalFrames) {
                    clearInterval(interval);
                    el.textContent = finalText;
                    if (cb) cb();
                }
            }, 1000 / 60);
        }

        /* Status messages that cycle */
        var statusMsgs = [
            'SYS_BOOT', 'LOADING_MODULES', 'COMPILING_REACT', 'INIT_MONGODB',
            'SYNC_GITHUB_API', 'BUILD_COMPLETE', 'DEPLOYING...', 'SYSTEM_READY'
        ];
        var statusIdx = 0;
        var statusInterval = setInterval(function () {
            statusIdx = Math.min(statusIdx + 1, statusMsgs.length - 1);
            scramble(statusEl, statusMsgs[statusIdx], 400);
            if (statusIdx === statusMsgs.length - 1) clearInterval(statusInterval);
        }, 350);

        /* Subtitle scramble sequence */
        var subtitles = [
            { text: 'INITIALIZING...',  delay: 0    },
            { text: 'LOADING STACK...',  delay: 500  },
            { text: 'COMPILING...',      delay: 1100 },
            { text: 'DEPLOYING...',      delay: 1750 },
            { text: 'ONLINE',            delay: 2300 },
        ];
        subtitles.forEach(function (s) {
            setTimeout(function () { scramble(subtitleEl, s.text, 350); }, s.delay);
        });

        /* ── 4. GLITCH BURSTS ── */
        var glitchTimes = [600, 1050, 1400, 1900, 2250];
        glitchTimes.forEach(function (t) {
            setTimeout(function () {
                /* Flash */
                flashEl.classList.remove('preloader__flash--on');
                void flashEl.offsetWidth; /* force reflow */
                flashEl.classList.add('preloader__flash--on');
                /* Name shake */
                nameEl.classList.remove('preloader__name--glitch');
                void nameEl.offsetWidth;
                nameEl.classList.add('preloader__name--glitch');
                setTimeout(function () { nameEl.classList.remove('preloader__name--glitch'); }, 200);
            }, t);
        });

        /* ── Progress milestones ── */
        var milestones = [
            [300,  18], [600,  32], [900,  47],
            [1200, 61], [1550, 75], [1850, 88], [2200, 100]
        ];
        milestones.forEach(function (m) {
            setTimeout(function () { setProgress(m[1]); }, m[0]);
        });

        /* ── 5. DISMISS — Slice shatter ── */
        function sliceShatter() {
            cancelAnimationFrame(matrixRaf);
            cancelAnimationFrame(sparkRaf);

            var NUM_SLICES = 12;
            var H          = window.innerHeight;
            var sliceH     = Math.ceil(H / NUM_SLICES);

            /* Snapshot the whole preloader into an offscreen canvas */
            var snap = document.createElement('canvas');
            snap.width  = window.innerWidth;
            snap.height = H;
            var sCtx = snap.getContext('2d');
            /* Fill with solid bg — we can't html2canvas so we simulate with the matrix canvas */
            sCtx.fillStyle = '#0E0E0E';
            sCtx.fillRect(0, 0, snap.width, snap.height);
            sCtx.drawImage(canvas, 0, 0);

            /* Build slice divs */
            for (var i = 0; i < NUM_SLICES; i++) {
                var slice = document.createElement('div');
                slice.className = 'preloader__slice';
                slice.style.top    = (i * sliceH) + 'px';
                slice.style.height = sliceH + 'px';
                /* Mini canvas showing that row of the snapshot */
                var sc = document.createElement('canvas');
                sc.width  = snap.width;
                sc.height = sliceH;
                sc.style.position = 'absolute';
                sc.style.top  = '0';
                sc.style.left = '0';
                sc.style.width  = '100%';
                sc.style.height = sliceH + 'px';
                var scCtx = sc.getContext('2d');
                scCtx.drawImage(snap, 0, i * sliceH, snap.width, sliceH, 0, 0, snap.width, sliceH);
                slice.appendChild(sc);
                slicesEl.appendChild(slice);
            }

            /* Stage zoom + fade */
            preloader.classList.add('preloader--exit');

            /* Stagger slices left/right alternately */
            var sliceDivs = slicesEl.querySelectorAll('.preloader__slice');
            sliceDivs.forEach(function (sl, idx) {
                var dir  = idx % 2 === 0 ? 1 : -1;
                var dist = 60 + Math.random() * 160;
                var delay = 20 + idx * 18;
                setTimeout(function () {
                    sl.style.transform = 'translateX(' + (dir * dist) + 'px)';
                    sl.style.opacity   = '0';
                }, delay);
            });

            /* Final: hide & mark session */
            setTimeout(function () {
                preloader.style.display = 'none';
                sessionStorage.setItem('ss_loaded', '1');
                window.removeEventListener('resize', resizeMatrix);
            }, 700);
        }

        /* Trigger dismiss at 2.9s */
        setTimeout(sliceShatter, 2900);
    }

    /* Run immediately — preloader is first element in <body> */
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
