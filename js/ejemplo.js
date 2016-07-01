$(document).ready(function() {//Esto indica que la página esta listo y cargado
	$('#fecha').datepicker( {monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], dateFormat: 'yy-mm-dd'});
	listarDatos();
});

function enviarDatos () {//FUNCION QUE QUE ENVIA DATOS PARA QUE EL PHP REGISTRE EN LA BD
	var nom = $("input#nombre").val();//CAPTURAMOS DATOS DEL "INPUT" CON ID='nombre'
	var fone = $("input#telefono").val();//CAPTURAMOS DATOS DEL "INPUT" CON ID='telefefono'
	var fecha = $("input#fecha").val();//CAPTURAMOS DATOS DEL "INPUT" CON ID='fecha'
	var errorcolor = "#f2e6e1"; //DEFINIMOS UN COLOR DE ERROR
	var okcolor = "#e1f2e1"; //DEFINIMOS EL COLOR 
	if (nom=="") {//COMPROBAMOS SI EL "INPUT" CONTIENE ALGUN DATOS, CASO CONTRARIO NOS COLOREA DE ROJO, ALERTANDO QUE SE DEBE INGRESAR ALGUN DATO
		var dato = document.getElementById("nombre");//Inicializamos el INPUT con JavaScript y 
		dato.style.background = errorcolor; //Aplicamos el coloreado (rojo de error)
		dato.focus(); //Realizamos un focus para que escriba en INPUT
		return;
	}
	else{
		if (fone=="") {
			document.getElementById("nombre").style.background = okcolor;
			var dato = document.getElementById("telefono");
			dato.style.background = errorcolor;
			dato.focus();
			return;
		}
		else{
			//Restauramos los colores de INPUT's a color blanco o a otro color que se desea
			document.getElementById("nombre").style.background = 'white';
			document.getElementById("telefono").style.background = 'white';
			document.getElementById("fecha").style.background = 'white';
			//EL AJAX QUE ESTA COMENTADO, ES PARA VERIFICAR SI EL DATO YA EXISTE REGISTRADO EN LA BD
			//ESTO PARA NO TENER QUE REGISTRAR DATOS DUPLICADOS

			/*$.ajax({
		        type: "GET",
		        dataType: "html",
		        url: "servidor/personal.php?action=existe"+"&fone="+fone,
		          success: function(data){
		            if(data=="Existe"){
		              alert("El nombre ya existe, verifique sus datos!!!");
		            }
		            else{
		              guardarPersonal("nom="+nom+"&fone="+fone+"&fecha="+fecha);
		            }
		        }
		    });*/
			//LLAMAMOS A FUNCION guardarPersonal() PARA QUE ENVIAR LOS DATOS INGRESADOS EN INPUT's
			guardarPersonal("nom="+nom+"&fone="+fone+"&fecha="+fecha);
		}
	}
	
}
//FUNCION QUE SE ENCARGA DE ENVIAR LOS DATOS POR MEDIO DE POST
function guardarPersonal (params) {//RECIBE PARAMETROS, ES DECIR LOS DATOS A ENVIAR
	$.ajax({//DECLARAMOS EL AJAX DE JQUERY
	    type: "POST", //DEFINIMOS EL METODO POR QUE SE VA ENVIAR LOS DATOS "post"
	    data: params, //PREPARAMOS LOS DATOS, LISTO PARA EL ENVIO
	    dataType: "html", //ESTO INDICA QUE LA RESPUESTA QUE RECIBAMOS DESPUES DE ENVIAR SERA EN FORMATO HTML
	    url: "servidor/personal.php?action=add", //LA URL EN DONDE ESTA UBICADO EL ARCHIVO .PHP
		success: function(data){//SUCCES ES, CUANDO EL ARCHIVO PHP SE EJECUTO CORRECTAMENTE Y NOS DEVUELVE UNA RESPUESTA DE OK
			if(data == "ok"){//COMPROBAMOS SI LA RESPUESTA ES OK, ENTONCES PROCEDEMOS A LIMPIAR LOS INPUTS
				$("input#nombre").val("");//ASIGNAMOS AL "INPUT" CON ID='nombre' CON UNA CADENA VACIA
				$("input#telefono").val("");//LOMISMO
				$("input#fecha").val("");//LOMISMO
				$("#tablapers tbody").html("");//LIMPIAMOS LA TABLA, SOLO EL CUERPO DE LA TABLA
				document.getElementById("nombre").style.background = 'white'; //COLOREAMOS DE BLANCO
				document.getElementById("telefono").style.background = 'white';//LOMISMO
				document.getElementById("fecha").style.background = 'white';//LOMISMO
				listarDatos ();//LLAMAMOS A LA FUNCION QUE HACE EL LISTADO EN LA TABLA
			}
		}
  	});	
}
//FUNCION QUE LISTA EN LA TABLA TODOS LOS DATOS REGISTRADOS
function listarDatos () {
	$.ajax({
	    type: "GET",
	    dataType: "json",//LOS DATOS LO RECIBIMOS EN FORMATO "JSON"
	    url: "servidor/personal.php?action=list",
      	success: function(data){ //EL 'data' CONTIENE LOS DATOS EN FORMATO "JSON"
      		var html = '';//DECLARAMOS UNA VARIABLE VACIA
			if(data.length > 0){//VERIFICAMOS LA LONGITUD, SI LA CONDICION SE CUMPLE PROCEDEMOS A REPOBLAR LOS LA TABLA CON LOS DATOS
		        $.each(data, function(i,item){//HACEMOS UN RECORRIDO CON UN FOR TODO LOS REGISTROS OBTENIDOS
		          html += '<tr>'//APERTURAMOS EL <TR>
		            html += '<td>'+item.nom+'</td>'//EN TD COLOCAMOS nombre
		            html += '<td>'+item.fone+'</td>'//EN TD COLOCAMOS telefono
		            html += '<td>'+item.fech+'</td>'//En TD COLOCAMOS fecha
		            //AGREGAMOS UN BOTON PEQUEÑO PARA ELIMINAR Y ACTUALIZAR DATOS RESPECTIVAMENTE
		            html += "<td class='text-center'><button class='btn btn-xs btn-danger' title='Eliminar datos' onclick='eliminarDatos("+item.idp+")'><i class='glyphicon glyphicon-remove'></button></td>"
		            html += "<td class='text-center'><button class='btn btn-xs btn-primary' title='Modificar datos' onclick='modificarDatos("+item.idp+")'><i class='glyphicon glyphicon-edit'></button></td>"
		          html += '</tr>';//CERRAMOS EL TR
		        });
		    }
		    //VERIFICAMOS SI LA VARIABLE html ESTA VACIA, DE SER ASI MOSTRAMOS UN MENSAJE DE 'no se encontraron registros...'
		    if(html == '') html = '<tr><td colspan="5" align="center">No se encontraron registros...</td></tr>'
		    $("#tablapers tbody").html(html);//LO REPOBLAMOS LOS DATOS AL "TBODY" DE LA TABLA
    	}
  	});
}
function obtieneDatos (idp) {
	$.ajax({
	    type: "GET",
	    dataType: "html",
	    url: "servidor/personal.php?action=get"+"&idp="+idp,
	    success: function(data){
	    	var cadena = data.split("|");//OBTENEMOS LOS DATOS EN UNA CADENA SEPARADOS CON "|" Y LOS SEPARAMOS EN "cadena" que sera un array
	    	$("input#mnombre").val(cadena[1]); //ASIGNAMOS EL PRIMER DATO nombre
			$("input#mtelefono").val(cadena[2]);
			$("input#mfecha").val(cadena[3]);
			//$('input#mfecha').datepicker( {monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'], dateFormat: 'yy-mm-dd'});
	    }
	});
}
function modificarDatos (idp) {
	obtieneDatos(idp);//LLAMAMOS A LA FUNCION obtieneDatos(idp) PASANDO EL ID DEL REGISTRO PERSONAL
	$(function() {
      	$("#flotante").dialog({//HACEMOS FLOTAR UN DIV CON ID="FLOTANTE", ES PROPIO DE JQUERY-UI
        	resizable: false,//BLOQUEAMOS EL APLICAR
        	modal: true,//LE INDICAMOS QUE SERA FLOTANTE Y LOS DE MAS DE BLOQUEA
        	buttons: {//DEFINIMOS LOS BOTONES
        		'Cancelar': function() {//BOTON CANCELAR
         			$( this ).dialog( "close" );//CERRAMOS EL DIALOGO
         		},
        		'Actualizar': function() {
         			//$( this ).dialog( "close" );
         			var nom = $("input#mnombre").val();//CAPTURAMOS LOS DATOS
					var fone = $("input#mtelefono").val();
					var fech =$("input#mfecha").val();
          			$.ajax({
					    type: "POST",//ENVIAMOS LOS DATOS A ACTUALIZAR
					    data: "idp="+idp+"&nom="+nom+"&fone="+fone+"&fech="+fech,
					    dataType: "html",
					    url: "servidor/personal.php?action=upd",
					    success: function(data){
					    	$("#tablapers tbody").html("");
					      	listarDatos ();//LLAMAMOS OTRA VES PARA ACTUALIZAR EL LISTADO DE LA TABLA
					      	$("#flotante").dialog( "close" );//CERRAMOS EL DIALOGO INDICANDO EL ID="FLOTANE"
					    }
					});
         		}
        	}
    	});
    });
}

/*------------Funciones de validación----------------*/
function validarcadena(cadena) {
  var checkOK = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú" + " ";
  var allValid = 0;
  for (i = 0; i < cadena.length; i++) {
    ch = cadena.charAt(i);
    for (j = 0; j < checkOK.length; j++){
      if (ch == checkOK.charAt(j)){
        allValid++;
        break;
      }
    }
  }
  return allValid;
}

function validarnumero(numero) {
  var checkOK = "0123456789";
  var decPoints = 0;
  for (i = 0; i < numero.length; i++) {
    ch = numero.charAt(i);
    for (j = 0; j < checkOK.length; j++){
      if (ch == checkOK.charAt(j)){
        decPoints++;
        break;
      }
    }
  }
  return decPoints;
}

function restrisimbol(simbol) {
  var checkOK = "\/|\\";
  var decPoints = 0;
  for (i = 0; i < simbol.length; i++) {
    ch = simbol.charAt(i);
    for (j = 0; j < checkOK.length; j++){
      if (ch == checkOK.charAt(j)){
        decPoints++;
        break;
      }
    }
  }
  return decPoints;
}

function restrispace(contra) {
  var checkOK = " ";
  var decPoints = 0;
  for (i = 0; i < contra.length; i++) {
    ch = contra.charAt(i);
    for (j = 0; j < checkOK.length; j++){
      if (ch == " "){
        decPoints++;
        break;
      }
    }
  }
  return decPoints;
}
/*------------Funciones de validación----------------*/