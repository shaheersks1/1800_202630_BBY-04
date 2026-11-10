class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
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
                color: #f49d0c !important; /* Brand Orange */
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
            .schedulr-dropdown-menu {
                background-color: #262626;
                border: 1px solid #404040;
            }
            .schedulr-dropdown-menu .dropdown-item {
                color: #ffffff;
            }
            .schedulr-dropdown-menu .dropdown-item:hover {
                background-color: #f49d0c;
                color: #ffffff;
            }
        </style>

        <nav class="navbar fixed-bottom schedulr-bottom-nav py-1">
            <div class="container-fluid justify-content-around align-items-center">
                
                <!-- Options Dropdown -->
                <div class="dropdown dropup">
                    <a class="schedulr-nav-item text-center py-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-list"></i>
                        <small>Options</small>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-start schedulr-dropdown-menu shadow">
                        <li><a class="dropdown-item" href="account.html">My Account</a></li>
                        <li><a class="dropdown-item" href="settings.html">Settings</a></li>
                        <li><hr class="dropdown-divider border-secondary"></li>
                        <li><a class="dropdown-item text-danger" href="#" id="logout-btn">Logout</a></li>
                    </ul>
                </div>

                <!-- Progress -->
                <a class="schedulr-nav-item text-center py-1" href="progress.html">
                    <i class="bi bi-bar-chart-fill"></i>
                    <small>Progress</small>
                </a>
                
                <!-- Home (Active) -->
                <a class="schedulr-nav-item text-center py-1 active" aria-current="page" href="main.html">
                    <i class="bi bi-house-fill"></i>
                    <small>Home</small>
                </a>

                <!-- Schedule -->
                <a class="schedulr-nav-item text-center py-1" href="schedule.html">
                    <i class="bi bi-calendar-event-fill"></i>
                    <small>Schedule</small>
                </a>

                <!-- Profile -->
                <a class="schedulr-nav-item text-center py-1" href="profile.html">
                    <i class="bi bi-person-fill"></i>
                    <small>Profile</small>
                </a>

            </div>
        </nav>
        `;
    }
}

customElements.define('site-footer', SiteFooter);