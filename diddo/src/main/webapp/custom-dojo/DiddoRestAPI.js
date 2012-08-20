define(["dojo/_base/declare","dijit/_WidgetBase", "dojox/rpc/Rest"], 
		function(declare,_WidgetBase, Rest) {
	return(declare("DiddoRestAPI", [], {
		serviceURL: null,
		service: null,
		templateString: null,
		
		constructor: function(url) {
			if(arguments.length == 0 || !url || url.length <= 0) {
				console.error("Invalid service URL");
				this.help();
				return;
			}
			if(url[url.length-1] != '/')
				url += "/";
			this.serviceURL = url;
			this.service = Rest(this.serviceURL, true);
			this.inherited(arguments);
		},
		
		help: function() {
			if(arguments.length == 0)
				var items = ["all", "getItem", "getItems", "putItem"];
			else
				var items = [arguments[0]];
			console.log("Usage: ");
			if("all" in items)
				console.log("var service = new custom.DiddoRestAPI(\"users\")");
			if("getItem" in items)
				console.log("Get a resource: service.getItem(userId, callbackFunc [, errback])");
			if("getItems" in items)
				console.log("Get a resource: service.getItems(callbackFunc [, errback])");
			if("updateItem" in items)
				console.log("Edit a resource: service.updateItem([name|id], {properties}, callbackFunc [, errback])");
			if("addItem" in items)
				console.log("Edit a resource: service.putItem([name|id], {properties}, callbackFunc [, errback])");
		},
		
		getItem: function(id, callback, errback) {
			if(!callback) {
				console.error("Callback not registered");
				this.help("getItem");
				return;
			}
			var deferred = this.service(id);
			deferred.load = callback;
			deferred.error = errback || this.showError;
		},
		
		getItems: function(callback, errback) {
			if(!callback) {
				console.error("Callback not registered");
				this.help("getItems");
				return;
			}
			var deferred = this.service();
			deferred.load = callback;
			deferred.error = errback || this.showError;
		},
		
		updateItem: function(name, params, callback, errback) {
			if(!callback) {
				console.error("Callback not registered");
				this.help("updateItem");
				return;
			}
			var deferred = this.service.put(name, params);
			deferred.load = callback;
			deferred.error = errback || this.showError;
		},
		
		addItem: function(name, params, callback, errback) {
			if(!callback) {
				console.error("Callback not registered");
				this.help("addItem");
				return;
			}
			var deferred = this.service.post(name, params);
			deferred.load = callback;
			deferred.error = errback || this.showError;
		},
		
		showError: function(error) {
			console.error(error);
		}
	}));
});