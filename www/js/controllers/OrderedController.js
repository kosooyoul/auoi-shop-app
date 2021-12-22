var OrderedController = function(parent) {
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

        },

        onOrderClick: function(e) {
        	// e.preventDefault();
        },

        renderView: function() {
            self.auoiApiService.orderListByOrderer(null, 10).then(result => {
                if (!result.success) {
                    return;
                }

                var $orders = $("#orders");
                var orders = result.data.orders;
                for (var order of orders) {
                    var $item = $("<div>");
                    $item.addClass("order");
                    $item.css({
                        "height": "80px",
                        "padding": "10px",
                        "border-bottom": "1px solid #cccccc",
                    });
                    $item.text(order.product.title + " " + order.product.unitPrice + " " + order.product.currency + " x " + order.orderedStock);

                    $orders.append($item);
                }
            });
        },
    }
    controller.initialize();
    return controller;
}
