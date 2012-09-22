define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dojo/_base/event", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/UserStory.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, event, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("UserStory", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		friendlyID : null,
		title: null,
		description: null,
		points: null,
		burntPoints: null,
		startDate: null,
		endDate: null,
		color: "blue",
		unplanned: false,
		spillOver: false,
		sprint: null,
		team: null,
		obj: null,
		baseClass: "team",
		
		constructor: function(USObject, service) {
			this.service = service || new RestUI("userstorys");
			this.obj = USObject;
		},
		
		postCreate: function() {
			this.friendlyIDNode.innerHTML = this.friendlyID;
			this.titleNode.innerHTML = this.title;
			
			this.setupEventHandlers();
		},
		
		setupEventHandlers: function() {
			var widget = this;
			var service = this.service;
			//when editButton (defined in 'Team.html') is clicked
			on(this.editButton, "click", function(evt) {
				evt.cancelBubble = true;
				evt.stopPropagation();
				service.update(widget.id, function(userStory) {
					widget.friendlyIDNode.innerHTML = userStory.friendlyID;
					widget.titleNode.innerHTML = userStory.title;
				});
			});
			//when deleteButton (defined in 'Team.html') is clicked
			on(this.deleteButton, "click", function(evt) {
				evt.cancelBubble = true;
				evt.stopPropagation();
				service.remove(widget.id, function(response) {
					console.log("deleted: ", widget.id);
					baseFX.fadeOut({
						node: widget.id,
						duration: 500,
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