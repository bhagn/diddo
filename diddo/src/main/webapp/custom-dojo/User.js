define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/User.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("User", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		teamService: null,
		userService: null,
		id: null,
		name: null,
		email: null,
		scrumMaster: null,
		baseClass: "user white",
		
		constructor: function(userObject, uService) {
			this.userService = uService || new RestUI("users");
			this.name = userObject.username;
			this.email = userObject.email;
			this.isScrumMaster = userObject.scrumMaster;
			this.id = userObject.id;
		},
		
		postCreate: function() {
			this.username.innerHTML = this.name;
			this.mailer.innerHTML = this.email;
			this.setupEventHandlers();
		},
		
		setupEventHandlers: function() {
			var widget = this;
			var service = this.userService;
			//when editButton (defined in 'Team.html') is clicked
			on(this.editButton, "click", function(evt) {
				widget.userService.update(widget.name, function(response) {
					service.getItem(widget.name, function(user) {
						mailer.innerHTML = user.email;
					});
				});
			});
			//when deleteButton (defined in 'Team.html') is clicked
			on(this.deleteButton, "click", function(evt) {
				service.remove(widget.name, function(response) {
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