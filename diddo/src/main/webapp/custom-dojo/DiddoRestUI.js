define(["dojo/_base/declare","dijit/_WidgetBase", "custom/DiddoRestAPI", "dijit/Dialog", "dijit/form/Button"], 
		function(declare,_WidgetBase, RestAPI, Dialog, Button) {
	return(declare("DiddoRestUI", [RestAPI], {
		formPath: null,
		
		constructor: function(serviceName) {
			this.inherited(arguments);
			this.formPath = "resources/custom-dojo/" + this.serviceURL;
		},
		
		add: function() {
			var dialog = new Dialog({
				title: "Add",
				href: this.formPath +"add",
				parseOnLoad: true,
			});
		},
		
		update: function(name) {
			
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