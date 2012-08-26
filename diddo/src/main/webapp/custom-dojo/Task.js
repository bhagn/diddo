define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/Impediment.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX){
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
				baseClass: "task orange",
				
				constructor: function(taskObject, taskService){
					this.taskService = taskService || new RestUI('tasks');
				},
				
				postCreate: function(){
					this.taskNumberNode.innerHTML = this.taskNumber;
					this.descriptionNode.innerHTML = this.description;
					this.statusNode.innerHTML = this.status;
					this.ownerNode.innerHTML = this.owner.username;
					this.userStoryNode.innerHTML = this.userStory.title;
					this.startdateNode.innerHTML = this.startDate;
					if(this.complex) {
						this.set("class", "task red");
					}
					if(this.endDate!=null) {
						this.set("class", "task green");
						this.completeButton.set("style", "display: none;");
					}
					this.setupEventHandlers();
				},
				
				setupEventHandlers:function(){
					var widget = this;
					var service = this.taskService;
					//when completeButton (defined in 'Task.html') is clicked
					on(this.completeButton, "click", function(evt) {
						widget.taskService.get(widget.id, "close" ,function(response) {
							widget.completeButton.destroy();
							widget.set("class", "task green");
						});
					});
					
					//when deleteButton (defined in 'Task.html') is clicked
					on(this.deleteButton, "click", function(evt) {
						widget.taskService.remove("" + widget.id, function(response) {
							console.log("deleted: ", widget.id);
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