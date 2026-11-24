class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const currentPage = window.location.pathname.split('/').pop() || 'main.html';

        const homeHref = 'main.html';
        const scheduleHref = 'ex.html';
        const progressHref = 'progress.html';
        const goalsHref = 'page_goal.html';

        this.innerHTML = `
        <style>
            site-footer .schedulr-bottom-nav {
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                width: 100% !important;
                z-index: 1030 !important;
                background-color: #1a1a1a !important;
                border-top: 1px solid #333333 !important;
                padding: 6px 0 !important;
            }
            site-footer .schedulr-nav-row {
                display: flex !important;
                flex-direction: row !important;
                justify-content: space-around !important;
                align-items: center !important;
                width: 100% !important;
                margin: 0 auto !important;
            }
            site-footer .schedulr-nav-item {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                color: #ffffff !important;
                opacity: 0.7;
                transition: all 0.2s ease-in-out;
                text-decoration: none !important;
                padding: 4px 8px !important;
            }
            site-footer .schedulr-nav-item:hover,
            site-footer .schedulr-nav-item.active {
                color: #f49d0c !important;
                opacity: 1;
            }
            site-footer .schedulr-nav-item i {
                font-size: 1.35rem;
                line-height: 1.2;
                margin-bottom: 2px;
            }
            site-footer .schedulr-nav-item small {
                font-size: 0.75rem;
                font-weight: 600;
                line-height: 1.1;
            }
        </style>

        <nav class="schedulr-bottom-nav" aria-label="Bottom Navigation">
            <div class="schedulr-nav-row">

                <!-- Progress -->
                <a class="schedulr-nav-item" data-pages="progress.html" href="${progressHref}">
                    <i class="bi bi-bar-chart-fill"></i>
                    <small>Progress</small>
                </a>

                <!-- Home -->
                <a class="schedulr-nav-item" data-pages="main.html,home.html" href="${homeHref}">
                    <i class="bi bi-house-fill"></i>
                    <small>Home</small>
                </a>

                <!-- Schedule -->
                <a class="schedulr-nav-item" data-pages="ex.html,schedule.html" href="${scheduleHref}">
                    <i class="bi bi-calendar-event-fill"></i>
                    <small>Schedule</small>
                </a>
                <!-- Profile -->
                <a class="schedulr-nav-item" data-pages="profile.html" href="profile.html">
                    <i class="bi bi-person-fill"></i>
                    <small>Profile</small>
                </a>
            </div>
        </nav>
        `;

        this.querySelectorAll('.schedulr-nav-item').forEach((link) => {
            const pages = (link.dataset.pages || '').split(',');
            if (pages.includes(currentPage)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
}

customElements.define('site-footer', SiteFooter);