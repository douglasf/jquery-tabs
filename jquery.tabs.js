/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */


// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {
    
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.
    
    // window and document are passed through as local variables rather than globals
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'tabs',
        defaults = {
            _hash: window.location.hash
        };

    // The actual plugin constructor
    function TabsPlugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or 
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    TabsPlugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance, 
        // e.g., this.element and this.options


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

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new TabsPlugin( this, options ));
            }
        });
    }

})(jQuery, window);