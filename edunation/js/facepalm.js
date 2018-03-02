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
		// basePath: '/PiotrM/wp_edunation',		// ścieżka do podfolderu ze stroną (np: /adres/do/podfolderu, albo wartość pusta )
		basePath: '',		// ścieżka do podfolderu ze stroną (np: /adres/do/podfolderu, albo wartość pusta )
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
				(function( kalendarz, date_today_text, date_today_btn, date_range_text, week_next_btn, week_prev_btn, days ){
					// aktualna data
					var now;
					// aktualny dzień tygodnia 0-6 [ niedziela - sobota ]
					var now_wd;
					// początek tygodnia - poniedziałek, godzina 06:00
					var range_start;
					// koniec tygodnia - niedziela, godzina 22:00
					var range_end;
					
					kalendarz
					.on({
						init: function( e ){
							gch.freeBusy( range_start.toISOString(), range_end.toISOString() );
							var date_start_text = range_start.toLocaleDateString();
							var date_end_text = range_end.toLocaleDateString();
							
							if( range_start.getFullYear() !== range_end.getFullYear() ){
								// tydzień na przełomie roku: dd.mm.yyyy - dd.mm.yyyy
								date_range_text
								.text( date_start_text + ' - ' + date_end_text );
								
							}else if( range_start.getMonth() !== range_end.getMonth() ){
								// tydzień na przełomie miesięcy: dd.mm - dd.mm.yyyy
								date_range_text
								.text( date_start_text.match( /^\d+\.\d+/ )[0] + ' - ' + date_end_text );
								
							}
							else{
								// standardowa data: dd - dd.mm.yyyy
								date_range_text
								.text( date_start_text.match( /^\d+/ )[0] + ' - ' + date_end_text );
								
							}
							
						},
						fill: function( e ){
							// czyszczenie
							days.empty();
							
							console.log( window.freeBusy );
							// dodawanie terminów
							var free_duration_min = 30;
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
									free_start_offset = termin_prev.position().top + termin_prev.outerHeight( true );
									free_range_start_time = new Date( busy_start_time );
									free_range_start_time.setHours( 6 + Math.floor( free_start_offset / 60 ) );
									free_range_start_time.setMinutes( free_start_offset%60 );
									
								}
								else{
									free_range_start_time = new Date( busy_start_time );
									free_range_start_time.setHours( 6 );
									free_range_start_time.setMinutes( 0 );
									
								}
								
								var free_duration = busy_day_offset - free_start_offset;
								if( free_duration >= free_duration_min ){
									var free_range_start_text = free_range_start_time.toLocaleTimeString().match( /^\d+:\d+/ )[0];
									var free_range_end_text = busy_range_start_text;
									
									day
									.append( "<div class='termin free bold alt flex flex-items-start flex-justify-center' style='top: " + free_start_offset + "px; height: " + free_duration + "px' start='" + free_range_start_time.toISOString() + "' end='" +  busy_start_time.toISOString() + "'><div class='range'>" + free_range_start_text + " - " + free_range_end_text + "</div></div>" );
									
								}
								
								// dodawanie zajętych terminów
								day
								.append( "<div class='termin busy bold alt flex flex-items-start flex-justify-center' style='top: " + busy_day_offset + "px; height: " + busy_duration_minuts + "px' start='" + busy_start_time.toISOString() + "' end='" + busy_end_time.toISOString() + "'><div class='range'>" + busy_range_start_text + " - " + busy_range_end_text + "</div></div>" );
								
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
								
								var last_free_duration = ( last_free_end - last_free_start ) / ( 1000 * 60 );
								
								if( last_free_duration >= free_duration_min ){
									var last_free_offset = ( last_free_start.getHours() - 6 ) * 60 + last_free_start.getMinutes();
									
									$(this)
									.append( "<div class='termin free bold alt flex flex-items-start flex-justify-center' style='top: " + last_free_offset + "px; height: " + last_free_duration + "px' start='" + last_free_start.toISOString() + "' end='" + last_free_end.toISOString() + "'><div class='range'>" + last_free_start.toLocaleTimeString().match( /\d+:\d+/ )[0] + " - " + last_free_end.toLocaleTimeString().match( /\d+:\d+/ )[0] + "</div></div>" );
									
								}
								
							} );
							
						},
						reset: function( e ){
							now = new Date();
							now_wd =  now.getDay();
							range_start = new Date( now.getFullYear(), now.getMonth(), now.getDate(), 6 );
							range_start.setDate( now.getDate() - now.getDay() + 1 );
							range_end = new Date( now.getFullYear(), now.getMonth(), now.getDate(), 22 );
							range_end.setDate( now.getDate() + 7 - now.getDay() );
							
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
					$( '#rezerwacja > .bot > .view > .etap.date > .body > .content > .day > .cell.day' )
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