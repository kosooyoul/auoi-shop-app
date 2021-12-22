var StallController = function(parent) {
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

        onproductClick: function(e) {
        	// e.preventDefault();
        },

        renderView: function() {
            self.auoiApiService.productListBySeller(null, 10).then(result => {
                if (!result.success) {
                    return;
                }

                var $products = $("#my-products");
                var products = result.data.products;
                for (var product of products) {
                    var $item = $("<div>");
                    $item.addClass("product");
                    $item.css({
                        "height": "80px",
                        "padding": "10px",
                        "border-bottom": "1px solid #cccccc",
                    });
                    $item.text(product.title + " " + product.unitPrice + " " + product.currency + " (재고: " + product.availableStock + ")");

                    $products.append($item);
                }
            });
        },
    }
    controller.initialize();
    return controller;
}
