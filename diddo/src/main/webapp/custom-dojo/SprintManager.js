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
			var widget = this;
			var sprint = this.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].value;
			this.sprintService.get(sprint, "userstories", function(userStories) {
				widget.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].userStories = userStories;
				//widget._showUserStories();
				console.log(userStories);
			});
		},
		
		_showUserStories: function() {
			var us = this.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].userStories;
			this._cleanup(this.userStoriesNode.domNode);
			for(var i=0; i<us.length; i++) {
				var userStory = us[i];
				this._addUserStoryToUI(userStory);
			}
		},
		
		_loadTasks: function(userStory) {
			var widget = this;
			this._cleanup(this.taskNode.domNode);
			this.userStoryService.get(userStory.id, "tasks", function(tasks) {
				for(var i=0; i<tasks.length; i++) {
					widget.taskNode.domNode.appendChild(new Task(tasks[i], taskService).domNode);
				}
			});
		},
		
		_addUserStoryToUI: function(us) {
			var widget = this;
			var userStory = new UserStory(us, this.userStoryService);
			on(userStory.domNode, "click", function(evt) {		
				widget._loadTasks(userStory);
			});
			this.userStoriesNode.domNode.apendChild(userStory.domNode);
		},
		
		_setupEventHandlers: function() {
			var widget = this;
			on(this.sprintDropdownNode, "change", function(evt) {
				widget._loadUSOfSprint();
			});
			
			on(this.addUserStoryButton, "click", function(evt) {
				widget.userStoryService.add(function(userStory) {
					widget._addUserStoryToUI(userStory);
				});
			});
		},
		
		_cleanup: function(container) {
			for(var i=container.childNodes.length; i>0; i--) {
				console.log("deleting: ", container.childNodes[i-1].id);
				var widget = dijit.byId(container.childNodes[i-1].id);
				if(widget)
					userWidget.destroyRecursive();
			}
		}
		
	});
}
);