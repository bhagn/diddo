define(["dojo/_base/declare","dijit/_WidgetBase", "custom/DiddoRestAPI", "dijit/Dialog", "dijit/form/Button"], 
		function(declare,_WidgetBase, RestAPI, Dialog, Button) {
	return(declare("DiddoRestUI", null, {
		restAPI: null,
		
		constructor: function(serviceName) {
			this.restAPI = new RestAPI(serviceName);
		},
		
		get: function(name, params, callback, errback) {
			this.restAPI.getItem(name, params, callback, errback || this.showError);
		},
		
		getAll: function(params, callback, errback) {
			this.restAPI.getItems(params, callback, errback || this.showError);
		}, 
		
		add: function(callback, errback) {
			var callback = callback;
			var errback = errback || this.showError;
			var service = this.restAPI;
			var dialog = new Dialog({
				title: "Add",
				href: this.restAPI.serviceURL +"?form",
				parseOnLoad: true,
				baseClass: 'myDialog blue'
			});
			var submitButton = new Button({
				label: 'Add',
				baseClass: 'btn btn-primary',
				style: "margin: 10px; float: right;",
				onClick: function(evt) {
					form.validate();
					if(form.isValid) {
						service.addItem(form.getValues(), callback, errback);
						dialog.destroyRecursive();
					}
				}
			});
			var cancelButton = new Button({
				label: 'Cancel',
				baseClass: 'btn',
				style: "margin: 10px; float: right;",
				onClick: function(evt) {
					dialog.destroyRecursive();
				}
			});
			dialog.domNode.appendChild(submitButton.domNode);
			dialog.domNode.appendChild(cancelButton.domNode);
			dialog.startup();
			dialog.show();
		},
		
		update: function(name, callback, errback) {
			if(!name || name.length == 0)
				return this.showError({message: 'Provide the name of the Entity to update as a Parameter'});
			var callback = callback;
			var errback = errback || this.showError;
			var service = this.restAPI;
			var dialog = new Dialog({
				title: "Update",
				href: this.restAPI.serviceURL + name + "?form",
				parseOnLoad: true,
				baseClass: 'myDialog blue'
			});
			var submitButton = new Button({
				label: 'Add',
				baseClass: 'btn btn-primary',
				style: "margin: 10px; float: right;",
				onClick: function(evt) {
					form.validate();
					if(form.isValid) {
						service.updateItem(form.getValues(), callback, errback);
						dialog.destroyRecursive();
					}
				}
			});
			var cancelButton = new Button({
				label: 'Cancel',
				baseClass: 'btn',
				style: "margin: 10px; float: right;",
				onClick: function(evt) {
					dialog.destroyRecursive();
				}
			});
			dialog.domNode.appendChild(submitButton.domNode);
			dialog.domNode.appendChild(cancelButton.domNode);
			dialog.startup();
			dialog.show();
		},
		
		remove: function(name, callback, errback) {
			var callback = callback;
			var errback = errback || this.showError;
			if(!name || name.length == 0)
				return this.showError({message: 'Entity to be deleted is missing'});
			var service = this.restAPI;
			var dialog = new Dialog({
				title: "Delete",
				content: "Are you sure you want to delete '" + name + "'?",
				baseClass: 'myDialog black',
				style: "color: black"
			});
			var submitButton = new Button({
				label: 'Delete',
				baseClass: 'btn btn-danger',
				style: "margin: 10px; float: right;",
				onClick: function(evt) {
					service.removeItem(name, callback, errback);
					dialog.destroyRecursive();
				}
			});
			var cancelButton = new Button({
				label: 'Cancel',
				baseClass: 'btn',
				style: "margin: 10px; float: right;",
				onClick: function(evt) {
					dialog.destroyRecursive();
				}
			});
			dialog.domNode.appendChild(submitButton.domNode);
			dialog.domNode.appendChild(cancelButton.domNode);
			dialog.startup();
			dialog.show();
		},
		
		showError: function(error) {
			var dialog = new Dialog({
				title: "Error",
				content: error.message,
				baseClass: "myDialog red",
				style: "width: 350px; color: red;"
			});
			var OKButton = new Button({
				label: 'OK',
				baseClass: "btn btn-inverse btn-mini",
				style: "margin: 0px 20px 20px 0px;float: right;",
				onClick: function(evt) {
					dialog.destroyRecursive();
				}
			});
			dialog.domNode.appendChild(OKButton.domNode);
			dialog.startup();
			dialog.show();
		}
	}));
});