// Client ID and API key from the Developer Console
var CLIENT_ID = '164399568413-37qg6nl2fd355sv1k273kcvv5kp2fkjt.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

// var authorizeButton = document.getElementById('authorize-button');
var authorizeButton = window.meeting_btn;
// var signoutButton = document.getElementById('signout-button');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
	gapi.load( 'client:auth2', initClient );
	
}

/**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;
		// signoutButton.onclick = handleSignoutClick;
		
	});
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		// authorizeButton.style.display = 'none';
		// signoutButton.style.display = 'block';
		/* miejsce na funkcje (?) */
		addCustomEvent();
		
	} else {
		// authorizeButton.style.display = 'block';
		// signoutButton.style.display = 'none';
		
	}
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
	
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}


function addCustomEvent(){
	var date = window.meeting_selected;
	var startTime = new Date( date.time * 1000 );
	var endTime = new Date( startTime.getTime() + date.duration * 60 * 1000 );
	
	var event = {
		"start": {
			"timeZone": "Europe/Warsaw",
			// "dateTime": "2017-09-27T10:00:00.000Z",
			"dateTime": startTime.toISOString(),
		},
		"end": {
			"timeZone": "Europe/Warsaw",
			// "dateTime": "2017-09-27T13:00:00.000Z",
			"dateTime": endTime.toISOString(),
		},
		"summary": date.name,
		// "location": "dom",
		// "description": "spotkanie na skype!",
		"description": [ date.client.name, date.client.tel, date.client.mail, date.client.msg ].join( '<br>' ),
		"colorId": "11",
		"reminders": {
			"overrides": [
				{
					"method": "email",
					"minutes": 60,
				},
				{
					"method": "popup",
					"minutes": 60,
				}
			],
			"useDefault": false,
		}
	}
	
	gapi.client.calendar.events.insert({
		'calendarId': 'primary',
		'resource': event,
		
	})
	.then(function( response ){
		console.info( response );
		// authorizeButton.style.display = 'none';
		window.location.href = window.meeting_url;
		
	});
	
}

/* $.getScript( 'https://apis.google.com/js/api.js', function( data, status ){
	if( status === 'success' ) handleClientLoad();
	
} ); */
