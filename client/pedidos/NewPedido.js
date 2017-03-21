Template.NewPedido.events({
	'click .fa-close': function(){
		
	}
});

var hookObject = {endSubmit: function(insertDoc, updateDoc, currentDoc) {
	Session.set('newPedido',false);
  }};
AutoForm.hooks({
  insertPedidoForm: hookObject
});