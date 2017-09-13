(function(){
	var root = {};
	root.launcher = function(){
		if( typeof root.page.default === 'function' ) root.page.default();
		var path = window.location.pathname.match(new RegExp('^' + root.bazar.basePath + '(.*)$','i'))[1];
		
		if(path == '/'){		// czy strona główna?
			if( typeof root.page.index === 'function' ) root.page.index();
			
		}
		else{		//podstrona
			var subpage = path.match(/([\w\-]+)\/$/)[1];
			var t = subpage.replace(/\-/g,'_');
			if(typeof subpage === 'string' && subpage.length){
				if(typeof root.page[t] === 'function'){
					root.page[t]();
					
				}
				else if( typeof root.page.alternate === 'function' ) root.page.alternate();
				
			}
			
		}
		
	},
	root.bazar = {
		basePath: '/PiotrM/wp_edunation',		// ścieżka do podfolderu ze stroną (np: /adres/do/podfolderu, albo wartość pusta )
		logger: /logger/i.test(window.location.hash),		// czy wyświetlać komunikaty o wywoływaniu funkcji
		mobile: /mobile/i.test(window.location.hash) || undefined,		// czy aktualnie używane urządzenie jest urządzeniem mobilnym
		
	},
	root.addon = {
		isLogger: function(){
			return root.bazar.logger || false;
		},
		isMobile: function(){
			var bazar = root.bazar;
			var logger = bazar.logger || false;
			if(logger) console.log('isMobile()');
			if(typeof bazar.mobile === 'undefined'){
				bazar.mobile = /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
				
			}
			
			return bazar.mobile;
			
		},
		youtube: function(arg){
			/*
				arg = {
					ID*			// ID filmu video na YT
					iframe*		// element jQuery albo selektor iframe do odtwarzania filmu
					autoplay	// automatyczne odtwarzanie filmu [1/0]
					loop		// zapętlanie filmu [1/0]
					controls	// kontrolki filmu [1/0]
					beforePlay	// funkcja wywoływana przed rozpoczęciem odtwarzania filmu
					onClose		// funkcja wywoływana przy zamykaniu filmu
					
				}
			*/
			
			try{
				var logger = root.bazar.logger || false;
				
				if(typeof arg.ID !== 'string') throw 'Niepoprawny ID filmu';
				if(!$(arg.iframe).length) throw 'iframe nie istnieje';
				arg.autoplay = arg.autoplay || 0;
				arg.loop = arg.loop || 0;
				arg.controls = arg.controls || 1;
				arg.beforePlay = arg.beforePlay || function(){};
				arg.onClose = arg.onClose || function(){};
				
				var ret = {
					el: arg.iframe,
					url: "https://www.youtube.com/embed/"+ arg.ID +"?controls="+ arg.controls +"&autoplay="+ arg.autoplay +"&loop="+ arg.loop,
					open: function(){
						arg.beforePlay(this.el);
						$(this.el).attr({
							src: this.url,
							
						});
						
					},
					close: function(){
						arg.onClose(this.el);
						$(this.el).attr({
							src: '',
							
						});
						
					}
					
					
				};
				
				return ret;
				
			}
			catch(err){
				if(logger) console.error(err);
				
			}
			finally{
				
			}
			
		},
		form:{
			filters:{
				imie: /^[a-zA-Z \-żźćńółąśęŻŹĆŃÓŁĄŚĘ]+$/,
				nazwa: /^[\w \-żźćńółąśęŻŹĆŃÓŁĄŚĘ]+$/,
				adres: /^[\w \-żźćńółąśęŻŹĆŃÓŁĄŚĘ\.,\d]+$/,
				telefon: /^[\d\+ \(\)]+$/,
				mail: /^[^\d_\.\-][\w\d \.\-!#\$%&'\*\+/=\?^`\{\|\}~]{1,64}@\w+(?:\.\w+)+$/,
				tekst: /^[\w\s \-żźćńółąśęŻŹĆŃÓŁĄŚĘ\[\]\{\}\|\+\?\.,\:;\$\^\*\(\)!#%~/\\]*$/,
				tekst_req: /^[\w\s \-żźćńółąśęŻŹĆŃÓŁĄŚĘ\[\]\{\}\|\+\?\.,\:;\$\^\*\(\)!#%~/\\]+$/,
			},
			verify: function(arg){		// arg = tablica obiektów {name, item, filterName}
				var logger = root.addon.isLogger();
				if(logger) console.log('form.verify()');
				var self = this;
				if(typeof arg === 'object' && typeof arg.length === 'number'){
					var errors = [];
					for(i in arg){
						var value = $(arg[i].item).val();
						if(typeof arg[i] === 'object' && typeof value !== 'undefined' && typeof arg[i].filterName === 'string' && typeof arg[i].name === 'string' && typeof self.filters[arg[i].filterName] !== 'undefined'){
							if(!self.filters[arg[i].filterName].test(value)){
								errors.push(arg[i].item);
							}
							
						}
						else return false;
						
					}
					
					if(errors.length){
						return errors;
						
					}
					else return true;
					
				}
				
				return false;
				
			},
		},
		
	},
	root.page = {
		default: function(){
			var addon = root.addon;
			var logger = addon.isLogger();
			
			if(logger){
				window.facepalm = root;
				console.log('page.default()');
			}
			
		},
		alternate: function(){
			var addon = root.addon;
			var logger = addon.isLogger();
			
			if(logger) console.log('page.alternate()');
			
		},
		index: function(){
			var addon = root.addon;
			var logger = addon.isLogger();
			
			if(logger) console.log('page.index()');
			
		},
		rezerwacja: function(){
			var addon = root.addon;
			var logger = addon.isLogger();
			
			if(logger) console.log('page.rezerwacja()');
			
			/* kalendarz */
			(function( cal, days, monthReset, monthBar, meetingTyp, meetingInfo, meetingDay, meetingTime, meetingButton, popup ){
				/* informacje o wybranym szkoleniu */
				var meeting = {
					type: meetingTyp.text().trim(),
					price: parseFloat( meetingInfo.text().match( /(\d+(?:,\d+)?)\s*zł/ )[1] ),
					duration:  parseInt( meetingInfo.text().match( /(\d+)\s*min/ )[1] ),
					
				};
				
				/* bieżąca data */
				var now = new Date();
				/* uproszczona bieżąca data */
				var nowDay = new Date( now.getFullYear(), now.getMonth() );
				/* data do manipulowania */
				var customDate = new Date( now.getFullYear(), now.getMonth() );
				/* nazwy miesięcy */
				var nazwy = [ 'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień' ];
				
				meetingDay.parent().hide();
				meetingButton.hide();
				
				cal.on({
					fill: function( e ){
						/* ustawianie wyświetlanego miesiąca i roku */
						month = customDate.getMonth();
						year = customDate.getFullYear();
						
						/* wyświetlanie nazwy miesiąca */
						monthBar
						.children( '.name' )
						.text( function(){
							return nazwy[ month ] + ', ' + customDate.getFullYear();
							
						} );
						
						/* czyszczenie klas */
						days.removeClass( 'prev next current disable' );
						
						/* określanie zakresu aktualnie wyświetlanego miesiąca */
						var range = {
							start: days.filter( '[wd='+ customDate.getDay() +']:first' ).index(),
							end: days.filter( '[wd='+ customDate.getDay() +']:first' ).index() + new Date( customDate.getFullYear(), customDate.getMonth() + 1, 0 ).getDate() - 1,
							
						};
						
						/* oznaczenie dni poprzedniego, obecnego i następnego miesiaca */
						days.slice( 0, range.start ).addClass( 'prev disable' );
						days.slice( range.start, range.end + 1 ).addClass( 'current' );
						days.slice( range.end + 1 ).addClass( 'next disable' );
						
						/* odznaczanie weekendów jako dni nieaktwnych */
						days.filter( '[wd=6],[wd=0]' ).addClass( 'disable' );
						
						/* oznaczanie nieaktywnych dni obecnego miesiąca ( te które już minęły ) */
						if( now.getMonth() === customDate.getMonth() ){
							days.slice( range.start, range.start + now.getDate() - 1 ).addClass( 'disable' );
						}
						
						/* oznaczanie minionych miesięcy */
						if( customDate.getTime() < nowDay.getTime() ){
							days.slice( range.start, range.end + 1 ).addClass( 'disable' );
						}
						
						/* wypisywanie dni i ustawianie atrybutów*/
						var tDate = new Date( customDate.getFullYear(), customDate.getMonth(), 1 - range.start );
						var element = days.first();
						for( i = 0; i < 42; i++ ){
							element
							.attr({
								d: tDate.getDate(),
								m: tDate.getMonth(),
								y: tDate.getFullYear()
							})
							.children( '.text' )
							.text( tDate.getDate() );
							element = element.next();
							tDate.setDate( tDate.getDate() + 1 );
							
						}
						
					},
					next: function( e ){
						customDate.setMonth( customDate.getMonth() + 1 );
						cal.triggerHandler( 'fill' );
						
					},
					prev: function( e ){
						customDate.setMonth( customDate.getMonth() - 1 );
						cal.triggerHandler( 'fill' );
						
					},
					reset: function( e ){
						customDate = new Date( nowDay.getTime() );
						cal.triggerHandler( 'fill' );
						
					},
					time: function( e, mode ){
						if( mode === 'open' ){
							popup.addClass( 'open' );
							
						}
						else if( mode === 'close' ){
							popup.removeClass( 'open' );
							
						}
						
					},
					
				});
				
				cal.triggerHandler( 'fill' );
				
				cal.find( '.tbody' ).on( 'click', '.tcell.prev', function( e ){
					cal.triggerHandler( 'prev' );
					
				} );
				
				cal.find( '.tbody' ).on( 'click', '.tcell.next', function( e ){
					cal.triggerHandler( 'next' );
					
				} );
				
				cal.find( '.tbody' ).on( 'click', '.tcell.current', function( e ){
					meeting.date = {
						day: $(this).attr( 'd' ),
						month: $(this).attr( 'm' ),
						year: $(this).attr( 'y' ),
						
					};
					
					cal.triggerHandler( 'time', [ 'open' ] );
					
					console.log( meeting );
					
				} );
				
				/* zamykanie popupu */
				popup
				.add( popup.find( '.box > .close' ) )
				.click(function( e ){
					cal.triggerHandler( 'time', [ 'close' ] )
					
				});
				
				popup.children( '.box' ).click(function( e ){
					e.stopPropagation();
					
				});
				
				/* ustawianie godziny */
				(function( items ){
					items.click( function( e ){
						meeting.date.hour = $(this).attr( 'h' );
						meeting.date.minute = $(this).attr( 'm' );
						
						meetingDay.text( 'Termin: ' + meeting.date.day + ' ' + nazwy[ meeting.date.month ] );
						meetingTime.text( 'Godzina: ' + meeting.date.hour + '.' + meeting.date.minute );
						
						cal.triggerHandler( 'time', [ 'close' ] );
						meetingDay.parent().slideDown();
						meetingButton.slideDown();
						
					} );
					
				})
				( popup.find( '.box > .body .item' ) );
				
				/* obsługa przycisków przewijania miesięcy */
				monthBar.children( '.nav' ).click( function( e ){
					if( $(this).hasClass( 'next' ) ){
						cal.triggerHandler( 'next' );
						
					}
					else if( $(this).hasClass( 'prev' ) ){
						cal.triggerHandler( 'prev' );
						
					}
					
				} );
				
				/* resetowanie daty do aktualnego miesiąca */
				monthReset.click( function( e ){
					cal.triggerHandler( 'reset' );
					
				} );
				
			})
			( $( '#rezerwacja .etap.data' ), 
			$( '#rezerwacja .etap.data > .body > .tbody > .tcell' ), 
			$( '#rezerwacja .etap.data > .head > .button' ), 
			$( '#rezerwacja .etap.data > .head > .month' ), 
			$( '#rezerwacja .side > .top > .title' ), 
			$( '#rezerwacja .side > .top > .cena' ), 
			$( '#rezerwacja .side > .bot > .dzien' ),  
			$( '#rezerwacja .side > .bot > .godzina' ),  
			$( '#rezerwacja .side > .button' ), 
			$( '#rezerwacja > .popup' ) );
			
		},
		
	}
	
	$(function(){
		root.launcher();
	});
	
})();