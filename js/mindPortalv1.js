// Mind Portal Java Script v1 
"use strick";

// Content Enter | Exit: Motion Functions
function contentExitMotion ( type ) { 
	if ( type === 'main' ){
		return 'aniUp';
	}
	else {
		return 'aniLeft';
	}	
}
	
function contentEnterMotion ( type ) { 
	if ( type === 'main' ){
		return 'aniDown';
	}
	else {
		return 'aniRight';
	}	
}
	
function contentExit ( type ) {
	var tmp = '';
	var sectionClass = document.getElementsByTagName ( 'section' );
	
	for (var i=0; i<sectionClass.length; i++){
		if (sectionClass[i].style.display == 'block') {	 
			tmp = contentExitMotion ( type ); 
		} 	
		sectionClass[i].className = tmp;  
	}  
}
	
function contentEnter ( classID, type ) {	
	var tmp = '';
	var sel = document.getElementsByTagName( 'section' );
	
	for (var i=0; i<sel.length; i++){
		
		if ( sel[i].id == classID ) { 
			tmp = contentEnterMotion ( type ); 
		} 
			
		sel[i].className = tmp;  
	}  
}

// Content Load Functions	
//This function is temprary to prove the method. Need to figure out a way to clear DOM elements before the new page loads I think to make this easy.
function subNavContent ( classID ) {  
	var sec = document.getElementById( classID );
	document.getElementById('subNav').innerHTML = sec.getElementsByClassName('pageNav')[0].innerHTML;
}

function subNavLoader ( ) {
	var subNav = document.getElementById( 'subNav' );
	var tmp = '';
	
	if (subNav.className === 'aniSubNavClose' ) {
		tmp = 'aniSubNavOpen';  
	}
	else {
		tmp = 'aniSubNavClose';
	}
			
	subNav.className = tmp;
	return;
}
		
function sectionAssure( classID, url, type ) {
	contentExit ( type );
	subNavLoader ( );
			
		var tmp = '';
		var sel = document.getElementsByTagName('section');
	
	setTimeout( function ( ) {
        subNavContent ( classID );
		subNavLoader ( );	
	}, ( 1000 ) );  	
	
	setTimeout( function ( ) {
		for (var i=0; i<sel.length; i++){
			if (sel[i].id == classID) { 
				tmp = 'block'; 
			} 
			else {
				tmp = 'none'; 
			}
			sel[i].style.display = tmp;  
		}  
	
		contentEnter( classID, type ); 		
	}, ( 1500 ) );  
}

function getDir ( type ) { 
	var tmp = '';

	if ( type === 'main' ) { 
		tmp = "content/"; }
	else if ( type === 'lesson'  ) { 
		tmp = "lesson/";  }
	else if ( type === 'project' ) { 
		tmp = "project/"; }
	else if ( type === 'article' ) { 
		tmp = "article/"; } 
		 
	return tmp;  
}
  
function loadContent ( classID, url, type ) {   
    var xmlhttp;
    var dir = getDir ( type );

    if ( window.XMLHttpRequest ) {
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
                document.getElementById( classID ).innerHTML=xmlhttp.responseText;
			}
        };
	
    xmlhttp.open( "GET", dir + url, true );             
    xmlhttp.send( );  
	
	// Deep navigation TEST!
	// By random I found xmlhttp.response being called it waits for the update of that var.
	//history.pushState( xmlhttp.responseText, classID, "" + dir + url ); 
	}  
	return;  
}
		
function insertContent ( classID, url ) {
	var nav = document.getElementById( classID );
		if ( window.XMLHttpRequest ) {
		xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
				nav.insertAdjacentHTML( 'beforeend', xmlhttp.responseText); 
			}  
		};	
					
	xmlhttp.open( "GET", "content/" + url, true );
	xmlhttp.send( ); 
	}  
	return;	
}

function checkPage ( classID, url, type ) {
	sectionAssure ( classID, url, type ); 	
	loadContent ( classID, url, type );  
}
	
// Content Show HTML in code blocks 
// ( Pending Repair: Unknown Bug when inserted into this template )
function codeDisplay ( ) {
	var codes = document.getElementsByTagName( "code" );
	var escapeEntities = ( function ( ) {
    var entities = { "<" : "lt", "&" : "amp" };
	
    var re = new RegExp( "[" + Object.keys( entities ).join( "" ) + "]", "g" );

    var replaceEntities = function ( ) {
        return match in entities ? "&" + entities[match] + ";" : match; }

    return function ( value ) {
        return value.replace( re, replaceEntities() ); }  } ) ( )   

code.innerHTML = escapeEntities ( code.innerHTML );
/*for (var i = 0, code; code = codes[i++];) {
    if ("textContent" in code)
        code.textContent = code.innerHTML;
    else if ("innerText" in code)
        code.innerText = code.innerHTML;
}*/  }

// Halt user Control till message is answered.
function intMsg ( classID ) {
    var on = 'block';
	var halt = document.getElementById('haltMsg').style;
	
	loadContent('haltMsg','msg.html', 'main');	
    clearMsg ( );
    halt.display = on;  
}

function clearMsg ( ) {
    var off = 'none';	
	
    document.getElementById('haltMsg').style.display = off;
    document.getElementById('wrong1').style.display = off;
    document.getElementById('wrong2').style.display = off;
    document.getElementById('wrong3').style.display = off;  
}


/* from @rlemon on stckoverflow 
var fps = 0,  fps_last = (new Date), fps_now;
// in the render function
fps_now = new Date;
fps = 1000 / (fps_now - fps_last);
fps_last = fps_now;

window.requestAnimFrame = (function() {
	return	window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
})();
*/

