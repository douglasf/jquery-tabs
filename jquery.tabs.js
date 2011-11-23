/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */


;(function ( $, window, document, undefined ) {
    
    var pluginName = 'tabs',
        defaults = {
            _hash: window.location.hash
        };

    function TabsPlugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    TabsPlugin.prototype.init = function () {

        var _href,
            _thisElem = this.element;
        
        $($(this.element).siblings("div.tab")).hide();
        
        if(this.options._hash && $(this.element).siblings("div.tab").parent().has(this.options._hash).length == 1) {
            $(this.element).parentsUntil(".tab").parent().show();
            $("." + $(this.element).parentsUntil(".tab").parent().attr("id")).parent().addClass("selected");
            $(this.element.children).children(this.options._hash.replace("#",".")).parent().addClass("selected");
            $(this.options._hash).show();
        } else {
            var _this = $(this.element.children).children(".default");
            _this.parent().addClass("selected");
            $(_this[0].hash).show();
        }
        
        $(this.element.children).each(function() {
            $(this.firstChild).bind('click', function(event) {
                event.preventDefault();
                $(this).parent().siblings().removeClass("selected");
                $(this).parent().addClass("selected");
                window.location.hash = this.hash;
                _href = $(this).attr("href");
                $(_thisElem).siblings("div.tab").hide();
                $(_href).show();
            });
        });
        
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new TabsPlugin( this, options ));
            }
        });
    }

})(jQuery, window);