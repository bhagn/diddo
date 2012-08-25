define(["dojo/_base/declare", "dojo/_base/xhr", "dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/ready", "dojo/on", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/layout/_LayoutWidget", "dijit/_Container", "dojo/text!./templates/ImpedimentManager.html", "custom/DiddoRestUI", "custom/Impediment", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button",
        "dijit/form/Form", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/Select", "dijit/form/CheckBox","dijit/form/DateTextBox"],
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
					widget._addImpediment(impediments[i]); 
				}
			});
		},
		
		_addImpediment: function(impediment) {
			console.log("Adding Impediment: ", impediment);
			var imp = new Impediment(impediment, this.impedimentService);
			this.impedimentNode.appendChild(imp.domNode);
		},
		
		_setupEventHandlers: function() {
			console.log("Setting up Event Handlers");
			var widget = this;
			var impedimentService = this.impedimentService;
			on(this.addImpedimentButton, "click", function(evt) {
				impedimentService.add(function(impediment) {
					widget._addImpediment(impediment);
				});
			});
		},
		
	});
});