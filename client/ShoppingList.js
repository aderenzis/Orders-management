Template.ShoppingList.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('pedidos');
	});
});

Template.ShoppingList.helpers({
	shoppingList: ()=>{
		return Pedidos.find({inMenu: true});
	}
});