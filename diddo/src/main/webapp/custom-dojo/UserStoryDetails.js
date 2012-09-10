define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/UserStoryDetails.html", "custom/DiddoRestUI", "custom/ExitCriteria", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("UserStoryDetails", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		friendlyID : null,
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
		id: null,
		
		constructor: function(userstoryObject) {
			//if(userstoryObject.id.indexOf("us-") != 0)
			    userstoryObject.id = "us-" + userstoryObject.id;
			this.userStoryService = new RestUI("userstorys");
			this.exitCriteriaService = new RestUI("exitcriterias");
		},
		
		postCreate: function() {
			this.friendlyIDNode.innerHTML = this.friendlyID;
			this.titleNode.innerHTML = this.title;
			this.descriptionNode.innerHTML = this.description;
			this._loadExitCriterias();
			this._setupEventHandlers();
		},
		
		_loadExitCriterias: function() {
			var widget = this;
			var id = this.id.split("us-")[1];
			this.userStoryService.get(id, "exitcriterias", function(exitCriterias) {
				for(var i=0 ;i<exitCriterias.length; i++) {
					var ec = new ExitCriteria(exitCriterias[i]);
					widget.exitCriteriaNode.appendChild(ec.domNode);
				}
			});
		},
		
		_setupEventHandlers: function() {
			var widget = this;
			on(this.addExitCriteriaNode, "click", function(evt) {
				evt.stopPropagation();
				widget.exitCriteriaService.add(function(exitCriteria) {
					var ec = new ExitCriteria(exitCriteria);
					widget.exitCriteriaNode.appendChild(ec.domNode);
				});
			});
		}
	});
}
);