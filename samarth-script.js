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
       PRELOADER — Neural Compile v2
       1. Film grain noise (canvas, quarter-res)
       2. Matrix rain (canvas, custom charset)
       3. Compile ring (SVG arc + dual spark + supernova at 100%)
       4. EQ Audio visualizer (8 bars × 2, rAF sine waves)
       5. Mouse parallax 3D tilt on stage
       6. Boot millisecond timer (top-right)
       7. Text scramble (subtitle + status cycling)
       8. Glitch burst (5 × flash + name shake)
       9. Dismiss: stage zoom + horizontal slice shatter
       ================================================================ */
    function initPreloader() {
        var preloader  = document.getElementById('preloader');
        if (!preloader) return;

        if (sessionStorage.getItem('ss_loaded')) {
            preloader.style.display = 'none';
            return;
        }

        /* ── DOM refs ── */
        var matrixCanvas  = document.getElementById('matrix-canvas');
        var noiseCanvas   = document.getElementById('noise-canvas');
        var arcEl         = document.getElementById('preloader-arc');
        var sparkEl       = document.getElementById('preloader-spark');
        var sparkTrailEl  = document.getElementById('preloader-spark-trail');
        var pctEl         = document.getElementById('preloader-pct');
        var subtitleEl    = document.getElementById('preloader-subtitle');
        var statusEl      = document.getElementById('preloader-status');
        var nameEl        = document.getElementById('preloader-name');
        var flashEl       = document.getElementById('preloader-flash');
        var slicesEl      = document.getElementById('preloader-slices');
        var stageEl       = document.getElementById('preloader-stage');
        var ringWrapEl    = document.getElementById('preloader-ring-wrap');
        var vizLeftEl     = document.getElementById('viz-left');
        var vizRightEl    = document.getElementById('viz-right');
        var timerSpan     = document.getElementById('timer-ms');

        var rafHandles = [];
        var startTime  = Date.now();

        /* ───────────────────────────────
           1. FILM GRAIN (noise canvas)
        ─────────────────────────────── */
        (function initNoise() {
            if (!noiseCanvas) return;
            var nCtx = noiseCanvas.getContext('2d');
            var W, H;
            function resizeNoise() {
                /* Quarter resolution — scaled up via CSS for perf */
                W = noiseCanvas.width  = Math.ceil(window.innerWidth  / 4);
                H = noiseCanvas.height = Math.ceil(window.innerHeight / 4);
                noiseCanvas.style.width  = window.innerWidth  + 'px';
                noiseCanvas.style.height = window.innerHeight + 'px';
            }
            resizeNoise();
            window.addEventListener('resize', resizeNoise);
            function drawNoise() {
                var img  = nCtx.createImageData(W, H);
                var data = img.data;
                for (var i = 0; i < data.length; i += 4) {
                    var v = (Math.random() * 255) | 0;
                    data[i] = data[i+1] = data[i+2] = v;
                    data[i+3] = (Math.random() * 22) | 0;
                }
                nCtx.putImageData(img, 0, 0);
                rafHandles.push(requestAnimationFrame(drawNoise));
            }
            drawNoise();
        })();

        /* ───────────────────────────────
           2. MATRIX RAIN
        ─────────────────────────────── */
        (function initMatrix() {
            if (!matrixCanvas) return;
            var mCtx  = matrixCanvas.getContext('2d');
            var CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/*+-=#!?REACT NODE NEXT.JS MONGO TYPESCRIPT'.split('');
            var cols, drops;
            function resizeMatrix() {
                matrixCanvas.width  = window.innerWidth;
                matrixCanvas.height = window.innerHeight;
                cols  = Math.floor(matrixCanvas.width / 15);
                drops = Array(cols).fill(1);
            }
            resizeMatrix();
            window.addEventListener('resize', resizeMatrix);
            function drawMatrix() {
                mCtx.fillStyle = 'rgba(14,14,14,0.09)';
                mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                mCtx.font = '13px "Space Mono", monospace';
                for (var i = 0; i < drops.length; i++) {
                    var bright = Math.random() > 0.94;
                    mCtx.fillStyle = bright ? '#FFFFFF' : (Math.random() > 0.55 ? '#DFFF00' : 'rgba(223,255,0,0.28)');
                    mCtx.fillText(CHARS[(Math.random() * CHARS.length) | 0], i * 15, drops[i] * 15);
                    if (drops[i] * 15 > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
                rafHandles.push(requestAnimationFrame(drawMatrix));
            }
            drawMatrix();
        })();

        /* ───────────────────────────────
           3. COMPILE RING + DUAL SPARK
        ─────────────────────────────── */
        var CIRC      = 2 * Math.PI * 62;  /* r=62 → 389.56 */
        var currentPct = 0;
        var targetPct  = 0;
        var TRAIL_LAG  = 0.08;             /* radians behind main spark */
        var novaFired  = false;

        function setProgress(pct) { targetPct = pct; }

        function positionSpark(el, angle, r) {
            el.setAttribute('cx', 70 + r * Math.cos(angle));
            el.setAttribute('cy', 70 + r * Math.sin(angle));
        }

        (function animRing() {
            if (currentPct < targetPct) {
                currentPct = Math.min(currentPct + 0.65, targetPct);
                arcEl.style.strokeDashoffset = CIRC * (1 - currentPct / 100);
                pctEl.textContent = Math.floor(currentPct);
                var angle = -Math.PI / 2 + (2 * Math.PI * currentPct / 100);
                positionSpark(sparkEl, angle, 62);
                positionSpark(sparkTrailEl, angle - TRAIL_LAG, 62);

                /* Supernova at 100% */
                if (currentPct >= 100 && !novaFired) {
                    novaFired = true;
                    arcEl.classList.add('preloader__arc--nova');
                    ringWrapEl.classList.add('preloader__ring-wrap--nova');
                    flashEl.classList.remove('preloader__flash--on');
                    void flashEl.offsetWidth;
                    flashEl.classList.add('preloader__flash--on');
                }
            }
            rafHandles.push(requestAnimationFrame(animRing));
        })();

        /* ───────────────────────────────
           4. EQ AUDIO VISUALIZER
        ─────────────────────────────── */
        var BAR_COUNT  = 8;
        var vizBarsL   = [];
        var vizBarsR   = [];
        var vizPhases  = [];

        (function initViz() {
            if (!vizLeftEl || !vizRightEl) return;
            for (var i = 0; i < BAR_COUNT; i++) {
                vizPhases.push(Math.random() * Math.PI * 2);
                var bL = document.createElement('div');
                bL.className = 'preloader__viz-bar';
                vizLeftEl.appendChild(bL);
                vizBarsL.push(bL);

                var bR = document.createElement('div');
                bR.className = 'preloader__viz-bar';
                vizRightEl.appendChild(bR);
                vizBarsR.push(bR);
            }

            var t = 0;
            (function animViz() {
                t += 0.055;
                for (var j = 0; j < BAR_COUNT; j++) {
                    /* Each bar = multi-sine combo for organic randomness */
                    var h = 12 + 32 * (
                        0.5 * Math.abs(Math.sin(t * 1.3 + vizPhases[j])) +
                        0.3 * Math.abs(Math.sin(t * 2.1 + vizPhases[j] * 1.4)) +
                        0.2 * Math.abs(Math.sin(t * 0.7 + vizPhases[j] * 0.6))
                    );
                    /* Scale with progress so bars grow as compile advances */
                    var scale = 0.4 + 0.6 * (currentPct / 100);
                    h *= scale;
                    vizBarsL[j].style.height = h + 'px';
                    vizBarsR[BAR_COUNT - 1 - j].style.height = h + 'px';
                    /* Opacity fade out bars toward edges */
                    var alpha = 0.4 + 0.6 * (j / (BAR_COUNT - 1));
                    vizBarsL[j].style.opacity = alpha;
                    vizBarsR[BAR_COUNT - 1 - j].style.opacity = alpha;
                }
                rafHandles.push(requestAnimationFrame(animViz));
            })();
        })();

        /* ───────────────────────────────
           5. MOUSE PARALLAX 3D TILT
        ─────────────────────────────── */
        (function initParallax() {
            if (!stageEl) return;
            var mx = 0, my = 0, tx = 0, ty = 0;
            document.addEventListener('mousemove', function (e) {
                mx = (e.clientX / window.innerWidth  - 0.5) * 2;
                my = (e.clientY / window.innerHeight - 0.5) * 2;
            });
            (function parallaxLoop() {
                /* Smooth lerp toward mouse position */
                tx += (mx - tx) * 0.08;
                ty += (my - ty) * 0.08;
                stageEl.style.transform =
                    'perspective(900px) rotateY(' + (tx * 5) + 'deg) rotateX(' + (-ty * 3.5) + 'deg)';
                rafHandles.push(requestAnimationFrame(parallaxLoop));
            })();
        })();

        /* ───────────────────────────────
           6. BOOT MILLISECOND TIMER
        ─────────────────────────────── */
        (function initTimer() {
            if (!timerSpan) return;
            var iv = setInterval(function () {
                var ms = Date.now() - startTime;
                timerSpan.textContent = String(ms).padStart(4, '0');
            }, 50);
            /* Stop after dismiss */
            setTimeout(function () { clearInterval(iv); }, 3200);
        })();

        /* ───────────────────────────────
           7. TEXT SCRAMBLE ENGINE
        ─────────────────────────────── */
        var SC_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&';
        function scramble(el, final_, ms, cb) {
            var frames = Math.round(ms / 1000 * 60);
            var f = 0;
            var iv = setInterval(function () {
                var out = '';
                for (var i = 0; i < final_.length; i++) {
                    if (final_[i] === ' ') { out += ' '; continue; }
                    out += (f / frames > i / final_.length)
                        ? final_[i]
                        : SC_CHARS[(Math.random() * SC_CHARS.length) | 0];
                }
                el.textContent = out;
                if (++f >= frames) {
                    clearInterval(iv);
                    el.textContent = final_;
                    if (cb) cb();
                }
            }, 1000 / 60);
        }

        /* Subtitle sequence */
        [
            { t: 'INITIALIZING...',  d: 0    },
            { t: 'LOADING STACK...', d: 500  },
            { t: 'COMPILING...',     d: 1100 },
            { t: 'DEPLOYING...',     d: 1750 },
            { t: 'ONLINE  ✓',        d: 2350 },
        ].forEach(function (s) {
            setTimeout(function () { scramble(subtitleEl, s.t, 350); }, s.d);
        });

        /* Status cycle */
        var statusMsgs = [
            'SYS_BOOT', 'LOADING_MODULES', 'COMPILING_REACT',
            'INIT_MONGODB', 'SYNC_GITHUB_API', 'BUILD_COMPLETE',
            'DEPLOYING...', 'SYSTEM_READY'
        ];
        var sIdx = 0;
        var statusIv = setInterval(function () {
            sIdx = Math.min(sIdx + 1, statusMsgs.length - 1);
            scramble(statusEl, statusMsgs[sIdx], 380);
            if (sIdx === statusMsgs.length - 1) clearInterval(statusIv);
        }, 340);

        /* ───────────────────────────────
           8. GLITCH BURSTS
        ─────────────────────────────── */
        [550, 980, 1380, 1820, 2280].forEach(function (delay, idx) {
            setTimeout(function () {
                /* Flash */
                flashEl.classList.remove('preloader__flash--on');
                void flashEl.offsetWidth;
                flashEl.classList.add('preloader__flash--on');
                /* Name shake */
                nameEl.classList.remove('preloader__name--glitch');
                void nameEl.offsetWidth;
                nameEl.classList.add('preloader__name--glitch');
                setTimeout(function () {
                    nameEl.classList.remove('preloader__name--glitch');
                }, 180);
            }, delay);
        });

        /* Progress milestones */
        [[250,15],[550,30],[900,45],[1200,58],[1550,72],[1860,86],[2300,100]].forEach(function (m) {
            setTimeout(function () { setProgress(m[1]); }, m[0]);
        });

        /* ───────────────────────────────
           9. DISMISS — Slice shatter
        ─────────────────────────────── */
        function sliceShatter() {
            /* Cancel all rAF loops */
            rafHandles.forEach(function (h) { cancelAnimationFrame(h); });

            var NUM    = 14;
            var H      = window.innerHeight;
            var sliceH = Math.ceil(H / NUM);

            /* Snapshot matrix canvas */
            var snap  = document.createElement('canvas');
            snap.width = window.innerWidth;
            snap.height = H;
            var sCtx = snap.getContext('2d');
            sCtx.fillStyle = '#0E0E0E';
            sCtx.fillRect(0, 0, snap.width, H);
            if (matrixCanvas) sCtx.drawImage(matrixCanvas, 0, 0);

            for (var i = 0; i < NUM; i++) {
                var slice = document.createElement('div');
                slice.className = 'preloader__slice';
                slice.style.top    = (i * sliceH) + 'px';
                slice.style.height = sliceH + 'px';
                slice.style.transition = 'transform 0.5s cubic-bezier(0.76,0,0.24,1) ' + (i * 15) + 'ms, opacity 0.5s ease ' + (i * 15) + 'ms';

                var sc  = document.createElement('canvas');
                sc.width  = snap.width;
                sc.height = sliceH;
                sc.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:' + sliceH + 'px';
                sc.getContext('2d').drawImage(snap, 0, i * sliceH, snap.width, sliceH, 0, 0, snap.width, sliceH);
                slice.appendChild(sc);
                slicesEl.appendChild(slice);
            }

            /* Stage fades + zooms */
            preloader.classList.add('preloader--exit');

            /* Trigger slice animations */
            var sliceDivs = slicesEl.querySelectorAll('.preloader__slice');
            sliceDivs.forEach(function (sl, idx) {
                /* Alternating + accelerating scatter */
                var dir  = idx % 2 === 0 ? 1 : -1;
                var dist = 80 + idx * 14 + Math.random() * 60;
                /* Small jitter in Y too */
                var dy = (Math.random() - 0.5) * 20;
                setTimeout(function () {
                    sl.style.transform = 'translateX(' + (dir * dist) + 'px) translateY(' + dy + 'px)';
                    sl.style.opacity   = '0';
                }, 10);
            });

            /* Final: remove preloader */
            setTimeout(function () {
                preloader.style.display = 'none';
                sessionStorage.setItem('ss_loaded', '1');
            }, 750);
        }

        setTimeout(sliceShatter, 3000);
    }

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
