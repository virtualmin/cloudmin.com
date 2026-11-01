// Chocolat screenshot gallery on the landing page. Light and dark captures
// live side by side under /images/screenshots, and the viewer is rebuilt
// whenever the theme toggle changes which set to show.
window.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("#theme-toggle"),
        isMac = navigator.userAgent.includes("Mac"),
        altKey = isMac ? "⌥" : "Alt",
        concatKey = isMac ? " " : " + ",
        // Bump when a capture is replaced so cached copies are refreshed
        timeStamp = 202611010000,
        getScreenshots = function () {
            const screenshotType =
                localStorage.getItem("pref-theme") === "dark" ||
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light";
            return [
                {
                    src: "/images/screenshots/" + screenshotType + "/1-host-overview.png?v=" + timeStamp,
                    title: "Cloudmin ⇾ Host Overview",
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
        chocolatOptions = function (screenshots) {
            return {
                container: document.querySelector(".chocolat-drop"),
                // Without looping, Chocolat hides the arrows on a single
                // capture; with several it wraps around like Virtualmin
                loop: screenshots.length > 1,
                allowZoom: false,
                imageSize: "scale-down",
                closeOnBackgroundClick: false,
                afterImageLoad: function() {
                    this.elems.img.setAttribute("aria-label", "Screenshot Gallery");
                },
            };
        },
        openGallery = function (index) {
            const screenshots = getScreenshots(),
                instance = Chocolat(screenshots, chocolatOptions(screenshots));
            instance.api.open(index || 0);
            insertFullScreenToggle();
            return instance;
        };

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    });

    // Initialize Chocolat
    let chocolat = openGallery(0);

    // If changing theme, rebuild the viewer to load the matching captures
    themeToggle.addEventListener(
        "click",
        function () {
            const currIndex = chocolat.api.current();
            chocolat.destroy();
            chocolat = openGallery(currIndex);
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
