(function(){
	var root = {};
	root.launcher = function(){
		if( typeof root.page.default === 'function' ) root.page.default();
		var path = window.location.pathname.match(new RegExp('^' + root.bazar.basePath + '(.*)$','i'))[1];
		
		if(path == '/'){		// czy strona główna?
			if( typeof root.page.index === 'function' ) root.page.index();
			
		}
		else{		//podstrona
			try{
				var subpage = path.match(/([\w\-]+)\/$/)[1];
				var t = subpage.replace(/\-/g,'_');
				if(typeof subpage === 'string' && subpage.length){
					if(typeof root.page[t] === 'function'){
						root.page[t]();
						
					}
					else if( typeof root.page.alternate === 'function' ) root.page.alternate();
					
				}
				
			}
			catch( err ){
				console.error( err );
				
			}
			
		}
		
	},
	root.bazar = {
		basePath: '/PiotrM/wp_edunation',		// ścieżka do podfolderu ze stroną (np: /adres/do/podfolderu, albo wartość pusta )
		// basePath: '',		// ścieżka do podfolderu ze stroną (np: /adres/do/podfolderu, albo wartość pusta )
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
					ID*				// ID filmu video na YT
					iframe*			// element jQuery albo selektor iframe do odtwarzania filmu
					autoplay		// automatyczne odtwarzanie filmu [1/0]
					loop				// zapętlanie filmu [1/0]
					controls			// kontrolki filmu [1/0]
					beforePlay		// funkcja wywoływana przed rozpoczęciem odtwarzania filmu
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
			
			/* przewijanie strony */
			(function( link ){
				link.click( function( e ){
					var hash = $(this).attr( 'href' ).match( /#(.+)/ );
					var menu_h = $( 'body .main-nav' ).first().outerHeight( true );
					console.log( hash );
					
					if( hash !== null ){
						var item = $( '[id="'+ hash[1] +'"]' );
						console.log( item );
						
						if( item.length > 0 ){
							e.preventDefault();
							var posY = function(){
								return item.first().offset().top - menu_h;
								
							};
							
							console.log( posY() );
							TweenLite.to(
								$( 'html, body' ),
								.5,
								{
									scrollTop: posY(),
									ease: Power2.easeInOut,
								}
							);
							
						}
						
					}
					
				} );
				
			})
			( $( 'ul.navigation > li:not(.call) > a' ) );
			
			/* single page */
			if( $( 'body#single' ).length > 0 ){
				
				/* popup movie */
				(function( root, play, popup, box, close, iframe ){
					var duration = 1;
					var vid_handle;
					
					root
					.on({
						open: function( e ){
							new TimelineLite({
								onStart: function(){
									popup.addClass( 'open' );
									
								},
								onComplete: function(){
									var vid = root.attr( 'video' ).match( /v=(\w+)/ );
									
									if( vid.length > 1 ){
										vid_handle = addon.youtube({
											ID: vid[1],
											iframe: iframe,
											autoplay: 1,
											controls: 0,
										});
										
										vid_handle.open();
										
									}
								},
								
							})
							.add( 'start', 0 )
							.add(
								TweenLite.fromTo(
									popup,
									duration,
									{
										opacity: 0,
									},
									{
										opacity: 1,
										
									}
								), 'start'
							)
							.add(
								TweenLite.fromTo(
									box,
									duration,
									{
										yPercent: -100,
									},
									{
										yPercent: 0,
										
									}
								), 'start+=' + duration
							);
							
						},
						close: function( e ){
							new TimelineLite({
								onStart: function(){
									vid_handle.close();
									
								},
								onComplete: function(){
									popup.removeClass( 'open' );
									
								},
								
							})
							.add( 'start', 0 )
							.add(
								TweenLite.to(
									box,
									duration,
									{
										yPercent: -100,
									}
								), 'start'
							)
							.add(
								TweenLite.to(
									popup,
									duration,
									{
										opacity: 0,
									}
								), 'start+=' + duration
							);
							
						},
						
					});
					
					box.click( function( e ){
						root.triggerHandler( 'close' );
						e.stopPropagation();
						
					} );
					
					play.click( function( e ){ root.triggerHandler( 'open' ); } );
					
					close.click( function( e ){ root.triggerHandler( 'close' ); } );
					
				})
				( $( '#single .movie.pops' ), 
				$( '#single .movie.pops > .box > .play' ), 
				$( '#single > .popup' ), 
				$( '#single > .popup > .box' ), 
				$( '#single > .popup > .box > .top > .close' ), 
				$( '#single > .popup > .box > .mid' ) );
				
			}
			
			// hamburger menu
			(function( hamburger, menu ){
				hamburger.click( function( e ){
					$( this ).toggleClass( 'open' );
					
					if( $( this ).hasClass( 'open' ) ){
						menu.slideDown();
						
					}
					else{
						menu.slideUp();
						
					}
					
				} );
				
				menu
				.find( 'a' )
				.filter( function(){
					return /#/.test( $(this).attr( 'href' ) );
					
				} )
				.click( function( e ){
					hamburger.removeClass( 'open' );
					menu.slideUp();
					
				} );
				
			})
			(
				$( '.hamburger'),
				$( 'ul.navigation')
			);
			
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
			
			/* slider referencje */
			(function( slider, nav, pagin, view, slides ){
				var current = 0;
				var lock = false;
				var delay = 5000;
				var duration = 1;
				var itrv;
				var tout;
				var distance = function(){
					return slides.first().outerWidth( true );
					
				};
				
				slider
				.on({
					init: function( e ){
						slider.triggerHandler( 'start' );
						$( window ).resize( function( e ){
							window.clearTimeout( tout );
							tout = window.setTimeout( function(){
								slider.triggerHandler( 'set' );
								
							}, 300 );
							
						} );
						
					},
					set: function( e ){
						if( current < 0 ) current = slides.length - 1;
						current %= slides.length;
						
						new TimelineLite({
							onStart: function(){
								pagin
								.eq( current )
								.addClass( 'active' )
								.siblings()
								.removeClass( 'active' );
								
							},
							onComplete: function(){
								lock = false;
								
							},
							
						})
						.add( 'start', 0 )
						.add(
							TweenLite.to(
								view,
								duration,
								{
									scrollLeft: distance() * current,
									ease: Linear.easeNone,
									
								}
							), 'start'
						);
						
						
					},
					prev: function( e ){
						if( !lock ){
							lock = true;
							current--;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					next: function( e ){
						if( !lock ){
							lock = true;
							current++;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					start: function( e ){
						slider.triggerHandler( 'stop' );
						itrv = window.setInterval( function(){
							slider.triggerHandler( 'next' );
							
						}, delay );
						
					},
					stop: function( e ){
						window.clearInterval( itrv );
						
					},
					mouseenter: function( e ){
						slider.triggerHandler( 'stop' );
						
					},
					mouseleave: function( e ){
						slider.triggerHandler( 'start' );
						
					},
					
				})
				.swipe({
					swipeLeft: function( e ){
						slider.triggerHandler( 'next' );
						
					},
					swipeRight: function( e ){
						slider.triggerHandler( 'prev' );
						
					},
					
				});
				
				pagin.click( function( e ){
					var pos = $(this).index();
					if( pos !== current ){
						current = pos;
						slider.triggerHandler( 'set' );
					}
					
				} );
				
				nav.click( function( e ){
					if( $(this).hasClass( 'next' ) ){
						slider.triggerHandler( 'next' );
						
					}
					else if( $(this).hasClass( 'prev' ) ){
						slider.triggerHandler( 'prev' );
						
					}
					
				} );
				
				slider.triggerHandler( 'init' );
				
			})
			( $( '#home > .referencje .slider' ), 
			$( '#home > .referencje .slider > .nav' ), 
			$( '#home > .referencje .slider > .pagin > .item' ), 
			$( '#home > .referencje .slider > .view' ), 
			$( '#home > .referencje .slider > .view > .slide' ) );
			
			/* slider opinie */
			(function( slider, nav, pagin, view, slides ){
				var current = 0;
				var lock = false;
				var delay = 5000;
				var duration = 1;
				var itrv;
				var tout;
				var distance = function(){
					return slides.first().outerWidth( true );
					
				};
				
				slider
				.on({
					init: function( e ){
						slider.triggerHandler( 'start' );
						$( window ).resize( function( e ){
							window.clearTimeout( tout );
							tout = window.setTimeout( function(){
								slider.triggerHandler( 'set' );
								
							}, 300 );
							
						} );
						
					},
					set: function( e ){
						if( current < 0 ) current = slides.length - 1;
						current %= slides.length;
						
						new TimelineLite({
							onStart: function(){
								pagin
								.eq( current )
								.addClass( 'active' )
								.siblings()
								.removeClass( 'active' );
								
							},
							onComplete: function(){
								lock = false;
								
							},
							
						})
						.add( 'start', 0 )
						.add(
							TweenLite.to(
								view,
								duration,
								{
									scrollLeft: distance() * current,
									ease: Linear.easeNone,
									
								}
							), 'start'
						);
						
						
					},
					prev: function( e ){
						if( !lock ){
							lock = true;
							current--;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					next: function( e ){
						if( !lock ){
							lock = true;
							current++;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					start: function( e ){
						slider.triggerHandler( 'stop' );
						itrv = window.setInterval( function(){
							slider.triggerHandler( 'next' );
							
						}, delay );
						
					},
					stop: function( e ){
						window.clearInterval( itrv );
						
					},
					mouseenter: function( e ){
						slider.triggerHandler( 'stop' );
						
					},
					mouseleave: function( e ){
						slider.triggerHandler( 'start' );
						
					},
					
				})
				.swipe({
					swipeLeft: function( e ){
						slider.triggerHandler( 'next' );
						
					},
					swipeRight: function( e ){
						slider.triggerHandler( 'prev' );
						
					},
					
				});
				
				pagin.click( function( e ){
					var pos = $(this).index();
					if( pos !== current ){
						current = pos;
						slider.triggerHandler( 'set' );
					}
					
				} );
				
				nav.click( function( e ){
					if( $(this).hasClass( 'next' ) ){
						slider.triggerHandler( 'next' );
						
					}
					else if( $(this).hasClass( 'prev' ) ){
						slider.triggerHandler( 'prev' );
						
					}
					
				} );
				
				slider.triggerHandler( 'init' );
				
			})
			( $( '#home > .opinie .slider' ), 
			$( '#home > .opinie .slider > .nav' ), 
			$( '#home > .opinie .slider > .pagin > .item' ), 
			$( '#home > .opinie .slider > .view' ), 
			$( '#home > .opinie .slider > .view > .slide' ) );
			
			/* business english slider */
			(function( slider, view, slides, pagin){
				var current = 0;
				var lock = false;
				var itrv;
				var delay = 5000;
				var duration = 0.5;
				var active = false;
				var distance = function(){
					return slides.first().outerWidth( true );
					
				};
				
				slider
				.on({
					init: function( e ){
						$( window ).resize( function( e ){
							slider.triggerHandler( 'check' );
							
						} );
						
						slider.triggerHandler( 'check' );
						
					},
					check: function( e ){
						if( window.innerWidth >= 1024 ){
							slider.triggerHandler( 'off' );
							
						}
						else if( !active ){
							slider.triggerHandler( 'on' );
							
						}
						
					},
					on: function( e ){
						active = true;
						slider.triggerHandler( 'reset' );
						slider.triggerHandler( 'start' );
						
					},
					off: function( e ){
						active = false;
						slider.triggerHandler( 'stop' );
						
					},
					set: function( e ){
						if( current < 0 ) current = slides.length - 1;
						current %= slides.length;
						
						new TimelineLite({
							onStart: function(){
								pagin
								.eq( current )
								.addClass( 'active' )
								.siblings()
								.removeClass( 'active' );
								
							},
							onComplete: function(){
								lock = false;
								
							},
							
						})
						.add( 'start', 0 )
						.add(
							TweenLite.to(
								view,
								duration,
								{
									scrollLeft: distance() * current,
									ease: Linear.easeNone,
									
								}
							), 'start'
						);
						
					},
					reset: function( e ){
						// slider.triggerHandler( 'stop' );
						current = 0;
						slider.triggerHandler( 'set' );
						
					},
					next: function( e ){
						if( !lock ){
							lock = true;
							current++;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					prev: function( e ){
						if( !lock ){
							lock = true;
							current--;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					stop: function( e ){
						window.clearInterval( itrv );
						
					},
					start: function( e ){
						slider.triggerHandler( 'stop' );
						if( active ){
							itrv = window.setInterval( function(){
								slider.triggerHandler( 'next' );
								
							}, delay );
							
						}
						
					},
					mouseenter: function( e ){
						slider.triggerHandler( 'stop' );
						
					},
					mouseleave: function( e ){
						if( active ){
							slider.triggerHandler( 'start' );
							
						}
						
					},
					
				})
				.swipe({
					swipeLeft: function( e ){
						slider.triggerHandler( 'next' );
						
					},
					swipeRight: function( e ){
						slider.triggerHandler( 'prev' );
						
					},
					
				});
				
				pagin.click( function( e ){
					var index = $(this).index();
					if( current !== index ){
						current = index;
						slider.triggerHandler( 'set' );
						
					}
					
				} );
				
				slider.triggerHandler( 'init' );
				
			})
			( $( '#business-training' ), 
			$( '#business-training > .wrapper' ), 
			$( '#business-training > .wrapper > .box' ), 
			$( '#business-training > .pagin > .item' ) );
			
			/* general english slider */
			(function( slider, view, slides, pagin){
				var current = 0;
				var lock = false;
				var itrv;
				var delay = 5000;
				var duration = 0.5;
				var active = false;
				var distance = function(){
					return slides.first().outerWidth( true );
					
				};
				
				slider
				.on({
					init: function( e ){
						$( window ).resize( function( e ){
							slider.triggerHandler( 'check' );
							
						} );
						
						slider.triggerHandler( 'check' );
						
					},
					check: function( e ){
						if( window.innerWidth >= 1024 ){
							slider.triggerHandler( 'off' );
							
						}
						else if( !active ){
							slider.triggerHandler( 'on' );
							
						}
						
					},
					on: function( e ){
						active = true;
						slider.triggerHandler( 'reset' );
						slider.triggerHandler( 'start' );
						
					},
					off: function( e ){
						active = false;
						slider.triggerHandler( 'stop' );
						
					},
					set: function( e ){
						if( current < 0 ) current = slides.length - 1;
						current %= slides.length;
						
						new TimelineLite({
							onStart: function(){
								pagin
								.eq( current )
								.addClass( 'active' )
								.siblings()
								.removeClass( 'active' );
								
							},
							onComplete: function(){
								lock = false;
								
							},
							
						})
						.add( 'start', 0 )
						.add(
							TweenLite.to(
								view,
								duration,
								{
									scrollLeft: distance() * current,
									ease: Linear.easeNone,
									
								}
							), 'start'
						);
						
					},
					reset: function( e ){
						// slider.triggerHandler( 'stop' );
						current = 0;
						slider.triggerHandler( 'set' );
						
					},
					next: function( e ){
						if( !lock ){
							lock = true;
							current++;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					prev: function( e ){
						if( !lock ){
							lock = true;
							current--;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					stop: function( e ){
						window.clearInterval( itrv );
						
					},
					start: function( e ){
						slider.triggerHandler( 'stop' );
						if( active ){
							itrv = window.setInterval( function(){
								slider.triggerHandler( 'next' );
								
							}, delay );
							
						}
						
					},
					mouseenter: function( e ){
						slider.triggerHandler( 'stop' );
						
					},
					mouseleave: function( e ){
						if( active ){
							slider.triggerHandler( 'start' );
							
						}
						
					},
					
				})
				.swipe({
					swipeLeft: function( e ){
						slider.triggerHandler( 'next' );
						
					},
					swipeRight: function( e ){
						slider.triggerHandler( 'prev' );
						
					},
					
				});
				
				pagin.click( function( e ){
					var index = $(this).index();
					if( current !== index ){
						current = index;
						slider.triggerHandler( 'set' );
						
					}
					
				} );
				
				slider.triggerHandler( 'init' );
				
			})
			( $( '#general-training' ), 
			$( '#general-training > .wrapper' ), 
			$( '#general-training > .wrapper > .box' ), 
			$( '#general-training > .pagin > .item' ) );
			
			/* 1:1 sessions slider */
			(function( slider, view, slides, pagin){
				var current = 0;
				var lock = false;
				var itrv;
				var delay = 5000;
				var duration = 0.5;
				var active = false;
				var distance = function(){
					return slides.first().outerWidth( true );
					
				};
				
				slider
				.on({
					init: function( e ){
						$( window ).resize( function( e ){
							slider.triggerHandler( 'check' );
							
						} );
						
						slider.triggerHandler( 'check' );
						
					},
					check: function( e ){
						if( window.innerWidth >= 1024 ){
							slider.triggerHandler( 'off' );
							
						}
						else if( !active ){
							slider.triggerHandler( 'on' );
							
						}
						
					},
					on: function( e ){
						active = true;
						slider.triggerHandler( 'reset' );
						slider.triggerHandler( 'start' );
						
					},
					off: function( e ){
						active = false;
						slider.triggerHandler( 'stop' );
						
					},
					set: function( e ){
						if( current < 0 ) current = slides.length - 1;
						current %= slides.length;
						
						new TimelineLite({
							onStart: function(){
								pagin
								.eq( current )
								.addClass( 'active' )
								.siblings()
								.removeClass( 'active' );
								
							},
							onComplete: function(){
								lock = false;
								
							},
							
						})
						.add( 'start', 0 )
						.add(
							TweenLite.to(
								view,
								duration,
								{
									scrollLeft: distance() * current,
									ease: Linear.easeNone,
									
								}
							), 'start'
						);
						
					},
					reset: function( e ){
						// slider.triggerHandler( 'stop' );
						current = 0;
						slider.triggerHandler( 'set' );
						
					},
					next: function( e ){
						if( !lock ){
							lock = true;
							current++;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					prev: function( e ){
						if( !lock ){
							lock = true;
							current--;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					stop: function( e ){
						window.clearInterval( itrv );
						
					},
					start: function( e ){
						slider.triggerHandler( 'stop' );
						if( active ){
							itrv = window.setInterval( function(){
								slider.triggerHandler( 'next' );
								
							}, delay );
							
						}
						
					},
					mouseenter: function( e ){
						slider.triggerHandler( 'stop' );
						
					},
					mouseleave: function( e ){
						if( active ){
							slider.triggerHandler( 'start' );
							
						}
						
					},
					
				})
				.swipe({
					swipeLeft: function( e ){
						slider.triggerHandler( 'next' );
						
					},
					swipeRight: function( e ){
						slider.triggerHandler( 'prev' );
						
					},
					
				});
				
				pagin.click( function( e ){
					var index = $(this).index();
					if( current !== index ){
						current = index;
						slider.triggerHandler( 'set' );
						
					}
					
				} );
				
				slider.triggerHandler( 'init' );
				
			})
			( $( '#sessions-training' ), 
			$( '#sessions-training > .wrapper' ), 
			$( '#sessions-training > .wrapper > .box' ), 
			$( '#sessions-training > .pagin > .item' ) );
			
			/* mummy, daddy slider */
			(function( slider, view, slides, pagin){
				var current = 0;
				var lock = false;
				var itrv;
				var delay = 5000;
				var duration = 0.5;
				var active = false;
				var distance = function(){
					return slides.first().outerWidth( true );
					
				};
				
				slider
				.on({
					init: function( e ){
						$( window ).resize( function( e ){
							slider.triggerHandler( 'check' );
							
						} );
						
						slider.triggerHandler( 'check' );
						
					},
					check: function( e ){
						if( window.innerWidth >= 1024 ){
							slider.triggerHandler( 'off' );
							
						}
						else if( !active ){
							slider.triggerHandler( 'on' );
							
						}
						
					},
					on: function( e ){
						active = true;
						slider.triggerHandler( 'reset' );
						slider.triggerHandler( 'start' );
						
					},
					off: function( e ){
						active = false;
						slider.triggerHandler( 'stop' );
						
					},
					set: function( e ){
						if( current < 0 ) current = slides.length - 1;
						current %= slides.length;
						
						new TimelineLite({
							onStart: function(){
								pagin
								.eq( current )
								.addClass( 'active' )
								.siblings()
								.removeClass( 'active' );
								
							},
							onComplete: function(){
								lock = false;
								
							},
							
						})
						.add( 'start', 0 )
						.add(
							TweenLite.to(
								view,
								duration,
								{
									scrollLeft: distance() * current,
									ease: Linear.easeNone,
									
								}
							), 'start'
						);
						
					},
					reset: function( e ){
						// slider.triggerHandler( 'stop' );
						current = 0;
						slider.triggerHandler( 'set' );
						
					},
					next: function( e ){
						if( !lock ){
							lock = true;
							current++;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					prev: function( e ){
						if( !lock ){
							lock = true;
							current--;
							slider.triggerHandler( 'set' );
							
						}
						
					},
					stop: function( e ){
						window.clearInterval( itrv );
						
					},
					start: function( e ){
						slider.triggerHandler( 'stop' );
						if( active ){
							itrv = window.setInterval( function(){
								slider.triggerHandler( 'next' );
								
							}, delay );
							
						}
						
					},
					mouseenter: function( e ){
						slider.triggerHandler( 'stop' );
						
					},
					mouseleave: function( e ){
						if( active ){
							slider.triggerHandler( 'start' );
							
						}
						
					},
					
				})
				.swipe({
					swipeLeft: function( e ){
						slider.triggerHandler( 'next' );
						
					},
					swipeRight: function( e ){
						slider.triggerHandler( 'prev' );
						
					},
					
				});
				
				pagin.click( function( e ){
					var index = $(this).index();
					if( current !== index ){
						current = index;
						slider.triggerHandler( 'set' );
						
					}
					
				} );
				
				slider.triggerHandler( 'init' );
				
			})
			( $( '#mummy-training' ), 
			$( '#mummy-training > .wrapper' ), 
			$( '#mummy-training > .wrapper > .box' ), 
			$( '#mummy-training > .pagin > .item' ) );
			
			/* formularz kontaktowy */
			(function( form, name, email, subject, msg, send, info ){
				var lock = false;
				
				form
				.on({
					send: function( e ){
						if( lock ) return false;
						lock = true;
						var formData = form.serializeArray();
						// console.log( formData );
						
						$.ajax({
							type: 'POST',
							url: 'contact-form',
							data: formData,
							// contentType: false,
							// processData: false,
							success: function( data, status ){
								try{
									var resp = JSON.parse( data );
									// console.log( resp );
									form.triggerHandler( 'status', [ resp.status, resp.msg ] );
									if( resp.status === 'ok' ){
										form.trigger( 'reset' );
										
									}
									
								}
								catch( err ){
									form.triggerHandler( 'status', [ 'fail', 'Błąd odpowiedzi serwera<br>Spróbuj ponowie za kilka minut' ] );
									console.error( err );
									console.log( data );
									
								}
								finally{
									lock = false;
									
								}
								
							},
							error: function( xhr, status, error ){
								form.triggerHandler( 'status', [ 'fail', 'Błąd połączenia z serwerem' ] );
								console.error( {xhr: xhr, status: status, error: error} );
							},
							complete: function(){
								lock = false;
							},
							
						})
						
					},
					status: function( e, status, msg ){
						info
						.removeClass( 'ok info fail' )
						.addClass( status )
						.children( '.text' )
						.html( msg );
						
					},
					
				});
				
				send.click( function( e ){
					form.triggerHandler( 'send' );
					
				} );
				
			})
			( $( '#contact' ), 
			$( '#contact #name' ), 
			$( '#contact #email' ), 
			$( '#contact #subject' ), 
			$( '#contact .message' ), 
			$( '#contact .send' ), 
			$( '#contact .status' ) );
			
			/* roll-down */
			(function( item ){
				item.click( function( e ){
					var hash = $(this).attr( 'href' ).match( /#(.+)$/ );
					var menubar = $( '.main-nav' ).first();
					var found;
					
					if( hash.length > 1 ){
						found = $( '[id="'+ hash[1] +'"]' ).first();
						if( found.length > 0 ){
							e.preventDefault();
							
							TweenLite.to(
								$( 'html, body' ),
								.5,
								{
									scrollTop: found.offset().top - menubar.outerHeight( true ),
									ease: Power2.easeInOut,
								}
							);
							
						}
						
					}
					
				} );
				
			})
			( $( '.roll-down' ) );
			
		},
		rezerwacja: function(){
			var addon = root.addon;
			var logger = addon.isLogger();
			var tout = null;
			var meeting = {};
			
			if(logger) console.log('page.rezerwacja()');
			
			if( /type/.test( window.location.search ) ){
				
				/* przełączanie etapów rejestracji */
				(function( view, buttonForm, buttonRegister, side ){
					var current = 0;
					var lock = false;
					var itemWidth = function(){
						return $( view ).children( '.etap:first' ).outerWidth( true ) * current;
						
					};
					
					view.on({
						set: function( e ){
							if( current < 0 ) current = view.children( '.etap' ).length - 1;
							current %= view.children( '.etap' ).length;
							new TimelineLite({
								onComplete: function(){
									lock = false;
									
								},
								
							})
							.add( 'start', 0 )
							.add(
								TweenLite.to(
									view,
									.3,
									{
										scrollLeft: itemWidth(),
										ease: Power2.easeInOut,
									}
								), 'start'
							);
							
						},
						next: function( e ){
							if( !lock ){
								lock = true;
								current++;
								view.triggerHandler( 'set' );
								
							}
							
						},
						prev: function( e ){
							if( !lock ){
								lock = true;
								current--;
								view.triggerHandler( 'set' );
								
							}
						},
						
					});
					
					buttonForm.click( function( e ){
						view.triggerHandler( 'next' );
						$(this).hide();
						
					} );
					
					buttonRegister.click( function( e ){
						var form = $( '#rezerwacja .bot .etap.form form' );
						if( form.triggerHandler( 'test' ) === true ){
							var form_data = {};
							
							$.each( form.serializeArray(), function( num, item ){
								form_data[ item.name ] = item.value;
								
							} );
							
							window.meeting_data = {
								meeting: meeting,
								form: form_data,
								
							};
							
							$.post(
								root.bazar.basePath + '/register?meeting',
								{
									data: meeting,
									form: form_data,
								},
								function( data, status ){
									try{
										console.log( data );
										var resp = JSON.parse( data);
										side.hide();
										view.triggerHandler( 'next' );
										$.getScript( root.bazar.basePath + '/wp-content/themes/edunation/js/googlecal.min.js' );
										$( '#rezerwacja .bot .etap.summary' ).triggerHandler( 'fill', [ resp.status, resp.msg ] )
										
									}
									catch( err ){
										console.error( err );
										
									}
									
								}
							);
							
						}
						
					} );
					
					$( window ).resize( function(){
						window.clearTimeout( tout );
						tout = window.setTimeout(function(){
							view.triggerHandler( 'set' );
							
						}, 200);
						
					} );
					
				})
				( $( '#rezerwacja .bot > .view' ),
				$( '#rezerwacja .side > .button.form' ),
				$( '#rezerwacja .side > .button.register' ),
				$( '#rezerwacja .side' ) );
				
				/* kalendarz */
				(function( kalendarz, date_today_text, date_today_btn, date_range_text, week_next_btn, week_prev_btn, view, days, popup, range, form, submit_btn, mail_btn ){
					// aktualna data
					var now;
					// aktualny dzień tygodnia 0-6 [ niedziela - sobota ]
					var now_wd;
					// początek tygodnia - poniedziałek, godzina 06:00
					var range_start;
					// koniec tygodnia - niedziela, godzina 22:00
					var range_end;
					// minimalny czas trwania przerwy ( w minutach ), by była traktowana jako slot na spotkani
					var free_duration_min = 30;
					var lock = false;
					var inputToDate = function( inputTime ){
						var tDate = new Date( $(inputTime).attr('min_stamp') );
						tDate.setHours( $(inputTime).val().match(/^\d+/)[0] );
						tDate.setMinutes( $(inputTime).val().match(/\d+$/)[0] );
						return tDate;
						
					}
					
					window.TerminManager = {
						// początek dnia pracy dla podanej daty
						day_start_time: function( dateTime ){
							return new Date( new Date( dateTime ).getFullYear(), new Date( dateTime ).getMonth(), new Date( dateTime ).getDate(), 6 );
							
						},
						// koniec dnia pracy dla podanej daty
						day_end_time: function( dateTime ){
							return new Date( new Date( dateTime ).getFullYear(), new Date( dateTime ).getMonth(), new Date( dateTime ).getDate(), 22 );
							
						},
						// pierwszy dzień tygodnia aktualnie wyświetlanego tygodnia
						week_start_day: null,
						// tablica, w formie obiektu, z zajętymi terminami przyporządkowanymi do dni tygodni [ 0 - niedziela, 6 - sobota ]
						terms: [],
						// czyszczenie i przygotowanie do pracy
						clear: function(){
							this.terms = [
								[],
								[],
								[],
								[],
								[],
								[],
								[],
								
							];
							days.empty();
							
						},
						// funkcja inicjująca
						init: function(){
							this.clear();
							this.week_start_day = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay(), 6, 0, 0 );
							
						},
						// funkcja zwracająca wartość matematyczną, która służy do przeliczania pikseli na procenty
						min_factor: function(){
							var hour_factor = $( '#rezerwacja > .bot > .view > .etap.date > .body > .side .cell.hour:first' ).outerHeight() / 60;
							
							return 100 / $( days.first() ).height() * hour_factor;
							
						},
						// dodaje zajęty termin do tablicy
						addBusy: function( startTime, endTime ){
							this.terms[ new Date( startTime ).getDay() ][ new Date( startTime ).getTime() ] = new Date( endTime ).getTime();
							
						},
						// funkcja generująca ( HTML ) pojedynczego terminu
						// type		free/busy
						printTermin: function( startTime, endTime, type ){
							if( new Date( startTime ).getTime() < this.day_start_time( startTime ).getTime() ){
								startTime = this.day_start_time( startTime );
							}
							
							if( new Date( endTime ).getTime() > this.day_end_time( startTime ).getTime() ){
								endTime = this.day_end_time( startTime );
								
							}
							
							if( type === 'free' ){
								
								if( new Date( endTime ) < new Date() ){
									return false;
									
								}
								
								if( new Date( startTime ) < new Date() &&  new Date( endTime ) > new Date()  ){
									startTime = new Date().getTime();
									
								}
								
							}
							
							var termin_offset = Math.floor( ( new Date( startTime ).getTime() - this.day_start_time( startTime ).getTime() ) / ( 60 * 1000 ) );
							var termin_duration = Math.floor( ( new Date( endTime ).getTime() - new Date( startTime ).getTime() ) / ( 60 * 1000 ) );
							
							if( termin_duration < free_duration_min) return false;
							
							days
							.filter( '[wd="' + new Date( startTime ).getDay() + '"]' )
							.append( "<div class='termin " 
							+ type 
							+ " bold alt flex flex-items-start flex-justify-center' style='top: " 
							+ termin_offset * this.min_factor() 
							+ "%; height: " 
							+ termin_duration * this.min_factor() 
							+ "%' start='" 
							+ new Date( startTime ).toISOString() 
							+ "' end='" 
							+ new Date( endTime ).toISOString() 
							+ "' offset='"
							+ termin_offset 
							+ "' duration='" 
							+ termin_duration 
							+ "' offset='"
							+ termin_offset
							+ "' duration='"
							+ termin_duration
							+"'><div class='range'>" 
							+ new Date( startTime ).toLocaleTimeString().match( /^\d+:\d+/ )[0] 
							+ " - " 
							+ new Date( endTime ).toLocaleTimeString().match( /^\d+:\d+/ )[0] 
							+ "</div></div>" );
							
						},
						// funkcja przechodząca po wszystkich terminach
						printTerms: function(){
							var self = this;
							
							for( var wd=0; wd<self.terms.length; wd++ ){
								var prev_busy_start = null;
								var prev_busy_end = null;
								var counter = 0;
								
								for( term_start in self.terms[ wd ] ){
									var start = parseInt( term_start );
									var end = self.terms[ wd ][ term_start ];
									
									this.printTermin( start, end, 'busy' );
									
									if( prev_busy_start === null && start > self.day_start_time( start ).getTime() ){
										this.printTermin( self.day_start_time( start ), new Date( start ), 'free' );
										
									}
									else if( end < self.day_end_time( start ) ){
										this.printTermin( prev_busy_end, new Date( start ), 'free' );
										
									}
									
									prev_busy_start = start;
									prev_busy_end = end;
									
									counter++;
								}
								
								if( prev_busy_end < self.day_end_time( prev_busy_start ) ){
									this.printTermin( prev_busy_end, self.day_end_time( prev_busy_start ), 'free' );
									
								}
								
								if( counter === 0 ){
									var t = new Date( parseInt( date_range_text.attr( 'start' ) ) ).setDate( new Date( parseInt( date_range_text.attr( 'start' ) ) ).getDate() + ( 6 - wd ) );
									
									// console.log( [ this.day_start_time( t ), this.day_end_time( t ) ] );
									
									this.printTermin( this.day_start_time( t ), this.day_end_time( t ), 'free' );
									
									// console.log( wd );
									
								}
								
							}
							
						},
						
					};
					
					kalendarz
					.on({
						init: function( e ){
							gch.freeBusy( range_start.toISOString(), range_end.toISOString() );
							var date_start_text = range_start.toLocaleDateString();
							var date_end_text = range_end.toLocaleDateString();
							
							date_range_text
							.attr({
								start: range_start.getTime(),
								end: range_end.getTime(),
								
							});
							
							for( var i = range_start.getTime(); i <= range_end.getTime(); i += 24*60*60*1000 ){
								days
								.filter('[wd="'+ new Date( i ).getDay() +'"]')
								.siblings( '.name' )
								.text( new Date( i ).toLocaleDateString().match(/^\d+\.\d+/)[0] );
								
							}
							
							if( range_start.getFullYear() !== range_end.getFullYear() ){
								// tydzień na przełomie roku: dd.mm.yyyy - dd.mm.yyyy
								date_range_text
								.text( date_start_text + ' - ' + date_end_text );
								
							}
							else if( range_start.getMonth() !== range_end.getMonth() ){
								// tydzień na przełomie miesięcy: dd.mm - dd.mm.yyyy
								date_range_text
								.text( date_start_text.match( /^\d+\.\d+/ )[0] + ' - ' + date_end_text );
								
							}
							else{
								// standardowa data: dd - dd.mm.yyyy
								date_range_text
								.text( date_start_text.match( /^\d+/ )[0] + ' - ' + date_end_text );
								
							}
							
							if( window.sessionStorage.getItem('swipe_hint') !== "true" ){
								window.sessionStorage.setItem( 'swipe_hint', true );
								$(this).triggerHandler('animation');
								
							}
							
						},
						fill: function( e ){
							TerminManager.init();
							
							$.each( window.freeBusy[ 'kaczanowskii@gmail.com' ].busy, function( num, item ){
								TerminManager.addBusy( item.start, item.end );
								
							});
							
							TerminManager.printTerms();
							
							/* // czyszczenie
							days.empty();
							$( '#rezerwacja > .popup > .box > .segment.foot' ).slideDown();
							
							// zmienna do przeliczania pikseli na procenty ( dla minut )
							var min_factor = function(){
								return 100 / $( days.first() ).outerHeight();
							}
							// console.log( min_factor() );
							
							// console.log( window.freeBusy );
							// dodawanie terminów
							$.each( window.freeBusy[ 'kaczanowskii@gmail.com' ].busy, function( num, item ){
								// obliczenia dla zajętych terminów
								var busy_start_time = new Date( item.start );
								if( busy_start_time.getHours() < 6 ) busy_start_time.setHours( 6 );
								
								var busy_end_time = new Date( item.end );
								if( busy_end_time.getHours() > 22 || busy_end_time.getHours() < 6 ){
									busy_end_time.setDate( busy_start_time.getDate() );
									busy_end_time.setHours( 22 )
								}
								
								var busy_duration_minuts = ( busy_end_time - busy_start_time ) / 60000;
								var busy_day_offset = ( busy_start_time.getHours() - 6 ) * 60 + busy_start_time.getMinutes();
								var busy_wd = busy_start_time.getDay();
								var busy_range_start_text = busy_start_time.toLocaleTimeString().match( /^\d+:\d+/ )[0];
								var busy_range_end_text = busy_end_time.toLocaleTimeString().match( /^\d+:\d+/ )[0];
								var day = days.filter( '[wd="' + busy_wd + '"]' );
								
								//dodawanie wolnych terminów
								var free_start_offset = 0;
								var termin_prev = day.children( '.termin.busy' ).last();
								var free_range_start_time = null;
								if( termin_prev.length > 0 ){
									// dzień posiada zaplanowane terminy
									free_start_offset = termin_prev.position().top + termin_prev.outerHeight( true );
									free_range_start_time = new Date( busy_start_time );
									free_range_start_time.setHours( 6 + Math.floor( free_start_offset / 60 ) );
									free_range_start_time.setMinutes( free_start_offset%60 );
									
								}
								else{
									// dzień nie posiada zaplanowanych terminów
									free_range_start_time = new Date( busy_start_time );
									free_range_start_time.setHours( 6 );
									free_range_start_time.setMinutes( 0 );
									
								}
								
								if( busy_start_time >= new Date() ){
									if( free_range_start_time < new Date() ){
										free_range_start_time = new Date();
										free_range_start_time.setMilliseconds( 0 );
										free_range_start_time.setSeconds( 0 );
										free_start_offset = Math.floor( free_range_start_time.getHours() - 6 ) * 60 + free_range_start_time.getMinutes();
										
									}
									
									var free_duration = ( busy_start_time - free_range_start_time ) / ( 1000 * 60 );
									if( free_duration >= free_duration_min ){
										var free_range_start_text = free_range_start_time.toLocaleTimeString().match( /^\d+:\d+/ )[0];
										var free_range_end_text = busy_range_start_text;
										
										day
										.append( "<div class='termin free bold alt flex flex-items-start flex-justify-center' style='top: " + free_start_offset * min_factor() + "%; height: " + free_duration * min_factor() + "%' start='" + free_range_start_time.toISOString() + "' end='" +  busy_start_time.toISOString() + "'><div class='range'>" + free_range_start_text + " - " + free_range_end_text + "</div></div>" );
										
									}
								
								}
								
								// dodawanie zajętych terminów
								day
								.append( "<div class='termin busy bold alt flex flex-items-start flex-justify-center' style='top: " + busy_day_offset * min_factor() + "%; height: " + busy_duration_minuts * min_factor() + "%' start='" + busy_start_time.toISOString() + "' end='" + busy_end_time.toISOString() + "'><div class='range'>" + busy_range_start_text + " - " + busy_range_end_text + "</div></div>" );
								
							} );
							
							// dodawanie końcowych wolnych terminów
							days.each( function(){
								var last_busy = $(this).children( '.termin.busy' ).last();
								
								if( last_busy.length === 0 ){
									// dzień nie posiada zaplanowanych terminów
									var last_free_start = new Date( range_start );
									last_free_start.setDate( last_free_start.getDate() + $( this ).index() );
									var last_free_end = new Date( last_free_start );
									last_free_end.setHours( 22 );
									last_free_end.setMinutes( 0 );
									
								}
								else{
									// dzień posiada zaplanowane terminy
									
									var last_free_start = new Date( last_busy.attr( 'end' ) );
									var last_free_end = new Date( last_busy.attr( 'end' ) );
									last_free_end.setHours( 22 );
									last_free_end.setMinutes( 0 );
									
								}
								
								if( last_free_end >= new Date() ){
									if( last_free_start < new Date() ){
										last_free_start = new Date();
										last_free_start.setMilliseconds( 0 );
										last_free_start.setSeconds( 0 );
										
									}
									
									var last_free_duration = ( last_free_end - last_free_start ) / ( 1000 * 60 );
									
									if( last_free_duration >= free_duration_min ){
										var last_free_offset = ( last_free_start.getHours() - 6 ) * 60 + last_free_start.getMinutes();
										
										$(this)
										.append( "<div class='termin free bold alt flex flex-items-start flex-justify-center' style='top: " + last_free_offset * min_factor() + "%; height: " + last_free_duration * min_factor() + "%' start='" + last_free_start.toISOString() + "' end='" + last_free_end.toISOString() + "'><div class='range'>" + last_free_start.toLocaleTimeString().match( /\d+:\d+/ )[0] + " - " + last_free_end.toLocaleTimeString().match( /\d+:\d+/ )[0] + "</div></div>" );
										
									}
									
								}
								
							} );
							*/
						},
						reset: function( e ){
							now = new Date();
							now_wd =  now.getDay();
							range_start = new Date( now.getFullYear(), now.getMonth(), now.getDate(), 6 );
							range_start.setDate( now.getDate() - now.getDay() + 1 );
							range_end = new Date( now.getFullYear(), now.getMonth(), now.getDate(), 22 );
							range_end.setDate( now.getDate() + 7 - now.getDay() );
							
						},
						popup: function( e, termin ){
							var range_time_start = new Date( $( termin ).attr( 'start' ) );
							var range_time_end = new Date( $( termin ).attr( 'end' ) );
							var session_price = parseFloat( popup.find( '.price' ).attr( 'price' ) );
							var session_duration = parseInt( popup.find( '.price' ).attr( 'duration' ) );
							var roundTo = function( value, precision ){
								return Math.ceil( value * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
								
							};
							var slider_fill = function( time_start, time_end ){
								try{
									range
									.siblings( '.value' )
									.text( new Date( time_start ).toLocaleTimeString().match( /\d+:\d+/ )[0] + ' - ' + new Date( time_end ).toLocaleTimeString().match( /\d+:\d+/ )[0] )
									.siblings( '.calculate' )
									.text( roundTo( ( time_end - time_start ) / ( 60 * 1000 ) / session_duration * session_price, 2 ) );
									
								}
								catch( err ){
									console.error( {
										input: [time_start, time_end],
										error: err,
										
									} );
									
								}
								
							};
							
							range
							.children( 'input' )
							.attr({
								min: new Date( range_time_start ).toLocaleTimeString().match( /\d+:\d+/ )[0],
								min_stamp: range_time_start.getTime(),
								max: new Date( range_time_end ).toLocaleTimeString().match( /\d+:\d+/ )[0],
								max_stamp: range_time_end.getTime(),
								// step: 5*60,
								
							});
							
							slider_fill( range_time_start, range_time_end );
							
							range
							.children( 'input' )
							.on({
								change: function( e ){
									if( $(this).val() > $(this).attr('max') ) $(this).val( $(this).attr('max') );
									if( $(this).val() < $(this).attr('min') ) $(this).val( $(this).attr('min') );
									
									if( $(this).hasClass('start') ){
										$(this).siblings('.end').attr({
											min: $(this).val(),
											
										});
										
									}
									else{
										$(this).siblings('.start').attr({
											max: $(this).val(),
											
										});
										
									}
									
									slider_fill( inputToDate( range.children('input.start') ), inputToDate( range.children('input.end') ) );
									
								},
								
							})
							.filter( '.start' )
							.attr({
								value: new Date( range_time_start ).toLocaleTimeString().match( /\d+:\d+/ )[0],
								
							})
							.siblings( '.end' )
							.attr({
								value: new Date( range_time_end ).toLocaleTimeString().match( /\d+:\d+/ )[0],
								
							})
							
							// slider.slider( 'destory' );
							/* slider.slider({
								range: true,
								min: range_time_start.getTime(),
								max: range_time_end.getTime(),
								step: 5 * 60 * 1000,
								values: [ range_time_start.getTime(), range_time_end.getTime() ],
								slide: function( e, ui ){
									slider_fill( ui.values[0], ui.values[1] );
									
								},
								
							}); */
							
							popup.addClass( 'open' );
							
						},
						verify: function( e, field ){
							var filters = {
								person: '^[\\D]+$',
								phone: '^(\\+\\d+\\s*)?(\\(\\d+\\)\\s*)?(\\d+(\\s|\\-)*)+$',
								message: '^.*$',
								mail: '(^[^@]+@.+\\..+$)|(^.{0}$)',
								
							}
							
							// weryfikacja całego formularza
							if( typeof field === 'undefined'){
								$( form ).find( "input, textarea" ).each( function(){
									if( new RegExp( filters[ $(this).attr( 'name' ) ], 'gm' ).test( $(this).val() ) ){
										$(this)
										.addClass( 'valid' )
										.removeClass( 'invalid' );
										
									}
									else{
										$(this)
										.addClass( 'invalid' )
										.removeClass( 'valid' );
										
									}
									
								} );
								
								if( form.children( '.valid' ).length === form.children().length ){
									console.log( 'weryfikacja zakończona pomyślnie' );
									
								}
								
							}
							// weryfikacja konkretnego pola
							else{
								if( new RegExp( filters[ $( field ).attr( 'name' ) ], 'gm' ).test( $( field ).val() ) ){
									$( field )
									.addClass( 'valid' )
									.removeClass( 'invalid' );
									
								}
								else{
									$( field )
									.addClass( 'invalid' )
									.removeClass( 'valid' );
									
								}
								
								
							}
							
							
						},
						notify: function( e, status, msg ){
							popup
							.find( '.segment.msg' )
							.hide()
							.removeClass( 'success fail' )
							.addClass( status )
							.html( msg )
							.slideDown();
							/* .one( 'click', function( e ){
								$( this ).slideUp( 'slow' );
								
							} ); */
							
						},
						animation: function( e ){
							var layer = $('#swipe_hint');
							
							var TL = new TimelineLite({
								onStart: function(){
									layer.addClass('open');
									
								},
								onComplete: function(){
									layer.removeClass('open')
									
								},
								align: 'sequence',
								
							})
							.add(
								TweenLite.fromTo(
									layer,
									.3,
									{
										opacity: 0,
									},
									{
										opacity: 1,
									}
								)
								
							)
							.add(
								TweenLite.fromTo(
									layer.children( 'img' ),
									.2,
									{
										opacity: 0,
										xPercent: -50,
									},
									{
										opacity: 1,
									}
								)
								
							)
							.add(
								TweenLite.to(
									layer.children( 'img' ),
									2,
									{
										xPercent: 50,
									}
								)
								
							)
							.add(
								TweenLite.to(
									layer.children( 'img' ),
									2,
									{
										xPercent: -50,
									}
								)
								
							)
							.add(
								TweenLite.to(
									layer,
									.3,
									{
										opacity: 0,
									}
								)
								
							)
							
						},
						mail: function( e ){
							$(this).triggerHandler( 'verify' );
							if( form.children('.input').length === form.children('.input.valid').length ){
								var data = form.serializeArray();
								
								data.push({
									name: 'date',
									value: new Date( parseInt( range.children('.start').attr('min_stamp') ) ).toLocaleDateString(),
								});
								
								data.push({
									name: 'time',
									value: range.children('.start').val() + " - " + range.children('.end').val(),
								});
								
								data.push({
									name: 'type',
									value: $( '#rezerwacja > .popup > .box > .segment.head > .type' ).text().trim(),
								});
								
								console.log( data );
								
								$.post(
									'../register-mail',
									data,
									function( data, status ){
										// console.log( data );
										var resp = JSON.parse( data );
										
										if( resp.status === 'success' ){
											$( '#rezerwacja > .popup > .box > .segment.foot' )
											.slideUp();
										}
										
										$( '#rezerwacja > .bot > .view > .etap.date' )
										.triggerHandler( 'notify', [ resp.status, resp.msg ] );
										
									}
								);
								
							}
							
						},
						
					});
					
					view
					.on({
						mousewheel: function( e ){
							// console.log( e.deltaFactor * e.deltaX );
							var distanceX = e.deltaFactor * e.deltaX;
							if( !lock && Math.abs( distanceX ) >= 200 ){
								lock = true;
								if( e.deltaX > 0 ){
									view.triggerHandler( 'slideRight' );
									
								}
								else{
									view.triggerHandler( 'slideLeft' );
									
								}
								
								window.setTimeout( function(){
									lock = false;
								}, 500 );
								
							}
							
						},
						slideRight: function( e ){
							// console.log( 'slideRight' );
							var self = $(this);
							
							if( self.prop('scrollLeft') === 0 ){
								week_prev_btn.trigger('click');
								
								TweenLite.to(
									view,
									0.3,
									{
										scrollLeft: self.prop('scrollWidth') - self.width(),
										
									}
								);
								
							}
							else{
								TweenLite.to(
									view,
									0.3,
									{
										scrollLeft: self.prop( 'scrollLeft' ) - self.outerWidth(),
										
									}
								);
								
							}
							
							
						},
						slideLeft: function( e ){
							// console.log( 'slideLeft' );
							var self = $(this);
							
							if( self.prop('scrollLeft') + self.width() + 5 >= self.prop('scrollWidth') ){
								week_next_btn.trigger('click');
								
								TweenLite.to(
									view,
									0.3,
									{
										scrollLeft: 0,
										
									}
								);
								
							}
							else{
								TweenLite.to(
									view,
									0.3,
									{
										scrollLeft: self.prop( 'scrollLeft' ) + self.outerWidth(),
										
									}
								);
								
							}
							
						},
						
					})
					.swipe({
						swipeLeft: function( e ){
							$(this).triggerHandler( 'slideLeft' );
							
						},
						swipeRight: function( e ){
							$(this).triggerHandler( 'slideRight' );
							
						},
						
					});
					
					kalendarz.triggerHandler( 'reset' );
					
					week_next_btn
					.click( function(){
						range_start.setDate( range_start.getDate() + 7 );
						range_end.setDate( range_end.getDate() + 7 );
						kalendarz.triggerHandler( 'init' );
						
					} );
					
					week_prev_btn
					.click( function(){
						range_start.setDate( range_start.getDate() - 7 );
						range_end.setDate( range_end.getDate() - 7 );
						kalendarz.triggerHandler( 'init' );
						
					} );
					
					date_today_btn
					.click( function(){
						kalendarz.triggerHandler( 'reset' );
						kalendarz.triggerHandler( 'init' );
						
					} );
					
					days.on( 'click', '.termin.free', function( e ){
						kalendarz.triggerHandler( 'popup', $(this) );
						
					} );
					
					popup.click( function( e ){
						$( this ).removeClass( 'open' );
						
					} );
					
					popup.children( '.box' ).click( function( e ){
						e.stopPropagation();
						
					} );
					
					submit_btn.click( function(){
						kalendarz.triggerHandler( 'verify' );
						
						// formularz wypełniony poprawnie
						if( form.children( '.input.valid' ).length === form.children().length ){
							var start = range.children('.start');
							var end = range.children('.end');
							
							gch.addEvent(
								// new Date( slider.slider( 'values', 0 ) ).toISOString(),
								// new Date( slider.slider( 'values', 1 ) ).toISOString(),
								inputToDate( start ).toISOString(),
								inputToDate( end ).toISOString(),
								popup.find( '.head .type' ).text().trim() + ' [' + form.find( 'input[name="person"]' ).val() + ']',
								'Telefon kontaktowy:\r\n' + form.find( 'input[name="phone"]' ).val() + '\r\n\r\nWiadomość:\r\n' + form.find( 'textarea' ).val()
								
							);
							
						}
						
					} );
					
					form
					.find( 'input, textarea' )
					.blur( function( e ){
						kalendarz.triggerHandler( 'verify', $( this ) );
						
					} );
					
					mail_btn.click( function( e ){
						kalendarz.triggerHandler( 'mail' );
						
					} );
					
					// inicjalizacja kalendarza przeniesiona do gchandler.js
					// kalendarz.triggerHandler( 'init' );
					
				})
				(
					$( '#rezerwacja > .bot > .view > .etap.date' ),
					$( '#rezerwacja > .bot > .view > .etap.date > .head > .today' ),
					$( '#rezerwacja > .bot > .view > .etap.date > .head > .button' ),
					$( '#rezerwacja > .bot > .view > .etap.date > .head > .month > .name' ),
					$( '#rezerwacja > .bot > .view > .etap.date > .head > .month > .nav.next' ),
					$( '#rezerwacja > .bot > .view > .etap.date > .head > .month > .nav.prev' ),
					$( '#rezerwacja > .bot > .view > .etap.date > .body > .content' ),
					$( '#rezerwacja > .bot > .view > .etap.date > .body > .content > .day > .cell.day' ),
					$( '#rezerwacja > .popup' ),
					$( '#rezerwacja > .popup .body .range' ),
					$( '#rezerwacja > .popup .body .form' ),
					$( '#rezerwacja > .popup .foot .submit' ),
					$( '#rezerwacja > .popup .foot #mail' )
				);
				
				/* ekran podsumowania */
				(function( summary, title, subtitle, table, data, data_alt, name, info, google ){
					
					summary
					.on({
						fill: function( e, result, msg ){
							var meeting = window.meeting_data;
							var month_name = [ 'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia' ];
							var day_name = [ 'niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota' ];
							var t_date = new Date( meeting.meeting.date.year, meeting.meeting.date.month, meeting.meeting.date.day, meeting.meeting.date.hour, meeting.meeting.date.minute );
							
							if( result === 'ok' ){
								table.show();
								title.text( 'Wspaniale '+ meeting.form.imie +'! Twoje zgłoszenie zostało pomyślnie dodane.' );
								subtitle.text( 'Otrzymasz potwierdzenie drogą mailową, czy termin spotkania został zaakceptowany.' );
								data.text( meeting.meeting.date.day + ' ' + month_name[ t_date.getDay() ] );
								data_alt.text( day_name[ t_date.getDay() ] + ' ' + t_date.getHours() + ':' + t_date.getMinutes() );
								name.text( meeting.meeting.type );
								info.text( meeting.meeting.duration + ' min | ' + meeting.meeting.price + ' zł' );
								
							}
							else{
								table.hide();
								title.text( 'Twoje zgłoszenie zostało odrzucone przez serwer.' );
								subtitle.html( 'Powód: ' + msg + '<br>Za chwilę nastąpi przekierowanie');
								window.setTimeout(function(){
									window.location.reload();
									
								},3000);
								
							}
							
						},
						
					});
					
					google.click( function( e ){
						$.getScript( 'https://apis.google.com/js/api.js', function( data, status ){
							if( status === 'success' ) handleClientLoad();
							
						} );
						
					} );
					
				})
				( $( '#rezerwacja .bot .etap.summary' ), 
				$( '#rezerwacja .bot .etap.summary > .title' ), 
				$( '#rezerwacja .bot .etap.summary > .subtitle' ), 
				$( '#rezerwacja .bot .etap.summary > .table' ), 
				$( '#rezerwacja .bot .etap.summary > .table > .left > .title' ), 
				$( '#rezerwacja .bot .etap.summary > .table > .left > .subtitle' ), 
				$( '#rezerwacja .bot .etap.summary > .table > .right > .title' ), 
				$( '#rezerwacja .bot .etap.summary > .table > .right > .subtitle:first' ), 
				$( '#rezerwacja .bot .etap.summary > .table > .right > .button' ) );
				
			}
			
			
		},
		spotkania: function(){
			var addon = root.addon;
			var logger = addon.isLogger();
			
			if(logger) console.log('page.spotkania()');
			
			/* spotkania - kafelki */
			(function( kafelki, body, foot, btn_accept, btn_cancel, btn_remove ){
				body.add( foot ).hide();
				
				kafelki
				.on({
					mouseenter: function( e ){
						$(this)
						.find( '.body, .foot' )
						.slideDown();
						
					},
					mouseleave: function( e ){
						$(this)
						.find( '.body, .foot' )
						.slideUp();
						
					},
					
				});
				
				btn_accept.click( function( e ){
					e.preventDefault();
					var id = $(this).parents( '.item:first' ).attr( 'item' );
					window.meeting_selected = window.meetings[ id ];
					window.meeting_btn = $(this)[0];
					window.meeting_url = $(this).attr( 'href' );
					
					$.getScript( root.bazar.basePath + '/wp-content/themes/edunation/js/googlecal_meeting.min.js', function( data, status ){
						if( status === 'success' ){
							$.getScript( 'https://apis.google.com/js/api.js', function( data, status ){
								if( status === 'success' ) handleClientLoad();
								
							} );
							
						}
						
					} );
					
					
				} );
				
			})
			( $( '#spotkania > .kafelki > .item' ), 
			$( '#spotkania > .kafelki > .item > .box > .body' ), 
			$( '#spotkania > .kafelki > .item > .box > .foot' ),
			$( '#spotkania > .kafelki > .item > .box > .foot > .button.accept' ), 
			$( '#spotkania > .kafelki > .item > .box > .foot > .button.cancel' ), 
			$( '#spotkania > .kafelki > .item > .box > .foot > .button.remove' ) );
			
		},
		
	}
	
	$(function(){
		root.launcher();
	});
	
})();