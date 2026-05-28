/* ── Procedural starfield ── */
(function () {
    const sf = document.getElementById('starfield');
    const count = 120;
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() * 2.2 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = (Math.random() * 5 + 3).toFixed(2);
        const delay = (Math.random() * 6).toFixed(2);
        const minOp = (Math.random() * 0.2 + 0.1).toFixed(2);
        const maxOp = (Math.random() * 0.5 + 0.5).toFixed(2);
        const isPurple = Math.random() < 0.25;
        s.style.cssText = `
            width:${size}px; height:${size}px;
            left:${x}%; top:${y}%;
            background:${isPurple ? 'rgba(155,92,196,0.9)' : 'white'};
            --dur:${dur}s; --delay:-${delay}s;
            --min-op:${minOp}; --max-op:${maxOp};
        `;
        sf.appendChild(s);
    }
})();

/* ── Scroll-reveal observer (expanded selectors) ── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.achievement-card, .timeline-item, .gallery-item, .section-label, .section-title, .featured-section, .agency-block, .hobby-card, footer'
).forEach(el => revealObserver.observe(el));

/* ── Crown click — particle burst ── */
document.getElementById('heroCrown').addEventListener('click', function (e) {
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const angle = (i / 18) * 360;
        const dist = 40 + Math.random() * 60;
        const rad = (angle * Math.PI) / 180;
        const size = 3 + Math.random() * 5;
        p.style.cssText = `
            left: 50%; top: 50%;
            width: ${size}px; height: ${size}px;
            --dx: ${Math.cos(rad) * dist}px;
            --dy: ${Math.sin(rad) * dist}px;
            animation-duration: ${0.5 + Math.random() * 0.5}s;
            animation-delay: ${Math.random() * 0.15}s;
            background: ${['#C49AE0', '#9B5CC4', '#E8F0F8', '#7B3FA0'][Math.floor(Math.random() * 4)]};
        `;
        this.style.position = 'relative';
        this.appendChild(p);
        setTimeout(() => p.remove(), 1000);
    }
});

/* ── Shooting stars — periodic ── */
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    const startX = Math.random() * 60 + 10;
    const startY = Math.random() * 40;
    const angle = -(25 + Math.random() * 20);
    const dx = 200 + Math.random() * 300;
    const dy = 150 + Math.random() * 200;
    const dur = (0.6 + Math.random() * 0.6).toFixed(2);
    star.style.cssText = `
        left: ${startX}%; top: ${startY}%;
        --shoot-angle: ${angle}deg;
        --shoot-dx: ${dx}px;
        --shoot-dy: ${dy}px;
        --shoot-dur: ${dur}s;
        width: ${50 + Math.random() * 60}px;
    `;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), parseFloat(dur) * 1000 + 100);
}

function scheduleShootingStar() {
    const delay = 3000 + Math.random() * 8000;
    setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
    }, delay);
}
scheduleShootingStar();

/* ── Mouse-follow ambient glow ── */
(function () {
    const glow = document.getElementById('mouseGlow');
    if (!glow) return;
    let mouseActive = false;

    document.addEventListener('mousemove', function (e) {
        if (!mouseActive) {
            glow.classList.add('active');
            mouseActive = true;
        }
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', function () {
        glow.classList.remove('active');
        mouseActive = false;
    });
})();

/* ── Hero parallax on scroll ── */
(function () {
    const hero = document.querySelector('.hero');
    const rings = document.querySelectorAll('.ring');
    const nebulae = document.querySelectorAll('.nebula');
    const crown = document.querySelector('.crown-icon');

    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroH = hero ? hero.offsetHeight : 800;
                const progress = Math.min(scrollY / heroH, 1);

                rings.forEach((ring, i) => {
                    const speed = 0.03 + i * 0.015;
                    ring.style.transform = `translate(-50%, -50%) scale(${1 + progress * speed})`;
                    ring.style.opacity = Math.max(0.3 - progress * 0.4, 0);
                });

                nebulae.forEach((neb, i) => {
                    neb.style.transform = `translateY(${scrollY * (0.04 + i * 0.02)}px)`;
                });

                if (crown) {
                    crown.style.transform = `translateY(${scrollY * 0.08}px)`;
                    crown.style.opacity = Math.max(1 - progress * 1.5, 0);
                }

                ticking = false;
            });
            ticking = true;
        }
    });
})();

/* ── Smooth counter for timeline year badges ── */
(function () {
    const yearEls = document.querySelectorAll('.timeline-year');
    const yearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'color 0.5s ease';
                entry.target.style.color = '#C49AE0';
                setTimeout(() => {
                    entry.target.style.textShadow = '0 0 12px rgba(155, 92, 196, 0.5)';
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    yearEls.forEach(el => yearObserver.observe(el));
})();

/* ── Badge hover ripple ── */
document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('mouseenter', function (e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, rgba(155,92,196,0.25) 0%, transparent 70%);
            pointer-events: none;
            animation: fadeIn 0.3s ease forwards;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
