$(function(){
	var CLIENT_ID = '330101275125-74jvdti5ufedltb82rsuel31dqiu7qf2.apps.googleusercontent.com';
	var API_KEY = 'AIzaSyC2wgUJzQlqo924FvzKNOhaucbP9YRq4HM';
	var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
	var SCOPES = "https://www.googleapis.com/auth/calendar";
	var AUTH_BTN = $( '#login' );
	var OUT_BTN = $( '#logout' );
	var GCAL_ID = 'kaczanowskii@gmail.com';
	// var GCAL_ID = 'worhacz.dawid@gmail.com';
	
	// On load, called to load the auth2 library and API client library.
	function handleClientLoad(){
		gapi.load('client:auth2', initClient);
	}
	
	// Initializes the API client library and sets up sign-in state listeners.
	function initClient(){
		gapi.client.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES,
			
		})
		.then(function(){
			// inicjalizacja kalendarza
			$( '#rezerwacja > .bot > .view > .etap.date' ).triggerHandler( 'init' );
			
			// Listen for sign-in state changes.
			gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
			
			// Handle the initial sign-in state.
			updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			
			AUTH_BTN.click( function(){
				console.log( 'login' );
				handleAuthClick();
				
			} );
			
			OUT_BTN.click( function(){
				console.log( 'logout' );
				handleSignoutClick();
				
			} );
			
		});
	}
	
	// Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called.
	function updateSigninStatus( isSignedIn ){
		if ( isSignedIn ){
			window.authorised = true;
			AUTH_BTN.hide();
			OUT_BTN.show();
			/* custom functions here */
			$( '#event' ).show();
			
		}
		else{
			window.authorised = false;
			AUTH_BTN.show();
			OUT_BTN.hide();
			/* custom functions here */
			$( '#event' ).hide();
			
		}
	}
	
	// Sign in the user upon button click.
	function handleAuthClick(event){
		gapi.auth2.getAuthInstance().signIn();
		
	}
	
	// Sign out the user upon button click.
	function handleSignoutClick(event){
		gapi.auth2.getAuthInstance().signOut();
		
	}
	
	// Loader
	if( typeof window.gapi === 'undefined' ){
		$.getScript(
			'https://apis.google.com/js/api.js',
			function( data, status ){
				if( status === 'success' ) handleClientLoad();
				
			}
		);
		
	}
	
	/* publiczny interface */
	window.gch = {
		freeBusy: function( timeMin, timeMax ){
			gapi.client.calendar.freebusy.query({
				"items": [
					{
						id: GCAL_ID,
					}
				],
				"timeMin": new Date( timeMin ).toISOString(),
				"timeMax": new Date( timeMax ).toISOString(),
				"timeZone": 'Europe/Warsaw',
				
			})
			.then( function( response ){
				window.freeBusy = response.result.calendars;
				
				// wypełnianie kalendarza
				$( '#rezerwacja > .bot > .view > .etap.date' ).triggerHandler( 'fill' );
				
				/* window.freeBusy
				{
					"kaczanowskii@gmail.com": {
						"busy": [{
							"start": "2018-02-17T08:45:00+01:00",
							"end": "2018-02-17T11:30:00+01:00"
						},
						{
							"start": "2018-02-17T14:00:00+01:00",
							"end": "2018-02-17T17:00:00+01:00"
						},
						{
							"start": "2018-02-17T18:30:00+01:00",
							"end": "2018-02-17T19:30:00+01:00"
						},
						{
							"start": "2018-02-17T20:00:00+01:00",
							"end": "2018-02-17T21:00:00+01:00"
						}]
					}
				}
				*/
				
			} );
			
		},
		addEvent: function( timeStart, timeEnd, title, description ){
			var event = {
				end:{
					dateTime: new Date( timeEnd ).toISOString(),
					timeZone: 'Europe/Warsaw',
				},
				start:{
					dateTime: new Date( timeStart ).toISOString(),
					timeZone: 'Europe/Warsaw',
				},
				summary: title,
				description: description,
				attendees:[
					{
						email: GCAL_ID,
						// email: "worhacz.dawid@gmail.com",
					},
					
				],
				
			}
			
			var request = gapi.client.calendar.events.insert({
				calendarId: 'primary',
				sendNotifications: true,
				resource: event,
				
			})
			.then( function( resp ){
				console.log( resp );
				// sukces
				if( resp.status === 200 ){
					$( '#rezerwacja > .popup > .box > .segment.foot' )
					.slideUp();
					
					$( '#rezerwacja > .bot > .view > .etap.date' )
					.triggerHandler( 'notify', [ 'success', 'Great! It was easy, right? See you soon!<br><br>Niebawem otrzymasz potwierdzenie rezerwacji na Twój adres email.' ] );
					
				}
				// niepowodzenie
				else if( resp.status === 400 ){
					$( '#rezerwacja > .bot > .view > .etap.date' )
					.triggerHandler( 'notify', [ 'fail', 'Wystąpił błąd. Proszę sprawdzić poprawność wprowadzonych danych i spróbować ponownie.' ] );
					
				}
				
			} );
			
		},
		
	};
	
	/* calendar event color ids
		"event": {
		"1": {
			"background": "#a4bdfc",
			"foreground": "#1d1d1d"
		},
		"2": {
			"background": "#7ae7bf",
			"foreground": "#1d1d1d"
		},
		"3": {
			"background": "#dbadff",
			"foreground": "#1d1d1d"
		},
		"4": {
			"background": "#ff887c",
			"foreground": "#1d1d1d"
		},
		"5": {
			"background": "#fbd75b",
			"foreground": "#1d1d1d"
		},
		"6": {
			"background": "#ffb878",
			"foreground": "#1d1d1d"
		},
		"7": {
			"background": "#46d6db",
			"foreground": "#1d1d1d"
		},
		"8": {
			"background": "#e1e1e1",
			"foreground": "#1d1d1d"
		},
		"9": {
			"background": "#5484ed",
			"foreground": "#1d1d1d"
		},
		"10": {
			"background": "#51b749",
			"foreground": "#1d1d1d"
		},
		"11": {
			"background": "#dc2127",
			"foreground": "#1d1d1d"
		}
	*/
	
});