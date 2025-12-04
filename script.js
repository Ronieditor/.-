const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    gsap.to(cursorCircle, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3, ease: "power2.out" });
});

document.querySelectorAll('a, button, .project-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorCircle, { scale: 2, backgroundColor: "white", mixBlendMode: "difference", duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorCircle, { scale: 1, backgroundColor: "transparent", mixBlendMode: "normal", duration: 0.3 });
    });
});

gsap.from(".hero-anim", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out",
    delay: 0.2
});

const items = document.querySelectorAll('.project-item');

items.forEach((item) => {
    if (!item.classList.contains('hidden')) {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 90%" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
    }

    const video = item.querySelector('video');
    item.addEventListener('mouseenter', () => { video.currentTime = 0; video.play(); });
    item.addEventListener('mouseleave', () => { video.pause(); });
});

const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightbox-video');
const closeBtn = document.getElementById('close-lightbox');

items.forEach(card => {
    card.addEventListener('click', () => {
        const videoSrc = card.getAttribute('data-video-src');
        if(videoSrc) {
            lightboxVideo.src = videoSrc;
            lightbox.classList.add('active');
            lightboxVideo.play();
            document.body.style.overflow = 'hidden';
        }
    });
});

const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.src = "";
    document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

const discordBtn = document.getElementById('discord-btn');
const copyToast = document.getElementById('copy-toast');

discordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const textToCopy = "rzzxwq";
    navigator.clipboard.writeText(textToCopy).then(() => {
        gsap.to(copyToast, { opacity: 1, y: -20, duration: 0.4, ease: "power3.out" });
        setTimeout(() => {
            gsap.to(copyToast, { opacity: 0, y: 0, duration: 0.4, ease: "power3.in" });
        }, 2500);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
});

const viewAllBtn = document.getElementById('view-all-btn');

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();

        //  itens ocultos
        const hiddenArchives = document.querySelectorAll('.archive-item.hidden');
        
        if(hiddenArchives.length > 0) {
            hiddenArchives.forEach((item, i) => {                item.classList.remove('hidden');
                
                gsap.from(item, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: i * 0.1
                });
            });

            viewAllBtn.style.display = 'none';

            ScrollTrigger.refresh();
        }
    });
}