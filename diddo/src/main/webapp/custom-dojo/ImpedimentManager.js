define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/ImpedimentManager.html", "custom/DiddoRestUI", "custom/Team", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button"],
		function(declare, xhr, parser, dom, domConstruct, ready, on, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _LayoutWidget, _Container, template, RestUI, Team) {
	return declare("ImpedimentManager", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container], {
		templateString: template,
		impedimentService: null,
		constructor: function() {
			this.impedimentService = new RestUI("impediments");
		},
		
		postCreate: function() {
			this._loadImpediments();
			this._setupEventHandlers();
		},
		
		_loadImpediments: function(){
			console.log("Loading Impediments");
			var widget = this;
			this.impedimentService.getAll(null, function(impediments) {
				console.log("retrieved Impediments: ", impediments);
				for(var i=0, len=impediments.length; i<len; i++) {
					var impediment = new Impediment(impediments[i], widget.impedimentService);
					widget.impedimentNode.appendChild(impediment.domNode);
				}
			});
		},
		
		_setupEventHandlers: function() {
			console.log("Setting up Event Handlers");
			var impedimentService = this.impedimentService;
			on(this.addImpedimentButton, "click", function(evt) {
				impedimentService.add();
			});
		},
		
	});
});