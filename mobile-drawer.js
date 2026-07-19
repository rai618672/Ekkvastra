/* Premium Mobile Navigation Drawer Redesign JS */

document.addEventListener("DOMContentLoaded", () => {
    const mobileDrawer = document.getElementById("mobileDrawer");
    if (!mobileDrawer) return;

    // Detect if we are on the homepage to toggle anchors vs. index.html-prefixed urls
    const isHomePage = !!document.getElementById("heroGrid") || !!document.getElementById("new-arrivals");
    const arrivalsUrl = isHomePage ? "#new-arrivals" : "index.html#new-arrivals";

    // Read session state directly from localStorage (shared across all pages)
    let isLoggedIn = false;
    let sessionUser = {};
    try {
        isLoggedIn = localStorage.getItem("ekkvastra_logged_in") === "true";
        sessionUser = JSON.parse(localStorage.getItem("ekkvastra_user")) || {};
    } catch (e) {}

    const profileBlockHtml = isLoggedIn ? `
        <a href="account.html" class="drawer-profile-row">
            <img src="images/avatar_anshika.png" alt="${sessionUser.name || 'Account'}" class="drawer-profile-avatar" />
            <div class="drawer-profile-meta">
                <span class="drawer-profile-name">${sessionUser.name || 'My Account'}</span>
                <span class="drawer-profile-email">${sessionUser.email || ''}</span>
            </div>
            <span class="drawer-profile-link">View Profile
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
            </span>
        </a>
    ` : `
        <a href="LOGIN.html" class="drawer-profile-row">
            <div class="drawer-profile-avatar drawer-profile-avatar--guest">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="8" r="4"></circle></svg>
            </div>
            <div class="drawer-profile-meta">
                <span class="drawer-profile-name">Login / Sign Up</span>
                <span class="drawer-profile-email">Access your account</span>
            </div>
            <span class="drawer-profile-link">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
            </span>
        </a>
    `;

    const logoutRowHtml = isLoggedIn ? `
        <button class="drawer-item-row drawer-logout-btn" id="drawerLogoutBtn">
            <div class="drawer-item-left">
                <span class="drawer-item-icon">
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </span>
                <span class="drawer-item-label">Logout</span>
            </div>
        </button>
    ` : '';

    // Inject the modern premium drawer layout
    mobileDrawer.innerHTML = `
        <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <button class="drawer-close-btn" id="closeBtn" aria-label="Close menu">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="drawer-brand">
                <span class="drawer-logo-text">E K K V A S T R A</span>
                <p class="drawer-tagline">Premium Streetwear.<br>Built Different.</p>
            </div>

            <div class="drawer-profile">${profileBlockHtml}</div>

            <hr class="drawer-divider" />

            <nav class="drawer-menu-list">
                <!-- New Arrivals -->
                <div class="drawer-item-container">
                    <a href="${arrivalsUrl}" class="drawer-item-row">
                        <div class="drawer-item-left">
                            <span class="drawer-badge-new-gold">New</span>
                            <span class="drawer-item-label">New Arrivals</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>

                <!-- Shop (Collapsible) -->
                <div class="drawer-item-container dropdown-container">
                    <div class="drawer-item-row toggle-row">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            </span>
                            <span class="drawer-item-label">Shop</span>
                        </div>
                        <div class="drawer-indicator plus-minus-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                    </div>
                    <div class="drawer-submenu">
                        <a href="shop.html" class="drawer-sublink">All Products</a>
                        <a href="${arrivalsUrl}" class="drawer-sublink">New Arrivals</a>
                        <a href="shop.html?category=hoodies" class="drawer-sublink">Hoodies & Sweatshirts</a>
                        <a href="shop.html?category=t-shirts" class="drawer-sublink">T-Shirts</a>
                        <a href="shop.html?category=Cargo%20Pants" class="drawer-sublink">Cargo Pants</a>
                        <a href="shop.html?category=accessories" class="drawer-sublink">Accessories</a>
                    </div>
                </div>

                <!-- Collections (Collapsible) -->
                <div class="drawer-item-container dropdown-container">
                    <div class="drawer-item-row toggle-row">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>
                            </span>
                            <span class="drawer-item-label">Collections</span>
                        </div>
                        <div class="drawer-indicator plus-minus-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                    </div>
                    <div class="drawer-submenu">
                        <a href="collection.html?name=Oversized" class="drawer-sublink">Oversized</a>
                        <a href="collection.html?name=Graphic%20Tees" class="drawer-sublink">Graphic Tees</a>
                        <a href="collection.html?name=Essentials" class="drawer-sublink">Essentials</a>
                        <a href="collection.html?name=Hoodies" class="drawer-sublink">Hoodies</a>
                    </div>
                </div>

                <!-- My Orders -->
                <div class="drawer-item-container">
                    <a href="account.html#screenOrders" class="drawer-item-row">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            </span>
                            <span class="drawer-item-label">My Orders</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>


                <!-- About Us -->
                <div class="drawer-item-container">
                    <a href="ABOUT.html" class="drawer-item-row">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </span>
                            <span class="drawer-item-label">About Us</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>
            </nav>

            <div class="drawer-section-header">Customer Care</div>
            <nav class="drawer-menu-list">
                <div class="drawer-item-container">
                    <a href="CONTACT.html" class="drawer-item-row">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                            </span>
                            <span class="drawer-item-label">Contact Us</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>
                <div class="drawer-item-container">
                    <a href="#" class="drawer-item-row" id="drawerSizeGuide">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                            </span>
                            <span class="drawer-item-label">Size Guide</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>
                <div class="drawer-item-container">
                    <a href="#" class="drawer-item-row" id="drawerShipping">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </span>
                            <span class="drawer-item-label">Shipping & Delivery</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>
                <div class="drawer-item-container">
                    <a href="#" class="drawer-item-row" id="drawerReturns">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
                            </span>
                            <span class="drawer-item-label">Returns & Exchanges</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>
                <div class="drawer-item-container">
                    <a href="#" class="drawer-item-row" id="drawerFaqs">
                        <div class="drawer-item-left">
                            <span class="drawer-item-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                            </span>
                            <span class="drawer-item-label">FAQs</span>
                        </div>
                        <div class="drawer-indicator">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </div>
                    </a>
                </div>
            </nav>

            <div class="drawer-section-header">Follow Us</div>
            <div class="drawer-social">
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22a9 9 0 0 1-1.91-8.3A7.5 7.5 0 0 1 12 4.5a8.38 8.38 0 0 1 9 9 7.26 7.26 0 0 1-4.25 6.66c-1.12.5-2.24-.29-2.24-1.5v-1a5.83 5.83 0 0 0 .5-3.5c-.32-1.5-1.5-2.5-3-2.5a2.5 2.5 0 0 0-2.5 2.5 6 6 0 0 0 1 3.5c.34.5.21 1.5-.5 2S8.5 17 8 16c-.5-1-1-3-1-5a7 7 0 0 1 7-7 7.5 7.5 0 0 1 7.5 7.5c0 2.5-1.5 5-4.5 5a2 2 0 0 1-2-2"></path></svg></a>
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#" aria-label="X (Twitter)"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16M20 4L4 20"></path></svg></a>
            </div>

            ${logoutRowHtml}

            <div class="drawer-footer">
                <p class="drawer-footer-copyright">&copy; 2026 EKKVASTRA. All Rights Reserved.</p>
                <p class="drawer-footer-links">
                    <a href="#" id="drawerPrivacy">Privacy Policy</a>
                    <span class="bullet">&bull;</span>
                    <a href="#" id="drawerTerms">Terms & Conditions</a>
                </p>
            </div>
        </div>
    `;

    // Re-bind close button and trigger events
    const closeBtn = document.getElementById("closeBtn");
    const menuBtn = document.getElementById("menuBtn");

    function toggleMobileDrawer(open) {
        mobileDrawer.classList.toggle("open", open);
        mobileDrawer.setAttribute("aria-hidden", String(!open));
        document.body.classList.toggle("drawer-open", open);
    }

    if (menuBtn) {
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
        newMenuBtn.addEventListener("click", () => toggleMobileDrawer(true));
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => toggleMobileDrawer(false));
    }

    mobileDrawer.addEventListener("click", (e) => {
        if (e.target === mobileDrawer) {
            toggleMobileDrawer(false);
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
            toggleMobileDrawer(false);
        }
    });

    // Submenu / Accordion functionality
    const dropdownContainers = mobileDrawer.querySelectorAll(".dropdown-container");
    dropdownContainers.forEach((container) => {
        const toggleRow = container.querySelector(".toggle-row");
        const submenu = container.querySelector(".drawer-submenu");

        if (toggleRow && submenu) {
            toggleRow.addEventListener("click", () => {
                const isExpanded = submenu.classList.contains("expanded");

                // Collapse all others first for clean accordions
                dropdownContainers.forEach((otherContainer) => {
                    if (otherContainer !== container) {
                        otherContainer.classList.remove("active");
                        const otherSubmenu = otherContainer.querySelector(".drawer-submenu");
                        if (otherSubmenu) otherSubmenu.classList.remove("expanded");
                    }
                });

                // Toggle this one
                submenu.classList.toggle("expanded", !isExpanded);
                container.classList.toggle("active", !isExpanded);
            });
        }
    });

    // Close drawer when any real navigational link inside the drawer is clicked
    // (every <a> in the panel navigates or anchors somewhere -- accordion
    // triggers are <div>s, not <a>s, so this never fires for those).
    const links = mobileDrawer.querySelectorAll(".drawer-panel a");
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const isSocial = link.closest(".drawer-social");
            const isAlert = link.id && ["drawerShipping", "drawerReturns", "drawerFaqs", "drawerSizeGuide", "drawerPrivacy", "drawerTerms"].includes(link.id);
            if (isAlert || isSocial) {
                e.preventDefault();
                let message = "";
                if (isSocial) {
                    message = `${link.getAttribute("aria-label") || "This"} page is coming soon!`;
                } else {
                    switch (link.id) {
                        case "drawerShipping": message = "Free standard shipping on orders over ₹1499. Delivery details are in the checkout process."; break;
                        case "drawerReturns": message = "7-day hassle-free returns policy. Contact support to initiate a return."; break;
                        case "drawerFaqs": message = "Frequently Asked Questions are available under the CONTACT page."; break;
                        case "drawerSizeGuide": message = "Size Guide is available on standard product detail cards."; break;
                        case "drawerPrivacy": message = "Privacy Policy coming soon!"; break;
                        case "drawerTerms": message = "Terms & Conditions coming soon!"; break;
                    }
                }

                if (typeof showToast === 'function') {
                    showToast(message);
                } else {
                    alert(message);
                }
            }
            toggleMobileDrawer(false);
        });
    });

    // Logout
    const logoutBtn = document.getElementById("drawerLogoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            try { localStorage.setItem("ekkvastra_logged_in", "false"); } catch (e) {}
            toggleMobileDrawer(false);
            window.location.href = "LOGIN.html";
        });
    }

    // Centralized Header Cart & Wishlist Badge Update
    function updateHeaderBadges() {
        try {
            const cart = JSON.parse(localStorage.getItem("ekkvastra_cart")) || [];
            const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            document.querySelectorAll(".cart-badge").forEach((badge) => {
                badge.textContent = count;
                badge.classList.toggle("visible", count > 0);
            });
            const drawerCount = document.getElementById("drawerCartCount");
            if (drawerCount) drawerCount.textContent = count;
        } catch (e) {}

        try {
            const wl = JSON.parse(localStorage.getItem("ekkvastra_wishlist")) || [];
            const wlBadge = document.getElementById("navWishlistBadge");
            if (wlBadge) {
                wlBadge.textContent = wl.length;
                wlBadge.classList.toggle("visible", wl.length > 0);
            }
        } catch (e) {}
    }

    updateHeaderBadges();

    // Watch for local storage updates or badge changes
    window.addEventListener("storage", updateHeaderBadges);
    // Also periodically poll or allow manual calls (just in case)
    window.updateMobileDrawerHeaderBadges = updateHeaderBadges;
});
