define(["dojo/_base/declare","dijit/_WidgetBase", "dojox/rpc/Rest"], 
		function(declare,_WidgetBase, Rest) {
	return(declare("DiddoRestAPI", [], {
		serviceURL: null,
		service: null,
		
		constructor: function(serviceName) {
			//this.inherited(arguments);
			if(arguments.length == 0 || !serviceName || serviceName.length <= 0) {
				console.error("Invalid service Name");
				this.help();
				return;
			}
			if(serviceName[serviceName.length-1] != '/')
				serviceName += "/";
			this.serviceURL = "/diddo/" + serviceName;
			this.service = Rest(this.serviceURL, true);
		},
		
		help: function() {
			console.log("Usage: ");
			console.log("var service = new custom.DiddoRestAPI(\"users\")");
			console.log("Get a resource: service.getItem(id[, callbackFunc [, errback])");
			console.log("Get a resource: service.getItems([callbackFunc [, errback])");
			console.log("Edit a resource: service.updateItem({properties}[, callbackFunc [, errback])");
			console.log("Edit a resource: service.addItem({properties}[, callbackFunc [, errback])");
			console.log("Delete a resource: service.removeItem(id[, callbackFunc [, errback])");
		},
		
		getItem: function(id, params, callback, errback) {
			var query = '';
			if(params)
				query="?" + params;
			id = encodeURI(id);
			this.service(id + query).then(callback || this.defaultCallback, errback || this.showError);
		},
		
		getItems: function(params, callback, errback) {
			if(!params){
			    this.service().then(callback || this.defaultCallback, errback || this.showError);
			}
			else
				this.service('?' + params).then(callback || this.defaultCallback, errback || this.showError);
		},
		
		updateItem: function(params, callback, errback) {
			this.service.put('', dojo.toJson(params)).then(callback || this.defaultCallback, errback || this.showError);
		},
		
		addItem: function(params, callback, errback) {
			this.service.post('', dojo.toJson(params)).then(callback || this.defaultCallback, errback || this.showError);
		},
		
		removeItem: function(name, callback, errback) {
			this.service["delete"](name).then(callback || this.defaultCallback, errback || this.showError);
		},
		
		defaultCallback: function(response) {
			console.log(response);
		},
		
		showError: function(error) {
			console.error(error);
		}
	}));
});