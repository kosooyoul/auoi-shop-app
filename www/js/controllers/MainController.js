var MainController = function() {
    var self = null;

    var controller = {
        initialize: function() {
            self = this;

            new SQLiteStorageService().done(function(service) {
                self.storageService = service;
            }).fail(function(error) {
                alert(error);
            });

            self.auoiApiService = new AuoiApiService();

            cordova.plugins.firebase.messaging.getToken().then(token => {
                self.auoiApiService.setDeviceToken(token);
            }).catch(err => {
                // Do noting; get token error
            });

            self.auoiApiService.accountSignRefresh().then(result => {
                if (!result.success) {
                    alert("로그인이 필요합니다.\n로그인이 안된 상태에선 일부 기능이 제한됩니다.");
                }
                self.bindEvents();
                self.renderHomeView();
            })
        },

        bindEvents: function() {
        	$('.tab-button').on('click', this.onTabClick);
        },

        onTabClick: function(e) {
        	e.preventDefault();
            if ($(this).hasClass('active')) {
                return;
            }

            var tab = $(this).data('tab');
            if (tab === '#home-tab') {
                self.renderHomeView();
            } else if (tab === '#ordered-tab') {
                self.renderOrderedView();
            } else if (tab === '#stall-tab') {
                self.renderStallView();
            } else if (tab === '#add-tab') {
                self.renderPostView();
            } else if (tab === '#search-tab') {
                self.renderSearchView();
            } else if (tab === '#more-tab') {
                self.renderMoreView();
            } else {
                // Do nothing;
            }
        },

        renderHomeView: function() {
            $('.tab-button').removeClass('active');
            $('#home-tab-button').addClass('active');

            var $tab = $('#tab-content');
            $tab.empty();
            $("#tab-content").load("./views/home-view.html", function(data) {
                new HomeController(self);
            });
        },

        renderOrderedView: function() {
            $('.tab-button').removeClass('active');
            $('#ordered-tab-button').addClass('active');

            var $tab = $('#tab-content');
            // $tab.empty();
            $("#tab-content").load("./views/ordered-view.html", function(data) {
                new OrderedController(self);
            });
        },

        renderStallView: function() {
            $('.tab-button').removeClass('active');
            $('#stall-tab-button').addClass('active');

            var $tab = $('#tab-content');
            // $tab.empty();
            $("#tab-content").load("./views/stall-view.html", function(data) {
                new StallController(self);
            });
        },

        renderPostView: function() {
            $('.tab-button').removeClass('active');
            $('#post-tab-button').addClass('active');

            var $tab = $('#tab-content');
            // $tab.empty();
            $("#tab-content").load("./views/post-project-view.html", function(data) {
                $('#tab-content').find('#post-project-form').on('submit', self.postProject);
            });
        },

        renderMoreView: function() {
            $('.tab-button').removeClass('active');
            $('#more-tab-button').addClass('active');

            var $tab = $('#tab-content');
            // $tab.empty();
            $("#tab-content").load("./views/more-view.html", function(data) {
                new MoreController(self);
            });
        }
    }

    controller.initialize();
    return controller;
}
