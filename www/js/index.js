var controller;
var app = {
    // Application Constructor
    initialize: function() {
        var matches = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
        if (matches) {
            document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }
    },

    onDeviceReady: function() {
        controller = new MainController();
        app.overrideBrowserAlert();
    },

    overrideBrowserAlert: function() {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Auoi",     // title
                    'OK'        // buttonName
                );
            };
        }
    },

};

app.initialize();
