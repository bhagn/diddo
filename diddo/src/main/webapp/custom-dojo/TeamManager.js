define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/TeamManager.html", "custom/DiddoRestUI", "custom/Team", 
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/form/Form", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/Select", "dijit/form/CheckBox"],
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
			console.log("Loading Teams");
			var widget = this;
			this.teamService.getAll(null, function(teams) {
				for(var i=0, len=teams.length; i<len; i++) {
					var teamWidget = new Team(teams[i], widget.teamService, widget.userService);
					var team = teams[i];
					(function(team, teamWidget) {
						on(teamWidget.domNode, "click", function(evt) {
							widget.addUserButton.selectedTeam = team;
							widget.teamService.get("" + team.id, "users", function(users) {
								console.log(users);
								teamWidget.users = users;
								teamWidget._loadUsers();
							});
							evt.stopPropagation();
						});
						
					})(team, teamWidget);
					widget.teamNode.appendChild(teamWidget.domNode);
				}
			});
		},
		
		_addTeamToUI: function(team) {
			var teamWidget = new Team(team, this.teamService, this.userService);
			this.teamNode.appendChild(teamWidget.domNode);
		},
		
		_addUserToUI: function(user) {
			var userWidget = new User(user, this.userService);
			this.usersNode.appendChild(userWidget.domNode);
		},
		
		_setupEventHandlers: function() {
			console.log("Setting up Event Handlers");
			var widget = this;
			var tService = this.teamService;
			var uService = this.userService;
			on(this.addTeamButton, "click", function(evt) {
				tService.add(function(team) {
					console.log("Added Team: ", team);
					widget._addTeamToUI(team);
				});
			});
			on(this.addUserButton, "click", function(evt) {
				uService.add(function(user) {
					console.log(user);
					if(widget.addUserButton.selectedTeam.name == user.team.name)
						widget._addUserToUI(user);
				});
			});
		},
		
	});
}
);