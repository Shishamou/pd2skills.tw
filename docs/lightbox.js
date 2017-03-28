
window.addEventListener('load', function() {
    var lightbox = document.getElementById('lightbox');
    var className = 'show';

    document.querySelector('[data-lightbox-show]').addEventListener('click', function() {
        lightbox.classList.add('show');
    });

    document.querySelector('[data-lightbox-hide]').addEventListener('click', function() {
        lightbox.classList.remove('show');
    });
});
