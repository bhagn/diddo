define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/Team.html", "custom/DiddoRestUI", "dojo/_base/fx", "custom/User", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX, User) {
	return declare("Team", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		teamService: null,
		userService: null,
		id: null,
		name: null,
		email: null,
		scrumMaster: null,
		baseClass: "team",
		contentNode: 'usersNode',
		
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
		
		_loadUsers: function() {
			var container = dom.byId("usersNode");
			
			for(var i=container.childNodes.length; i>0; i--) {
				console.log("deleting: ", container.childNodes[i-1].id);
				var userWidget = dijit.byId(container.childNodes[i-1].id);
				if(userWidget)
					userWidget.destroyRecursive();
			}
			container.innerHTML = "";
			if(this.users.length == 0) {
				container.innerHTML = "There are no Users in this Team, Add new Users";
			}
			for(var i=0; i< this.users.length; i++) {
				var user = new User(this.users[i], this.userService);
				container.appendChild(user.domNode);
			}
		},
		
		setupEventHandlers: function() {
			var service = this.teamService;
			var teamName = this.name;
			
			var widget = this;
			
			/*on(this.domNode, "click", function(evt) {
				if(widget.users) {
					widget._loadUsers();
					return;
				}
				
				service.get("" + widget.id, "users", function(users) {
					console.log(users);
					widget.users = users;
					widget._loadUsers();
				});
			});*/
			
			//when editButton (defined in 'Team.html') is clicked
			on(this.editButton, "click", function(evt) {
				service.update("" + widget.id, function(response) {
					service.get("" + widget.id, null, function(team) {
						widget.mailer.innerHTML = team.email;
						widget.SM.innerHTML = team.scrumMaster.name;
					});
				});
			});
			//when deleteButton (defined in 'Team.html') is clicked
			on(this.deleteButton, "click", function(evt) {
				service.remove("" + widget.id, function(response) {
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