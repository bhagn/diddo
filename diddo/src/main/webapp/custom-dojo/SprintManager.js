define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/SprintManager.html", "custom/DiddoRestUI", "custom/Team", 
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/form/Form", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/Select", "dijit/form/CheckBox"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, Team) {
	return declare("SprintManager", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		sprintService: null,
		userStoryService: null,
		taskService: null,
		exitCriteriaService: null,
		sprints: [],
		
		constructor: function() {
			this.sprintService = new RestUI("sprints");
			this.userStoryService = new RestUI("userstorys");
			this.userStoryService = new RestUI("tasks");
			this.exitCriteriaService = new RestUI("exitcriterias");
		},
		
		postCreate: function() {
			this._loadData();
			this._setupEventHandlers();
		},
		
		_loadData: function(){
			var widget = this;
			//load all Sprints
			this.sprintService.getAll(null, function(sprints) {
				for(var i=0; i<sprints.length; i++) {
					var sprint = sprints[i];
					(function(sprint) {
						var option = domConstruct.create("option");
						option.value = sprint.sprintNo; 
						option.innerHTML = sprint.sprintNo;
						
						if(!sprints[i].endDate) {
							option.innerHTML =  sprint.sprintNo + " (Latest)";
						}
						option["sprintObject"] = sprint;
						widget.sprintDropdownNode.appendChild(option);
					})(sprint);
				}
				widget._loadUSOfSprint();
			});
		},
		
		_loadUSOfSprint: function() {
			var sprint = this.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].value;
			this.sprintService.get(sprint, "userstories", function(userStories) {
				console.log(userStories);
			});
		},
		
		_setupEventHandlers: function() {
			var widget = this;
			on(this.sprintDropdownNode, "change", function(evt) {
				widget._loadUSOfSprint();
			});
		},
		
	});
}
);