angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
    
	gettextCatalog.setStrings('es', {
    	"Login":"Autenticación",
    	"Username":"Usuario",
    	"Password":"Contraseña",
    	"Ok":"Acceder",
    	"Select environment":"Seleccione el ambiente",
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
    	"Username":"Username",
    	"Password":"Password",
    	"Ok":"Ok",
    	"Select environment":"Select environment",
    	"Delete":"Delete",
    	"Recover":"Recover",
    	"Back":"Back",
    	"You already have an established connection. What would you like to do?":"You already have an established connection. What would you like to do?",
    	"Sent by":"Sent by",
    	"Role":"Role",
    	"Workflow":"Workflow",
    	"Detail":"Detail",
    	"Date":"Date",
    	"Time":"Time",
    	"global search":"global search"
    });
}]);