define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/UserStoryDetails.html", "custom/DiddoRestUI", "dojo/_base/fx", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, baseFX) {
	return declare("UserStoryDetails", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		id : null,
		constructor: function(userstoryObject) {
			this.userStoryService = new RestUI("userstorys");
			this.id = userstoryObject.id;
		},
		postCreate: function() {
			this.userStoryService.get("" + this.id , "userstorydetails" , function(userstorydetails){
				this.title.innerHTML = userstorydetails.title;
				this.description.innerHTML = userstorydetails.description;
				var exitcriterias = userstorydetails.exitcriterias;
				exitcriterias.forEach(function(value, key)
				  {
					var rowCount = this.table.rows.length;
			        var row = table.insertRow(rowCount);
			        var cell1 = row.insertCell(0);
			        if(value = "true"){
			            cell1.innerHTML = '<span ><i class="icon-ok-sign"></span>';
			        }
			        else{
			        	cell1.innerHTML =  '<span ><i class="icon-sign-black"></span>';
			        }
		            var cell2 = row.insertCell(1);
			        cell2.innerHTML = "<span>" + key + "</span>";
				  });
			});
			this.setupEventHandlers();
		},
		
		setupEventHandlers: function() {},
	});
}
);