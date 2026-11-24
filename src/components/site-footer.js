class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const currentPage = window.location.pathname.split('/').pop() || 'main.html';

        // Works now with main.html & ex.html, and automatically adapts if renamed to home.html & schedule.html
        const homeHref = 'main.html';
        const scheduleHref = 'ex.html';
        const progressHref = 'progress.html';
        const goalsHref = 'page_goal.html';

        this.innerHTML = `
        <style>
            .schedulr-bottom-nav {
                background-color: #1a1a1a !important;
                border-top: 1px solid #333333 !important;
            }
            .schedulr-nav-item {
                color: #ffffff !important;
                opacity: 0.7;
                transition: all 0.2s ease-in-out;
                text-decoration: none;
            }
            .schedulr-nav-item:hover,
            .schedulr-nav-item.active {
                color: #f49d0c !important;
                opacity: 1;
            }
            .schedulr-nav-item i {
                font-size: 1.4rem;
                display: block;
                margin-bottom: 2px;
            }
            .schedulr-nav-item small {
                font-size: 0.75rem;
                font-weight: 500;
                display: block;
            }
        </style>

        <nav class="navbar fixed-bottom schedulr-bottom-nav py-1">
            <div class="container-fluid justify-content-around align-items-center">

                <!-- Progress -->
                <a class="schedulr-nav-item text-center py-1" data-pages="progress.html" href="${progressHref}">
                    <i class="bi bi-bar-chart-fill"></i>
                    <small>Progress</small>
                </a>

                <!-- Home -->
                <a class="schedulr-nav-item text-center py-1" data-pages="main.html,home.html" href="${homeHref}">
                    <i class="bi bi-house-fill"></i>
                    <small>Home</small>
                </a>

                <!-- Schedule -->
                <a class="schedulr-nav-item text-center py-1" data-pages="ex.html,schedule.html" href="${scheduleHref}">
                    <i class="bi bi-calendar-event-fill"></i>
                    <small>Schedule</small>
                </a>

                <!-- Goals / Setup -->
                <a class="schedulr-nav-item text-center py-1" data-pages="page_goal.html,page_one.html" href="${goalsHref}">
                    <i class="bi bi-bullseye"></i>
                    <small>Goals</small>
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