define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/ExitCriteria.html", "custom/DiddoRestUI", "custom/Team", "dojo/_base/fx", 
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/form/Form", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/Select", "dijit/form/CheckBox"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, Team, baseFX) {
	return declare("ExitCriteria", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		service: null,
		id: null,
		description: null,
		done: false,
		baseClass: "exitcriteria",
		
		constructor: function(exitCriteriaObject) {
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
				evt.stopPropagation();
				widget.service.restAPI.updateItem({id:widget.id, description: widget.description, done: true}, function(response) {
					widget.done = true;
					widget._loadExitCriteria();
				}, widget.service.showError);
			});
			
			on(this.deleteButton, "click", function(evt) {
				evt.stopPropagation();
				widget.service.restAPI.removeItem(widget.id, function(response){
					console.log("deleted");
					baseFX.fadeOut({
						node: widget.id,
						duration: 500,
						onEnd: function(evt) {
							widget.destroyRecursive();
						}
					}).play();
				}, widget.service.showError);
			});
		},
		
	});
});