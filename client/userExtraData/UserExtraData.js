Template.UserExtraData.onCreated(function(){
	this.editMode = new ReactiveVar(false); // variable de session para template especificos

});

Template.UserExtraData.helpers({
	updateUserExtraDataId: function(){
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	mail: function(){
		return this.user().emails[0].address;
	}
});

Template.UserExtraData.events({
	'click .fa-trash' : function(){
		Meteor.call('deleteUserExtraData',this._id);
	},
	'click .fa-pencil' : function(event, template){
		template.editMode.set(!template.editMode.get());
		//Session.set('editMode',!Session.get('editMode')); //si usamos variables de session globales
	}
});