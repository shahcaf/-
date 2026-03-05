document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dynamic About Image setup
    document.getElementById('about-img').src = 'assets/roof.png';

    // Gallery Data
    const galleryItems = [
        { category: 'roofs', img: 'assets/roof.png', alt: 'גג רעפים חדש' },
        { category: 'pergolas', img: 'assets/pergolas.png', alt: 'פרגולה מעוצבת' },
        { category: 'renovations', img: 'assets/renovation.png', alt: 'שיפוצים ועבודות גמר' },
        // Fallback placeholders logic: we duplicate our generated images for fill up grid
        { category: 'roofs', img: 'assets/roof.png', alt: 'איטום גגות' },
        { category: 'pergolas', img: 'assets/pergola.png', alt: 'פרגולת אלומיניום' },
        { category: 'renovations', img: 'assets/renovation.png', alt: 'עבודות גבס וצבע' },
        { category: 'roofs', img: 'assets/roof.png', alt: 'גג פנל מבודד' }
    ];

    const galleryGrid = document.getElementById('gallery-grid');

    // Render Gallery
    const renderGallery = (filter = 'all') => {
        galleryGrid.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? galleryItems 
            : galleryItems.filter(item => item.category === filter);

        filteredItems.forEach((item, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'gallery-item';
            wrapper.setAttribute('data-category', item.category);
            // Replace broken src with generated image mappings
            // Note: to ensure consistency since files might have different names, we used fixed names in assets/
            let src = item.img;
            // Hotfix if we used wrong file name
            if(item.img === 'assets/pergolas.png') src = 'assets/pergola.png';
            
            wrapper.innerHTML = `
                <img src="${src}" alt="${item.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus gallery-icon"></i>
                </div>
            `;
            
            // Assign Lightbox Click
            wrapper.addEventListener('click', () => {
                openLightbox(src, item.alt);
            });

            galleryGrid.appendChild(wrapper);
        });
    };

    // Initial render
    renderGallery();

    // Gallery Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            // Filter
            const filter = e.target.getAttribute('data-filter');
            renderGallery(filter);
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    const openLightbox = (src, alt) => {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        document.body.style.overflow = 'hidden'; // prevent scrolling
    };

    closeLightboxBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // enable scrolling
    });

    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                // close mobile nav if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }

                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70, // header offset
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
