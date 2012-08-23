define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/Team.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("Team", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		teamService: null,
		userService: null,
		id: null,
		name: null,
		email: null,
		scrumMaster: null,
		baseClass: "team",
		
		constructor: function(teamObject, tService, uService) {
			this.teamService = tService || new RestUI("teams");
			this.userService = uService || new RestUI("users");
			this.username = teamObject.name;
			this.email = teamObject.email;
			this.scrumMaster = teamObject.scrumMaster;
			this.id = teamObject.id;
		},
		
		postCreate: function() {
			this.teamName.innerHTML = this.name;
			this.SM.innerHTML = this.scrumMaster;
			this.mailer.innerHTML = this.email;
			this.setupEventHandlers();
		},
		
		setupEventHandlers: function() {
			var service = this.teamService;
			var teamName = this.name;
			
			var mailer = this.mailer;
			var SM = this.SM;
			
			//when editButton (defined in 'Team.html') is clicked
			on(this.editButton, "click", function(evt) {
				service.update(teamName, function(response) {
					service.getItem(teamName, function(team) {
						mailer.innerHTML = team.email;
						sm.innerHTML = team.scrumMaster;
					});
				});
			});
			//when deleteButton (defined in 'Team.html') is clicked
			var widget = this;
			on(this.deleteButton, "click", function(evt) {
				service.remove(teamName, function(response) {
					console.log("deleted");
					console.log(widget);
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