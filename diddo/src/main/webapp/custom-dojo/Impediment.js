define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/Impediment.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("Impediment", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		id : null,
		description: null,
		sprint: null,
		submitter: null,
		submitteddate: null,
		closed: false,
		baseClass: "impediment orange",
		
		constructor: function(impObject, iService) {
			this.iService = iService || new RestUI("impediments");
			this.submitteddate = impObject.submittedDate;
		},
		
		postCreate: function() {
			this.descriptionNode.innerHTML = this.description;
			this.sprintNode.innerHTML = this.sprint.sprintNo;
			this.submitterNode.innerHTML = this.submitter.username;
			if(this.submitter.username.length > 12) {
				this.submitterNode.innerHTML = this.submitter.username.substr(0, 12) + "..";
			}
			this.submitteddateNode.innerHTML = this.submitteddate;
			if(this.closed) {
				this.set("class", "impediment green");
				this.resolveButton.set("style", "display: none;");
			}
			this.setupEventHandlers();
		},
		
		setupEventHandlers: function() {
			var widget = this;
			var service = this.iService;
			//when resolveButton (defined in 'Impediment.html') is clicked
			on(this.resolveButton, "click", function(evt) {
				widget.iService.get(widget.id, "close" ,function(response) {
					widget.resolveButton.destroy();
					widget.set("class", "impediment green");
				});
			});
			//when deleteButton (defined in 'Team.html') is clicked
			on(this.deleteButton, "click", function(evt) {
				service.remove("" + widget.id, function(response) {
					console.log("deleted: ", widget.id);
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