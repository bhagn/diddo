define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/UserStory.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("UserStory", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		friendlyId : null,
		title: null,
		description: null,
		points: null,
		burntPoints: null,
		startDate: null,
		endDate: null,
		color: "white",
		unplanned: false,
		spillOver: false,
		sprint: null,
		team: null,
		baseClass: "team",
		
		constructor: function(USObject, service) {
			this.service = service || new RestUI("userstorys");
		},
		
		postCreate: function() {
			this.friendlyIDNode.innerHTML = this.friendlyId;
			this.titleNode.innerHTML = this.title;
			this.pointsNode.innerHTML = this.points;
			this.burntPointsNode.innerHTML = this.burntPoints;

			this.setupEventHandlers();
		},
		
		setupEventHandlers: function() {
			var widget = this;
			var service = this.service;
			//when editButton (defined in 'Team.html') is clicked
			on(this.editButton, "click", function(evt) {
				evt.stopPropagation();
				service.update(widget.id, function(response) {
					service.get(teamName, null, function(team) {
						widget.titleNode.innerHTML = team.title;
						widget.pointsNode.innerHTML = team.points;
						widget.burntPointsNode.innerHTML = team.burntPoints;
					});
				});
			});
			//when deleteButton (defined in 'Team.html') is clicked
			on(this.deleteButton, "click", function(evt) {
				evt.stopPropagation();
				service.remove(widget.id, function(response) {
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