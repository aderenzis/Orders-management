

Template.Sectores.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('sectores');
	});
});

Template.Sectores.helpers({
	sectores: ()=>{
		return Sectores.find({});
	}
});

Template.Sectores.events({
	'click .new-recipe': () => {
		Session.set('newSector',true);
	}
});