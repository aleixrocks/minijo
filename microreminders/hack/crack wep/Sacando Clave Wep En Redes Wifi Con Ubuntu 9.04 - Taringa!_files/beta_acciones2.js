var proc = Array();
if(!lang)
	var lang = Array();
/* Editor */
lang['Negrita'] = "Negrita";
lang['Cursiva'] = "Cursiva";
lang['Subrayado'] = "Subrayado";
lang['Alinear a la izquierda'] = "Alinear a la izquierda";
lang['Centrar'] = "Centrar";
lang['Alinear a la derecha'] = "Alinear a la derecha";
lang['Color'] = "Color";
lang['Rojo oscuro'] = "Rojo oscuro";
lang['Rojo'] = "Rojo";
lang['Naranja'] = "Naranja";
lang['Marron'] = "Marr&oacute;n";
lang['Amarillo'] = "Amarillo";
lang['Verde'] = "Verde";
lang['Oliva'] = "Oliva";
lang['Cyan'] = "Cyan";
lang['Azul'] = "Azul";
lang['Azul oscuro'] = "Azul oscuro";
lang['Indigo'] = "Indigo";
lang['Violeta'] = "Violeta";
lang['Negro'] = "Negro";
lang['Tamano'] = "Tama&ntilde;o";
lang['Miniatura'] = "Miniatura";
lang['Pequena'] = "Peque&ntilde;a";
lang['Normal'] = "Normal";
lang['Grande'] = "Grande";
lang['Enorme'] = "Enorme";
lang['Insertar video de YouTube'] = "Insertar video de YouTube";
lang['Insertar video de Google Video'] = "Insertar video de Google Video";
lang['Insertar archivo SWF'] = "Insertar archivo SWF";
lang['Insertar Imagen'] = "Insertar Imagen";
lang['Insertar Link'] = "Insertar Link";
lang['Citar'] = "Citar";
lang['Ingrese la URL que desea postear'] = "Ingrese la URL que desea postear";
lang['Fuente'] = "Fuente";
lang['ingrese el id de yt'] = "Ingrese el ID del video de YouTube:\n\nEjemplo:\nSi la URL de su video es:\nhttp://www.youtube.com/watch?v=CACqDFLQIXI\nEl ID es: CACqDFLQIXI";
lang['ingrese el id de yt IE'] = "Ingrese el ID del video de YouTube:\nPor ejemplo: CACqDFLQIXI";
lang['ingrese el id de gv'] = "Ingrese el ID del video de Google:\n\nEjemplo:\nSi la URL de su video es:\nhttp://video.google.com/videoplay?docid=-5331378923498461236\nEl ID es: -5331378923498461236";
lang['ingrese el id de gv IE'] = "Ingrese el ID del video de Google:\nPor ejemplo: -5331378923498461236";
lang['ingrese la url de swf'] = "Ingrese la URL del archivo swf";
lang['ingrese la url de img'] = "Ingrese la URL de la imagen";
lang['ingrese la url de url'] = "Ingrese la URL que desea postear";
lang['ingrese el txt a citar'] = "Ingrese el texto a citar";
lang['ingrese solo el id de yt'] = "Ingrese solo el ID de YouTube";
lang['ingrese solo el id de gv'] = "Ingrese solo el ID de GoogleVideo";
lang['Cambiar vista'] = "Cambiar vista";
/* Fin Editor */
lang['error procesar'] = 'Error al intentar procesar lo solicitado';
lang['posts url categorias'] = 'posts';
lang['comunidades url'] = 'comunidades';
lang['html tema confirma borrar'] = "Seguro que deseas borrar este tema?";

var clientPC = navigator.userAgent.toLowerCase();
var clientVer = parseInt(navigator.appVersion);

var is_ie = ((clientPC.indexOf("msie") != -1) && (clientPC.indexOf("opera") == -1));
var is_nav = ((clientPC.indexOf('mozilla')!=-1) && (clientPC.indexOf('spoofer')==-1) && (clientPC.indexOf('compatible') == -1) && (clientPC.indexOf('opera')==-1) && (clientPC.indexOf('webtv')==-1) && (clientPC.indexOf('hotjava')==-1));
var is_win = ((clientPC.indexOf("win")!=-1) || (clientPC.indexOf("16bit") != -1));
var is_mac = (clientPC.indexOf("mac")!=-1);
var is_moz = 0;

function mozWrap(txtarea, open, close){
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	if(selEnd == 1 || selEnd == 2)
    selEnd = selLength;
	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd)
	var s3 = (txtarea.value).substring(selEnd, selLength);
	txtarea.value = s1 + open + s2 + close + s3;
	return;
}

function hidediv(id){
	if(document.getElementById) // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	else{
    if(document.layers) // Netscape 4
      document.id.display = 'none';
    else // IE 4
      document.all.id.style.display = 'none';
  }
}

function showdiv(id){
	if(document.getElementById) // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';
	else{
		if(document.layers) // Netscape 4
			document.id.display = 'block';
		else // IE 4
			document.all.id.style.display = 'block';
	}
}

/******************************************************************************/

function el(id){
  if(document.getElementById)
    return document.getElementById(id);
  else if(window[id])
    return window[id];
  return null;
}

/* Citar comentarios */
function citar_comment(id, nick){
	var textarea = $('#body_comm');
	textarea.focus();
	textarea.val(((textarea.val()!='') ? textarea.val() + '\n' : '') + '[quote=' + nick + ']' + htmlspecialchars_decode($('#citar_comm_'+id).html(), 'ENT_NOQUOTES') + '[/quote]\n');
}

/* Box login */
function open_login_box(action){
	if($('#login_box').css('display') == 'block' && action!='open')
		close_login_box();
	else{
		$('#login_error').css('display','none');
		$('#login_cargando').css('display','none');
		$('.opciones_usuario').addClass('here');
		$('#login_box').fadeIn('fast');
		$('#nickname').focus();
	}
}

function close_login_box(){
	$('.opciones_usuario').removeClass('here');
	$('#login_box').fadeOut('fast');
}

function login_ajax(form, connect){
	var el = new Array(), params = '';
	if (form == 'registro-logueo' || form == 'logueo-form') {
		el['nick'] = $('.reg-login .login-panel #nickname');
		el['pass'] = $('.reg-login .login-panel #password');
		el['error'] = $('.reg-login .login-panel #login_error');
		el['cargando'] = $('.reg-login .login-panel #login_cargando');
		el['cuerpo'] = $('.reg-login .login-panel .login_cuerpo');
		el['button'] = $('.reg-login .login-panel input[type="submit"]');
	} else {
		el['nick'] = $('#login_box #nickname');
		el['pass'] = $('#login_box #password');
		el['error'] = $('#login_box #login_error');
		el['cargando'] = $('#login_box #login_cargando');
		el['cuerpo'] = $('#login_box .login_cuerpo');
		el['button'] = $('#login_box input[type="submit"]');
	}
	if ($('input[name=redirect]').length) {
		var redir = '&r='+encodeURIComponent($('input[name=redirect]').val());
	} else {
		var redir = '';
	}
	if (typeof connect != 'undefined') {
		params = 'connect=facebook'+redir;
	} else {
		if (empty($(el['nick']).val())) {
			$(el['nick']).focus();
			return;
		}
		if (empty($(el['pass']).val())) {
			$(el['pass']).focus();
			return;
		}
		$(el['error']).css('display', 'none');
		$(el['cargando']).css('display', 'block');
		$(el['button']).attr('disabled', 'disabled').addClass('disabled');
		params = 'nick='+encodeURIComponent($(el['nick']).val())+'&pass='+encodeURIComponent($(el['pass']).val())+redir;
		if (form == 'logueo-form') {
			params += '&facebook=1';
		}
	}
	$.ajax({
		type: 'post', url: '/login.php', cache: false, data: params,
		success: function (h) {
			switch(h.charAt(0)){
				case '0':
					$(el['error']).html(h.substring(3)).show();
					$(el['nick']).focus();
					$(el['button']).removeAttr('disabled').removeClass('disabled');
					break;
				case '1':
					if (form != 'registro-logueo') {
						close_login_box();
					}
					if (h.substring(3)=='Home') {
						location.href='/';
					} else if (h.substr(3) == 'Cuenta') {
						location.href = '/cuenta/';
					} else {
						location.reload();
					}
					break;
				case '2':
					$(el['cuerpo']).css('text-align', 'center').css('line-height', '150%').html(h.substring(3));
					break;
				case '3':
					open_login_box();
					mydialog.class_aux = 'registro';
					mydialog.mask_close = false;
					mydialog.close_button = true;
					mydialog.show(true);
					mydialog.title('Ingresar');
					mydialog.body('<br /><br />', 305);
					mydialog.buttons(false);
					mydialog.procesando_inicio('Cargando...', 'Registro');
					mydialog.center();
					$.ajax({
						type: 'POST',
						url: '/login-form.php',
						data: '',
						success: function(h){
							mydialog.procesando_fin();
							switch(h.charAt(0)){
								case '0':
									mydialog.alert('Error', h.substring(3));
									break;
								case '1':
									mydialog.body(h.substring(3), 305);
							}
							mydialog.center();
						}
					});
					break;
				case '4':
					location.href = h.substr(3);

			}
		},
		error: function() {
			$(el['error']).html(lang['error procesar']).show();
		},
		complete: function(){
			$(el['cargando']).css('display', 'none');
		}
	});
}

function actualizar_comentarios(cat, nov){
	var pais = $('#ult_comm > .filterBy a#Pais.here').length;
	$('#ult_comm, #ult_comm > ol').slideUp(1);
	$.ajax({
		type: 'GET',
		url: '/ultimos_comentarios.php',
		cache: false,
		data: 'cat='+cat+'&nov='+nov+'&pais='+pais,
		success: function(h){
			$('#ult_comm').html(h);
			$('#ult_comm > ol').hide();
			$('#ult_comm, #ult_comm > ol:' + (pais ? 'last' : 'first')).slideDown({duration: 1000, easing: 'easeOutBounce'});
		},
		error: function(){
			$('#ult_comm, #ult_comm > ol:' + (pais ? 'last' : 'first')).slideDown({duration: 1000, easing: 'easeOutBounce'});
		}
	});
}

/* Eliminar Comentario */
function borrar_com(comid, autor){
	mydialog.close();
	$.ajax({
		type: 'POST',
		url: '/comentario-borrar.php',
		data: 'comid=' + comid + '&autor=' + autor + gget('postid') + gget('key'),
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					mydialog.alert('Error', h.substring(3));
					break;
				case '1':
					$('#div_cmnt_'+comid).fadeOut('normal', function(){ $(this).remove(); });
					break;
			}
		},
		error: function(){
			mydialog.error_500("borrar_com('"+comid+"')");
		}
	});
}

function procesando(name, clean){
	if(clean){
		proc[name] = false;
		return true;
	}
	if(proc[name])
		return true;
	else{
		proc[name] = true;
		return false;
	}
}
/* Borrar Post */
function borrar_post(aceptar){
	if(!aceptar){
			mydialog.show();
			mydialog.title('Borrar Post');
			mydialog.body('&iquest;Seguro que deseas borrar este post?');
			mydialog.buttons(true, true, 'SI', 'borrar_post(1)', true, false, true, 'NO', 'close', true, true);
			mydialog.center();
			return;
	}else if(aceptar==1){
			mydialog.show();
			mydialog.title('Borrar Post');
			mydialog.body('Te pregunto de nuevo... &iquest;Seguro que deseas borrar este post?');
			mydialog.buttons(true, true, 'SI', 'borrar_post(2)', true, false, true, 'NO', 'close', true, true);
			mydialog.center();
			return;
	}
	mydialog.procesando_inicio('Eliminando...', 'Borrar Post');
	$.ajax({
		type: 'POST',
		url: '/post.borrar.php',
		data: gget('postid', true) + gget('key'),
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					mydialog.alert('Error', h.substring(3));
					break;
				case '1':
					mydialog.alert('Post Borrado', h.substring(3), true);
					break;
			}
		},
		error: function(){
			mydialog.error_500("borrar_post(2)");
		},
		complete: function(){
			mydialog.procesando_fin();
		}
	});
}

/* Votar post */
var votar_post_votado = false;
function show_votar_post(force_hide){
	if(votar_post_votado)
		return;
	if(!force_hide && $('.post-metadata .dar_puntos').css('display') == 'none')
		$('.post-metadata .dar_puntos').show();
	else
		$('.post-metadata .dar_puntos').hide();
}
function votar_post(puntos, x){
	if(votar_post_votado)
		return;
	votar_post_votado = true;
	$.ajax({
		type: 'POST',
		url: '/votar.php',
		data: 'puntos=' + puntos + '&x=' + x + gget('postid'),
		success: function(h){
			show_votar_post(true);
			$('.dar-puntos').slideUp();
			switch(h.charAt(0)){
				case '0': //Error
					$('.post-metadata .mensajes').addClass('error').html(h.substring(3)).slideDown();
					break;
				case '1': //OK
					$('.post-metadata .mensajes').addClass('ok').html(h.substring(3)).slideDown();
					$('.puntos_post').html(number_format(parseInt($('.puntos_post').html().replace(".", "")) + puntos, 0, ',', '.'));
					break;
			}
		},
		error: function(){
			votar_post_votado = false;
			mydialog.error_500("votar_post('"+puntos+"', '"+x+"')");
		}
	});
}

/* Agregar post a favoritos */
var add_favoritos_agregado = false;
function add_favoritos(){
	if(add_favoritos_agregado)
		return;
	if(!gget('key')){
		mydialog.alert('Login', 'Tenes que estar logueado para realizar esta operaci&oacute;n');
		return;
	}
	add_favoritos_agregado = true;
	$.ajax({
		type: 'POST',
		url: '/favoritos-agregar.php',
		data: gget('postid', true) + gget('key'),
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					$('.post-metadata .mensajes').addClass('error').html(h.substring(3)).slideDown();
					break;
				case '1': //OK
					$('.post-metadata .mensajes').addClass('ok').html(h.substring(3)).slideDown();
					$('.favoritos_post').html(number_format(parseInt($('.favoritos_post').html().replace(".", "")) + 1, 0, ',', '.'));
					break;
			}
		},
		error: function(){
			add_favoritos_agregado = false;
			mydialog.error_500("add_favoritos()");
		}
	});
}

var add_comment_enviado = false;
function add_comment(mostrar_resp, comentarionum){
	if(add_comment_enviado)
		return;
	var textarea = $('#body_comm');
	var text = textarea.val();

	if(text == '' || text == textarea.attr('title')){
		textarea.focus();
		return;
	}

	$('.miComentario #gif_cargando').show();
	add_comment_enviado = true;
	$.ajax({
		type: 'POST',
		url: '/comentario3.php',
		data: 'comentario=' + encodeURIComponent(text) + '&lastid=' + lastid_comm + gget('postid') + gget('key') + '&mostrar_resp=' + mostrar_resp,
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					$('.miComentario .error').html(h.substring(3)).show('slow');
					break;
				case '1': //OK
						textarea.attr('title', 'Escribir otra respuesta...').val('');
						onblur_input(textarea);
						$('#post-comentarios #comentarios').html($('#post-comentarios #comentarios').html()+'<div id="nuevos" style="display:none">'+h.substring(3)+'</div>');
						$('#post-comentarios #comentarios #nuevos').slideDown('slow', function(){
							$('#post-comentarios #comentarios #nuevos').removeAttr('id');
						});
					break;
			}
		},
		error: function(){
			add_comment_enviado = false;
			mydialog.error_500("add_comment('"+mostrar_resp+"')");
		}
	});
}
function error_avatar(obj, id, size){
	if (typeof id == 'undefined' || typeof size == 'undefined') obj.src = global_data.img + 'images/avatar.gif';
	else obj.src = global_data.img + 'images/a'+ size + '_' + (id % 10) + '.jpg';
}

function ir_a_categoria(cat){
	if(cat!='root' && cat!='linea')
		if(cat==-1)
			document.location.href='/';
		else
			document.location.href='/' + lang['posts url categorias'] + '/' + cat + '/';
}

function menu(section, href){ //Simple Click
	if(menu_section_actual != section){
		$('#tabbed'+menu_section_actual).removeClass('here');
		$('#tabbed'+section).addClass('here');
	}
	menu_section_actual = section;
	window.location = href;
	return true;
}
function menu2(section, href){ //Con DobleClick
	if(menu_section_actual == section){
		window.location = href;
		return true;
	}else{
		$('#tabbed'+menu_section_actual).removeClass('here');
		$('#tabbed'+section).addClass('here');
		$('#subMenu'+menu_section_actual).fadeOut('fast');
		$('#subMenu'+section).fadeIn('fast');
	}
	menu_section_actual = section;
}

function set_checked(obj){
	document.getElementById(obj).checked=true;
}
function is_checked(obj){
	return document.getElementById(obj) && document.getElementById(obj).checked;
}

/* MasOportunidades Buscador */
function mo_intro(e){
  tecla=(document.all)?e.keyCode:e.which;
  if(tecla==13)
		mo_validar();
}

function mo_validar(){
	if($('#mo_ibuscador').val()=='' || $('#mo_ibuscador').val()=='Buscar'){
		alert('El campo esta vacio');
		$('#mo_ibuscador').focus();
	}else
		window.open('http://www.masoportunidades.com.ar/buscar/' + $('#mo_ibuscador').val());
}
/* FIN - MasOportunidades */

/* Buscador Home */
function change_search_engine(){
	if($('#c_search_engine').is(':checked'))
		var engine = 'g';
	else
		var engine = 't';
	document.cookie='search_engine='+engine+';expires=Thu, 26 Jul 2012 16:12:48 GMT;path=/;domain=.'+document.domain;
}
function ibuscador_intro(e){
  tecla=(document.all)?e.keyCode:e.which;
  if(tecla==13)
		home_search();
}
function home_search(){
	if($('#ibuscadorq').val()=='' || $('#ibuscadorq').val()==$('#ibuscadorq').attr('title')){
		$('#ibuscadorq').focus();
		return;
	}
	var q = encodeURIComponent($('#ibuscadorq').val());
	if(document.getElementById('c_search_engine') && document.getElementById('c_search_engine').checked)
		window.location = 'http://buscar.taringa.net/posts?engine=google&q='+q;
	else if(/poringa/.test(document.domain)) //Esta en Poringa!
		window.location = 'http://www.poringa.net/posts/buscador/taringa/?q='+q;
	else
		window.location = 'http://buscar.taringa.net/posts?q='+q;
}
/* FIN - Buscador Home */

/* Change Country */
function change_country(prefix){
	var site = /poringa/.test(document.domain) ? 'poringa' : 'taringa';
	document.cookie='site_prefix='+prefix+';expires=Thu, 26 Jul 2019 16:12:48 GMT;path=/;domain=.'+site+'.net';
	if(prefix=='la')
		prefix = 'www';
	window.location = 'http://'+prefix+'.'+site+'.net';
}
/* FIN - Change Country */

/* Editor */
//Botones posts
// <richedit>
function strip_tags (input, allowed) { allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1){ return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''; }); }

$.html2bbcode = function (data) {
	if (!data) { return ''; }
	// unwanted breaklines
	data = data.replace(/\n|\r/g, '');
	// smileys
	var smileys = {
		clipped: {
			'618:616:632': ':F',
			'596:594:610': '8|',
			'420:418:434': 'X(',
			'530:528:544': ':cool:',
			'442:440:456': ':cry:',
			'464:462:478': ':twisted:',
			'574:572:588': '^^',
			'486:484:500': ':|',
			'376:374:390': ':D',
			'552:550:566': ':oops:',
			'508:506:522': ':?',
			'398:396:412': ':(',
			'288:286:302': ':)',
			'354:352:368': ':P',
			'332:330:346': ':roll:',
			'310:308:324': ';)'
		},
		normal: {
			'idiot.gif': ':idiot:',
			'lpmqtp.gif': ':lpmqtp:',
			'8s.gif': ':8S:',
			'bang.gif': ':headbang:',
			'5.gif': ':]',
			'15.gif': ':blind:',
			'17.gif': ':buaa:',
			'hot.gif': ':hot:',
			'cold.gif': ':cold:',
			'globo.gif': ':globo:',
			'zombie.gif': ':zombie:',
			'pacman.gif': ':man:',
			'metal.gif': ':metal:',
			'mario.gif': ':mario:',
			'i.gif': ':info:',
			'exclamacion.gif': ':exc:',
			'pregunta.gif': ':q:',
			'wow.gif': ':WOW:',
			'lol.gif': ':LOL:',
			'no.gif': ':NO:',
			'ok.gif': ':OK:',
			'papel.gif': ':oo:',
			'rip.gif': ':RIP:',
			'koe.gif': ':alien:',
			'106.gif': ':trago:',
			'dolar.gif': ':money:',
			'culo.gif': ':culo:',
			'car.gif': ':auto:',
			'mobe.gif': ':lala:',
			'fantasma.gif': ':fantasma:',
			'getalife.gif': ':GET A LIFE:',
			'limoon.gif': ':limon:',
			'verde.gif': ':verde:',
			'sad2.gif': ':noo:',
			'cry.gif': ':crying:',
			'alabama.gif': ':alaba:',
			'shrug.gif': ':shrug:',
			'bobo.gif': ':bobo:',
			'buenpost.gif': ':buenpost:',
			'grin.gif': ':grin:',
			'love.gif': ':love:',
			'winky.gif': ':winky:',
			'love.gif': ':love:',
			'blaf.gif': ':blaf:',
			'unsure.gif': ':\\/',
			'nao.gif': ':NAO:',
			'postlegal.gif': ':postlegal:',
			'106.gif': ':drink:',
			'culo.gif': ':bunda:',
			'car.gif': ':carro:',
			'limoon.gif': ':limao:',
			'verde.gif': ':dolar:'
		}
	}
	// clean up spaces
	data = data.replace(/<img src="http:\/\/[^/]+\/images\/space\.gif" style="vertical-align: middle; width: 15px; height: 15px;" hspace="3" vspace="2">/g, '');
	// replace clipped
	data = data.replace(
		/<span style="position: relative;"><img src="http:\/\/[^/]+\/images\/big2v5\.gif" style="position: absolute; top: -([0-9]+)px; clip: rect\(([0-9]+)px, 16px, ([0-9]+)px, 0px\);" hspace="3" vspace="2"><\/span>/g,
		function (m, _1, _2, _3) {
			var k = _1 + ':' + _2 + ':' + _3;
			if (smileys.clipped[k]) {
				return smileys.clipped[k]
			} else {
				return m;
			}
		}
	);
	// replace normal
	data = data.replace(
		/<img src="http:\/\/[^/]+\/images\/smiles\/([a-z0-9]+\.[a-z]+)">/g,
		function (m, _1) {
			if (smileys.normal[_1]) {
				return smileys.normal[_1];
			} else {
				return m;
			}
		}
	);
	// code
	data = data.replace(
		new RegExp('<(?:pre|code)>([^]*?)<\\\/(?:pre|code)>', 'g'),
		function (match, _1) {
			return '[code]' + strip_tags(_1, '<br><br/><br />') + '[/code]'
		}
	);
	// quotes
	data = data.replace(
		new RegExp('<blockquote><div class="cita"><strong>([^]*?)<\\\/strong> dijo:<\\\/div>', 'g'),
		'[quote=$1]'
	);
	do {
		original = data;
		data = data.replace(
			new RegExp('<div class="citacuerpo">(?:<p>)?([^]*?)(?:<\\\/p>)<\\\/div><\\\/blockquote>', 'g'),
			function (m, _1) {
				if (_1.match(new RegExp('<div class="citacuerpo">(?:<p>)?([^]*?)(?:<\\\/p>)<\\\/div><\\\/blockquote>'))) {
					return m;
				} else {
					return _1 + '[/quote]';
				}
			}
		);
	} while (original != data);
	// swf
	data = data.replace(
		new RegExp('(?:<br>)?(?:<center>)?<embed src="([^]*?)"(.*?)>(?:<\\\/embed>)?(?:<\\\/center>)?', 'g'),
		'[swf=$1]'
	);
	// images
	data = data.replace(/<img\s[^<>]*?src=\"?([^<>]*?)\"?(\s[^<>]*)?\/?>/gi, '[img]$1[/img]');
	// strong
	data = data.replace(/<(strong|b)(\s[^<>]*)?>/gi, '[b]');
	data = data.replace(/<\/(strong|b)>/gi, '[/b]');
	// italic
	data = data.replace(/<(em|i)(\s[^<>]*)?>/gi, '[i]');
	data = data.replace(/<\/(em|i)>/gi, '[/i]');
	// underline
	data = data.replace(/<u(\s[^<>]*)?>/gi, '[u]');
	data = data.replace(/<\/u>/gi, '[/u]');
	// cleanup & pre processing
	data = data.replace(/<div><br(\s[^<>]*)?>/gi, '<div>');
	data = data.replace(/<br(\s[^<>]*)?>/gi, '\n');
	data = data.replace(/<p(\s[^<>]*)?>/gi, '');
	data = data.replace(/<\/p>/gi, '\n');
	data = data.replace(/<\/div>\s*<div([^<>]*)>/gi, '</span>\n<span$1>');
	data = data.replace(/<div([^<>]*)>/gi, '\n<span$1>');
	data = data.replace(/<\/div>/gi, '</span>\n');
	data = data.replace(/&nbsp;/gi, ' ');
	data = data.replace(/&quot;/gi, '\"');
	data = data.replace(/&amp;/gi, '&');
	var sc, sc2;
	do {
		sc = data;
		// font tag (eew!) color
		data = data.replace(/<font\s[^<>]*?color=\"?([^<>]*?)\"?(\s[^<>]*)?>([^<>]*?)<\/font>/gi, '[color=$1]$3[/color]');		
		// ...and size
		data = data.replace(
			/<font\s[^<>]*?size=\"?([^<>]*?)\"?(\s[^<>]*)?>([^<>]*?)<\/font>/gi,
			function (m, _1, _2, _3) {
				return '[size=' + fontSize2px(_1) + ']' + _3 + '[/size]';
			}
		);
		// font tag cleanup
		if(sc == data) {
			data = data.replace(/<font[^<>]*>([^<>]*?)<\/font>/gi, '$1');
		}
		data = data.replace(/<a\s[^<>]*?href=\"?([^<>]*?)\"?(\s[^<>]*)?>([^<>]*?)<\/a>/gi, '[url=$1]$3[/url]');
		sc2 = data;
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?font-weight: ?bold;?\"?\s*([^<]*?)<\/\1>/gi, '[b]<$1 style=$2</$1>[/b]');
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?font-weight: ?normal;?\"?\s*([^<]*?)<\/\1>/gi, '<$1 style=$2</$1>');
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?font-style: ?italic;?\"?\s*([^<]*?)<\/\1>/gi, '[i]<$1 style=$2</$1>[/i]');
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?font-style: ?normal;?\"?\s*([^<]*?)<\/\1>/gi, '<$1 style=$2</$1>');
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?text-decoration: ?underline;?\"?\s*([^<]*?)<\/\1>/gi, '[u]<$1 style=$2</$1>[/u]');
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?text-decoration: ?none;?\"?\s*([^<]*?)<\/\1>/gi, '<$1 style=$2</$1>');
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?color: ?([^<>]*?);\"?\s*([^<]*?)<\/\1>/gi, '[color=$2]<$1 style=$3</$1>[/color]');
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?font-family: ?([^<>]*?);\"?\s*([^<]*?)<\/\1>/gi, '[font=$2]<$1 style=$3</$1>[/font]');
		// alignment
		data = data.replace(/<(span|blockquote|pre)\s[^<>]*?style=\"?text-align: ?([^<>]*?);\"?\s*([^<]*?)<\/\1>/gi, '[align=$2]<$1 style=$3</$1>[/align]');
		data = data.replace(
			/<(span|blockquote|pre)\s[^<>]*?style=\"?font-size: ?([^<>]*?);\"?\s*([^<]*?)<\/\1>/gi,
			function (m, _1, _2, _3) {
				return '[size=' + parseInt(_2) + ']<' + _1 + ' style=' + _3 + '</' + _1 + '>[/size]';
			}
		);
		data = data.replace(/<(blockquote|pre)\s[^<>]*?style=\"?\"? (class=|id=)([^<>]*)>([^<>]*?)<\/\1>/gi, '<$1 $2$3>$4</$1>');
		data = data.replace(/<span\s[^<>]*?style=\"?\"?>([^<>]*?)<\/span>/gi, '$1');
		if(sc2 == data) {
			data = data.replace(/<span[^<>]*>([^<>]*?)<\/span>/gi, '$1');
			sc2 = data;
		}
	} while(sc != data);
	data = data.replace(/<[^<>]*>/gi, '');
	data = data.replace(/&lt;/gi, '<');
	data = data.replace(/&gt;/gi, '>');
	// childs against parents
	/*do { 
		sc = data;
		data = data.replace(/\[(b|i|u)\]\[quote([^\]]*)\]([\s\S]*?)\[\/quote\]\[\/\1\]/gi, '[quote$2][$1]$3[/$1][/quote]');
		data = data.replace(/\[color=([^\]]*)\]\[quote([^\]]*)\]([\s\S]*?)\[\/quote\]\[\/color\]/gi, '[quote$2][color=$1]$3[/color][/quote]');
		data = data.replace(/\[(b|i|u)\]\[code\]([\s\S]*?)\[\/code\]\[\/\1\]/gi, '[code][$1]$2[/$1][/code]');
		data = data.replace(/\[color=([^\]]*)\]\[code\]([\s\S]*?)\[\/code\]\[\/color\]/gi, '[code][color=$1]$2[/color][/code]');
	} while(sc != data);*/
	do {
		sc = data;
		data = data.replace(/\[b\]\[\/b\]/gi, '');
		data = data.replace(/\[i\]\[\/i\]/gi, '');
		data = data.replace(/\[u\]\[\/u\]/gi, '');
		data = data.replace(/\[quote[^\]]*\]\[\/quote\]/gi, '');
		data = data.replace(/\[code\]\[\/code\]/gi, '');
		data = data.replace(/\[url=([^\]]+)\]\[\/url\]/gi, '');
		data = data.replace(/\[img\]\[\/img\]/gi, '');
		data = data.replace(/\[color=([^\]]*)\]\[\/color\]/gi, '');
	} while (sc != data);
	return data;
}

function px2fontSize(px) {
	var size = 7;
	if (px < 11) {
		size = 1;
	} else if (px < 14) {
		size = 2;
	} else if (px < 17) {
		size = 3;
	} else if (px < 21) {
		size = 4;
	} else if (px < 28) {
		size = 5;
	} else if (px < 40) {
		size = 6;
	}
	return size;
}

function fontSize2px(size) {
	var sizes = [ 0, 10, 12, 16, 18, 24, 32, 48 ];
	if (sizes[size]) {
		return sizes[size];
	} else {
		return 0;
	}
}

var mySettings_comu = {
	markupSet: [
		{name:lang['Negrita'], key:'B', openWith:'[b]', closeWith:'[/b]'},
		{name:lang['Cursiva'], key:'I', openWith:'[i]', closeWith:'[/i]'},
		{name:lang['Subrayado'], key:'U', openWith:'[u]', closeWith:'[/u]'},
		{separator:'-' },
		{name:lang['Alinear a la izquierda'], key:'', openWith:'[align=left]', closeWith:'[/align]'},
		{name:lang['Centrar'], key:'', openWith:'[align=center]', closeWith:'[/align]'},
		{name:lang['Alinear a la derecha'], key:'', openWith:'[align=right]', closeWith:'[/align]'},
		{separator:'-' },
		{name:lang['Color'], dropMenu: [
			{name:lang['Rojo oscuro'], openWith:'[color=darkred]', closeWith:'[/color]' },
			{name:lang['Rojo'], openWith:'[color=red]', closeWith:'[/color]' },
			{name:lang['Naranja'], openWith:'[color=orange]', closeWith:'[/color]' },
			{name:lang['Marron'], openWith:'[color=brown]', closeWith:'[/color]' },
			{name:lang['Amarillo'], openWith:'[color=yellow]', closeWith:'[/color]' },
			{name:lang['Verde'], openWith:'[color=green]', closeWith:'[/color]' },
			{name:lang['Oliva'], openWith:'[color=olive]', closeWith:'[/color]' },
			{name:lang['Cyan'], openWith:'[color=cyan]', closeWith:'[/color]' },
			{name:lang['Azul'], openWith:'[color=blue]', closeWith:'[/color]' },
			{name:lang['Azul oscuro'], openWith:'[color=darkblue]', closeWith:'[/color]' },
			{name:lang['Indigo'], openWith:'[color=indigo]', closeWith:'[/color]' },
			{name:lang['Violeta'], openWith:'[color=violet]', closeWith:'[/color]' },
			{name:lang['Negro'], openWith:'[color=black]', closeWith:'[/color]' }
		]},
		{name:lang['Tamano'], dropMenu :[
			{name:lang['Pequena'], openWith:'[size=9]', closeWith:'[/size]' },
			{name:lang['Normal'], openWith:'[size=12]', closeWith:'[/size]' },
			{name:lang['Grande'], openWith:'[size=18]', closeWith:'[/size]' },
			{name:lang['Enorme'], openWith:'[size=24]', closeWith:'[/size]' }
		]},
		{name:lang['Fuente'], dropMenu :[
			{name:'Arial', openWith:'[font=Arial]', closeWith:'[/font]' },
			{name:'Courier New', openWith:'[font="Courier New"]', closeWith:'[/font]' },
			{name:'Georgia', openWith:'[font=Georgia]', closeWith:'[/font]' },
			{name:'Times New Roman', openWith:'[font="Times New Roman"]', closeWith:'[/font]' },
			{name:'Verdana', openWith:'[font=Verdana]', closeWith:'[/font]' },
			{name:'Trebuchet MS', openWith:'[font="Trebuchet MS"]', closeWith:'[/font]' },
			{name:'Lucida Sans', openWith:'[font="Lucida Sans"]', closeWith:'[/font]' },
			{name:'Comic Sans', openWith:'[font="Comic Sans"]', closeWith:'[/font]' }
		]},
		{separator:'-' },
		{name:lang['Insertar video de YouTube'], beforeInsert:function(h){ markit_yt(h); }},
		{name:lang['Insertar video de Google Video'], beforeInsert:function(h){ markit_gv(h); }},
		{name:lang['Insertar archivo SWF'], beforeInsert:function(h){ markit_swf(h); }},
		{name:lang['Insertar Imagen'], beforeInsert:function(h){ markit_img(h); }},
		{name:lang['Insertar Link'], beforeInsert:function(h){ markit_url(h); }},
		{name:lang['Citar'], beforeInsert:function(h){ markit_quote(h); }}
	]
};


var mySettings = {
	markupSet: [
		{
			action: 'bold',
			name: 'Negrita',
			key: 'B',
			openWith: '[b]',
			closeWith: '[/b]',
			beforeInsert: function (r) {
				$('#markItUp').get(0).tagInsert(r);
			}
		},
		{
			action: 'italic',
			name: 'Cursiva',
			key: 'I',
			openWith: '[i]',
			closeWith: '[/i]',
			beforeInsert: function (r) {
				$('#markItUp').get(0).tagInsert(r);
			}
		},
		{
			action: 'underline',
			name: 'Subrayado',
			key: 'U',
			openWith: '[u]',
			closeWith: '[/u]',
			beforeInsert: function (r) {
				$('#markItUp').get(0).tagInsert(r);
			}
		},
		{
			separator: '-'
		},
		{
			action: 'justifyLeft',
			name: 'Alinear a la izquierda',
			openWith: '[align=left]',
			closeWith: '[/align]',
			beforeInsert: function (r) {
				$('#markItUp').get(0).tagInsert(r);
			}
		},
		{
			action: 'justifyCenter',
			name: 'Alinear al centro',
			openWith: '[align=center]',
			closeWith: '[/align]',
			beforeInsert: function (r) {
				$('#markItUp').get(0).tagInsert(r);
			}
		},
		{
			action: 'justifyRight',
			name: 'Alinear a la derecha',
			openWith: '[align=right]',
			closeWith: '[/align]',
			beforeInsert: function (r) {
				$('#markItUp').get(0).tagInsert(r);
			}
		},
		{
			separator: '-'
		},
		{
			name: 'Color',
			dropMenu: [
				{
					action: 'foreColor',
					name: 'Rojo oscuro',
					openWith: '[color=darkred]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'darkred');
					}
				},
				{
					action: 'foreColor',
					name: 'Rojo',
					openWith: '[color=red]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'red');
					}
				},
				{
					action: 'foreColor',
					name: 'Naranja',
					openWith: '[color=orange]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'orange');
					}
				},
				{
					action: 'foreColor',
					name: 'Marron',
					openWith: '[color=brown]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'brown');
					}
				},
				{
					action: 'foreColor',
					name: 'Amarillo',
					openWith: '[color=yellow]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'yellow');
					}
				},
				{
					action: 'foreColor',
					name: 'Verde',
					openWith: '[color=green]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'green');
					}
				},
				{
					action: 'foreColor',
					name: 'Oliva',
					openWith: '[color=olive]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'olive');
					}
				},
				{
					action: 'foreColor',
					name: 'Cyan',
					openWith: '[color=cyan]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'cyan');
					}
				},
				{
					action: 'foreColor',
					name: 'Azul',
					openWith: '[color=blue]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'blue');
					}
				},
				{
					action: 'foreColor',
					name: 'Azul oscuro',
					openWith: '[color=darkblue]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'darkblue');
					}
				},
				{
					action: 'foreColor',
					name: '&Iacute;ndigo',
					openWith: '[color=indigo]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'indigo');
					}
				},
				{
					action: 'foreColor',
					name: 'Violeta',
					openWith: '[color=violet]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'violet');
					}
				},
				{
					action: 'foreColor',
					name: 'Negro',
					openWith: '[color=black]',
					closeWith: '[/color]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'black');
					}
				}
			]
		},
				{
			name: 'Fuente',
			dropMenu: [
				{
					action: 'fontSize',
					name: 'Pequeña',
					openWith: '[size=9]',
					closeWith: '[/size]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, px2fontSize(9));
					}
				},
				{
					action: 'fontSize',
					name: 'Normal',
					openWith: '[size=12]',
					closeWith: '[/size]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, px2fontSize(12));
					}
				},
				{
					action: 'fontSize',
					name: 'Grande',
					openWith: '[size=18]',
					closeWith: '[/size]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, px2fontSize(18));
					}
				},
				{
					action: 'fontSize',
					name: 'Enorme',
					openWith: '[size=24]',
					closeWith: '[/size]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, px2fontSize(24));
					}
				}
			]
		},
		{
			name: 'Fuente',
			dropMenu: [
				{
					action: 'fontName',
					name: 'Arial',
					openWith: '[font=Arial]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Arial');
					}
				},
				{
					action: 'fontName',
					name: 'Courier New',
					openWith: '[font=Courier New]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Courier New');
					}
				},
				{
					action: 'fontName',
					name: 'Georgia',
					openWith: '[font=Georgia]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Georgia');
					}
				},
				{
					action: 'fontName',
					name: 'Times New Roman',
					openWith: '[font=Times New Roman]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Times New Roman');
					}
				},
				{
					action: 'fontName',
					name: 'Verdana',
					openWith: '[font=Verdana]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Verdana');
					}
				},
				{
					action: 'fontName',
					name: 'Trebuchet MS',
					openWith: '[font=Trebuchet MS]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Trebuchet MS');
					}
				},
				{
					action: 'fontName',
					name: 'Lucida Sans',
					openWith: '[font=Lucida Sans]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Lucida Sans');
					}
				},
				{
					action: 'fontName',
					name: 'Comic Sans',
					openWith: '[font=Comic Sans]',
					closeWith: '[/font]',
					beforeInsert: function (r) {
						$('#markItUp').get(0).tagInsert(r, 'Comic Sans');
					}
				}
			]
		},
		{
			separator: '-'
		},
		{
			action: 'insertHtml',
			name: 'Insertar video de YouTube',
			beforeInsert: function (r) {
				var video = prompt(lang['ingrese el id de yt'+(is_ie?' IE':'')], lang['ingrese solo el id de yt']);
				if (video) {
					r.replaceWith = '[swf=http://www.youtube.com/v/' + video + ']\nlink: [url]http://www.youtube.com/watch?v=' + video + '[/url]\n';
					$('#markItUp').get(0).tagInsert(r, '<br /><center><embed src="http://www.youtube.com/v/' + video + '" quality=high width="640px" height="385px" type="application/x-shockwave-flash" AllowNetworking="internal" AllowScriptAccess="never" autoplay="false" wmode="transparent"></embed></center><br /><br />link: <a rel="nofollow" target="_blank" href="http://www.youtube.com/watch?v=' + video + '">http://www.youtube.com/watch?v=' + video + '</a>');
					$('#markItUp').get(0).refreshSwf();
				} else {
					r.replaceWith = '';
				}
			}
		},
		{
			action: 'insertHtml',
			name: 'Insertar archivo SWF',
			beforeInsert: function (r) {
				var selection = r.selection || $('#markItUp').get(0).selected().text, movie = '';
				r.replaceWith = '';
				if (selection.substr(0, 7) == 'http://') {
					movie = selection;
				} else {
					movie = prompt('Ingrese la URL', 'http://');
				}
				if (movie) {
					r.replaceWith = '[swf=' + movie + ']\nlink: [url]' + movie + '[/url]\n';
					$('#markItUp').get(0).tagInsert(r, '<br /><center><embed src="' + movie + '" quality=high width="425" height="350" TYPE="application/x-shockwave-flash" AllowNetworking="internal" AllowScriptAccess="never" autoplay="false" wmode="transparent"></embed></center><br /><br />link: <a rel="nofollow" target="_blank" href="' + movie + '">' + movie + '</a>');
					$('#markItUp').get(0).refreshSwf();
				} else {
					r.replaceWith = '';
				}
			}
		},
		{
			action: 'insertHtml',
			name: 'Insertar Imagen',
			beforeInsert: function (r) {
				var selection = r.selection || $('#markItUp').get(0).selected().text, img = '';
				r.replaceWith = '';
				if (selection.substr(0, 7) == 'http://') {
					img = selection;
				} else {
					img = prompt('Ingrese la URL', 'http://');
				}
				if (img) {
					r.replaceWith = '[img=' + img + ']';
					$('#markItUp').get(0).tagInsert(r, '<img class="imagen" border="0" src="' + img + '" onresizestart="return false" />');
				} else {
					r.replaceWith = '';
				}
			}
		},
		{
			action: 'createLink',
			name: 'Insertar Link',
			beforeInsert: function (r) {
				var selection = r.selection || $('#markItUp').get(0).selected().text, link = '', innerText = '';
				r.replaceWith = ''; r.action = 'createLink';
				if (selection.match(/(https?|ftp):\/\//)) {
					innerText = selection;
				} else {
					link = prompt('Ingrese la URL', 'http://');
					if (link) {
						innerText = link;
					}
				}
				if (link && innerText) {
					r.replaceWith = '[url=' + link + ']' + innerText + '[/url]';
					if ($('#markItUp').get(0).selected().text) {
						$('#markItUp').get(0).tagInsert(r, link);
					} else {
						r.action = 'insertHtml';
						$('#markItUp').get(0).tagInsert(r, '<a href="' + link + '">' + innerText + '</a>');
					}
				}
			}
		},
		{
			action: 'insertHtml',
			name: 'Citar',
			beforeInsert: function (r) {
				var selection = r.selection || $('#markItUp').get(0).selected().text, quote = '';
				r.replaceWith = '';
				if (selection){
					quote = selection;
				} else {
					quote = prompt('Ingrese el texto a citar');
				}
				if (quote) {
					r.replaceWith = '[quote]' + quote + '[/quote]';
					$('#markItUp').get(0).tagInsert(r, '<blockquote><div class="cita"><strong></strong> dijo:</div><div class="citacuerpo"><p>' + quote + '</p></div></blockquote>');
				}
			}
		}
	]
};

var beta_tester = {
	check: function () {
		return readCookie('beta');
	},
	add: function () {
		createCookie('beta', 'true');
		window.location.reload();
	},
	del: function () {
		eraseCookie('beta');
		window.location.reload();
	}
}

if (!is_ie && beta_tester.check()) {
	mySettings.markupSet.push({
		name: 'Cambiar vista',
		beforeInsert: function (r) {
			$('#markItUp').get(0).switchView();
		}
	});
}

$.fn.richedit = function(opts) {

	return this.each(function () {

		this.tagInsert = function (object, param) {
			if (this.view == 'html') {
				if (!param) {
					param = null;
				}
				if (!object.original) {
					object.original = [ object.replaceWith, object.openWith, object.closeWith ];
				}
				object.replaceWith = '';
				object.openWith = '';
				object.closeWith = '';
				this.exec(object.action, param);
			} else {
				if (object.original) {
					object.replaceWith = object.original[0];
					object.openWith = object.original[1];
					object.closeWith = object.original[2];
					delete object.original;
				}
			}
		}

		this.editor = $('<iframe border="0"></iframe>')[0];
		this.markItUp = $(this).markItUp(opts.markItUpSettings);

		this.refreshSwf = function () {
			if (this.editor.contentWindow.document.designMode) {
				var doc = this.editor.contentWindow.document, attr;
				doc.designMode = 'off';
				$(this.editor).contents().find('embed').each(function(){
					attr = $(this).attr('src');
					$(this).attr('src', attr);
				});
				setTimeout(function(){
					doc.designMode = 'on';
				}, 250);
			}
		}

		this.view = null;
		this.viewSource = function (init) {
			if (!init) {
				$(this).val($.html2bbcode($(this.editor.contentWindow.document.body).html()));
			}
			$(this).removeClass('hide').next().show();
			$(this.editor).addClass('hide');
			$('.markItUpButton15').addClass('selected');
			this.view = 'source';
		}
		this.viewHtml = function () {
			var parsedContent = '';
			if ($.trim($(this).val())) {
				$.ajax({
					type: 'post',
					url: '/preview.php',
					data: 'cuerpo=' + encodeURIComponent($(this).val()),
					async: false,
					success: function (r) {
						parsedContent = r;
					}
				});
			}
			this.editor.contentWindow.document.open();
			this.editor.contentWindow.document.write('<html><head><link type="text/css" href="' + global_data.img + '/images/css/beta_estilos3.css?3.9" rel="stylesheet" /></head><body class="post-contenido" style="overflow: auto !important; margin-top: 0px !important">' + parsedContent + '</body></html>');
			this.editor.contentWindow.document.close();
			$('#markItUp').get(0).refreshSwf();
			if (this.editor.contentWindow.document.designMode) {
				this.editor.contentWindow.document.designMode = 'on';
			}
			this.editor.contentWindow.document.execCommand('enableObjectResizing', false, false);
			$(this).addClass('hide').next().hide();
			$(this.editor).removeClass('hide');
			$('.markItUpButton15').removeClass('selected');
			this.view = 'html';
		}
		this.switchView = function () {
			if (this.view == 'html') {
				this.viewSource();
			} else {
				this.viewHtml();
			}
		}

		this.setFocus = function () {
			if (this.view == 'html') {
				$(this.editor).focus();
			} else {
				$(this).focus();
			}
		}

		this.selected = function () {
			var r = { start: 0, end: 0, text: '' }, objDocument, objWindow, object;
			if (this.view == 'html') {
				object = this.editor;
				objDocument = object.contentWindow;
				objWindow = object.contentWindow;
			} else {
				object = this;
				objDocument = document;
				objWindow = window;
			}
			if (this.view == 'source' && object.selectionStart) {
				r.start = object.selectionStart;
				r.end = object.selectionEnd;
				r.text = $(object).val().substr(r.start, r.end - r.start);
			} else {
				var tmp;
				if (objWindow.getSelection) {
					tmp = objWindow.getSelection().getRangeAt(0);
				} else if (objDocument.getSelection) {
					tmp = objDocument.getSelection().getRangeAt(0);
				} else if (objDocument.selection) {
					tmp = objDocument.selection.createRange();
				}
				if (tmp) {
					r.start = tmp.startOffset;
					r.end = tmp.endOffset;
					r.text = tmp.toString();
				}
			}
			return r;
		}

		this.exec = function (action, param) {
			this.setFocus();
			if (!param) {
				param = null;
			}
			this.editor.contentWindow.document.execCommand(action, false, param);
		}

		this.execPrompt = function (action, caption, text) {
			var param = this.selected().text;
			if (!param) {
				param = prompt(caption, text);
			}
			if (param) {
				return this.exec(action, param);
			}
		}

		var properties = [ 'style', 'class' ], property;
		for (property in properties) {
			$(this.editor).attr(properties[property], $(this).attr(properties[property]));
		}
		$(this.editor).removeClass('required'); // fast fix

		$(this.editor).insertBefore(this);
		if (!is_ie && beta_tester.check()) {
			this.viewHtml();
		} else {
			this.viewSource(true); // ie is currently not supported, sorry :_(
		}

	});

}

// </richedit>

//Botones comentarios
mySettings_cmt = {
	nameSpace: 'markitcomment',
	resizeHandle: false,
	markupSet: [
		{name:lang['Negrita'], key:'B', openWith:'[b]', closeWith:'[/b]'},
		{name:lang['Cursiva'], key:'I', openWith:'[i]', closeWith:'[/i]'},
		{name:lang['Subrayado'], key:'U', openWith:'[u]', closeWith:'[/u]'},
		{name:lang['Insertar video de YouTube'], beforeInsert:function(h){ markit_yt(h); }},
		{name:lang['Insertar Imagen'], beforeInsert:function(h){ markit_img(h); }},
		{name:lang['Insertar Link'], beforeInsert:function(h){ markit_url(h); }},
		{name:lang['Citar'], beforeInsert:function(h){ markit_quote(h); }}
	]
};

//Funciones botones especiales
function markit_yt(h){
	var msg = prompt(lang['ingrese el id de yt'+(is_ie?' IE':'')], lang['ingrese solo el id de yt']);
	if(msg != null){
		h.replaceWith = '[swf=http://www.youtube.com/v/' + msg + ']\nlink: [url]http://www.youtube.com/watch?v=' + msg + '[/url]\n';
		h.openWith = '';
		h.closeWith = '';
	}else{
		h.replaceWith = '';
		h.openWith = '';
		h.closeWith = '';
	}
}
function markit_gv(h){
	var msg = prompt(lang['ingrese el id de gv'+(is_ie?' IE':'')], lang['ingrese solo el id de gv']);
	if(msg != null){
		h.replaceWith = '[swf=http://video.google.com/googleplayer.swf?docId=' + msg + ']\nlink: [url]http://video.google.com/videoplay?docid=' + msg + '[/url]\n';
		h.openWith = '';
		h.closeWith = '';
	}else{
		h.replaceWith = '';
		h.openWith = '';
		h.closeWith = '';
	}
}
function markit_swf(h){
	if(h.selection!='' && h.selection.substring(0,7)=='http://'){
		h.replaceWith = '[swf=' + h.selection + ']\nlink: [url]' + h.selection + '[/url]\n';
		h.openWith = '';
		h.closeWith = '';
	}else{
		var msg = prompt(lang['ingrese la url de swf'], 'http://');
		if(msg != null){
			h.replaceWith = '[swf=' + msg + ']\nlink: [url]' + msg + '[/url]\n';
			h.openWith = '';
			h.closeWith = '';
		}else{
			h.replaceWith = '';
			h.openWith = '';
			h.closeWith = '';
		}
	}
}
function markit_img(h){
	if(h.selection!='' && h.selection.substring(0,7)=='http://'){
		h.replaceWith = '';
		h.openWith = '[img=';
		h.closeWith = ']';				
	}else{
		var msg = prompt(lang['ingrese la url de img'], 'http://');
		if(msg != null){
			h.replaceWith = '[img=' + msg + ']';
			h.openWith = '';
			h.closeWith = '';
		}else{
			h.replaceWith = '';
			h.openWith = '';
			h.closeWith = '';
		}
	}
}
function markit_url(h){
	if(h.selection==''){
		var msg = prompt(lang['Ingrese la URL que desea postear'], 'http://');
		if(msg != null){
			h.replaceWith = '[url]' + msg + '[/url]';
			h.openWith = '';
			h.closeWith = '';
		}else{
			h.replaceWith = '';
			h.openWith = '';
			h.closeWith = '';
		}
	}else if(h.selection.substring(0,7)=='http://' || h.selection.substring(0,8)=='https://' || h.selection.substring(0,6)=='ftp://'){
		h.replaceWith = '';
		h.openWith='[url]';
		h.closeWith='[/url]';
	}else{
		var msg = prompt(lang['Ingrese la URL que desea postear'], 'http://');
		if(msg != null){
			h.replaceWith = '';
			h.openWith='[url=' + msg + ']';
			h.closeWith='[/url]';
		}else{
			h.replaceWith = '';
			h.openWith = '';
			h.closeWith = '';
		}
	}
}

function markit_quote(h){
	if(h.selection==''){
		var msg = prompt('Ingrese el texto a citar', '');
		if(msg != null){
			h.replaceWith = '[quote]' + msg + '[/quote]';
			h.openWith = '';
			h.closeWith = '';
		}else{
			h.replaceWith = '';
			h.openWith = '';
			h.closeWith = '';
		}
	}else{
		h.replaceWith = '';
		h.openWith='[quote]';
		h.closeWith='[/quote]';
	}
}

//Imprimir editores
function print_editor(){
	//Editor de posts
	if($('#markItUp') && !$('#markItUpMarkItUp').length){
		if (location.href.match(/http:\/\/(.+?\.)?(taringa|poringa)\.net\/(agregar\/?|edicion\.form\.php\?id=[0-9]+)/)) {
			$('#markItUp').richedit({ markItUpSettings: mySettings });
		} else {
			$('#markItUp').markItUp(mySettings_comu);
		}
		$('#emoticons a').click(function(){
			emoticon = ' ' + $(this).attr("smile") + ' ';
			$.markItUp({ replaceWith:emoticon });
			return false;
		});
	}
	//Editor de posts comentarios
	if($('#body_comm') && !$('#markItUpbody_comm').length){
		$('#body_comm').markItUp(mySettings_cmt);
	}

	//Editor de respuestas comunidades
	if($('#body_resp') && !$('#markItUpbody_resp').length){
		$('#body_resp').markItUp(mySettings_cmt);
	}
}
/* FIN - Editor */

var monitor_sections_here = 'Comentarios';
function monitor_sections(section, userid){
	if(!section) //Recargando por 500
		section = monitor_sections_here;
	else if(monitor_sections_here==section)
		return;
	$('.filterBy #'+monitor_sections_here).removeClass('here');
	monitor_sections_here = section;
	$('.filterBy #'+section).addClass('here');
	$('.gif_cargando').css('display', 'block');
	$.ajax({
		type: 'GET',
		url: '/monitor.php',
		data: 'section='+section+'&ajax=1'+(userid?'&id='+userid:''),
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					$('#showResult').html('<div class="warningData">'+$('#showResult').html(h.substring(3))+'</div>');
					break;
				case '1': //OK
					$('#showResult').html(h.substring(3));
					break;
			}
		},
		error: function(){
			$('#showResult').html('<div class="emptyData">'+lang['error procesar']+'. <a href="javascript:monitor_sections(\''+section+'\', \''+userid+'\')">Reintentar</a></div>');
		},
		complete: function(){
			$('.gif_cargando').css('display', 'none');
		}
	});
}

function gget(data, sin_amp){
	var r = data+'=';
	if(!sin_amp)
		r = '&'+r;
	switch(data){
		case 'key':
			if(global_data.user_key!='')
				return r+global_data.user_key;
			break;
		case 'postid':
			if(global_data.postid!='')
				return r+global_data.postid;
			break;
		case 'comid':
			if(global_data.comid!='')
				return r+global_data.comid;
			break;
		case 'temaid':
			if(global_data.temaid!='')
				return r+global_data.temaid;
			break;
	}
	return '';
}
function keypress_intro(e){
  tecla=(document.all)?e.keyCode:e.which;
  return (tecla==13);
}

function onfocus_input(o){
	if($(o).val()==$(o).attr('title')){
		$(o).val('');
		$(o).removeClass('onblur_effect');
	}
}
function onblur_input(o){
	if($(o).val()==$(o).attr('title') || $(o).val()==''){
		$(o).val($(o).attr('title'));
		$(o).addClass('onblur_effect');
	}
}

//Cargo el formulario
function registro_load_form(data){
	if (typeof data == 'undefined') {
		var data = '';
	}
	mydialog.class_aux = 'registro';
	mydialog.mask_close = false;
	mydialog.close_button = true;
	mydialog.show(true);
	mydialog.title('Registro');
	mydialog.body('<br /><br />', 305);
	mydialog.buttons(false);
	mydialog.procesando_inicio('Cargando...', 'Registro');
	mydialog.center();

	$.ajax({
		type: 'POST',
		url: '/registro-form.php',
		data: data,
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					mydialog.procesando_fin();
					mydialog.alert('Error', h.substring(3));
					break;
				case '1': //OK. Ya es miembro
					mydialog.body(h.substring(3), 305);
					break;
			}
			mydialog.center();
		},
		error: function(){
			mydialog.procesando_fin();
			mydialog.error_500("registro.load_form("+data+")");
		}
	});
}

//Calcula la edad a partir de la fecha de nacimiento
function edad(mes, dia, anio){
	//Calcular edad
	now = new Date()
	born = new Date(anio, mes*1-1, dia);
	years = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
	return years;
}

/* Comunidades */
var com = {

	buscador_home: function(){
		if($('form[name="buscador_home"] input[name="q"]').val()=='' || $('form[name="buscador_home"] input[name="q"]').val()==$('form[name="buscador_home"] input[name="q"]').attr('title')){
			$('form[name="buscador_home"] input[name="q"]').focus();
			return false;
		}
	},
	buscador_home_radio: function(en){
		//Cambio de action form
		$('form[name="buscador_home"]').attr('action', '/comunidades/buscador/'+en+'/');
	},

	TopsTabs_here: 'Semana',
	TopsTabs: function(tab){
		if(tab == this.TopsTabs_here)
			return;
		$('.box_cuerpo div.filterBy a#'+tab).addClass('here');
		$('.box_cuerpo div.filterBy a#'+this.TopsTabs_here).removeClass('here');
		$('.box_cuerpo ol.filterBy#filterBy'+tab).fadeIn();
		$('.box_cuerpo ol.filterBy#filterBy'+this.TopsTabs_here).fadeOut();
		this.TopsTabs_here = tab;
	},

	/* Crear shortnames */
	crear_shortname_key: function(val){
		$('#preview_shortname').html(val).removeClass('error').removeClass('ok');
		$('#msg_crear_shortname').html('');
	},
	crear_shortname_check_cache: new Array(),
	crear_shortname_check: function(val){
		if(val=='')
			return;
		for(i=0; i<this.crear_shortname_check_cache.length; i++){ //Verifico si ya lo busque
			if(this.crear_shortname_check_cache[i][0]===val){ //Lo tengo
				if(this.crear_shortname_check_cache[i][1]==='1'){ //Disponible
					$('#preview_shortname').removeClass('error').addClass('ok');
					$('#msg_crear_shortname').html(this.crear_shortname_check_cache[i][2]).removeClass('error').addClass('ok');
				}else{ //No disponible
					$('#preview_shortname').removeClass('ok').addClass('error');
					$('#msg_crear_shortname').html(this.crear_shortname_check_cache[i][2]).removeClass('ok').addClass('error');
				}
				return;			
			}
		}
		$('.gif_cargando#shortname').css('display', 'block');
		$.ajax({
			type: 'POST',
			url: '/comunidades/shortname_check.php',
			data: 'shortname='+encodeURIComponent(val),
			success: function(h){
				com.crear_shortname_check_cache[com.crear_shortname_check_cache.length] = new Array(val, h.charAt(0), h.substring(3)); //Guardo los datos de verificacion
				$('.gif_cargando#shortname').css('display', 'none');
				switch(h.charAt(0)){
					case '0': //Error
						$('#preview_shortname').removeClass('ok').addClass('error');
						$('#msg_crear_shortname').html(h.substring(3)).removeClass('ok').addClass('error');
						break;
					case '1': //OK
						$('#preview_shortname').removeClass('error').addClass('ok');
						$('#msg_crear_shortname').html(h.substring(3)).removeClass('error').addClass('ok');
						break;
				}
			},
			error: function(){
				$('.gif_cargando#shortname').css('display', 'none');
				$('#msg_crear_shortname').html(lang['error procesar']).removeClass('ok').addClass('error');
			}
		});
	},

	get_subcategorias_cache: new Array(),
	get_subcategorias: function(catid){
		mydialog.close();
		$('.agregar_subcategoria').html('').append('<option value="-1" selected>Elegir una subcategor&iacute;a</option>').attr('disabled', 'true').val(-1);
		if(catid==-1)
			return false;
		if(this.get_subcategorias_cache[catid]){ //Lo tengo
			$.each(this.get_subcategorias_cache[catid], function(i, val){
				$('.agregar_subcategoria').append('<option value="'+i+'">'+val+'</option>');
			});
			$('.agregar_subcategoria').removeAttr('disabled');
			return true;			
		}
		$('.gif_cargando#subcategoria').css('display', 'block');
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: '/comunidades/get-subcategorias.php',
			data: 'catid='+catid,
			success: function(h){
				com.get_subcategorias_cache[catid] = h;
				$.each(h, function(i, val){
					$('.agregar_subcategoria').append('<option value="'+i+'">'+val+'</option>');
				});
				$('.agregar_subcategoria').removeAttr('disabled');
			},
			error: function(){
				$('.agregar_subcategoria').attr('disabled', 'true').val(-1);
				mydialog.error_500("com.get_subcategorias('"+catid+"')");
			},
			complete: function(){
				$('.gif_cargando#subcategoria').css('display', 'none');
			}
		});
	},

		/* rango auto */
	create_show_rango_def: function(show){
		if(show)
			$('#rango_default').slideDown('fast');
		else
			$('#rango_default').slideUp('fast');
	},

	comunidad_eliminar: function(acepto){
		mydialog.show();
		mydialog.title('Eliminar Comunidad');
		switch(acepto){
			case 0:
				mydialog.body('&iquest;Realmente deseas eliminar la comunidad?<br />Esta opci&oacute;n no tiene retorno, es un camino de ida');
				mydialog.buttons(true, true, 'S&iacute;', 'com.comunidad_eliminar(1)', true, false, true, 'No', 'close', true, true);
				break;
			case 1:
				mydialog.body('Te pregunto de nuevo. &iquest;Realmente deseas eliminar la comunidad?');
				mydialog.buttons(true, true, 'S&iacute;', 'com.comunidad_eliminar(2)', true, false, true, 'No', 'close', true, true);
				break;
			case 2:
				mydialog.body('Una &uacute;ltima vez, &iquest;estas seguro que quieres eliminar la comunidad?<br />Este es el &uacute;ltimo paso y es el punto de no retorno');
				mydialog.buttons(true, true, 'S&iacute;, acepto los cargos', 'com.comunidad_eliminar(3)', true, false, true, 'No', 'close', true, true);
				break;
			case 3:
				mydialog.procesando_inicio('Eliminando...', 'Eliminar Comunidad');
				$.ajax({
					type: 'POST',
					url: '/comunidades/comunidad-eliminar.php',
					data: gget('comid', true) + gget('key'),
					success: function(h){
						mydialog.alert('Comunidad eliminada', 'La comunidad ha sido eliminada.<br />Has dejado muchos usuarios hu&eacute;rfanos :(', true);
					},
					error: function(){
						mydialog.error_500("com.comunidad_eliminar(3)");
					},
					complete: function(){
						mydialog.procesando_fin();
					}
				});
				break;
		}
		mydialog.center();
	},
	comunidad_reactivar: function(acepto){
		mydialog.show();
		mydialog.title('Reactivar Comunidad');
		switch(acepto){
			case 0:
				mydialog.body('&iquest;Realmente deseas reactivar la comunidad?');
				mydialog.buttons(true, true, 'S&iacute;', 'com.comunidad_reactivar(1)', true, false, true, 'No', 'close', true, true);
				break;
			case 1:
				mydialog.procesando_inicio('Reactivando...', 'Reactivar Comunidad');
				$.ajax({
					type: 'POST',
					url: '/comunidades/comunidad-reactivar.php',
					data: gget('comid', true) + gget('key'),
					success: function(h){
						mydialog.alert('Comunidad reactivada', 'La comunidad ha sido reactivada', true);
					},
					error: function(){
						mydialog.error_500("com.comunidad_reactivar(1)");
					},
					complete: function(){
						mydialog.procesando_fin();
					}
				});
				break;
		}
		mydialog.center();
	},

	error_logo: function(o){
		o.src = global_data.img + 'images/avatar.gif';
	},

	ir_a_categoria: function(cat){
		if(cat!='root' && cat!='linea')
			if(cat==-1)
				document.location.href='/' + lang['comunidades url'] + '/';
			else
				document.location.href='/' + lang['comunidades url'] + '/home/' + cat + '/';
	},

	//Info Comunidad
	masinfo1: 0,
	masinfo2: 0,
	masinfo_procesando: false,
	masinfo: function(){
		if(this.masinfo_procesando==true)
			return;
		this.masinfo_procesando=true;
		//Open
		if($('#cMasInfo').css('display')=='none'){
			$('#aVerMas').html('&laquo; Ver menos');
			if(this.masinfo1==0)
				this.masinfo1 = document.getElementById('ComInfo').clientHeight + 3;
			$('#ComInfo').css('height', this.masinfo1);
			$('#cMasInfo').css('display', 'block').css('opacity', 0);
			if(this.masinfo2==0)
				this.masinfo2 = this.masinfo1 + document.getElementById('cMasInfo').clientHeight - 5;
			$('#cMasInfo').animate({ opacity: 1 }, 1000);
			$('#ComInfo').animate({ height: this.masinfo2 }, 1000, 0, function(){ com.masinfo_procesando=false; });
		}
		//Close
		else{
			$('#aVerMas').html('Ver m&aacute;s &raquo;');
			if(this.masinfo1 == 0 || this.masinfo2 == 0)
				return false;
			$('#cMasInfo').animate({ opacity: 0 }, 1000);
			$('#ComInfo').animate({ height: this.masinfo1 }, 1000, 0, function(){ $('#cMasInfo').css('display', 'none'); com.masinfo_procesando=false; });
		}
	},

	actualizar_respuestas: function(cat){
		$('#ult_resp').slideUp(1);
		if(gget('comid'))
			var params = gget('comid', true);
		if(cat)
			var params = cat;
		$.ajax({
			type: 'GET',
			url: '/comunidades/ultimas-respuestas.php',
			cache: false,
			data: params,
			success: function(h){
				$('#ult_resp').html(h.substring(3));
				$('#ult_resp').slideDown({duration: 1000, easing: 'easeOutBounce'});
			},
			error: function(){
				$('#ult_resp').slideDown({duration: 1000, easing: 'easeOutBounce'});
			}
		});
	},


	citar_resp: function(id, nick){
	 var textarea = $('#body_resp');
         textarea.focus();
         textarea.val(((textarea.val()!='') ? textarea.val() + '\n' : '') + '[quote=' + nick + ']' + htmlspecialchars_decode($('#citar_resp_'+id).html(), 'ENT_NOQUOTES') + '[/quote]\n');
	},

	add_resp: function(mostrar_resp){
		if($('#body_resp').val()=='' || $('#body_resp').val()==$('#body_resp').attr('title')){
			$('#body_resp').focus();
			return;
		}
		$('.add_resp_error').hide();
		$('#button_add_resp').attr('disabled', 'true').addClass('disabled');
		$.ajax({
			type: 'POST',
			url: '/comunidades/respuesta.php',
			data: 'respuesta=' + encodeURIComponent($('#body_resp').val()) + (mostrar_resp ? '&mostrar_resp=1' : '') + gget('temaid') + gget('key'),
			success: function(h){
				$('#button_add_resp').removeAttr('disabled').removeClass('disabled');
				switch(h.charAt(0)){
					case '0': //Error
						$('.add_resp_error').html(h.substring(3)).show('slow');
						break;
					case '1': //OK
						/*
						$('#body_resp').val('Escribir otra respuesta...').attr('title', 'Escribir otra respuesta...').addClass('onblur_effect');
						$('#body_resp').focus();
						*/

						/*** agregar respuesta al final ***/
							$('#body_resp').attr('title', 'Escribir otra respuesta...').val('');
							onblur_input($('#body_resp'));
							if($('#respuestas').css('display')=='none'){ //No habian respuestas
								$('#respuestas').html($('#respuestas').html()+h.substring(3)).slideDown('slow', function(){
									if($('#buttons.filterBy.modBar'))
										$('#buttons.filterBy.modBar').slideDown('slow');
								});
							}else{
								$('#respuestas').html($('#respuestas').html()+'<div id="nuevas_respuestas" style="display:none">'+h.substring(3)+'</div>');
								$('#nuevas_respuestas').slideDown('slow', function(){
									$('#nuevas_respuestas').removeAttr('id');
								});
							}
						break;
				}
			},
			error: function(){
				$('#button_add_resp').removeAttr('disabled').removeClass('disabled');
				mydialog.error_500("com.add_resp(" + mostrar_resp + ")");
			}
		});
	},

	borrar_resp: function(respid, autor){
		mydialog.close();
		$.ajax({
			type: 'POST',
			url: '/comunidades/respuesta-borrar.php',
			data: 'respid=' + respid + '&autor=' + autor + gget('temaid') + gget('key'),
			success: function(h){
				switch(h.charAt(0)){
					case '0': //Error
						mydialog.alert('Error', h.substring(2));
						break;
					case '1': //OK
					case '2': //La respuesta no existe o ya fue eliminada
						$('#respuestas #id_'+respid).fadeOut('normal', function(){ $(this).remove(); });
						break;
				}
			},
			error: function(){
				mydialog.error_500("com.borrar_resp(" + respid + ", " + autor + ")");
			}
		});
	},

	del_tema: function(confirm){
		if(!confirm){
			mydialog.show();
			mydialog.title('Borrar tema');
			mydialog.body(lang['html tema confirma borrar'] + '<br /><br />Causa: <input type="text" id="icausa_status" value="Causa del borrado" title="Causa del borrado" onfocus="onfocus_input(this)" onblur="onblur_input(this)" onkeypress="if(keypress_intro(event)) com.del_tema(true)" />', 370);
			mydialog.buttons(true, true, 'Aceptar', "com.del_tema(true)", true, false, true, 'Cancelar', 'close', true, false);
			mydialog.center();
			$('#icausa_status').focus();
		}else{
			if($('#icausa_status').val()=='' || $('#icausa_status').val()==$('#icausa_status').attr('title')){
				$('#icausa_status').focus();
				return;
			}
			mydialog.procesando_inicio('Borrando...');
			$.ajax({
				type: 'POST',
				url: '/comunidades/tema-borrar.php',
				data: 'causa='+encodeURIComponent($('#icausa_status').val())+gget('temaid')+gget('key'),
				success: function(h){
					if(h.charAt(0)==0) //Error
						mydialog.alert('Error', h.substring(2));
					else if(h.charAt(0)==1) //OK
						mydialog.alert('Tema borrado', 'El tema fue eliminado satisfactoriamente', true);
				},
				error: function(){
					mydialog.error_500("com.del_tema('"+confirm+"')");
				},
				complete: function(){
					mydialog.procesando_fin();
				}
			});
		}
	},

	react_tema: function(confirm){
		if(!confirm){
			mydialog.show();
			mydialog.title('Reactivar tema');
			mydialog.body('Realmente deseas reactivar este tema');
			mydialog.buttons(true, true, 'Aceptar', "com.react_tema(true)", true, true, true, 'Cancelar', 'close', true, false);
			mydialog.center();
		}else{
			mydialog.procesando_inicio('Reactivando...');
			$.ajax({
				type: "POST",
				url: '/comunidades/tema-reactivar.php',
				data: 'causa='+encodeURIComponent($('#icausa_status').val())+gget('temaid')+gget('key'),
				success: function(h){
					if(h.charAt(0)==0) //Error
						mydialog.alert('Error', h.substring(2));
					else if(h.charAt(0)==1) //OK
						mydialog.alert('Tema reactivado', 'El tema fue reactivado satisfactoriamente', true);
				},
				error: function(){
					mydialog.error_500("com.react_tema('"+confirm+"')");
				},
				complete: function(){
					mydialog.procesando_fin();
				}
			});
		}
	},

	tema_votar_action: '',
	tema_votar: function(voto){
		if(!gget('key')){
			mydialog.alert('Error al votar', 'Tenes que estar logueado para poder votar el tema');
			return;
		}
		this.tema_votar_action = $('.rateBox #actions').html();
		$('.rateBox #actions').html('Votando...');
		$.ajax({
			type: 'POST',
			url: '/comunidades/tema-votar.php',
			data: 'voto='+voto+gget('temaid')+gget('key'),
			success: function(h){
				switch(h.charAt(0)){
					case '0': //Error
						mydialog.alert('Error al votar', h.substring(2));
						$('.rateBox #actions').html('Error');
						break;
					case '1': //OK
						votos_total += Math.floor(voto);
						$('#votos_total').html((votos_total>0?'+':'')+votos_total);
						votos_total = 'listo';
						$('.rateBox #actions').html('Votado');
						break;
					case '2': //Ya votaste
						mydialog.alert('Ya votaste', 'Ya votaste este tema');
						votos_total = 'listo';
						$('.rateBox #actions').html('Votado');
						break;
				}
			},
			error: function(){
				$('.rateBox #actions').html(com.tema_votar_action);
				mydialog.error_500("com.tema_votar('"+voto+"')");
			}
		});
	},

	miembros_list_section_here: 'act',
	miembros_list_pag_actual: 0,
	miembros_list: function(section){
		if(!section)
			section = this.miembros_list_section_here;
		else if(this.miembros_list_section_here==section)
			return;
		if (this.miembros_list_section_here!=section || this.miembros_list_search) this.miembros_list_pag_actual = 0;
		var params = gget('comid', true)+gget('key');
		var filename = '/comunidades/';
		$('.filterBy #'+this.miembros_list_section_here).removeClass('here');
		this.miembros_list_section_here = section;
		$('.filterBy #'+section).addClass('here');
		switch(section){
			case 'act':
			case 'susp':
				filename += 'miembros.php';
				params += '&ajax=1&section='+section+'&p='+com.miembros_list_pag_actual;
				break;
			case 'history':
				filename += 'miembros-history.php';
				break;
		}
		if (this.miembros_list_search) params += '&q='+this.miembros_list_search;
		$('.gif_cargando').css('display', 'block');
		$.ajax({
			type: 'GET',
			url: filename,
			data: params,
			success: function(h){
				switch(h.charAt(0)){
					case '0': //Error
						$('#showResult').html('<div class="warningData">'+h.substring(3)+'</div>');
						break;
					case '1': //OK
						$('#showResult').html(h.substring(3));
						break;
				}
			},
			error: function(){
				$('#showResult').html('<div class="emptyData">'+lang['error procesar']+'. <a href="javascript:com.miembros_list()">Reintentar</a></div>');
			},
			complete: function(){
				$('.gif_cargando').css('display', 'none');
			}
		});
	},
	miembros_list_search: '',
	miembros_list_search_set: function() {
	    this.miembros_list_search = $.trim($('#miembros_list_search').val());
	    this.miembros_list();
	},
	miembros_list_sig: function(){
		this.miembros_list_pag_actual++;
		this.miembros_list();
	},
	miembros_list_ant: function(){
		this.miembros_list_pag_actual--;
		this.miembros_list();
	},
	admin_users: function(userid){
		mydialog.procesando_inicio('Cargando...', 'Administrar al usuario');
		$.ajax({
			type: 'POST',
			url: '/comunidades/miembros-admin.php',
			cache: false,
			data: 'userid=' + userid + gget('comid') + gget('key'),
			success: function(h){
				switch(h.charAt(0)){
					case '0': //Error
						mydialog.alert('Error', h.substring(3));
						break;
					case '1': //OK. Muestra info
						mydialog.title('Administrar al usuario');
						mydialog.body(h.substring(3), 340);
						mydialog.buttons(true, true, 'Aceptar', "com.admin_users_save('"+userid+"')", false, false, true, 'Cancelar', 'close', true, true);
						break;
				}
				mydialog.center();
			},
			error: function(){
				mydialog.error_500("com.admin_users('"+user+"')");
			},
			complete: function(){
				mydialog.procesando_fin();
			}
		});
	},
	admin_users_vermas: function(){
		if($('.suspendido_data #ver_mas').css('display') == 'none'){
			$('.suspendido_data #ver_mas').show('slow');
			$('.suspendido_data #vermas').html('&laquo; Ver menos');
		}else{
			$('.suspendido_data #ver_mas').hide('slow');
			$('.suspendido_data #vermas').html('Ver m&aacute;s &raquo;');
		}
	},
	admin_users_check: function(){
		if(is_checked('r_suspender')){
			if($('#t_causa').val()=='' || (!is_checked('r_suspender_dias1') && !is_checked('r_suspender_dias2')) || (is_checked('r_suspender_dias2') && $('#t_suspender').val()=='')){
				mydialog.buttons_enabled(false, true);
				return false;
			}else{
				mydialog.buttons_enabled(true, true);
				return true;
			}
		}else if(is_checked('r_rehabilitar')){
			if($('#t_causa').val()==''){
				mydialog.buttons_enabled(false, true);
				return false;
			}else{
				mydialog.buttons_enabled(true, true);
				return true;
			}
		}else if(is_checked('r_rango')){
			if(rango_actual == $('#s_rango').val()){
				mydialog.buttons_enabled(false, true);
				return false;
			}else{
				mydialog.buttons_enabled(true, true);
				return true;
			}
		}
	},
	admin_users_save: function(userid){
		if(!this.admin_users_check())
			return false;
		if(is_checked('r_suspender'))
			var action = 'suspender';
		else if(is_checked('r_rehabilitar'))
			var action = 'rehabilitar';
		else if(is_checked('r_rango'))
			var action = 'rango';
		mydialog.procesando_inicio('Guardando...');
		var params = 'userid=' + userid + gget('comid') + gget('key');
		params += '&action='+action;
		switch(action){
			case 'suspender':
				params += '&causa=' + encodeURIComponent($('#t_causa').val()) + '&dias=' + (is_checked('r_suspender_dias1')?'0':parseInt($('#t_suspender').val()));
				break;
			case 'rehabilitar':
				params += '&causa=' + encodeURIComponent($('#t_causa').val());
				break;
			case 'rango':
				params += '&new_rango=' + $('#s_rango').val();
				break;
		}
		$.ajax({
			type: 'POST',
			url: '/comunidades/miembros-admin-save.php',
			cache: false,
			data: params,
			success: function(h){
				switch(h.charAt(0)){
					case '0': //Error
						mydialog.alert('Error', h.substring(3));
						break;
					case '1': //OK
						mydialog.title('Administrar al usuario');
						mydialog.body(h.substring(3));
						mydialog.buttons(true, true, 'Aceptar', 'close', true, true, false);
						if(action == 'suspender')
							$('#cont_miembros').html(parseInt($('#cont_miembros').html())-parseInt(1));
						else if(action == 'rehabilitar')
							$('#cont_miembros').html(parseInt($('#cont_miembros').html())+parseInt(1));
						if(action=='suspender' || action=='rehabilitar')
							$('#userid_'+userid).remove();
						break;
				}
				mydialog.center();
			},
			error: function(){
				mydialog.error_500("com.admin_users_save('"+userid+"')");
			},
			complete: function(){
				mydialog.procesando_fin();
			}
		});
	},

	miembro_add: function(aceptar){
		mydialog.procesando_inicio('Procesando...', 'Unirme a la comunidad');
		$.ajax({
			type: 'POST',
			url: '/comunidades/miembro-add.php',
			cache: false,
			data: gget('comid', true) + gget('key') + (aceptar?'&aceptar=1':''),
			success: function(h){
				switch(h.charAt(0)){
					case '0': //Error
						mydialog.alert('Error', h.substring(3));
						break;
					case '1': //OK. Ya es miembro
						mydialog.alert('Ya sos miembro', h.substring(3), true);
						break;
					case '2': //OK. Confirmacion del admin
						mydialog.title('Unirme a la comunidad');
						mydialog.body(h.substring(3));
						mydialog.buttons(true, true, 'Enviar mensaje', "com.miembro_add(true)", true, true, true, 'Cancelar', 'close', true, false);
						break;
					case '3': //OK. Realmente queres ser miembro?
						mydialog.title('Unirme a la comunidad');
						mydialog.body(h.substring(3));
						mydialog.buttons(true, true, 'Si', "com.miembro_add(true)", true, true, true, 'No', 'close', true, false);
						break;
				}
				mydialog.center();
			},
			error: function(){
				mydialog.error_500("com.miembro_add('"+aceptar+"')");
			},
			complete: function(){
				mydialog.procesando_fin();
			}
		});
	},

	miembro_del: function(aceptar){
		if(!aceptar){
			mydialog.show();
			mydialog.title('Abandonar la comunidad');
			mydialog.body('&iquest;Realmente deseas salir de la comunidad?');
			mydialog.buttons(true, true, 'SI', 'com.miembro_del(true)', true, false, true, 'NO', 'close', true, true);
			mydialog.center();
		}else{
			mydialog.procesando_inicio('Saliendo...');
			$.ajax({
				type: 'POST',
				url: '/comunidades/miembro-del.php',
				cache: false,
				data: gget('comid', true) + gget('key'),
				success: function(h){
					switch(h.charAt(0)){
						case '0': //Error
							mydialog.alert('Error', h.substring(3));
							break;
						case '1': //Unico admin
							mydialog.title('Falta de administrador');
							mydialog.body(h.substring(3));
							mydialog.buttons(true, true, 'Aceptar', 'close', true, true, false);
							break;
						case '2': //OK. Fuiste eliminado
							mydialog.alert('Has salido de la comunidad', h.substring(3), true);
							break;
					}
					mydialog.center();
				},
				error: function(){
					mydialog.error_500("com.miembro_del('"+aceptar+"')");
				},
				complete: function(){
					mydialog.procesando_fin();
				}
			});
		}
	},

	mis_com_sort_actual: '',
	mis_com_pag_actual: 1,
	mis_com_sort: function(value){
		if(value == this.mis_com_sort_actual)
			return;
		this.mis_com_pag_actual = 1;
		document.location.href='/comunidades/mis-comunidades/'+(value=='rango'?'':value+'/');
	},

	global_tops: function(filtro, val){
		switch(filtro){
			case 'fecha':
				if(this.global_tops_fecha!=val)
					document.location.href='/comunidades/top/'+((val!='historico' || this.global_tops_categoria!=-1) ? val+((this.global_tops_categoria!=-1) ? '.'+this.global_tops_categoria : '')+'/' : '');
				this.global_tops_fecha=val;
				break;
			case 'categoria':
				if(this.global_tops_categoria!=val)
					document.location.href='/comunidades/top/'+((val!=-1 || this.global_tops_fecha!='historico') ? this.global_tops_fecha+((val!=-1) ? '.'+val : '')+'/' : '');
				this.global_tops_categoria=val;
				break;
		}
	},

	denuncia_publica: function(){
		mydialog.procesando_inicio('Cargando...', 'Formulario de denuncias');
		$.ajax({
			type: 'GET',
			url: '/comunidades/denuncia-publica-form.php',
			data: '',
			success: function(h){
				mydialog.title('Formulario de denuncias');
				mydialog.body(h, 450);
				mydialog.buttons(true, true, 'Enviar Denuncia', 'com.denuncia_publica_send()', true, true, true);
				mydialog.center();
				$('#denuncia-publica #nombre').focus();
			},
			error: function(){
				mydialog.error_500("com.denuncia_publica()");
			},
			complete: function(){
				mydialog.procesando_fin();
			}
		});
	},
	denuncia_publica_send: function(){
		if($('#denuncia-publica #nombre').val()==''){
			$('#denuncia-publica #error_data').html('El campo Nombre y Apellido es obligatorio').slideDown('fast');
			$('#denuncia-publica #nombre').focus();
			return;
		}else if($('#denuncia-publica #email').val()==''){
			$('#denuncia-publica #error_data').html('El campo Email es obligatorio').slideDown('fast');
			$('#denuncia-publica #email').focus();
			return;
		}else if($('#denuncia-publica #url').val()==''){
			$('#denuncia-publica #error_data').html('El campo URL de la Comunidad o Tema es obligatorio').slideDown('fast');
			$('#denuncia-publica #url').focus();
			return;
		}else if($('#denuncia-publica #email').val()==''){
			$('#denuncia-publica #error_data').html('El campo Email es obligatorio').slideDown('fast');
			$('#denuncia-publica #email').focus();
			return;
		}else if($('textarea[name="textarea_denuncia_publica"]').val()==''){
			$('#denuncia-publica #error_data').html('El campo Comentarios es obligatorio').slideDown('fast');
			$('#denuncia-publica #comentarios').focus();
			return;
		}

		mydialog.procesando_inicio('Enviando...', 'Formulario de denuncias');
		$.ajax({
			type: 'POST',
			url: '/comunidades/denuncia-publica.php',
			data: 'nombre='+encodeURIComponent($('#denuncia-publica #nombre').val())+'&email='+encodeURIComponent($('#denuncia-publica #email').val())+'&telefono='+encodeURIComponent($('#denuncia-publica #telefono').val())+'&horario='+encodeURIComponent($('#denuncia-publica #horario').val())+'&empresa='+encodeURIComponent($('#denuncia-publica #empresa').val())+'&url='+encodeURIComponent($('#denuncia-publica #url').val())+'&comentarios='+encodeURIComponent($('textarea[name="textarea_denuncia_publica"]').val()),
			success: function(h){
				mydialog.alert('Formulario de denuncias', h.substring(3));
			},
			error: function(){
				mydialog.error_500("com.denuncia_publica_send()");
			},
			complete: function(){
				mydialog.procesando_fin();
			}
		});		
	},

	contacto_beta: function(){
		mydialog.procesando_inicio('Cargando...', 'Formulario de contacto');
		$.ajax({
			type: 'GET',
			url: '/comunidades/contacto-beta-form.php',
			data: '',
			success: function(h){
				mydialog.title('Formulario de contacto');
				mydialog.body(h);
				mydialog.buttons(true, true, 'Enviar Formulario', 'com.contacto_beta_send()', true, true, true);
				mydialog.center();
				$('#contacto-beta #email').focus();
			},
			error: function(){
				mydialog.error_500("com.contacto_beta()");
			},
			complete: function(){
				mydialog.procesando_fin();
			}
		});
	},
	contacto_beta_send: function(){
		if($('#contacto-beta #email').val()==''){
			$('#contacto-beta #error_data').html('El campo Email es obligatorio').slideDown('fast');
			$('#contacto-beta #email').focus();
			return;
		}else if($('#contacto-beta #razon').val()=='-1'){
			$('#contacto-beta #error_data').html('El campo Razon es obligatorio').slideDown('fast');
			$('#contacto-beta #razon').focus();
			return;
		}else if($('#contacto-beta #mensaje').val()==''){
			$('#contacto-beta #error_data').html('El campo Mensaje es obligatorio').slideDown('fast');
			$('#contacto-beta #mensaje').focus();
			return;
		}

		mydialog.procesando_inicio('Enviando...', 'Formulario de contacto');
		$.ajax({
			type: 'POST',
			url: '/comunidades/contacto-beta.php',
			data: 'email='+encodeURIComponent($('#contacto-beta #email').val())+'&razon='+encodeURIComponent($('#contacto-beta #razon').val())+'&mensaje='+encodeURIComponent($('textarea[name="textarea_contacto_beta"]').val()),
			success: function(h){
				mydialog.alert('Formulario de contacto', h.substring(3));
			},
			error: function(){
				mydialog.error_500("com.contacto_beta_send()");
			},
			complete: function(){
				mydialog.procesando_fin();
			}
		});		
	}
};
/* FIN - Comunidades */

function my_number_format(numero){
	return Number(numero).toLocaleString();
}

function bloquear(user, bloqueado, lugar, aceptar){
	if(!aceptar && bloqueado){
		mydialog.show();
		mydialog.title('Bloquear usuario');
		mydialog.body('&iquest;Realmente deseas bloquear a este usuario?');
		mydialog.buttons(true, true, 'SI', "bloquear('"+user+"', true, '"+lugar+"', true)", true, false, true, 'NO', 'close', true, true);
		mydialog.center();
		return;
	}
	if(bloqueado)
		mydialog.procesando_inicio('Procesando...', 'Bloquear usuario');
	$.ajax({
		type: 'POST',
		url: '/bloqueados-cambiar.php',
		data: 'user='+user+(bloqueado ? '&bloqueado=1' : '')+gget('key'),
		success: function(h){
			mydialog.alert('Bloquear Usuarios', h.substring(3));
			switch(lugar){
				case 'perfil':
					if(bloqueado)
						$('#bloquear_cambiar').html('Desbloquear').removeClass('bloquearU').addClass('desbloquearU').attr('href', "javascript:bloquear('"+user+"', false, '"+lugar+"')");
					else
						$('#bloquear_cambiar').html('Bloquear').removeClass('desbloquearU').addClass('bloquearU').attr('href', "javascript:bloquear('"+user+"', true, '"+lugar+"')");
					break;
				case 'respuestas':
				case 'comentarios':
					if (bloqueado) {
						$('li.desbloquear_'+user).show();
						$('li.bloquear_'+user).hide();
					}
					else {
						$('li.bloquear_'+user).show();
						$('li.desbloquear_'+user).hide();
					}
					break;
				case 'mis_bloqueados':
					if(bloqueado)
						$('.bloquear_usuario_'+user).attr('title', 'Desbloquear Usuario').removeClass('bloqueadosU').addClass('desbloqueadosU').html('Desbloquear').attr('href', "javascript:bloquear('"+user+"', false, '"+lugar+"')");
					else
						$('.bloquear_usuario_'+user).attr('title', 'Bloquear Usuario').removeClass('desbloqueadosU').addClass('bloqueadosU').html('Bloquear').attr('href', "javascript:bloquear('"+user+"', true, '"+lugar+"')");
					break;
			}
		},
		error: function(){
			mydialog.error_500("bloquear('"+user+"', '"+bloqueado+"', '"+lugar+"', true)");
		},
		complete: function(){
			mydialog.procesando_fin();
		}
	});
}

function muro_add(userid){
	$('.muro #add #error').hide();
	if($('#muro-mensaje').val()==$('#muro-mensaje').attr('title')){
		$('#muro-mensaje').focus();
		return;
	}
	$.ajax({
		type: 'POST',
		url: '/muro-agregar.php',
		data: 'userid='+userid+'&mensaje='+encodeURIComponent($('#muro-mensaje').val())+gget('key'),
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					$('.muro #add #error').html(h.substring(3)).show();
					break;
				case '1': //OK
					mydialog.alert('OK', h.substring(3));
					break;
			}
		},
		error: function(){	
			mydialog.error_500("muro_add('"+userid+"')");
		}
	});
}
function muro_status(msgid, userid, borrar){
	$.ajax({
		type: 'POST',
		url: '/muro-status.php',
		data: 'msgid='+msgid + (userid ? '&userid='+userid : '') + gget('key') + (borrar ? '&borrar=1' : ''),
		success: function(h){
			switch(h.charAt(0)){
				case '0': //Error
					mydialog.alert('Error', h.substring(3));
					break;
				case '1': //OK
					mydialog.alert('OK', h.substring(3));
					break;
			}
		},
		error: function(){	
			mydialog.error_500("muro_status('"+msgid+"', '"+userid+"', '"+borrar+"')");
		}
	});
}

/* MyDialog */
var mydialog = {

is_show: false,
class_aux: '',
mask_close: true,
close_button: false,
show: function(class_aux){
	if(this.is_show)
		return;
	else
		this.is_show = true;
	if($('#mydialog').html()=='') //Primera vez
		$('#mydialog').html('<div id="dialog"><div id="title"></div><div id="cuerpo"><div id="procesando"><div id="mensaje"></div></div><div id="modalBody"></div><div id="buttons"></div></div></div>');

	if(class_aux==true)
		$('#mydialog').addClass(this.class_aux);
	else if(this.class_aux != ''){
		$('#mydialog').removeClass(this.class_aux);
		this.class_aux = '';
	}

	if(this.mask_close)
		$('#mask').click(function(){ mydialog.close() });
	else
		$('#mask').unbind('click');

	if(this.close_button)
		$('#mydialog #dialog').append('<img class="close_dialog" src="'+global_data.img+'images/close.gif" onclick="mydialog.close()" />');
	else
		$('#mydialog #dialog .close_dialog').remove();

	$('#mask').css({'width':$(document).width(),'height':$(document).height(),'display':'block'});

	if(jQuery.browser.msie && jQuery.browser.version<7) //Fix IE<7 <- fack you
		$('#mydialog #dialog').css('position', 'absolute');
	else
		$('#mydialog #dialog').css('position', 'fixed');
	$('#mydialog #dialog').fadeIn('fast');
},
close: function(){
	//Vuelve todos los parametros por default
	this.class_aux = '';
	this.mask_close = true;
	this.close_button = false;

	this.is_show = false;
	$('#mask').css('display', 'none');
	$('#mydialog #dialog').fadeOut('fast', function(){ $(this).remove() });
	this.procesando_fin();
},
center: function(){
	if($('#mydialog #dialog').height() > $(window).height()-60)
		$('#mydialog #dialog').css({'position':'absolute', 'top':20});
	else
		$('#mydialog #dialog').css('top', $(window).height()/2-$('#mydialog #dialog').height()/2);
	$('#mydialog #dialog').css('left', $(window).width()/2-$('#mydialog #dialog').width()/2);
},

title: function(title){
	$('#mydialog #title').html(title);
},
body: function(body, width, height){
	if(!width && (jQuery.browser.opera || (jQuery.browser.msie && jQuery.browser.version<7)))
		width = '400px';
	$('#mydialog #dialog').width(width?width:'').height(height?height:'');
	$('#mydialog #modalBody').html(body);
},
buttons: function(display_all, btn1_display, btn1_val, btn1_action, btn1_enabled, btn1_focus, btn2_display, btn2_val, btn2_action, btn2_enabled, btn2_focus){
	if(!display_all){
		$('#mydialog #buttons').css('display', 'none').html('');
		return;
	}

	if(btn1_action=='close')
		btn1_action='mydialog.close()';
	if(btn2_action=='close' || !btn2_val)
		btn2_action='mydialog.close()';
	if(!btn2_val){
		btn2_val = 'Cancelar';
		btn2_enabled = true;
	}

	var html = '';
	if(btn1_display)
		html += '<input type="button" class="mBtn btnOk'+(btn1_enabled?'':' disabled')+'" style="display:'+(btn1_display?'inline-block':'none')+'"'+(btn1_display?' value="'+btn1_val+'"':'')+(btn1_display?' onclick="'+btn1_action+'"':'')+(btn1_enabled?'':' disabled')+' />';
	if(btn2_display)
		html += ' <input type="button" class="mBtn btnCancel'+(btn1_enabled?'':' disabled')+'" style="display:'+(btn2_display?'inline-block':'none')+'"'+(btn2_display?' value="'+btn2_val+'"':'')+(btn2_display?' onclick="'+btn2_action+'"':'')+(btn2_enabled?'':' disabled')+' />';
	$('#mydialog #buttons').html(html).css('display', 'inline-block');

	if(btn1_focus)
		$('#mydialog #buttons .mBtn.btnOk').focus();
	else if(btn2_focus)
		$('#mydialog #buttons .mBtn.btnCancel').focus();
},
buttons_enabled: function(btn1_enabled, btn2_enabled){
	if($('#mydialog #buttons .mBtn.btnOk'))
		if(btn1_enabled)
			$('#mydialog #buttons .mBtn.btnOk').removeClass('disabled').removeAttr('disabled');
		else
			$('#mydialog #buttons .mBtn.btnOk').addClass('disabled').attr('disabled', 'disabled');

	if($('#mydialog #buttons .mBtn.btnCancel'))
		if(btn2_enabled)
			$('#mydialog #buttons .mBtn.btnCancel').removeClass('disabled').removeAttr('disabled');
		else
			$('#mydialog #buttons .mBtn.btnCancel').addClass('disabled').attr('disabled', 'disabled');
},
alert: function(title, body, reload){
	this.show();
	this.title(title);
	this.body(body);
	this.buttons(true, true, 'Aceptar', 'mydialog.close();' + (reload ? 'location.reload();' : 'close'), true, true, false);
	this.center();
},
confirm: function(body, title, callback){
	this.show();
	this.title(title);
	this.body(body);
	this.buttons(
		true,
		// button 1
		true,
		'Aceptar',
		callback,
		true,
		true,
		// button 2
		true,
		'Cancelar',
		'mydialog.close();',
		true,
		true
	);
	this.center();
},
error_500: function(fun_reintentar){
	setTimeout(function(){
		mydialog.procesando_fin();
		mydialog.show();
		mydialog.title('Error');
		mydialog.body(lang['error procesar']);
		mydialog.buttons(true, true, 'Reintentar', 'mydialog.close();'+fun_reintentar, true, true, true, 'Cancelar', 'close', true, false);
		mydialog.center();
	}, 200);
},
procesando_inicio: function(value, title){
	if(!this.is_show){
		this.show();
		this.title(title);
		this.body('');
		this.buttons(false, false);
		this.center();
	}
	$('#mydialog #procesando #mensaje').html('<img src="'+global_data.img+'images/loading.gif" />');
	$('#mydialog #procesando').fadeIn('fast');
},
procesando_fin: function(){
	$('#mydialog #procesando').fadeOut('fast');
}

};

/* scrollTo 1.4.2 by Ariel Flesler */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/* Easing 1.3 */
jQuery.extend(jQuery.easing,{easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}}});

/* markItUp 1.1.5 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3($){$.24.T=3(f,g){E k,v,A,F;v=A=F=7;k={C:\'\',12:\'\',U:\'\',1j:\'\',1A:8,25:\'26\',1k:\'~/2Q/1B.1C\',1b:\'\',27:\'28\',1l:8,1D:\'\',1E:\'\',1F:{},1G:{},1H:{},1I:{},29:[{}]};$.V(k,f,g);2(!k.U){$(\'2R\').1c(3(a,b){1J=$(b).14(0).2S.2T(/(.*)2U\\.2V(\\.2W)?\\.2X$/);2(1J!==2a){k.U=1J[1]}})}4 G.1c(3(){E d,u,15,16,p,H,L,P,17,1m,w,1n,M,18;d=$(G);u=G;15=[];18=7;16=p=0;H=-1;k.1b=1d(k.1b);k.1k=1d(k.1k);3 1d(a,b){2(b){4 a.W(/("|\')~\\//g,"$1"+k.U)}4 a.W(/^~\\//,k.U)}3 2b(){C=\'\';12=\'\';2(k.C){C=\'C="\'+k.C+\'"\'}l 2(d.1K("C")){C=\'C="T\'+(d.1K("C").2c(0,1).2Y())+(d.1K("C").2c(1))+\'"\'}2(k.12){12=\'N="\'+k.12+\'"\'}d.1L(\'<z \'+12+\'></z>\');d.1L(\'<z \'+C+\' N="T"></z>\');d.1L(\'<z N="2Z"></z>\');d.2d("2e");17=$(\'<z N="30"></z>\').2f(d);$(1M(k.29)).1N(17);1m=$(\'<z N="31"></z>\').1O(d);2(k.1l===8&&$.X.32!==8){1l=$(\'<z N="33"></z>\').1O(d).1e("34",3(e){E h=d.2g(),y=e.2h,1o,1p;1o=3(e){d.2i("2g",35.36(20,e.2h+h-y)+"37");4 7};1p=3(e){$("1C").1P("2j",1o).1P("1q",1p);4 7};$("1C").1e("2j",1o).1e("1q",1p)});1m.2k(1l)}d.2l(1Q).38(1Q);d.1e("1R",3(e,a){2(a.1r!==7){14()}2(u===$.T.2m){Y(a)}});d.1f(3(){$.T.2m=G})}3 1M(b){E c=$(\'<Z></Z>\'),i=0;$(\'B:2n > Z\',c).2i(\'39\',\'q\');$.1c(b,3(){E a=G,t=\'\',1s,B,j;1s=(a.19)?(a.1S||\'\')+\' [3a+\'+a.19+\']\':(a.1S||\'\');19=(a.19)?\'2o="\'+a.19+\'"\':\'\';2(a.2p){B=$(\'<B N="3b">\'+(a.2p||\'\')+\'</B>\').1N(c)}l{i++;2q(j=15.6-1;j>=0;j--){t+=15[j]+"-"}B=$(\'<B N="2r 2r\'+t+(i)+\' \'+(a.3c||\'\')+\'"><a 3d="" \'+19+\' 1s="\'+1s+\'">\'+(a.1S||\'\')+\'</a></B>\').1e("3e",3(){4 7}).2s(3(){4 7}).1q(3(){2(a.2t){3f(a.2t)()}Y(a);4 7}).2n(3(){$(\'> Z\',G).3g();$(D).3h(\'2s\',3(){$(\'Z Z\',17).2u()})},3(){$(\'> Z\',G).2u()}).1N(c);2(a.2v){15.3i(i);$(B).2d(\'3j\').2k(1M(a.2v))}}});15.3k();4 c}3 2w(c){2(c){c=c.3l();c=c.W(/\\(\\!\\(([\\s\\S]*?)\\)\\!\\)/g,3(x,a){E b=a.1T(\'|!|\');2(F===8){4(b[1]!==2x)?b[1]:b[0]}l{4(b[1]===2x)?"":b[0]}});c=c.W(/\\[\\!\\[([\\s\\S]*?)\\]\\!\\]/g,3(x,a){E b=a.1T(\':!:\');2(18===8){4 7}1U=3m(b[0],(b[1])?b[1]:\'\');2(1U===2a){18=8}4 1U});4 c}4""}3 I(a){2($.3n(a)){a=a(P)}4 2w(a)}3 1g(a){J=I(L.J);1a=I(L.1a);Q=I(L.Q);O=I(L.O);2(Q!==""){q=J+Q+O}l 2(m===\'\'&&1a!==\'\'){q=J+1a+O}l{q=J+(a||m)+O}4{q:q,J:J,Q:Q,1a:1a,O:O}}3 Y(a){E b,j,n,i;P=L=a;14();$.V(P,{1t:"",U:k.U,u:u,m:(m||\'\'),p:p,v:v,A:A,F:F});I(k.1D);I(L.1D);2(v===8&&A===8){I(L.3o)}$.V(P,{1t:1});2(v===8&&A===8){R=m.1T(/\\r?\\n/);2q(j=0,n=R.6,i=0;i<n;i++){2($.3p(R[i])!==\'\'){$.V(P,{1t:++j,m:R[i]});R[i]=1g(R[i]).q}l{R[i]=""}}o={q:R.3q(\'\\n\')};11=p;b=o.q.6+(($.X.1V)?n:0)}l 2(v===8){o=1g(m);11=p+o.J.6;b=o.q.6-o.J.6-o.O.6;b-=1u(o.q)}l 2(A===8){o=1g(m);11=p;b=o.q.6;b-=1u(o.q)}l{o=1g(m);11=p+o.q.6;b=0;11-=1u(o.q)}2((m===\'\'&&o.Q===\'\')){H+=1W(o.q);11=p+o.J.6;b=o.q.6-o.J.6-o.O.6;H=d.K().1h(p,d.K().6).6;H-=1W(d.K().1h(0,p))}$.V(P,{p:p,16:16});2(o.q!==m&&18===7){2y(o.q);1X(11,b)}l{H=-1}14();$.V(P,{1t:\'\',m:m});2(v===8&&A===8){I(L.3r)}I(L.1E);I(k.1E);2(w&&k.1A){1Y()}A=F=v=18=7}3 1W(a){2($.X.1V){4 a.6-a.W(/\\n*/g,\'\').6}4 0}3 1u(a){2($.X.2z){4 a.6-a.W(/\\r*/g,\'\').6}4 0}3 2y(a){2(D.m){E b=D.m.1Z();b.2A=a}l{d.K(d.K().1h(0,p)+a+d.K().1h(p+m.6,d.K().6))}}3 1X(a,b){2(u.2B){2($.X.1V&&$.X.3s>=9.5&&b==0){4 7}1i=u.2B();1i.3t(8);1i.2C(\'21\',a);1i.3u(\'21\',b);1i.3v()}l 2(u.2D){u.2D(a,a+b)}u.1v=16;u.1f()}3 14(){u.1f();16=u.1v;2(D.m){m=D.m.1Z().2A;2($.X.2z){E a=D.m.1Z(),1w=a.3w();1w.3x(u);p=-1;3y(1w.3z(a)){1w.2C(\'21\');p++}}l{p=u.2E}}l{p=u.2E;m=d.K().1h(p,u.3A)}4 m}3 1B(){2(!w||w.3B){2(k.1j){w=3C.2F(\'\',\'1B\',k.1j)}l{M=$(\'<2G N="3D"></2G>\');2(k.25==\'26\'){M.1O(1m)}l{M.2f(17)}w=M[M.6-1].3E||3F[M.6-1]}}l 2(F===8){2(M){M.3G()}w.2H();w=M=7}2(!k.1A){1Y()}}3 1Y(){2(w.D){3H{22=w.D.2I.1v}3I(e){22=0}w.D.2F();w.D.3J(2J());w.D.2H();w.D.2I.1v=22}2(k.1j){w.1f()}}3 2J(){2(k.1b!==\'\'){$.2K({2L:\'3K\',2M:7,2N:k.1b,28:k.27+\'=\'+3L(d.K()),2O:3(a){23=1d(a,1)}})}l{2(!1n){$.2K({2M:7,2N:k.1k,2O:3(a){1n=1d(a,1)}})}23=1n.W(/<!-- 3M -->/g,d.K())}4 23}3 1Q(e){A=e.A;F=e.F;v=(!(e.F&&e.v))?e.v:7;2(e.2L===\'2l\'){2(v===8){B=$("a[2o="+3N.3O(e.1x)+"]",17).1y(\'B\');2(B.6!==0){v=7;B.3P(\'1q\');4 7}}2(e.1x===13||e.1x===10){2(v===8){v=7;Y(k.1H);4 k.1H.1z}l 2(A===8){A=7;Y(k.1G);4 k.1G.1z}l{Y(k.1F);4 k.1F.1z}}2(e.1x===9){2(A==8||v==8||F==8){4 7}2(H!==-1){14();H=d.K().6-H;1X(H,0);H=-1;4 7}l{Y(k.1I);4 k.1I.1z}}}}2b()})};$.24.3Q=3(){4 G.1c(3(){$$=$(G).1P().3R(\'2e\');$$.1y(\'z\').1y(\'z.T\').1y(\'z\').Q($$)})};$.T=3(a){E b={1r:7};$.V(b,a);2(b.1r){4 $(b.1r).1c(3(){$(G).1f();$(G).2P(\'1R\',[b])})}l{$(\'u\').2P(\'1R\',[b])}}})(3S);',62,241,'||if|function|return||length|false|true|||||||||||||else|selection||string|caretPosition|block||||textarea|ctrlKey|previewWindow|||div|shiftKey|li|id|document|var|altKey|this|caretOffset|prepare|openWith|val|clicked|iFrame|class|closeWith|hash|replaceWith|lines||markItUp|root|extend|replace|browser|markup|ul||start|nameSpace||get|levels|scrollPosition|header|abort|key|placeHolder|previewParserPath|each|localize|bind|focus|build|substring|range|previewInWindow|previewTemplatePath|resizeHandle|footer|template|mouseMove|mouseUp|mouseup|target|title|line|fixIeBug|scrollTop|rangeCopy|keyCode|parent|keepDefault|previewAutoRefresh|preview|html|beforeInsert|afterInsert|onEnter|onShiftEnter|onCtrlEnter|onTab|miuScript|attr|wrap|dropMenus|appendTo|insertAfter|unbind|keyPressed|insertion|name|split|value|opera|fixOperaBug|set|refreshPreview|createRange||character|sp|phtml|fn|previewPosition|after|previewParserVar|data|markupSet|null|init|substr|addClass|markItUpEditor|insertBefore|height|clientY|css|mousemove|append|keydown|focused|hover|accesskey|separator|for|markItUpButton|click|call|hide|dropMenu|magicMarkups|undefined|insert|msie|text|createTextRange|moveStart|setSelectionRange|selectionStart|open|iframe|close|documentElement|renderPreview|ajax|type|async|url|success|trigger|templates|script|src|match|jquery|markitup|pack|js|toUpperCase|markItUpContainer|markItUpHeader|markItUpFooter|safari|markItUpResizeHandle|mousedown|Math|max|px|keyup|display|Ctrl|markItUpSeparator|className|href|contextmenu|eval|show|one|push|markItUpDropMenu|pop|toString|prompt|isFunction|beforeMultiInsert|trim|join|afterMultiInsert|version|collapse|moveEnd|select|duplicate|moveToElementText|while|inRange|selectionEnd|closed|window|markItUpPreviewFrame|contentWindow|frame|remove|try|catch|write|POST|encodeURIComponent|content|String|fromCharCode|triggerHandler|markItUpRemove|removeClass|jQuery'.split('|'),0,{}));

/* autogrow 1.2.2 */
(function(b){var c=null;b.fn.autogrow=function(o){return this.each(function(){new b.autogrow(this,o)})};b.autogrow=function(e,o){this.options=o||{};this.dummy=null;this.interval=null;this.line_height=this.options.lineHeight||parseInt(b(e).css('line-height'));this.min_height=this.options.minHeight||parseInt(b(e).css('min-height'));this.max_height=this.options.maxHeight||parseInt(b(e).css('max-height'));this.textarea=b(e);if(this.line_height==NaN)this.line_height=0;this.init()};b.autogrow.fn=b.autogrow.prototype={autogrow:'1.2.2'};b.autogrow.fn.extend=b.autogrow.extend=b.extend;b.autogrow.fn.extend({init:function(){var a=this;this.textarea.css({overflow:'hidden',display:'block'});this.textarea.bind('focus',function(){a.startExpand()}).bind('blur',function(){a.stopExpand()});this.checkExpand()},startExpand:function(){var a=this;this.interval=window.setInterval(function(){a.checkExpand()},400)},stopExpand:function(){clearInterval(this.interval)},checkExpand:function(){if(this.dummy==null){this.dummy=b('<div></div>');this.dummy.css({'font-size':this.textarea.css('font-size'),'font-family':this.textarea.css('font-family'),'width':this.textarea.css('width'),'padding':this.textarea.css('padding'),'line-height':this.line_height+'px','overflow-x':'hidden','position':'absolute','top':0,'left':-9999}).appendTo('body')}var a=this.textarea.val().replace(/(<|>)/g,'');if($.browser.msie){a=a.replace(/\n/g,'<BR>new')}else{a=a.replace(/\n/g,'<br>new')}if(this.dummy.html()!=a){this.dummy.html(a);if(this.max_height>0&&(this.dummy.height()+this.line_height>this.max_height)){this.textarea.css('overflow-y','auto')}else{this.textarea.css('overflow-y','hidden');if(this.textarea.height()<this.dummy.height()+this.line_height||(this.dummy.height()<this.textarea.height())){this.textarea.animate({height:(this.dummy.height()+this.line_height)+'px'},100)}}}}})})(jQuery);

/* hashchange 1.3 by Ben Alman */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

/* tipsy 0.1.2 */
(function($) {
    $.fn.tipsy = function(opts) {

        opts = $.extend({
        	fade: false,
        	css: false,
        	gravity: 'n',
        	title: 'title'
        }, opts || {});
        var tip = null, cancelHide = false;

        this.hover(function() {
            
            $.data(this, 'cancel.tipsy', true);

            var tip = $.data(this, 'active.tipsy');
			if (!tip) {
				var title;
				if (typeof opts.title == 'string' && $(this).attr(opts.title) != 'undefined' && $(this).attr(opts.title) != '') {
					title = $(this).attr(opts.title);
				} else if (typeof opts.title == 'function') {
					title = opts.title(this);
				}
				tip = $('<div class="tipsy"><div class="tipsy-inner">' + title + '</div></div>');
				tip.css({position: 'absolute', zIndex: 100000});
				if (opts.css) tip.addClass(opts.css);
				$(this).attr('title', '');
				$.data(this, 'active.tipsy', tip);
			}
            
            var pos = $.extend({}, $(this).offset(), {width: this.offsetWidth, height: this.offsetHeight});
            tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
            var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
            
            switch (opts.gravity.charAt(0)) {
                case 'n':
                    tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-north');
                    break;
                case 's':
                    tip.css({top: pos.top - actualHeight - 1, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-south');
                    break;
                case 'e':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}).addClass('tipsy-east');
                    break;
                case 'w':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}).addClass('tipsy-west');
                    break;
            }

            if (opts.fade) {
                tip.css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: 1});
            } else {
                tip.css({visibility: 'visible'});
            }

        }, function() {
            $.data(this, 'cancel.tipsy', false);
            var self = this;
            if ($.data(this, 'cancel.tipsy')) return;
            var tip = $.data(self, 'active.tipsy');
            if (opts.fade) {
                tip.stop().fadeOut(function() { $(this).remove(); });
            } else {
                tip.remove();
            }          
        });

    };
})(jQuery);

/* jquery tooltip beta */
(function ($) {
	$.fn.tooltip = function (opts) {

		opts = $.extend({
			className: 'tooltip',
			content: 'title',
			offset: [ 0, 0 ],
			align: 'center',
			inDelay: 100,
			outDelay: 100
		}, opts || {});

		var mouseOutCallback = function (obj) {
			var tooltip = $.data(obj, 'tooltip');
			if (tooltip && !$.data(tooltip[0], 'hover')) {
				tooltip.hide();
			}
		}

		this.live('mouseenter', function () {
			var obj = this;
			setTimeout(function () {
				var pos = $.extend({}, $(obj).offset(), { width: obj.offsetWidth, height: obj.offsetHeight });
				if (!$.data(obj, 'tooltip')) {
					var title;
					if (typeof opts.content == 'string' && $(obj).attr(opts.content) != 'undefined' && $(obj).attr(opts.content) != '') {
						title = $(obj).attr(opts.content);
					} else if (typeof opts.content == 'function') {
						title = opts.content(obj);
					}
					var tooltip = $('<div class="' + opts.className + '">' + title + '</div>').appendTo(document.body);
					$.data(obj, 'tooltip', tooltip);
					tooltip.hover(function () {
						$.data(this, 'hover', true);
					}, function () {
						$.removeData(this, 'hover');
						setTimeout(function () {
							mouseOutCallback(obj);
						}, opts.outDelay);
					});
				} else {
					var tooltip = $.data(obj, 'tooltip').show();
				}
				tooltip.css({
					display: 'block',
					position: 'absolute',
					zIndex: 99999,
					top: 0,
					left: 0
				});
				var left;
				if (opts.align == 'left') {
					left = pos.left;
				} else if (opts.align == 'center') {
					left = pos.left + pos.width / 2 - tooltip[0].offsetWidth / 2;
				} else if (opts.align == 'right') {
					left = pos.left + pos.width - tooltip[0].offsetWidth;
				}
				left += opts.offset[1];
				tooltip.css({
					top: pos.top + opts.offset[0],
					left: left
				});
			}, opts.inDelay);
		}).live('mouseleave', function () {
			var obj = this;
			setTimeout(function () {
				mouseOutCallback(obj);
			}, opts.outDelay);
		});
	}
})(jQuery);

/* htmlspecialchars_decode (php.js) 909.322 */
function get_html_translation_table(d,e){var a={},f={},b=0,c="";c={};var h={},g={},i={};c[0]="HTML_SPECIALCHARS";c[1]="HTML_ENTITIES";h[0]="ENT_NOQUOTES";h[2]="ENT_COMPAT";h[3]="ENT_QUOTES";g=!isNaN(d)?c[d]:d?d.toUpperCase():"HTML_SPECIALCHARS";i=!isNaN(e)?h[e]:e?e.toUpperCase():"ENT_COMPAT";if(g!=="HTML_SPECIALCHARS"&&g!=="HTML_ENTITIES")throw new Error("Table: "+g+" not supported");a["38"]="&amp;";if(g==="HTML_ENTITIES"){a["160"]="&nbsp;";a["161"]="&iexcl;";a["162"]="&cent;";a["163"]="&pound;"; a["164"]="&curren;";a["165"]="&yen;";a["166"]="&brvbar;";a["167"]="&sect;";a["168"]="&uml;";a["169"]="&copy;";a["170"]="&ordf;";a["171"]="&laquo;";a["172"]="&not;";a["173"]="&shy;";a["174"]="&reg;";a["175"]="&macr;";a["176"]="&deg;";a["177"]="&plusmn;";a["178"]="&sup2;";a["179"]="&sup3;";a["180"]="&acute;";a["181"]="&micro;";a["182"]="&para;";a["183"]="&middot;";a["184"]="&cedil;";a["185"]="&sup1;";a["186"]="&ordm;";a["187"]="&raquo;";a["188"]="&frac14;";a["189"]="&frac12;";a["190"]="&frac34;";a["191"]= "&iquest;";a["192"]="&Agrave;";a["193"]="&Aacute;";a["194"]="&Acirc;";a["195"]="&Atilde;";a["196"]="&Auml;";a["197"]="&Aring;";a["198"]="&AElig;";a["199"]="&Ccedil;";a["200"]="&Egrave;";a["201"]="&Eacute;";a["202"]="&Ecirc;";a["203"]="&Euml;";a["204"]="&Igrave;";a["205"]="&Iacute;";a["206"]="&Icirc;";a["207"]="&Iuml;";a["208"]="&ETH;";a["209"]="&Ntilde;";a["210"]="&Ograve;";a["211"]="&Oacute;";a["212"]="&Ocirc;";a["213"]="&Otilde;";a["214"]="&Ouml;";a["215"]="&times;";a["216"]="&Oslash;";a["217"]= "&Ugrave;";a["218"]="&Uacute;";a["219"]="&Ucirc;";a["220"]="&Uuml;";a["221"]="&Yacute;";a["222"]="&THORN;";a["223"]="&szlig;";a["224"]="&agrave;";a["225"]="&aacute;";a["226"]="&acirc;";a["227"]="&atilde;";a["228"]="&auml;";a["229"]="&aring;";a["230"]="&aelig;";a["231"]="&ccedil;";a["232"]="&egrave;";a["233"]="&eacute;";a["234"]="&ecirc;";a["235"]="&euml;";a["236"]="&igrave;";a["237"]="&iacute;";a["238"]="&icirc;";a["239"]="&iuml;";a["240"]="&eth;";a["241"]="&ntilde;";a["242"]="&ograve;";a["243"]= "&oacute;";a["244"]="&ocirc;";a["245"]="&otilde;";a["246"]="&ouml;";a["247"]="&divide;";a["248"]="&oslash;";a["249"]="&ugrave;";a["250"]="&uacute;";a["251"]="&ucirc;";a["252"]="&uuml;";a["253"]="&yacute;";a["254"]="&thorn;";a["255"]="&yuml;"}if(i!=="ENT_NOQUOTES")a["34"]="&quot;";if(i==="ENT_QUOTES")a["39"]="&#39;";a["60"]="&lt;";a["62"]="&gt;";for(b in a){c=String.fromCharCode(b);f[c]=a[b]}return f} function htmlspecialchars_decode(d,e){var a={},f="",b="",c="";b=d.toString();if(false===(a=this.get_html_translation_table("HTML_SPECIALCHARS",e)))return false;for(f in a){c=a[f];b=b.split(c).join(f)}return b=b.split("&#039;").join("'")};

/* number_format (php.js) 906.1806 */
function number_format(a,b,e,f){a=a;b=b;var c=function(i,g){g=Math.pow(10,g);return(Math.round(i*g)/g).toString()};a=!isFinite(+a)?0:+a;b=!isFinite(+b)?0:Math.abs(b);f=typeof f==="undefined"?",":f;e=typeof e==="undefined"?".":e;var d=b>0?c(a,b):c(Math.round(a),b);c=c(Math.abs(a),b);var h;if(c>=1E3){c=c.split(/\D/);h=c[0].length%3||3;c[0]=d.slice(0,h+(a<0))+c[0].slice(h).replace(/(\d{3})/g,f+"$1");d=c.join(e)}else d=d.replace(".",e);a=d.indexOf(e);if(b>=1&&a!==-1&&d.length-a-1<b)d+=(new Array(b-(d.length- a-1))).join(0)+"0";else if(b>=1&&a===-1)d+=e+(new Array(b)).join(0)+"0";return d};

/* empty (php.js) 1006.1915 */
//El segundo parametro es para excluir ceros (0)
function empty(a,b){var c;if(a===""||!b&&(a===0||a==="0")||a===null||a===false||typeof a==="undefined")return true;if(typeof a=="object"){for(c in a)return false;return true}return false};

/* checkdate (php.js) 911.2217 */
function checkdate(a,c,b){return a>0&&a<13&&b>0&&b<32768&&c>0&&c<=(new Date(b,a,0)).getDate()};

/* Autocomplete 1.1 */
(function($){$.fn.extend({autocomplete:function(urlOrData,options){var isUrl=typeof urlOrData=="string";options=$.extend({},$.Autocompleter.defaults,{url:isUrl?urlOrData:null,data:isUrl?null:urlOrData,delay:isUrl?$.Autocompleter.defaults.delay:10,max:options&&!options.scroll?10:150},options);options.highlight=options.highlight||function(value){return value;};options.formatMatch=options.formatMatch||options.formatItem;return this.each(function(){new $.Autocompleter(this,options);});},result:function(handler){return this.bind("result",handler);},search:function(handler){return this.trigger("search",[handler]);},flushCache:function(){return this.trigger("flushCache");},setOptions:function(options){return this.trigger("setOptions",[options]);},unautocomplete:function(){return this.trigger("unautocomplete");}});$.Autocompleter=function(input,options){var KEY={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};var $input=$(input).attr("autocomplete","off").addClass(options.inputClass);var timeout;var previousValue="";var cache=$.Autocompleter.Cache(options);var hasFocus=0;var lastKeyPressCode;var config={mouseDownOnSelect:false};var select=$.Autocompleter.Select(options,input,selectCurrent,config);var blockSubmit;$.browser.opera&&$(input.form).bind("submit.autocomplete",function(){if(blockSubmit){blockSubmit=false;return false;}});$input.bind(($.browser.opera?"keypress":"keydown")+".autocomplete",function(event){hasFocus=1;lastKeyPressCode=event.keyCode;switch(event.keyCode){case KEY.UP:event.preventDefault();if(select.visible()){select.prev();}else{onChange(0,true);}break;case KEY.DOWN:event.preventDefault();if(select.visible()){select.next();}else{onChange(0,true);}break;case KEY.PAGEUP:event.preventDefault();if(select.visible()){select.pageUp();}else{onChange(0,true);}break;case KEY.PAGEDOWN:event.preventDefault();if(select.visible()){select.pageDown();}else{onChange(0,true);}break;case options.multiple&&$.trim(options.multipleSeparator)==","&&KEY.COMMA:case KEY.TAB:case KEY.RETURN:if(selectCurrent()){event.preventDefault();blockSubmit=true;return false;}break;case KEY.ESC:select.hide();break;default:clearTimeout(timeout);timeout=setTimeout(onChange,options.delay);break;}}).focus(function(){hasFocus++;}).blur(function(){hasFocus=0;if(!config.mouseDownOnSelect){hideResults();}}).click(function(){if(hasFocus++>1&&!select.visible()){onChange(0,true);}}).bind("search",function(){var fn=(arguments.length>1)?arguments[1]:null;function findValueCallback(q,data){var result;if(data&&data.length){for(var i=0;i<data.length;i++){if(data[i].result.toLowerCase()==q.toLowerCase()){result=data[i];break;}}}if(typeof fn=="function")fn(result);else $input.trigger("result",result&&[result.data,result.value]);}$.each(trimWords($input.val()),function(i,value){request(value,findValueCallback,findValueCallback);});}).bind("flushCache",function(){cache.flush();}).bind("setOptions",function(){$.extend(options,arguments[1]);if("data"in arguments[1])cache.populate();}).bind("unautocomplete",function(){select.unbind();$input.unbind();$(input.form).unbind(".autocomplete");});function selectCurrent(){var selected=select.selected();if(!selected)return false;var v=selected.result;previousValue=v;if(options.multiple){var words=trimWords($input.val());if(words.length>1){var seperator=options.multipleSeparator.length;var cursorAt=$(input).selection().start;var wordAt,progress=0;$.each(words,function(i,word){progress+=word.length;if(cursorAt<=progress){wordAt=i;return false;}progress+=seperator;});words[wordAt]=v;v=words.join(options.multipleSeparator);}v+=options.multipleSeparator;}$input.val(v);hideResultsNow();$input.trigger("result",[selected.data,selected.value]);return true;}function onChange(crap,skipPrevCheck){if(lastKeyPressCode==KEY.DEL){select.hide();return;}var currentValue=$input.val();if(!skipPrevCheck&&currentValue==previousValue)return;previousValue=currentValue;currentValue=lastWord(currentValue);if(currentValue.length>=options.minChars){$input.addClass(options.loadingClass);if(!options.matchCase)currentValue=currentValue.toLowerCase();request(currentValue,receiveData,hideResultsNow);}else{stopLoading();select.hide();}};function trimWords(value){if(!value)return[""];if(!options.multiple)return[$.trim(value)];return $.map(value.split(options.multipleSeparator),function(word){return $.trim(value).length?$.trim(word):null;});}function lastWord(value){if(!options.multiple)return value;var words=trimWords(value);if(words.length==1)return words[0];var cursorAt=$(input).selection().start;if(cursorAt==value.length){words=trimWords(value)}else{words=trimWords(value.replace(value.substring(cursorAt),""));}return words[words.length-1];}function autoFill(q,sValue){if(options.autoFill&&(lastWord($input.val()).toLowerCase()==q.toLowerCase())&&lastKeyPressCode!=KEY.BACKSPACE){$input.val($input.val()+sValue.substring(lastWord(previousValue).length));$(input).selection(previousValue.length,previousValue.length+sValue.length);}};function hideResults(){clearTimeout(timeout);timeout=setTimeout(hideResultsNow,200);};function hideResultsNow(){var wasVisible=select.visible();select.hide();clearTimeout(timeout);stopLoading();if(options.mustMatch){$input.search(function(result){if(!result){if(options.multiple){var words=trimWords($input.val()).slice(0,-1);$input.val(words.join(options.multipleSeparator)+(words.length?options.multipleSeparator:""));}else{$input.val("");$input.trigger("result",null);}}});}};function receiveData(q,data){if(data&&data.length&&hasFocus){stopLoading();select.display(data,q);autoFill(q,data[0].value);select.show();}else{hideResultsNow();}};function request(term,success,failure){if(!options.matchCase)term=term.toLowerCase();var data=cache.load(term);if(data&&data.length){success(term,data);}else if((typeof options.url=="string")&&(options.url.length>0)){var extraParams={timestamp:+new Date()};$.each(options.extraParams,function(key,param){extraParams[key]=typeof param=="function"?param():param;});$.ajax({mode:"abort",port:"autocomplete"+input.name,dataType:options.dataType,url:options.url,data:$.extend({q:lastWord(term),limit:options.max},extraParams),success:function(data){var parsed=options.parse&&options.parse(data)||parse(data);cache.add(term,parsed);success(term,parsed);}});}else{select.emptyList();failure(term);}};function parse(data){var parsed=[];var rows=data.split("\n");for(var i=0;i<rows.length;i++){var row=$.trim(rows[i]);if(row){row=row.split("|");parsed[parsed.length]={data:row,value:row[0],result:options.formatResult&&options.formatResult(row,row[0])||row[0]};}}return parsed;};function stopLoading(){$input.removeClass(options.loadingClass);};};$.Autocompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,delay:400,matchCase:false,matchSubset:true,matchContains:false,cacheLength:10,max:100,mustMatch:false,extraParams:{},selectFirst:true,formatItem:function(row){return row[0];},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",highlight:function(value,term){return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>");},scroll:true,scrollHeight:180};$.Autocompleter.Cache=function(options){var data={};var length=0;function matchSubset(s,sub){if(!options.matchCase)s=s.toLowerCase();var i=s.indexOf(sub);if(options.matchContains=="word"){i=s.toLowerCase().search("\\b"+sub.toLowerCase());}if(i==-1)return false;return i==0||options.matchContains;};function add(q,value){if(length>options.cacheLength){flush();}if(!data[q]){length++;}data[q]=value;}function populate(){if(!options.data)return false;var stMatchSets={},nullData=0;if(!options.url)options.cacheLength=1;stMatchSets[""]=[];for(var i=0,ol=options.data.length;i<ol;i++){var rawValue=options.data[i];rawValue=(typeof rawValue=="string")?[rawValue]:rawValue;var value=options.formatMatch(rawValue,i+1,options.data.length);if(value===false)continue;var firstChar=value.charAt(0).toLowerCase();if(!stMatchSets[firstChar])stMatchSets[firstChar]=[];var row={value:value,data:rawValue,result:options.formatResult&&options.formatResult(rawValue)||value};stMatchSets[firstChar].push(row);if(nullData++<options.max){stMatchSets[""].push(row);}};$.each(stMatchSets,function(i,value){options.cacheLength++;add(i,value);});}setTimeout(populate,25);function flush(){data={};length=0;}return{flush:flush,add:add,populate:populate,load:function(q){if(!options.cacheLength||!length)return null;if(!options.url&&options.matchContains){var csub=[];for(var k in data){if(k.length>0){var c=data[k];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub.push(x);}});}}return csub;}else if(data[q]){return data[q];}else if(options.matchSubset){for(var i=q.length-1;i>=options.minChars;i--){var c=data[q.substr(0,i)];if(c){var csub=[];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub[csub.length]=x;}});return csub;}}}return null;}};};$.Autocompleter.Select=function(options,input,select,config){var CLASSES={ACTIVE:"ac_over"};var listItems,active=-1,data,term="",needsInit=true,element,list;function init(){if(!needsInit)return;element=$("<div/>").hide().addClass(options.resultsClass).css("position","absolute").appendTo(document.body);list=$("<ul/>").appendTo(element).mouseover(function(event){if(target(event).nodeName&&target(event).nodeName.toUpperCase()=='LI'){active=$("li",list).removeClass(CLASSES.ACTIVE).index(target(event));$(target(event)).addClass(CLASSES.ACTIVE);}}).click(function(event){$(target(event)).addClass(CLASSES.ACTIVE);select();input.focus();return false;}).mousedown(function(){config.mouseDownOnSelect=true;}).mouseup(function(){config.mouseDownOnSelect=false;});if(options.width>0)element.css("width",options.width);needsInit=false;}function target(event){var element=event.target;while(element&&element.tagName!="LI")element=element.parentNode;if(!element)return[];return element;}function moveSelect(step){listItems.slice(active,active+1).removeClass(CLASSES.ACTIVE);movePosition(step);var activeItem=listItems.slice(active,active+1).addClass(CLASSES.ACTIVE);if(options.scroll){var offset=0;listItems.slice(0,active).each(function(){offset+=this.offsetHeight;});if((offset+activeItem[0].offsetHeight-list.scrollTop())>list[0].clientHeight){list.scrollTop(offset+activeItem[0].offsetHeight-list.innerHeight());}else if(offset<list.scrollTop()){list.scrollTop(offset);}}};function movePosition(step){active+=step;if(active<0){active=listItems.size()-1;}else if(active>=listItems.size()){active=0;}}function limitNumberOfItems(available){return options.max&&options.max<available?options.max:available;}function fillList(){list.empty();var max=limitNumberOfItems(data.length);for(var i=0;i<max;i++){if(!data[i])continue;var formatted=options.formatItem(data[i].data,i+1,max,data[i].value,term);if(formatted===false)continue;var li=$("<li/>").html(options.highlight(formatted,term)).addClass(i%2==0?"ac_even":"ac_odd").appendTo(list)[0];$.data(li,"ac_data",data[i]);}listItems=list.find("li");if(options.selectFirst){listItems.slice(0,1).addClass(CLASSES.ACTIVE);active=0;}if($.fn.bgiframe)list.bgiframe();}return{display:function(d,q){init();data=d;term=q;fillList();},next:function(){moveSelect(1);},prev:function(){moveSelect(-1);},pageUp:function(){if(active!=0&&active-8<0){moveSelect(-active);}else{moveSelect(-8);}},pageDown:function(){if(active!=listItems.size()-1&&active+8>listItems.size()){moveSelect(listItems.size()-1-active);}else{moveSelect(8);}},hide:function(){element&&element.hide();listItems&&listItems.removeClass(CLASSES.ACTIVE);active=-1;},visible:function(){return element&&element.is(":visible");},current:function(){return this.visible()&&(listItems.filter("."+CLASSES.ACTIVE)[0]||options.selectFirst&&listItems[0]);},show:function(){var offset=$(input).offset();element.css({width:typeof options.width=="string"||options.width>0?options.width:$(input).width(),top:offset.top+input.offsetHeight,left:offset.left}).show();if(options.scroll){list.scrollTop(0);list.css({maxHeight:options.scrollHeight,overflow:'auto'});if($.browser.msie&&typeof document.body.style.maxHeight==="undefined"){var listHeight=0;listItems.each(function(){listHeight+=this.offsetHeight;});var scrollbarsVisible=listHeight>options.scrollHeight;list.css('height',scrollbarsVisible?options.scrollHeight:listHeight);if(!scrollbarsVisible){listItems.width(list.width()-parseInt(listItems.css("padding-left"))-parseInt(listItems.css("padding-right")));}}}},selected:function(){var selected=listItems&&listItems.filter("."+CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);return selected&&selected.length&&$.data(selected[0],"ac_data");},emptyList:function(){list&&list.empty();},unbind:function(){element&&element.remove();}};};$.fn.selection=function(start,end){if(start!==undefined){return this.each(function(){if(this.createTextRange){var selRange=this.createTextRange();if(end===undefined||start==end){selRange.move("character",start);selRange.select();}else{selRange.collapse(true);selRange.moveStart("character",start);selRange.moveEnd("character",end);selRange.select();}}else if(this.setSelectionRange){this.setSelectionRange(start,end);}else if(this.selectionStart){this.selectionStart=start;this.selectionEnd=end;}});}var field=this[0];if(field.createTextRange){var range=document.selection.createRange(),orig=field.value,teststring="<->",textLength=range.text.length;range.text=teststring;var caretAt=field.value.indexOf(teststring);field.value=orig;this.selection(caretAt,caretAt+textLength);return{start:caretAt,end:caretAt+textLength}}else if(field.selectionStart!==undefined){return{start:field.selectionStart,end:field.selectionEnd}}};})(jQuery);

/* strpos (php.js) 909.322 */
function strpos(a,c,b){a=(a+"").indexOf(c,b?b:0);return a===-1?false:a};

document.onkeydown = function(e){
	key = (e==null)?event.keyCode:e.which;
	if(key == 27) //escape, close mydialog
		mydialog.close();
};

(function(a){a.fn.lazyload=function(c){var b={placeHolder:'blank.gif',effect:'show',effectSpeed:0,sensitivity:0};if(c)a.extend(b,c);this.each(function(){if(a(this).attr('src')!=b.placeHolder)a(this).attr('src',b.placeHolder);a(this).one('dl',function(){if(a(this).attr('orig')&&a(this).attr('orig')!=a(this).attr('src'))a(this).hide().attr('src',a(this).attr('orig'))[b.effect](b.effectSpeed)})});var d=this;a(window).bind('scroll',function(){a(d).filter('[src$="'+b.placeHolder+'"]').each(function(){if((a(window).height()+a(window).scrollTop()>a(this).offset().top-b.sensitivity)&&(a(window).width()+a(window).scrollLeft()>a(this).offset().left-b.sensitivity)&&(a(window).scrollTop()<a(this).offset().top+a(this).height()+b.sensitivity)&&(a(window).scrollLeft()<a(this).offset().left+a(this).width()+b.sensitivity))a(this).trigger('dl')})});a(window).trigger('scroll');return this}})(jQuery);

function TopsTabs(parent, tab) {
		if($('.box_cuerpo ol.filterBy#filterBy'+tab).css('display') == 'block') return;
		$('#'+parent+' > .box_cuerpo div.filterBy a').removeClass('here');
		$('.box_cuerpo div.filterBy a#'+tab).addClass('here');
		$('#'+parent+' > .box_cuerpo ol').fadeOut();
		$('#'+parent+' > .box_cuerpo ol#filterBy'+tab).fadeIn();
}

var trend_load = false;
$(document).ready(function(){
	$('.numbersvotes .overview').live('click', function(){ $(this).hide(); $(this).next().show(); });
	$('.numbersvotes .stats').live('click', function(){ $(this).hide(); $(this).prev().show(); });
    var location_box_more = false;
    $('.location-box-more').click(function(){
        if (location_box_more) {
            $('.location-box ul').css('height', '170px');
            $(this).html("Ver más");
            location_box_more = false;
        }
        else {
            $('.location-box ul').css('height', '170%');
            $(this).html("Ver menos");
            location_box_more = true;
        }
    });
	$('body').click(function(e){ if ($('div.notificaciones-list').css('display') != 'none' && $(e.target).closest('div.notificaciones-list').length == 0 && $(e.target).closest('a[name=Monitor]').length == 0) notifica.last(); });
	print_editor();
	$('.autogrow').css('max-height', '500px').autogrow();
	$('.autogrow-big').css('max-height', '800px').autogrow();
	$('.userInfoLogin a[class!=ver-mas], .comOfi, .post-compartir img, div.action > div.btn_follow > a[title], .dot-online-offline').tipsy({gravity: 's'});
	$('.w-medallas span.icon-medallas').tipsy({ gravity: 's' });
	$('.tipsy-s[title!=""]').tipsy({ gravity: 's' });
	$('.hovercard').tooltip({
		offset: [ -130, 0 ],
		content: hovercardCallback
	});
	$('.hovercard-avatar').tooltip({
		offset: [ -145, 5 ],
		content: hovercardCallback
	});
	for(var i = 1; i <= 15; ++i) $('.markItUpButton'+i+' > a:first-child').tipsy({gravity: 's'});
	$('img.lazy').lazyload({ placeHolder: global_data.img+'images/space.gif', sensitivity: 300 });
	$('div.avatar-box').live('mouseenter', function(){ $(this).children('ul').show(); }).live('mouseleave', function(){ $(this).children('ul').hide() });
	var zIndexNumber = 99;
	$('div.avatar-box').each(function(){
		$(this).css('zIndex', zIndexNumber);
		zIndexNumber -= 1;
	});
	$('div.new-search > div.bar-options > ul > li > a').bind('click', function(){
		var at = $(this).parent('li').attr('class').split('-')[0], site = /poringa/.test(document.domain) ? 'poringa' : 'taringa';
		$('div.new-search > div.bar-options > ul > li.selected').removeClass('selected');
		$(this).parent('li').addClass('selected');
		$('div.new-search').attr('class', 'new-search '+at);
		$('form[name=search]').attr('action', 'http://buscar.'+site+'.net/'+at);
		if (at !== 'posts') {
			$('#search-home-cat-filter').hide();
		} else {
			$('#search-home-cat-filter').show();
		}
	});
	$('div.new-search > div.search-body > form > input[name=q]').bind('focus', function(){
		if ($(this).val() == 'Buscar') { $(this).val(''); }
		$(this).css('color', '#000');
	}).bind('blur', function(){
		if ($.trim($(this).val()) == '') { $(this).val('Buscar'); }
		$(this).css('color', '#999');
	});
	$('#trendsBox div.paises span:first').live(
		'click',
		function() {
			$(this).parent().children('ul').show();
		}
	);
	$('#trendsBox div.paises ul li').live(
		'click',
		function() {
			if (!trend_load) {
				var obj = this, trend_load = true;
				$('#trendsBox .box_cuerpo, #trendsBox .box_cuerpo ol').hide();
				$.ajax({
					type: 'get',
					url: '/posts_destacados.php',
					data: 'pais=' + $(this).attr('rel'),
					success: function (r) {
						if (r) {
							$('#trendsBox').html(r);
							$('#trendsBox .box_cuerpo, #trendsBox .box_cuerpo ol').hide();
							$(obj).parent('ul').children('li').removeClass('selected');
							$(obj).addClass('selected');
							$(obj).parent('ul').parent('div').children('span:first').html($(obj).html());
							$(obj).parent('ul').hide();
							$('#trendsBox .box_cuerpo, #trendsBox .box_cuerpo ol.filterBy.cleanlist:first').slideDown({duration: 1000, easing: 'easeOutBounce'});
							var site = /poringa/.test(document.domain) ? 'poringa' : 'taringa';
							document.cookie = 'trends=' + $(obj).attr('rel') + ';expires=Thu, 26 Jul 2012 16:12:48 GMT;path=/;domain=.' + site + '.net';
						}
					},
					complete: function () {
						trend_load = false;
					}
				});
			}
		}
	);
});

function hovercardCallback(obj) {
	var userData = $(obj).attr('data-hovercard').split(';'), r;
		if(global_data.user_key){
			var action = 'onclick="notifica.follow(\'user\', ' + userData[0] + ', notifica.userInPostHandle, $(this).children(\'span\'))"';
		} else {
			var action = 'href="/registro"';
		}
	r = '<div class="tooltip-c"><img class="avatartool" src="' + userData[6] + '" /><div class="user-t-info clearfix"><a href="/perfil/' + userData[1] + '"><strong>' + userData[1] + '</strong></a>' + userData[2] + '<br /><img style="float:left;padding-top:3px" width="16" hspace="3" height="11" align="absmiddle" alt="' + userData[3] + '" src="' + global_data.img + 'images/flags/' + userData[4] + '.png" title="' + userData[3] + '" class="country-name" /><a href="/mensajes/a/'+ userData[1] +'" title="Enviar mensaje a ' + userData[1] + '"><div style="float:left;padding-top:3px;width:16px;height:11px;background:url(' + global_data.img + 'images/big2v1.png?1.0) 0 -221px;"></div></div>';
	if (parseInt(userData[5]) == 1) {
		r += '</a><span class="alreadys">Ya sigues a este Usuario</span>';
	} else if (userData[1] == $('.username').text() ){
		r += '</a><span class="alreadys">Este eres tú</span>';
	} else if (parseInt(userData[5]) == 2) {
		r += '<a href="/registro" class="btn_g follow_user_post"><span class="icons follow">Seguir Usuario</span></a>';
	} else {
		r += '<a '+action+' class="btn_g follow_user_post"><span class="icons follow">Seguir Usuario</span></a>';
	}
	r += '</div><div class="arrow-t"></div>';
	return r;
}

function search_set(obj, x) { $('div.search-in > a').removeClass('search_active'); $(obj).addClass('search_active'); $('form[name=top_search_box]').attr('action', 'http://buscar.taringa.net/'+x); $('#ibuscadorq').focus(); }

// hoverIntent by Brian Cherne
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

var notifica = {

	cache: {},
	retry: Array(),
	userMenuPopup: function (obj) {
		var id = $(obj).attr('userid');
		var cache_id = 'following_'+id, list = $(obj).children('ul');
		$(list).children('li.check').hide();
		if (this.cache[cache_id] == 1) {
			$(list).children('li.follow').hide();
			$(list).children('li.unfollow').show();
		}
		else {
			$(list).children('li.unfollow').hide();
			$(list).children('li.follow').show();
		}
	},
	userMenuHandle: function (r) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) {
			var cache_id = 'following_'+x[1];
			notifica.cache[cache_id] = parseInt(x[0]);
			$('div.avatar-box').children('ul').hide();
		}
		else if (x.length == 4) mydialog.alert('Notificaciones', x[4]);
	},
	userInPostHandle: function (r) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) {
			$('a.follow_user_post, a.unfollow_user_post').toggle();
			$('div.metadata-usuario > span.nData.user_follow_count').html(number_format(parseInt(x[2])));
			notifica.userMenuHandle(r);
		}
		else if (x.length == 4) mydialog.alert('Notificaciones', x[3]);
	},
	userInMonitorHandle: function (r, obj) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) $(obj).fadeOut(function(){ $(obj).remove(); });
		else if (x.length == 4) mydialog.alert('Notificaciones', x[3]);	
	},
	inPostHandle: function (r) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) {
			$('a.follow_post, a.unfollow_post').parent('li').toggle();
			$('ul.post-estadisticas > li > span.icons.monitor').html(number_format(parseInt(x[2])));
		}
		else if (x.length == 4) mydialog.alert('Notificaciones', x[3]);
	},
	inComunidadHandle: function (r) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) {
			$('a.follow_comunidad, a.unfollow_comunidad').toggle();
			$('li.comunidad_seguidores').html(number_format(parseInt(x[2]))+' Seguidores');
		}
		else if (x.length == 4) mydialog.alert('Notificaciones', x[3]);
	},
	temaInComunidadHandle: function (r) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) {
			$('div.followBox > a.follow_tema, a.unfollow_tema').toggle();
			$('span.tema_notifica_count').html(number_format(parseInt(x[2]))+' Seguidores');
		}
		else if (x.length == 4) mydialog.alert('Notificaciones', x[3]);
	},
	ruserInAdminHandle: function (r) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) $('.ruser'+x[1]).toggle();
		else if (x.length == 4) mydialog.alert('Notificaciones', x[3]);	
	},
	listInAdminHandle: function (r) {
		var x = r.split('-');
		if (x.length == 3 && x[0] == 0) {
			$('.list'+x[1]).toggle();
			$('.list'+x[1]+':first').parent('div').parent('li').children('div:first').fadeTo(0, $('.list'+x[1]+':first').css('display') == 'none' ? 0.5 : 1);
		}
		else if (x.length == 4) mydialog.alert('Notificaciones', x[3]);	
	},
	spamPostHandle: function (r) {
		var x = r.split('-');
		if (x.length == 2) mydialog.alert('Notificaciones', x[1]);
		else mydialog.close();
	},
	spamTemaHandle: function (r) {
		var x = r.split('-');
		if (x.length == 2) mydialog.alert('Notificaciones', x[1]);
		else mydialog.close();
	},
	ajax: function (param, cb, obj) {
		if ($(obj).hasClass('spinner')) return;
		notifica.retry.push(param);
		notifica.retry.push(cb);
		var error = param[0]!='action=count';
		$(obj).addClass('spinner');
		$.ajax({
			url: '/notificaciones-ajax.php', type: 'post', data: param.join('&')+gget('key'),
			success: function (r) {
				$(obj).removeClass('spinner');
				cb(r, obj);
			},
			error: function () {
				if (error) mydialog.error_500('notifica.ajax(notifica.retry[0], notifica.retry[1])');
			}
		});
	},
	follow: function (type, id, cb, obj) {
		this.ajax(Array('action=follow', 'type='+type, 'obj='+id), cb, obj);
	},
	unfollow: function (type, id, cb, obj) {
		this.ajax(Array('action=unfollow', 'type='+type, 'obj='+id), cb, obj);
	},
	spam: function (id, cb) {
		this.ajax(Array('action=spam', 'postid='+id), cb);
	},
	c_spam: function (id, cb) {
		this.ajax(Array('action=c_spam', 'temaid='+id), cb);
	},
	sharePost: function (id) {
		mydialog.show();
		mydialog.title('Recomendar');
		mydialog.body('¿Quieres recomendar este post a tus seguidores?');
		mydialog.buttons(true, true, 'Recomendar', 'notifica.spam('+id+', notifica.spamPostHandle)', true, true, true, 'Cancelar', 'close', true, false);
		mydialog.center();
	},
	shareTema: function (id) {
		mydialog.show();
		mydialog.title('Recomendar');
		mydialog.body('¿Quieres recomendar este tema a tus seguidores?');
		mydialog.buttons(true, true, 'Recomendar', 'notifica.c_spam('+id+', notifica.spamTemaHandle)', true, true, true, 'Cancelar', 'close', true, false);
		mydialog.center();
	},
	last: function () {
		var c = parseInt($('div.alertas > a > span').html());
		if ($('div.notificaciones-list').css('display') != 'none') {
			$('div.notificaciones-list').hide();
			$('a[name=Monitor]').parent('li').removeClass('monitor-notificaciones');
		}
		else {
			if (($('div.notificaciones-list').css('display') == 'none' && c > 0) || typeof notifica.cache.last == 'undefined') {
				$('a[name=Monitor]').children('span').addClass('spinner');
				$('a[name=Monitor]').parent('li').addClass('monitor-notificaciones');
				$('div.notificaciones-list').show();
				notifica.ajax(Array('action=last'), function (r) {
					notifica.cache['last'] = r;
					notifica.show();
				});
			}
			else notifica.show();
		}
	},
	check: function () {
		notifica.ajax(Array('action=count'), notifica.popup);
	},
	popup: function (r) {
		var c = parseInt($('div.alertas > a > span').html());
		if (r != c && r > 0) {
			if (!$('div.alertas').length) $('div.userInfoLogin > ul > li.monitor').append('<div class="alertas"><a><span></span></a></div>');
			$('div.alertas > a > span').html(r);
			$('div.alertas').animate({ top: '-=5px' }, 100, null, function(){ $('div.alertas').animate({ top: '+=5px' }, 100) });
		}
		else if (r == 0) $('div.alertas').remove();
	},
	show: function () {
		if (typeof notifica.cache.last != 'undefined') {
			$('div.alertas').remove();
			$('a[name=Monitor]').parent('li').addClass('monitor-notificaciones');
			$('a[name=Monitor]').children('span').removeClass('spinner');
			$('div.notificaciones-list').show().children('ul').html(notifica.cache.last);
			$('div.notificaciones-list > ul > li > a[title]').tipsy({ gravity: 's' });
		}
	},
	filter: function (x, obj) {
		var cls;
		switch (x) {
			case 'fav':
				cls = '.post-favorite';
				break;
			case 'comment-own':
				cls = '.post-comment-own';
				break;
			case 'points':
				cls = '.post-points';
				break;
			case 'new':
				cls = '.friend-new';
				break;
			case 'post':
				cls = '.friend-post';
				break;
			case 'thread':
				cls = '.friend-thread';
				break;
			case 'comment':
				cls = '.post-comment';
				break;
			case 'threadc':
				cls = '.com-thread';
				break;
			case 'reply':
				cls = '.com-reply';
				break;
			case 'spam':
				cls = '.post-spam';
				break;
			case 'medal':
				cls = '.medal';
		}
		if (cls) {
			$(cls).toggle();
			var site = /poringa/.test(document.domain) ? 'poringa' : 'taringa';
			var v = $(obj).attr('checked') ? 1 : 0;
			document.cookie = 'monitor['+x+']='+v+';expires=Thu, 26 Jul 2012 16:12:48 GMT;path=/;domain=.'+site+'.net';
		}
	}
	
}

var timelib = {
	current: false,
	iupd: 15,
	timetowords: function (x) {
		if (!this.current) return r;
		var r = false;
		var t = {
			s: {
				year: 'M&aacute;s de 1 a&ntilde;o',
				month: 'M&aacute;s de 1 mes',
				day: 'Ayer',
				hour: 'Hace 1 hora',
				minute: 'Hace 1 minuto',
				second: 'Menos de 1 minuto'
			},
			p: {
				year: 'M&aacute;s de $1 a&ntilde;os',
				month: 'M&aacute;s de $1 meses',
				day: 'Hace $1 d&iacute;as',
				hour: 'Hace $1 horas',
				minute: 'Hace $1 minutos',
				second: 'Menos de 1 minuto'
			}
		};
		var n = this.current - x;
		var d = { year: 31536000, month: 2678400, day: 86400, hour: 3600, minute: 60, second: 1 };
		for (k in d) {
			if (n >= d[k]) {
				var c = Math.floor(n / d[k]);
				if (c == 1) r = t.s[k];
				else if (c > 1) r = t.p[k].replace('$1', c);
				else r = 'Hace mucho tiempo';
				break;
			}
		}
		return r ? r : 'Hace instantes';	
	},
	upd: function () {
		setTimeout(function(){
			if (timelib.current) {
				timelib.current = timelib.current + timelib.iupd;
				$('span[ts]').each(function(){ $(this).html(timelib.timetowords($(this).attr('ts'))); });
			}
			timelib.upd()
		}, this.iupd * 1000);
	}
}

function brand_day(enable) {
	var site = /poringa/.test(document.domain) ? 'poringa' : 'taringa';
	document.cookie = 'brandday='+(enable ? 'on' : 'off')+';expires=Tue, 25 May 2010 00:00:00 GMT-3;path=/;domain=.'+site+'.net';
	window.location.reload();
}

function fb_init() {
	if (FB._apiKey == null) {
		FB.init({ appId: '143125965710465', cookie: true });
	}
}

var fb_access_token = false;
function facebook_ready() {
	// FB.init({ appId: '143125965710465', cookie: true });
	FB.signin = function(act) {
		fb_init()
		FB.Event.subscribe('auth.login', function(){
			FB.callback(act);
		});
		FB.login(function(r) {
			if (typeof r.session.access_token != 'undefined') {
				fb_access_token = r.session.access_token;
			}
			if (!r.session && r.status == 'connected') {
				FB.getLoginStatus();
			} else if (r.session) {
				FB.callback(act);
			}
		}, { perms: 'email,user_birthday,user_location,publish_stream,offline_access' });
	}
	FB.unlink = function() {
		fb_init()
		$.ajax({ type: 'post', url: '/social-ajax.php', data: 'cmd=Facebook::Account::unlink', dataType: 'json', success: FB.link_cb });
	}
	FB.callback = function(act) {
		fb_init()
		switch (act) {
			case 'register':
				if (fb_access_token) {
					$.getScript('https://graph.facebook.com/me?access_token='+fb_access_token+'&callback=FB.register_cb');
				}
				break;
			case 'link':
				$.ajax({ type: 'post', url: '/social-ajax.php', data: 'cmd=Facebook::Account::link', dataType: 'json', success: FB.link_cb });
				break;
			case 'link_nocb':
				$.ajax({ type: 'post', url: '/social-ajax.php', data: 'cmd=Facebook::Account::link', dataType: 'json' });
				$('input[name=facebook]').attr('onclick', '');
				break;
			default:
				login_ajax('home', 'facebook');
		}
	}
	FB.link_cb = function(r) {
		fb_init()
		if (typeof r.error != 'undefined' && r.error != '') {
			alert(r.error);
		} else {
			window.location.reload();
		}
	}
	FB.register_cb = function(r) {
		fb_init()
		$('#mydialog.registro').addClass('unsocial');
		$('div.social-connect').remove();
		if (typeof r.link != 'undefined') {
			var username = r.link.split('/')[3];
			if (isNaN(username) && username.substr(0, 11) != 'profile.php') {
				$('#nick').val(username)
				$('#nick').trigger('blur');
				$('#password').focus();
			} else {
				$('#nick').focus();
			}
		}
		if (typeof r.first_name != 'undefined') {
			$('#name').val(r.first_name).trigger('blur');
		}
		if (typeof r.last_name != 'undefined') {
			$('#lastname').val(r.last_name).trigger('blur');
		}
		if (typeof r.birthday != 'undefined') {
			var birthday = r.birthday.split('/');
			$('#dia').val(birthday[1]);
			$('#mes').val(parseInt(birthday[0]) === 0 ? birthday[0].substr(1) : birthday[0]);
			$('#anio').val(birthday[2]);
			$('#anio').trigger('blur');
		}
		if (typeof r.email != 'undefined') {
			$('#email').val(r.email);
			$('#email').trigger('blur');
		}
		if (typeof r.gender != 'undefined') {
			$('#sexo_'+(r.gender == 'male' ? 'm' : 'f')).attr('checked', 'checked');
			$('#sexo_'+(r.gender == 'male' ? 'm' : 'f')).trigger('blur');
		}
	}
}

/* Manejo de Cookies */
function createCookie(name, value, days){
/* Crea una cookie
	name[string] = Nombre de la cookie a guardar
	value[mixed] = Valor que se quiere guardar
	days[integer] = Cantidad de dias de expiracion
	return[void]
*/
	if(days){
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = '; expires=' + date.toGMTString();
	}
	else
		var expires = '';

	var domain = document.domain.split('.');
	domain = domain.slice(domain.length - 2).join('.');

	document.cookie = name + '=' + value + expires + '; path=/; domain=.' + domain;
}

function readCookie(name){
/* Devuelve informacion de una cookie
	name[string] = Nombre de la cookie a leer
	return[mixed] = null -> La cookie no existe
									mixed -> Valor de la cookie
*/
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0, s=ca.length; i<s; ++i){
		var c = ca[i];
		while(c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if(c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name){
/* Elimina una cookie
	name[string] = Nombre de la cookie a eliminar
	return[void]
*/
	createCookie(name, "", -1);
}
/* FIN - Manejo de Cookies */

/*
 * #ultimaActividad
 * Gonza
 */
function borrar_act(actid, perfilid, el){
    mydialog.close();
    $.ajax({
        type: 'POST',
        url: '/ajax/ultima_actividad-borrar.php',
        data: 'actid=' + actid + '&perfilid=' + perfilid + gget('key'),
        success: function(h){
            switch(h.charAt(0)){
                case '0': //Error
                    mydialog.alert('Error', h.substring(3));
                    break;
                case '1':
					$(el).parent().parent().fadeOut('normal', function(){
						if( $(this).siblings('div').length == 0) {
							var datesep = $(this).parent();
							$(this).remove();

							$(datesep).delay(700).fadeOut('slow', function(){
								$(this).remove;
							});
						}else{
							$(this).remove();
						}
					});
                    break;
            }
        },
        error: function(){
            mydialog.error_500("borrar_act('"+actid+"')");
        }
    });
}

/*
 * #ultimaActividad
 */
function filtrar_ultima_actividad(filtercode, perfilid ){
	mydialog.close();
	$.ajax({
        type: 'POST',
        url: '/ajax/ultima_actividad-filtrar.php',
        data: 'filter=' + filtercode + '&perfilid=' + perfilid,
        success: function(h){
            switch(h.charAt(0)){
                case '0': //Error
                    mydialog.alert('Error', h.substring(3));
                    break;
                case '1':
					var filteredAct = h.substring(3, h.length);
					$('#last-activity-container').html(filteredAct);
                    break;
            }
        },
        error: function(){
            mydialog.error_500("filtrar_ultima_actividad('"+filtercode+"')");
        }
    });
}

/*
 * #ultimaActividad
 */
function more_ultima_actividad(lastkey, perfilid, mtimes){
	$('#last-activity-view-more').remove();

	var lastulid = $('#last-activity-container .date-sep:last').attr('id');
	mydialog.close();
	var filterval = $('#last-activity-filter').val();
	$.ajax({
        type: 'POST',
        url: '/ajax/ultima_actividad-more.php',
        data: 'lastkey=' + lastkey + '&perfilid=' + perfilid + '&filter=' + filterval + '&lastul=' + lastulid + '&mtimes=' + mtimes,
        success: function(h){
            switch(h.charAt(0)){
                case '0': //Error
                    mydialog.alert('Error', h.substring(3));
                    break;
                case '1':
					var moreAct = h.substring(3, h.length);
					//var newObject = jQuery.extend(true, {}, $(moreAct));
					var htmlToPrevdiv = [];
					var nmoreAct = [];
					var iteratora = 0;
					//var iteratorb = 0;
					var length = $(moreAct).size();;

					for( var a=0; a<length; a++){
						if($(moreAct).eq(a).attr('class') == 'sep'){
							//htmlToPrevdiv[iteratora++] = '<div class="sep">';
							// hack to get the complete div response
							htmlToPrevdiv[iteratora] = $('<div>').append($(moreAct).eq(a).clone()).remove().html();
							//htmlToPrevdiv[iteratora++] = '</div>';
							//$(moreAct).eq(a).remove();
						}else{
							nmoreAct[iteratora] = $('<div>').append($(moreAct).eq(a).clone()).remove().html();
						}
						iteratora++;
					}
					$('#'+lastulid).append(htmlToPrevdiv.join(''));
					$('#last-activity-container').append(nmoreAct.join(''));
                    break;
            }
        },
        error: function(){
            mydialog.error_500("filtrar_ultima_actividad('"+filtercode+"')");
        }
    });
}

function ajax(object, action, data, callback) {
	callback = $.extend({
		success: function () {},
		error: function () {},
		complete: function () {}
	}, callback || {});
	data.key = global_data.user_key;
	$.ajax({
		type: 'post',
		url: '/ajax/' + object + '-' + action + '.php',
		data: data,
		dataType: 'json',
		success: function (r) {
			r.status = parseInt(r.status);
			if (r.status == 1) {
				callback.success(r);
			} else {
				callback.error(r);
			}
		},
		error: callback.error,
		complete: callback.complete
	});
}

var comment = {
	vote: function (obj, comid, postid, userid, score, sig) {
		return ajax('comment', 'vote', { id: comid, postid: postid, userid: userid, score: score, sig: sig }, {
			success: function (r) {
				var container = $('#div_cmnt_' + comid + ' li.numbersvotes');
				var c_total = $(container).children('.overview').children('span'), c_positive = $(container).children('.stats').children('span.positivo'), c_negative = $(container).children('.stats').children('span.negativo');
				var total = parseInt($(c_total).html()), positive = parseInt($(c_positive).html()), negative = Math.abs(parseInt($(c_negative).html()));
				total += score; if (score > 0) { positive += 1; } else if (score < 0) { negative += 1; }
				$(c_positive).html('+' + String(positive)); $(c_negative).html('-' + String(negative));
				if (total == 0) {
					$(container).hide();
					$(c_total).html('+0');
				} else {
					$(container).show();
					if (total > 0) {
						$(c_total).html('+' + total).removeClass('negativo').addClass('positivo');
					} else if (total < 0) {
						$(c_total).html(total).removeClass('positivo').addClass('negativo');
					}
				}
			},
			error: function (r) {
				mydialog.alert('Ops!', r.data);
			}
		});
	},
	page: function (page) {
		$('#comentarios-loading').show();
		$.scrollTo('#comentarios-container', 250);
		$('div#comentarios').css('opacity', 0.4)
		return $.ajax({
			type: 'post',
			url: '/ajax/comment-page.php',
			data: {
				id: global_data.postid,
				p: page
			},
			success: function (r) {
				var status = parseInt(r.charAt(0)), data = r.substr(3);
				if (status == 1) {
					$('#comentarios-container').html(data);
					location.hash = 'pagina-' + page;
				} else {
					mydialog.alert('Ops!', data);
				}
			},
			error: function () {
				this.success('0: Ocurrio un error al procesar lo solicitado');
			},
			complete: function () {
				$('#comentarios-loading').hide();
				$('div#comentarios').css('opacity', 1);
			}
		});
	}
}


