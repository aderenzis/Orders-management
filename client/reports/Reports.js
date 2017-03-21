
Template.Reports.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('pedidos');
		self.subscribe('sectores');
	});
});
/*Template.Reports.helpers({
	pedidos: ()=>{
		return Pedidos.find({});
	}
});*/

Template.Reports.events({
	'click .btn-report': function() {
		// Some variables with 'this' (requires router setup - see below) 
		var customerName = "Alan De Renzis";
		var customerDetailOne = "this.detail_one";
		var customerDetailTwo = "Detalle 2"
		// Some variables without 'this' 
		var customerAdress ="Direccion"
		var currentUser = Meteor.user().profile.nombre;
		console.log(currentUser);
 
		// Define the pdf-document 

		//HACER ARREGLO DE PEDIDOS PARA COLOCAR EN BODY
		/*
		var pedidos = Pedidos.find({});
		var pedidosRep=[];
		for(i=0;i<pedidos.length;i++){
			var fecha = pedidos[i].fecha;
			var fecha = pedidos[i].tareasId.length;
		}*/
		var docDefinition = { 
			pageSize: 'A4',
		//	pageMargins: [ 30, 25, 30, 25 ],
			
			// Content with styles 
			content: [
				{ text: customerName, style: 'headline' },
				{
					columns: [
						{ width: '15%', text: 'Detail #1:', style: ['listItem', 'listLabel'] },
						{ width: '35%', text: customerDetailOne, style: ['listItem', 'listText'] },
						{ width: '15%', text: 'Detail #2:', style: ['listItem', 'listLabel'] },
						{ width: '35%', text: customerDetailTwo, style: ['listItem', 'listText'] }
					],
					//columnGap: 10
				},
				{ text: customerAdress },
				{ text: currentUser },

				{ text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
				{
					style: 'tableExample',
					table: {
							headerRows: 1,
							body: [
									[{ text: 'Fecha', style: 'tableHeader' }, { text: 'Autor', style: 'tableHeader'}, { text: 'Tareas', style: 'tableHeader' }, { text: 'Tareas Finalizadas', style: 'tableHeader' }],
									[ 'Sample value 1', 'Sample value 2', 'Sample value 3' , 'Sample value 3'],
									[ 'Sample value 1', 'Sample value 2', 'Sample value 3' , 'Sample value 3'],
									[ 'Sample value 1', 'Sample value 2', 'Sample value 3' , 'Sample value 3'],
									[ 'Sample value 1', 'Sample value 2', 'Sample value 3' , 'Sample value 3'],
							]
					},
					layout: 'headerLineOnly'
				},
			],
			
			// Style dictionary 
			styles: {
				headline: { fontSize: 25, bold: true, margin: [0, 0, 0, 25] },
				listItem: { fontSize: 14, margin: [0, 0, 0, 5] },
				listLabel: { bold: true },
				listText: { italic: true }
			}
		};
 
		// Start the pdf-generation process 
		pdfMake.createPdf(docDefinition).open();
	}
});