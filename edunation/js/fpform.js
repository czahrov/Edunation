/*
	fp_form - główna klasa elementu formularza
	fp_form[action] - adres url skryptu PHP
	fp_form[test] - funkcja wykonująca test weryfikacji; IN: [ input, [ filtr | regex ] ], OUT: [ true | false ]
	fp_input - klasa elementu formularza 
	fp_input[filtr] - nazwa stosowanego filtru
	fp_input[regex] - testowane wyrażenie regularne; ma pierwszeństwo przed atrybutem [filtr]
	
*/

try{
	if( typeof $ !== 'function' ) throw 'Brak biblioteki jQuery';
	
	$(function(){
		
		
	});
	
}
catch( err ){
	console.error( err );
	
}