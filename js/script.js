document.addEventListener('DOMContentLoaded', function() {
    // Configurar el modal del menú
    const menuModal = document.getElementById('menuModal');
    if (menuModal) {
        menuModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget; // Botón que activó el modal
            const imgSrc = button.getAttribute('data-img');
            const imgPath = (imgSrc.startsWith('img/') || imgSrc.startsWith('img/photos/')) ? imgSrc : `img/photos/${imgSrc}`;
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            
            // Actualizar contenido del modal
            const modalTitle = menuModal.querySelector('#modalItemTitle');
            const modalDesc = menuModal.querySelector('#modalItemDesc');
            
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            // Configurar carrusel (en este caso solo una imagen)
            const carouselInner = menuModal.querySelector('.carousel-inner');
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <img src="${imgPath}" class="d-block w-100" alt="${title}">
                </div>
            `;
        });
    }
    
    // Scroll suave para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar offcanvas si está abierto en móvil
                const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNavbar'));
                if (offcanvas) {
                    offcanvas.hide();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});