Template.Pedido.onCreated(function(){
	this.editMode = new ReactiveVar(false); // variable de session para template especificos

});

Template.Pedido.helpers({
	updatePedidoId: function(){
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	
});

Template.Pedido.events({
	'click .toggle-menu': function(){
		Meteor.call('finalizarPedido', this._id,this.isFinalizado);
	},
	'click .fa-trash' : function(){
		Meteor.call('deletePedido',this._id);
	},
	'click .fa-pencil' : function(event, template){
		template.editMode.set(!template.editMode.get());
		//Session.set('editMode',!Session.get('editMode')); //si usamos variables de session globales
	},
	'click .check-tarea': function(event,template){
		var idPedido=template.data._id; //6 horas para encontrar esto. lpm
		Meteor.call('finalizarTarea', this.id,idPedido,this.isFinalizada);
	}
});