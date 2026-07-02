/**
 * ============================================================================
 * SITE DE VENDAS - SCRIPT PRINCIPAL
 * Autor: Roberto (Programador Backend Java)
 * ============================================================================
 */

// 1. DADOS DOS PRODUTOS (MOCK SERVICE)
// NOTA PARA INTEGRAÇÃO FUTURA COM JAVA SPRING BOOT:
// Substitua este array por uma chamada: const response = await fetch('/api/produtos');
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        category: "Smartphones",
        price: 7999.00,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
        description: "Chip A17 Pro, design em titânio e sistema de câmeras revolucionário com zoom óptico 5x."
    },
    {
        id: 2,
        name: "MacBook Pro M3 Max 14\"",
        category: "Notebooks",
        price: 18499.00,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
        description: "O notebook mais avançado para workflows intensos. Tela Liquid Retina XDR de altíssima fidelidade."
    },
    {
        id: 3,
        name: "PlayStation 5 Pro 2TB",
        category: "Games",
        price: 5499.00,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        description: "Gráficos com Ray Tracing avançado, taxas de quadros super-rápidas e SSD de altíssima velocidade."
    },
    {
        id: 4,
        name: "Teclado Mecânico RGB Wireless",
        category: "Periféricos",
        price: 649.00,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        description: "Switches táteis silenciosos, estrutura em alumínio e autonomia de bateria para até 200 horas."
    },
    {
        id: 5,
        name: "Mouse Gamer Ultra Leve 26K DPI",
        category: "Periféricos",
        price: 459.00,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
        description: "Sensor óptico de nível eSports, apenas 58 gramas e switches ópticos sem duplo clique."
    },
    {
        id: 6,
        name: "Headset Gamer Wireless 7.1",
        category: "Acessórios",
        price: 899.00,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
        description: "Áudio espacial imersivo, cancelamento de ruído ativo no microfone e almofadas em memory foam."
    },
    {
        id: 7,
        name: "Monitor Curvo 34\" UWQHD 165Hz",
        category: "Periféricos",
        price: 3299.00,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
        description: "Painel Ultrawide com tempo de resposta de 1ms, HDR400 e total imersão para jogos e produtividade."
    },
    {
        id: 3,
        name: "PlayStation 5 Pro 2TB",
        category: "Games",
        price: 5499.00,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
        description: "Gráficos com Ray Tracing avançado, taxas de quadros super-rápidas e SSD de altíssima velocidade."
    },
    {
        id: 8,
        name: "Samsung Galaxy S24 Ultra",
        category: "Smartphones",
        price: 7499.00,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
        description: "Galaxy AI integrada, câmera de 200MP, S Pen embutida e processador Snapdragon 8 Gen 3."
    }
    
];

// Estado Global da Aplicação
let cart = JSON.parse(localStorage.getItem('sitedevendas_cart')) || [];

// 2. INICIALIZAÇÃO DA APLICAÇÃO (DOM READY)
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initCatalog();
    initCart();
});

/**
 * ============================================================================
 * MÓDULO DE NAVEGAÇÃO & INTERFACE
 * ============================================================================
 */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Menu Mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    // Fechar Menu ao clicar no Link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });
}

function initScrollEffects() {
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Efeito de Sombra no Header
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
        } else {
            header.style.boxShadow = "none";
        }

        // Botão Voltar ao Topo
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Intersection Observer para Animações (Scroll Reveal)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * ============================================================================
 * MÓDULO DO CATÁLOGO DE PRODUTOS (FILTROS E BUSCA)
 * ============================================================================
 */
function initCatalog() {
    const productsGrid = document.getElementById('products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');

    // Renderização Inicial
    renderProducts(products);

    // Filtro de Categorias via Botões
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active de todos e adiciona ao atual
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.getAttribute('data-category');
            filterCatalog(category, searchInput.value);
        });
    });

    // Filtro por Busca de Texto
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const activeCategoryBtn = document.querySelector('.filter-btn.active');
            const category = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-category') : 'todos';
            filterCatalog(category, searchInput.value);
        });
    }

    function filterCatalog(category, searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        const filtered = products.filter(product => {
            const matchesCategory = (category === 'todos') || (product.category === category);
            const matchesSearch = product.name.toLowerCase().includes(term) || 
                                  product.description.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });

        renderProducts(filtered);
    }
}

function renderProducts(productsArray) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    if (productsArray.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>Nenhum produto encontrado para o critério selecionado.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsArray.map(product => `
        <article class="product-card reveal active">
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price-row">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <button class="btn-cart-add" onclick="addToCart(${product.id})" aria-label="Adicionar ao Carrinho">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

/**
 * ============================================================================
 * MÓDULO DO CARRINHO DE COMPRAS (LOCALSTORAGE)
 * ============================================================================
 */
function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartModal = document.getElementById('cart-modal');

    if (cartBtn && cartModal) {
        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
            renderCartItems();
        });
    }

    if (closeCartBtn && cartModal) {
        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    // Fechar modal ao clicar fora da área de conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    updateCartCounter();
}

// Declarado no escopo global para ser acessível através dos atributos onclick
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    saveCart();
    updateCartCounter();

    // Feedback visual discreto (Opcional)
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.style.transform = "scale(1.2)";
    setTimeout(() => cartBtn.style.transform = "scale(1)", 200);
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCounter();
    renderCartItems();
};

function saveCart() {
    localStorage.setItem('sitedevendas_cart', JSON.stringify(cart));
}

function updateCartCounter() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalValue = document.getElementById('cart-total-value');

    if (!cartItemsContainer || !cartTotalValue) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 40px;">Seu carrinho está vazio.</p>`;
        cartTotalValue.textContent = formatCurrency(0);
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">${formatCurrency(item.price)}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})" aria-label="Remover item">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    cartTotalValue.textContent = formatCurrency(total);
}

/**
 * ============================================================================
 * UTILITÁRIOS (HELPERS)
 * ============================================================================
 */
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Exemplo de integração futura no script.js
async function fetchProductsFromBackend() {
    try {
        const response = await fetch('http://localhost:8080/api/produtos');
        const data = await response.json();
        renderProducts(data);
    } catch (error) {
        console.error("Erro ao carregar catálogo da API Spring Boot:", error);
    }
}


