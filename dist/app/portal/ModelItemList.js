/*!
 *  landscape-modeler-js
 *  @version 0.0.1
 *  @author Tom Wayson <twayson@esri.com> (http://tomwayson.com)
 *
 *  A JavaScript web application for designing, running, and saving weighted overlay models using the Esri ArcGIS API for JavaScript and ArcGIS Server image services.
 */
define(["dojo/_base/declare","dojo/_base/array","dojo/dom","dojo/on","dojo/string","dojo/Evented","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/text!./templates/ModelItemList.html","dojo/io-query","dojo/io/script","dojo/store/Memory","dgrid/OnDemandGrid","dgrid/Selection","dijit/form/Select"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){return a([g,h,i,f],{templateString:j,baseClass:"landscape-model-info",result:"",postCreate:function(){this.inherited(arguments),this.loadButton.set("disabled",!0)},populateGrid:function(b){var c=this,d=[{field:"title",label:"Name"},{field:"description",label:"Description"},{field:"modified",label:"Modified"},{field:"owner",label:"Author"},{field:"id",label:"id"},{field:"tags",label:"tags"}],e=this.formatGridData(b),f=a([n,o]);this.grid=new f({store:e,columns:d,selectionMode:"single",loadingMessage:"Loading data...",noDataMessage:"No results found."},this.gridNode),this.grid.on("dgrid-select",function(){c.loadButton.set("disabled",!1)}),this.grid.on("dgrid-deselect",function(){c.loadButton.set("disabled",!0)}),this.grid.startup()},resizeGrid:function(){this.grid.resize()},formatGridData:function(a){for(var b=[],c=0;c<a.results.length;c++){var d=new Date(a.results[c].modified).toLocaleDateString(),e={title:a.results[c].title,description:a.results[c].description,modified:d,owner:a.results[c].owner,id:a.results[c].id,category:this.getModelCategory(a.results[c].tags)};b.push(e)}var f=new m({data:b,idProperty:"id"});return f},getModelCategory:function(a){var c;return b.some(a,function(a){var d=b.some(this.categoryNode.options,function(b){return b.value===a});return d&&(c=a),d},this),c},refreshGrid:function(a){var b=this.formatGridData(a);this.grid.set("store",b)},refreshCategories:function(){this.categoryNode.reset()},startup:function(){this.inherited(arguments)},populateCategories:function(a){this.categoryNode.set("options",a),this.categoryNode.options.splice(0,0,{value:"*",label:"All Categories"})},_onCategoryChange:function(){"*"===this.categoryNode.value?this.grid.setQuery({}):this.grid.setQuery({category:this.categoryNode.value})},_onLoadClick:function(){var a="";for(var b in this.grid.selection)a=b;this.emit("LoadSelectedModel",a)},_onCancelClick:function(){this.emit("Cancel")}})});