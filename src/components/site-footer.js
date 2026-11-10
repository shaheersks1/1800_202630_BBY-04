class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar fixed-bottom bg-light border-top shadow-sm">
            <div class="container-fluid justify-content-around py-1">
                
                <!-- Options Dropdown -->
                <div class="dropdown dropup">
                    <a class="nav-link text-center text-secondary py-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-list d-block fs-5"></i>
                        <small style="font-size: 0.7rem;">Options</small>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end shadow">
                        <li><a class="dropdown-item" href="account.html">My Account</a></li>
                        <li><a class="dropdown-item" href="settings.html">Settings</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" id="logout-btn">Logout</a></li>
                    </ul>
                </div>

                <!-- Progress -->
                <a class="nav-link text-center text-secondary py-0" href="progress.html">
                    <i class="bi bi-bar-chart-fill d-block fs-5"></i>
                    <small style="font-size: 0.7rem;">Progress</small>
                </a>
                
                <!-- Home (Active) -->
                <a class="nav-link text-center text-primary py-0 active" aria-current="page" href="main.html">
                    <i class="bi bi-house-fill d-block fs-5"></i>
                    <small style="font-size: 0.7rem;">Home</small>
                </a>

                <!-- Schedule -->
                <a class="nav-link text-center text-secondary py-0" href="schedule.html">
                    <i class="bi bi-calendar-fill d-block fs-5"></i>
                    <small style="font-size: 0.7rem;">Schedule</small>
                </a>

                <!-- Profile -->
                <a class="nav-link text-center text-secondary py-0" href="profile.html">
                    <i class="bi bi-person-fill d-block fs-5"></i>
                    <small style="font-size: 0.7rem;">Profile</small>
                </a>
            </div>
        </nav>
        `;
    }
}

customElements.define('site-footer', SiteFooter);