// Chocolat on index page
window.addEventListener("DOMContentLoaded", () => {
    return;
    // 
    const themeToggle = document.querySelector("#theme-toggle"),
        isMac = navigator.userAgent.includes("Mac"),
        altKey = isMac ? "⌥" : "Alt",
        concatKey = isMac ? " " : " + ",
        getScreenshots = function () {
            const screenshotType =
                localStorage.getItem("pref-theme") === "dark" ||
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light";
            const systemType = navigator.userAgent.includes("Mac") ? "mac" : "linux";
            return [
                {
                    src: "/images/screenshots/" + screenshotType + "/1-dashboard.png",
                    title: "Virtualmin ⇾ Dashboard",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/2-virtual-server-summary.png",
                    title: "Virtualmin ⇾ Virtual Server Summary",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/3-create-virtual-server.png",
                    title: "Virtualmin ⇾ Create Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/4-edit-users.png",
                    title: "Virtualmin ⇾ Edit Users",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/5-create-user.png",
                    title: "Virtualmin ⇾ Create User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/6-create-ssh-user.png",
                    title: "Virtualmin ⇾ Create SSH User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/7-create-ftp-user.png",
                    title: "Virtualmin ⇾ Create FTP User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/8-create-mail-user.png",
                    title: "Virtualmin ⇾ Create Mail User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/9-create-database-user.png",
                    title: "Virtualmin ⇾ Create Database User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/10-create-webserver-user.png",
                    title: "Virtualmin ⇾ Create Webserver User",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/11-edit-user-defaults.png",
                    title: "Virtualmin ⇾ Edit User Defaults",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/12-email-all-mailboxes.png",
                    title: "Virtualmin ⇾ Email All Mailboxes",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/13-email-client-settings.png",
                    title: "Virtualmin ⇾ Email Client Settings",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/14-edit-databases.png",
                    title: "Virtualmin ⇾ Edit Databases",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-install-script-wordpress.png",
                    title: "Virtualmin ⇾ Install Scripts",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/15-installed-script-wordpress.png",
                    title: "Virtualmin ⇾ Install Scripts ⇾ Installed WordPress",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/16-file-manager.png",
                    title: "Virtualmin ⇾ File Manager",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/16-file-manager-edit-file.png",
                    title: "Virtualmin ⇾ File Manager ⇾ Edit File",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/17-terminal.png",
                    title: "Virtualmin ⇾ Terminal",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/17-terminal-edit-file-using-nano.png",
                    title: "Virtualmin ⇾ Terminal ⇾ Edit File",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/17-terminal-dropdown.png",
                    title: "Virtualmin ⇾ Dropdown Terminal",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/18-change-ip-address.png",
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ Change IP Address",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/19-server-owner-limits.png",
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ Server Owner Limits",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/20-move-virtual-server.png",
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ Move Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/21-ssl-certificate.png",
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ SSL Certificate",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/21-ssl-certificate-le.png",
                    title: "Virtualmin ⇾ Manage Virtual Server ⇾ SSL Certificate ⇾ Let's Encrypt",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/22-dns-options.png",
                    title: "Virtualmin ⇾ DNS Settings ⇾ DNS Options",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/22-dns-records.png",
                    title: "Virtualmin ⇾ DNS Settings ⇾ DNS Records",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/23-php-options.png",
                    title: "Virtualmin ⇾ Web Configuration ⇾ PHP Options",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/24-manage-php-configuration.png",
                    title: "Virtualmin ⇾ Web Configuration ⇾ Manage PHP Configuration",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/24-manage-php-configuration-resource-limits.png",
                    title: "Virtualmin ⇾ Web Configuration ⇾ Manage PHP Configuration ⇾ Resource Limits",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/24-manage-php-configuration-edit-manually.png",
                    title: "Virtualmin ⇾ Web Configuration ⇾ Manage PHP Configuration ⇾ Edit Configuration Manually",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/25-protected-web-directories.png",
                    title: "Virtualmin ⇾ Web Configuration ⇾ Protected Directories",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/26-website-options.png",
                    title: "Virtualmin ⇾ Web Configuration ⇾ Website Options",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/27-spam-and-virus-delivery.png",
                    title: "Virtualmin ⇾ Mail Options ⇾ Spam and Virus Delivery",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/28-apache-access-log.png",
                    title: "Virtualmin ⇾ Logs and Reports ⇾ Apache Access Log",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/29-disk-usage.png",
                    title: "Virtualmin ⇾ Logs and Reports ⇾ Disk Usage",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/30-virtual-server-action-log.png",
                    title: "Virtualmin ⇾ Logs and Reports ⇾ Virtual Server Action Log",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/31-create-account-plan.png",
                    title: "Virtualmin ⇾ System Settings ⇾ Account Plans",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/31-checking-configuration.png",
                    title: "Virtualmin ⇾ System Settings ⇾ Re-Check Configuration",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/32-database-servers.png",
                    title: "Virtualmin ⇾ System Settings ⇾ Database Servers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/33-edit-server-template-virtual-ip-address.png",
                    title: "Virtualmin ⇾ System Settings ⇾ Server Templates ⇾ Virtual IP Address",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/34-change-ip-addresses.png",
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Change IP Addresses",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/35-cloud-dns-providers.png",
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Cloud DNS Providers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/36-dynamic-ip-update.png",
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Dynamic IP Update",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/37-shared-ip-addresses.png",
                    title: "Virtualmin ⇾ Addresses and Networking ⇾ Shared IP Addresses",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/38-domainkeys-identified-mail.png",
                    title: "Virtualmin ⇾ Email Settings ⇾ DomainKeys Identified Mail",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/39-spam-and-virus-scanning.png",
                    title: "Virtualmin ⇾ Email Settings ⇾ Spam and Virus Scanning",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/40-disk-quota-monitoring.png",
                    title: "Virtualmin ⇾ Limits and Validation ⇾ Disk Quota Monitoring",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/41-import-virtual-server.png",
                    title: "Virtualmin ⇾ Add Servers ⇾ Import Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/42-migrate-virtual-server.png",
                    title: "Virtualmin ⇾ Add Servers ⇾ Migrate Virtual Server",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/43-backup-virtual-servers.png",
                    title: "Virtualmin ⇾ Backup and Restore ⇾ Backup Virtual Servers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/44-virtualmin-virtual-servers.png",
                    title: "Virtualmin ⇾ List Virtual Servers",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/45-system-statistics.png",
                    title: "Virtualmin ⇾ System Statistics",
                },
                {
                    src: "/images/screenshots/" + screenshotType + "/100-shortkeys-" + systemType + ".png",
                    title: "Keyboard Shortcuts",
                },
            ];
        };

    // Prepare to initialize Chocolat
    const insertFullScreenToggle = function () {
            const fullscreenCont = document.createElement("div"),
                fullscreenIcon = document.createElement("i");
            fullscreenCont.classList.add("screen-full-container");
            fullscreenCont.setAttribute("aria-label", "Enter Full Screen (" + altKey + concatKey + "F)");
            fullscreenCont.setAttribute("title", "Enter Full Screen (" + altKey + concatKey + "F)");
            fullscreenIcon.classList.add("wm", "wm-sm", "wm-fw", "wm-expand");
            fullscreenCont.appendChild(fullscreenIcon);
            document.querySelector(".chocolat-image-wrapper").appendChild(fullscreenCont);
            document.querySelector(".screen-full-container").addEventListener(
                "click",
                function (e) {
                    e.stopPropagation();
                    document.querySelector(".chocolat-bottom .chocolat-fullscreen").click();
                },
                false
            );
            // Toggle full screen on clicking the container
            document.querySelector(".chocolat-image-wrapper").addEventListener(
                "click",
                function (e) {
                    e.stopPropagation();
                    document.querySelector(".chocolat-bottom .chocolat-fullscreen").click();
                },
                false
            );
        },
        chocolatOptions = function () {
            return {
                container: document.querySelector(".chocolat-drop"),
                loop: true,
                allowZoom: false,
                imageSize: "scale-down",
                closeOnBackgroundClick: false,
                afterImageLoad: function() {
                    this.elems.img.setAttribute("aria-label", "Screenshot Gallery");
                },
            };
        };

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    });

    // Initialize Chocolat
    let chocolat = Chocolat(getScreenshots(), chocolatOptions());
    chocolat.api.open();

    // Insert custom open in full screen toggle
    insertFullScreenToggle();

    // If changing theme, reload the page to update screenshots
    themeToggle.addEventListener(
        "click",
        function () {
            const currIndex = chocolat.api.current();
            chocolat.destroy();
            chocolat = Chocolat(getScreenshots(), chocolatOptions());
            chocolat.api.open(currIndex || 0);
            insertFullScreenToggle();
        },
        false
    );

    // On resize accommodate Chocolat viewer
    window.addEventListener("resize", function () {
        const targetClassList = document.documentElement.classList;
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            targetClassList.add("chocolat-fullscreen");
        } else {
            targetClassList.remove("chocolat-fullscreen");
            chocolat.api.set("imageSize", "contain");
            chocolat.api.position();
        }
    });

    // On exit full screen, resize Chocolat viewer to avoid image overflow
    document.addEventListener("fullscreenchange", function () {
        window.dispatchEvent(new Event("resize"));
        // Re-try when animation is complete
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 120);
    });
});
