Template.Sector.onCreated(function(){
	this.editMode = new ReactiveVar(false); // variable de session para template especificos

});

Template.Sector.helpers({
	updateSectorId: function(){
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	}
});

Template.Sector.events({
	'click .fa-trash' : function(){
		Meteor.call('deleteSector',this._id);
	},
	'click .fa-pencil' : function(event, template){
		template.editMode.set(!template.editMode.get());
		//Session.set('editMode',!Session.get('editMode')); //si usamos variables de session globales
	}
});