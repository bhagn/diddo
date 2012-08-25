define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/Impediment.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("Impediment", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		id : null,
		description: null,
		sprint: null,
		submitter: null,
		submitteddate: null,
		baseClass: "impediment orange",
		
		constructor: function(impObject, iService) {
			this.iService = iService || new RestUI("impediments");
			/*this.id = impObject.id;
			this.description = impObject.description;
			this.sprint = impObject.sprint.sprintNo;
			this.submitter = impObject.submitter.username;*/
			this.submitteddate = impObject.submittedDate;
		},
		
		postCreate: function() {
			this.descriptionNode.innerHTML = this.description;
			this.sprintNode.innerHTML = this.sprint.sprintNo;
			this.submitterNode.innerHTML = this.submitter.username;
			this.submitteddateNode.innerHTML = this.submitteddate;
			this.setupEventHandlers();
		},
		
		setupEventHandlers: function() {
			var widget = this;
			var service = this.iService;
			//when resolveButton (defined in 'Impediment.html') is clicked
			on(this.resolveButton, "click", function(evt) {
				widget.iService.get(widget.id, "close" ,function(response) {
					widget.resolveButton.destroy();
					widget.baseClass = "impediment green";
				});
			});
			//when deleteButton (defined in 'Team.html') is clicked
			on(this.deleteButton, "click", function(evt) {
				service.remove("" + widget.id, function(response) {
					console.log("deleted");
					baseFX.animateProperty({
						node: widget,
						duration: 500,
						delay: 200,
						properties: {width: 0, height: 0},
						onEnd: function(evt) {
							widget.destroyRecursive();
						}
					}).play();
				});
			});
		},
	});
}
);