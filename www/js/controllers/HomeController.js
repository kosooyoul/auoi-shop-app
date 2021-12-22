var HomeController = function(parent) {
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
        	e.preventDefault();
            
            var $product = $(this);
            var productTitle = $product.data("product-title");
            var productCode = $product.data("product-code");
            self.auoiApiService.orderCreate(productCode, 1).then(result => {
                if (!result.success) {
                    alert("상품 '" + productTitle + "' 주문이 실패하였습니다.\n" + result.message);
                }

                var orderCode = result.data.code;
                alert("상품 '" + productTitle + "' 주문이 성공하였습니다.\n주문코드: " + orderCode);
            });
        },

        renderView: function() {
            self.auoiApiService.productList(null, 10).then(result => {
                if (!result.success) {
                    return;
                }

                var $products = $("#products");
                var products = result.data.products;
                for (var product of products) {
                    var $item = $("<div>");
                    $item.addClass("product");
                    $item.css({
                        "height": "80px",
                        "padding": "10px",
                        "border-bottom": "1px solid #cccccc",
                    });
                    $item.text(product.title + " " + product.unitPrice + " " + product.currency + (product.availableStock == 0? " (품절)": ""));

                    if (product.isOwner) {
                        var $p = $("<p>");
                        $p.text("(내가 등록한 상품)");
                        $item.append($p);
                    } else {
                        var $button = $("<button>");
                        $button.addClass("order-button");
                        $button.data("product-code", product.code);
                        $button.data("product-title", product.title);
                        $button.text("주문하기");
                        $button.on("click", self.onOrderClick);
                        $item.append($button);
                    }

                    $products.append($item);
                }
            });
        },
    }
    controller.initialize();
    return controller;
}
