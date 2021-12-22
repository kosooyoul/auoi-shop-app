var MoreController = function(parent) {
    var self = null;

    var controller = {
        initialize: function() {
            self = this;

            self.storageService = parent.storageService;
            self.auoiApiService = parent.auoiApiService;

            self.renderView();
            self.bindEvents();
        },

        bindEvents: function() {
            $("#sign-in-button").on("click", function() {
                var sid = $("#sign-in .sid").val();
                var password = $("#sign-in .password").val();
                
                self.auoiApiService.accountSignIn(sid, password).then(result => {
                    if (!result.success) {
                        alert("로그인이 실패하였습니다.\n" + result.message);
                        return;
                    }

                    $("#sign-in").hide();
                    self.accountMe();
                });
            });
            $("#sign-out-button").on("click", function() {
                self.auoiApiService.accountSignOut().then(result => {
                    $("#my-account").hide();
                    $("#sign-in").show();
                });
            });
            $("#show-sign-up-button").on("click", function() {
                $("#sign-in").hide();
                $("#sign-up").show();
            });
            $("#hide-sign-up-button").on("click", function() {
                $("#sign-up").hide();
                $("#sign-in").show();
            });
            $("#sign-up-button").on("click", function() {
                var sid = $("#sign-up .sid").val();
                var password = $("#sign-up .password").val();
                var name = $("#sign-up .name").val();

                self.auoiApiService.accountSignUp(sid, password, name).then(result => {
                    if (!result.success) {
                        alert("회원가입이 실패하였습니다.\n" + result.message)
                        return;
                    }
                    
                    $("#sign-up").hide();
                    self.accountMe();
                });
            });
        },

        onOrderClick: function(e) {
        	// e.preventDefault();
        },

        renderView: function() {
            this.accountMe();
        },

        accountMe: function() {
            self.auoiApiService.accountMe().then(result => {
                if (!result.success) {
                    $("#my-account").hide();
                    $("#sign-in").show();
                    return;
                }

                var account = result.data;
                $("#sign-in").hide();
                $("#my-account").show();
                $("#my-account .name").text(result.data.name);
                $("#my-account .sid").text(result.data.sid);
            });
        },
    }
    controller.initialize();
    return controller;
}
