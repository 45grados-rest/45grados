document.addEventListener('DOMContentLoaded', function() {
    // Configurar el modal del menú
    const menuModal = document.getElementById('menuModal');
    if (menuModal) {
        menuModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const imgSrc = button.getAttribute('data-img'); // Ej: "45 Grados_10.jpg"
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            
            // Construir ruta segura
            const imgPath = `img/photos/${imgSrc}`;
            //let imgPath;
            //if (imgSrc.startsWith('img/') || imgSrc.startsWith('/img/')) {
            //    imgPath = imgSrc;
            //} else {
            //    imgPath = `img/photos/${imgSrc}`;
            //}

            // Opcional: codificar URI para manejar espacios y caracteres especiales
            const encodedImgPath = encodeURI(imgPath);

            // Actualizar imagen del modal
            //modalImage.src = encodedImgPath;

            // Actualizar contenido
            const modalTitle = menuModal.querySelector('#modalItemTitle');
            const modalDesc = menuModal.querySelector('#modalItemDesc');
            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            // Actualizar carrusel
            const carouselInner = menuModal.querySelector('.carousel-inner');
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <img src="${encodedImgPath}" class="d-block w-100" alt="${title}" onerror="this.onerror=null; this.src='img/photos/placeholder.jpg';">
                </div>
            `;

            // Reiniciar carrusel para que detecte el nuevo contenido
            const carouselElement = menuModal.querySelector('.carousel');
            const carouselInstance = bootstrap.Carousel.getInstance(carouselElement);
            if (carouselInstance) {
                carouselInstance.dispose();
            }
            new bootstrap.Carousel(carouselElement);
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