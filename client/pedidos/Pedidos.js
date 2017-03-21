//Meteor.subscribe('recipes');

Template.Pedidos.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('pedidos');
		self.subscribe('sectores');
	});
});

Template.Pedidos.helpers({
	pedidos: ()=>{
		return Pedidos.find({});
	}
});

Template.Pedidos.events({
	'click .new-recipe': () => {
		Session.set('newPedido',true);
	}
});