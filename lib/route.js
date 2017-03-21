
//posiblemente colocar Meteor.isClient()
Accounts.onLogin(function(){
	FlowRouter.go('pedidos')
});


Accounts.onLogout(function(){
	FlowRouter.go('home')
});

FlowRouter.triggers.enter([function(context,redirect){
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		if(Meteor.userId()){
			FlowRouter.go('pedidos')
		}
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout')
	}
});

FlowRouter.route('/pedidos', {
	name: 'pedidos',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Pedidos'})
	}
});

FlowRouter.route('/recipe/:id', {
	name: 'recipe',
	action() {
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'PedidoSingle'})
	}
});

FlowRouter.route('/sectores',{
	name: 'sectores',
	action(){
		BlazeLayout.render('MainLayout',{main:'Sectores'})
	}
});

FlowRouter.route('/userExtraDatas',{
	name: 'userExtraDatas',
	action(){
			BlazeLayout.render('MainLayout',{main:'UserExtraDatas'})
	}
});

FlowRouter.route('/admin',{
	name: 'admin',
	action(){
		BlazeLayout.render('MainLayout',{main:'accountsAdmin'})
	}
});

FlowRouter.route('/reports',{
	name: 'reports',
	action(){
		BlazeLayout.render('MainLayout',{main:'Reports'})
	}
});




//Accounts
Router.configure({
    layoutTemplate: 'MainLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });


   

    this.route('private');
});

Router.plugin('ensureSignedIn', {
  only: ['private']
});


