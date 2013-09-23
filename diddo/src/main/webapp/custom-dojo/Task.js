define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/Task.html", "custom/DiddoRestUI", "dojo/_base/fx", "dojo/dom-class", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX, domClass){
			return declare("Task", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
				templateString: template,
				taskNumber: null,
				description: null,
				dots:null,
				status: null,
				startDate: null,
				endDate: null,
				complex: false,
				unplanned: false,
				owner: null,
				userStory: null,
				baseClass: "task white",
				
				constructor: function(taskObject, taskService){
					this.taskService = taskService || new RestUI('tasks');
				},
				
				postCreate: function(){
					this.taskNumberNode.innerHTML = this.taskNumber;
					this.ownerNode.innerHTML = this.owner.username;
					this.descriptionNode.innerHTML = this.description;
					this.taskHeaderNode.setAttribute("class", "diddoTaskHeader " + this.userStory.color);
					this.updateControls();
					
					this.setupEventHandlers();
				},
				
				updateControls: function() {
					this.changeOwnerButton.style.display = "none";
					this.moveBackButton.style.display = "none";
					this.markAsDoneButton.style.display = "none";
					this.putADotButton.style.display = "none";
					
					if(this.status == "NEW_TASK" || this.status == "IN_PROGRESS") {
						this.changeOwnerButton.style.display = "";
					}
					if (this.status == "IN_PROGRESS" || this.status == "COMPLETED") {
						this.moveBackButton.style.display = "";
					}
					if(this.status == "IN_PROGRESS") {
						this.markAsDoneButton.style.display = "";
						this.putADotButton.style.display = "";
					}
					
					if(this.status === "COMPLETED") {
						domClass.toggle(this.taskNumberNode.parentNode, "green");
						domClass.toggle(this.descriptionNode, "task-done");
					}
				},
				
				setupEventHandlers:function(){
					var widget = this;
					var service = this.taskService;
					//when completeButton (defined in 'Task.html') is clicked
					on(this.markAsDoneButton, "click", function(evt) {
						widget.taskService.get(widget.id, "close" ,function(response) {
							widget.markAsDoneButton.style.display = "none";
							domClass.toggle(widget.taskNumberNode.parentNode, "task green");
							domClass.toggle(widget.descriptionNode, "task-done");
						});
					});
					
					//when deleteButton (defined in 'Task.html') is clicked
					on(this.deleteButton, "click", function(evt) {
						widget.taskService.remove("" + widget.id, function(response) {
							console.log("deleted: ", widget.id);
							baseFX.fadeOut({
								node: widget.id,
								duration: 500,
								onEnd: function(evt) {
									widget.destroyRecursive();
								}
							}).play();
						});
					});
					
					on(this.editButton, "click", function(evt) {
						widget.taskService.update("" + widget.id, function(response) {
							service.get("" + widget.id, null, function(task) {
								widget.ownerNode.innerHTML = task.owner.username;
								widget.statusNode.innerHTML = task.status;
							});
						});
					});
				}
			});
}

);