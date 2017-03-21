Template.PedidoSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id= FlowRouter.getParam('id');
		self.subscribe('singlePedido',id);
	});
});

Template.PedidoSingle.helpers({
	pedido: ()=>{
		var id= FlowRouter.getParam('id');
		return Pedidos.findOne({_id: id});
	}
});