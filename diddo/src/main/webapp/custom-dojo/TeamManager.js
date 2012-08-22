define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/TeamManager.html", "custom/DiddoRestUI", "custom/Team", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, Team) {
	return declare("TeamManager", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		teamService: null,
		userService: null,
		
		constructor: function() {
			this.teamService = new RestUI("teams");
			this.userService = new RestUI("users");
		},
		
		postCreate: function() {
			this._loadTeams();
			this._setupEventHandlers();
		},
		
		_loadTeams: function(){
			var node = this.teamNode;
			var tService = this.teamService;
			var uService = this.userService;
			this.teamService.getAll(function(teams) {
				console.log("Retrieved Teams: ", teams);
				for(var i=0, len=teams.length; i<len; i++) {
					var team = new Team(teams[i], tService, uService);
					node.appendChild(team.domNode);
				}
			});
		},
		
		_setupEventHandlers: function() {
			console.log("Setting up Event Handlers");
			on(this.addTeamButton, "click", this.teamService.add);
			on(this.addUserButton, "click", this.userService.add);
		},
		
	});
}
);