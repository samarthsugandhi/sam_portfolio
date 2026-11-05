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

    /* ── Mobile: scroll reveal ── */
    function initScrollReveal() {
        if (window.innerWidth > 960) return;

        var mobilePanels = document.querySelectorAll('article.panel');
        mobilePanels.forEach(function (panel) {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(18px)';
            panel.style.transition = 'opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            mobilePanels.forEach(function (panel) { observer.observe(panel); });
        } else {
            /* Fallback */
            mobilePanels.forEach(function (panel) {
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            });
        }
    }

    document.addEventListener('DOMContentLoaded', initScrollReveal);

})();
