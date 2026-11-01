/* jshint esversion: 6 */
// Cloudmin command builders for the shared install-command widget. This file
// loads before the shared script, which selects a builder from the widget's
// data-install-cmd attribute. Only options the Cloudmin installer understands
// are offered: swap handling and the download tool.
(function () {
    const scriptUrl = "https://download.cloudmin.dev/cloudmin-install.sh";

    // Installer flags for the selected toggles; the installer uses the
    // unstable channel, so only disabled swap management is printed
    const buildArgs = function (box) {
        let args = "";
        if ((box.dataset.swap || "auto").toLowerCase() === "none") {
            args += " --no-swap";
        }
        return args;
    };

    window.installCommandBuilders = window.installCommandBuilders || {};

    // One-liner that downloads and runs the installer
    window.installCommandBuilders.cloudmin = function (opts, box) {
        const download = (opts.tool === "wget" ? "wget -qO-" : "curl -fsSL") + " " + scriptUrl;
        const args = buildArgs(box);
        return 'sudo sh -c "$(' + download + ')"' + (args ? " --" + args : "");
    };

    // Variant for a script already downloaded to the host, used on docs pages
    window.installCommandBuilders["cloudmin-local"] = function (opts, box) {
        return "sudo sh cloudmin-install.sh" + buildArgs(box);
    };
})();
