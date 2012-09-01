define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dojo/_base/event", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/SprintManager.html", "custom/DiddoRestUI", "custom/Team", "custom/UserStory", "custom/UserStoryDetails",
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dijit/form/Form", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/Select", "dijit/form/CheckBox"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, event, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, Team) {
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
			this.taskStoryService = new RestUI("tasks");
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
				console.log(sprints);
				for(var i=0; i<sprints.length; i++) {
					var sprint = sprints[i];
					(function(sprint) {
						var option = domConstruct.create("option");
						option.sprint = sprint;
						option.value = sprint.sprintNo; 
						option.innerHTML = sprint.sprintNo;
						
						if(!sprints[i].endDate) {
							option.innerHTML =  sprint.sprintNo + " (Latest)";
						}
						widget.sprintDropdownNode.appendChild(option);
					})(sprint);
				}
				widget._showSelectedSprint();
				widget._loadUSOfSprint();
			});
		},
		
		_showSelectedSprint: function() {
			var sprint = this.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].sprint;
			if(sprint.endDate) {
				this.endSprintButton.set("class", "btn btn-small disabled");
				this.endSprintButton.disabled = true;
				this.newSprintButton.set("class", "btn btn-small btn-success");
				this.newSprintButton.disabled = false;
			} else {
				this.endSprintButton.set("class", "btn btn-small btn-danger");
				this.endSprintButton.disabled = false;
				this.newSprintButton.set("class", "btn btn-small disabled");
				this.newSprintButton.disabled = true;
			}
			this.sprintNoNode.innerHTML = sprint.sprintNo;
			this.startedOnNode.innerHTML = sprint.startDate;
			this.endedOnNode.innerHTML = sprint.endDate;
		},
		
		_updateUSCount: function() {
			var us = this.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].userStories;
			this.noOfUSNode.innerHTML = us.length;
		},
		
		_loadUSOfSprint: function() {
			var widget = this;
			var sprint = this.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].value;
			this.sprintService.get(sprint, "userstories", function(userStories) {
				widget.sprintDropdownNode.options[widget.sprintDropdownNode.selectedIndex].userStories = userStories;
				widget._showUserStories();
				console.log(userStories);
				widget._updateUSCount();
			});
		},
		
		_showUserStories: function() {
			var us = this.sprintDropdownNode.options[this.sprintDropdownNode.selectedIndex].userStories;
			this._cleanup(this.userStoriesNode);
			if(us.length == 0) {
				this.userStoriesNode.innerHTML = "There are no User Stories defined in this Sprint";
			} else {
				this.userStoriesNode.innerHTML = "";
			}
			for(var i=0; i<us.length; i++) {
				var userStory = us[i];
				this._addUserStoryToUI(userStory);
			}
		},
		
		_loadTasks: function(userStory) {
			var widget = this;
			this._cleanup(this.taskNode);
			this.userStoryService.get(userStory.id, "tasks", function(tasks) {
				for(var i=0; i<tasks.length; i++) {
					widget.taskNode.appendChild(new Task(tasks[i], taskService).domNode);
				}
			});
		},
		
		_addUserStoryToUI: function(us) {
			var widget = this;
			var userStory = new UserStory(us, this.userStoryService);
			on(userStory.domNode, "click", function(evt) {
				evt.cancelBubble = true;
				evt.stopPropagation();
				widget._cleanup(widget.userStoryNode);
				widget._cleanup(widget.taskNode);
				
				widget._loadTasks(us);
				var details = new UserStoryDetails(us);
				widget.userStoryNode.appendChild(details.domNode);
			});
			this.userStoriesNode.appendChild(userStory.domNode);
		},
		
		_setupEventHandlers: function() {
			var widget = this;
			on(this.sprintDropdownNode, "change", function(evt) {
				widget._showSelectedSprint();
				widget._loadUSOfSprint();
			});
			
			on(this.addUserStoryButton, "click", function(evt) {
				event.stop(evt);
				widget.userStoryService.add(function(userStory) {
					widget._addUserStoryToUI(userStory);
				});
			});
			
			on(this.newSprintButton, "click", function(evt) {
				event.stop(evt);
				widget.sprintService.add(function(sprint) {
					var option = domConstruct.create("option");
					option.sprint = sprint;
					option.value = sprint.sprintNo; 
					option.innerHTML = sprint.sprintNo;
					
					if(!sprints[i].endDate) {
						option.innerHTML =  sprint.sprintNo + " (Latest)";
					}
					widget.sprintDropdownNode.appendChild(option);
					widget.sprintDropdownNode.selectedIndex = widget.sprintDropdownNode.options.length - 1;
					widget._loadUSOfSprint();
				});
			});
		},
		
		_cleanup: function(container) {
			for(var i=container.childNodes.length; i>0; i--) {
				console.log("deleting: ", container.childNodes[i-1].id);
				var widget = dijit.byId(container.childNodes[i-1].id);
				if(widget)
					widget.destroyRecursive();
			}
		}
		
	});
}
);