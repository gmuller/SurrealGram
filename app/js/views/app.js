define(['Backbone'],
    function (Backbone, template) {
        var AppView = Backbone.View.extend({
            id: 'main',
            tagName: 'div',
            className: 'container-fluid',
            el: '#surrealgram',
            numPics: 16,
            blendMode: "normal",
            blendAmount: ".25",
            sourceImages: [],
            loaderOptions: {
                text: "Loading",
                textVisible: true,
                theme: 'b',
                textonly: false
            },

            events: {
                'click #refresh': 'reBlend',
                'click #update_images': 'updateImages',
                'change #num_pics': 'updateNumPics',
                'change #blend_mode': 'updateBlendMode',
                'change #blend_amount': 'updateBlendAmount'
            },

            updateNumPics: function () {
                var self = this;
                self.numPics = parseInt(this.$el.find('#num_pics').val());
                console.log(self.numPics);
            },

            updateBlendMode: function () {
                var self = this;
                self.blendMode = this.$el.find('#blend_mode').val();
                console.log(self.blendMode);
            },

            updateBlendAmount: function () {
                var self = this;
                self.blendAmount = parseFloat(this.$el.find('#blend_amount').val());
                console.log(self.blendAmount);
            },

            updateImages: function () {
                var self = this;
                $.mobile.loading('show', self.loaderOptions);
                $.ajax({
                    dataType: "jsonp",
                    crossOrigin: true,
                    url: "https://api.instagram.com/v1/media/popular?client_id=2a5f08f906e74c89971289cd64b4e91f",
                    success: function (response) {
                        self.srcImages = [];
                        $.each(response.data, function (index, value) {
                            var imageLink = value.images.standard_resolution.url;
                            var srcImage = new Image();
                            srcImage.src = '/fetch?url=' + imageLink;
                            self.srcImages.push(srcImage);
                        });
                        self.refreshImage();
                    }
                });
            },

            reBlend: function() {
                var self = this;
                $.mobile.loading('show', self.loaderOptions);
                $("#options").panel("close");
                var img = self.srcImages[0];
                img.onload();
            },

            refreshImage: function () {
                var self = this;
                var $el = this.$el.find('#blended_image');
                var img = self.srcImages[0];
                img.onload = function () {
                    var options = {
                        amount: self.blendAmount,
                        mode: self.blendMode,
                        image: self.srcImages.slice(1, self.numPics)
                    };
                    Pixastic.process(img, "blend", options, function (output) {
                        $el.html(output);
                        $.mobile.loading('hide');
                    });
                }
            },

            render: function () {
                var self = this;
                self.updateImages();
                return this;
            }
        });

        return AppView;
    });