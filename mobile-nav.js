//mobile view, agar tampilan dihp gaa ancur

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const btn = document.getElementById('mobile-menu');
        const nav = document.querySelector('.nav-links');

        if (btn && nav) {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                this.classList.toggle('is-active');
                nav.classList.toggle('active');
            };

            document.querySelectorAll('.nav-link').forEach(link => {
                link.onclick = () => {
                    btn.classList.remove('is-active');
                    nav.classList.remove('active');
                };
            });
        }
    }, 500);
});