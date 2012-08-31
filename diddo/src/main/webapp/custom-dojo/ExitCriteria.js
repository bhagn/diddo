define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/ExitCriteria.html", "custom/DiddoRestUI", "custom/Team", 
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/form/Form", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/Select", "dijit/form/CheckBox"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, Team) {
	return declare("ExitCriteria", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		service: null,
		id: null,
		description: null,
		done: false,
		baseClass: "exitcriteria",
		
		constructor: function() {
			this.service = new RestUI("exitcriterias");
		},
		
		postCreate: function() {
			this._loadExitCriteria();
			this._setupEventHandlers();
		},
		
		_loadExitCriteria: function() {
			this.exitCriteriaNode.innerHTML = this.description;
			if(this.done) {
				this.exitCriteriaNode.setAttribute("style", "color: gray;text-decoration: line-through");
				this.okButton.style.display = "none";
			}
		},
		
		_setupEventHandlers: function() {
			var widget = this;
			on(this.okButton, "click", function(evt) {
				//TODO - send an appropriate PUT(update) request to set DONE to true
				evt.stopPropagation();
			});
			
			on(this.deleteButton, "click", function(evt) {
				evt.stopPropagation();
				widget.service.restAPI.removeItem(widget.id, function(response){
					console.log("deleted");
					baseFX.animateProperty({
						node: widget,
						duration: 1000,
						properties: {height: 0},
						onEnd: function(evt) {
							widget.destroyRecursive();
						}
					}).play();
				}, widget.service.showError);
			});
		},
		
	});
});