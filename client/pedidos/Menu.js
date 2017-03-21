
Template.Menu.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('pedidos');
	});
});

Template.Menu.helpers({
	pedidos: ()=>{
		return Pedidos.find({inMenu: true});
	}
});