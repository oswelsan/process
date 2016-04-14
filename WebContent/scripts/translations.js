angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
    
	gettextCatalog.setStrings('es', {
    	"Login":"Autenticación",
    	"Username":"Usuario",
    	"Password":"Contraseña",
    	"Ok":"Acceder",
    	"Select enviroment":"Seleccione el ambiente",
    	"Delete":"Eliminar",
    	"Recover":"Recuperar",
    	"Back":"Volver",
    	"You already have an established connection. What would you like to do?":"Usted ya tiene una conexión establecida. ¿Qué desea hacer?",
    	"Sent by":"Enviado por",
    	"Role":"Rol",
    	"Workflow":"Flujo de Trabajo",
    	"Detail":"Detalle",
    	"Date":"Fecha",
    	"Time":"Tiempo",
    	"global search":"busqueda global"
    });
    
    gettextCatalog.setStrings('en', {
    		"Login":"Login",
    		"Username":"Username"
    });
}]);