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
			
			/* przewijanie strony */
			(function( link ){
				
				link.click( function( e ){
					var hash = $(this).attr( 'href' ).match( /#(.+)/ );
					var menu_h = $( 'body .main-nav' ).first().outerHeight( true );
					
					if( hash !== null ){
						var item = $( '[id="'+ hash[1] +'"]' );
						
						if( item.length > 0 ){
							e.preventDefault();
							var posY = item.first().offset().top - menu_h;
							
							TweenLite.to(
								$( 'html' ),
								.5,
								{
									scrollTop: posY,
									ease: Power2.easeInOut,
								}
							);
							
						}
						
					}
					
				} );
				
			})
			( $( 'ul.navigation > li > a' ) );
			
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
				var delay = 3000;
				var duration = .5;
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
									ease: Power2.easeInOut,
									
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
				var delay = 3000;
				var duration = .5;
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
									ease: Power2.easeInOut,
									
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
				var delay = 3000;
				var duration = 0.3;
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
									ease: Power2.easeInOut,
									
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
				var delay = 3000;
				var duration = 0.3;
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
									ease: Power2.easeInOut,
									
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
				var delay = 3000;
				var duration = 0.3;
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
									ease: Power2.easeInOut,
									
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
				var delay = 3000;
				var duration = 0.3;
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
									ease: Power2.easeInOut,
									
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
				(function( cal, days, monthReset, monthBar, meetingTyp, meetingInfo, meetingDay, meetingTime, meetingButton, registerButton, popup, popupPora, popupTime ){
					/* informacje o wybranym szkoleniu */
					meeting = {
						type: meetingTyp.text().trim(),
						price: parseFloat( meetingInfo.text().match( /(\d+(?:\.\d+)?)\s*zł/ )[1] ),
						duration:  parseInt( meetingInfo.text().match( /(\d+)\s*min/ )[1] ),
						
					};
					
					/* bieżąca data */
					var now = new Date();
					/* uproszczona data początku obecnego miesiąca */
					var nowDay = new Date( now.getFullYear(), now.getMonth() );
					/* data do manipulowania */
					var customDate = new Date( now.getFullYear(), now.getMonth() );
					/* nazwy miesięcy */
					var nazwy = [ 'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień' ];
					
					meetingDay.parent().hide();
					meetingButton.hide();
					registerButton.hide();
					
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
							days.removeClass( 'prev next current disable today' );
							
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
							
							/* oznaczanie dnia obecnego */
							days.filter( '[d='+ now.getDate() +'][m='+ now.getMonth() +'][y='+ now.getFullYear() +']' ).addClass( 'today' );
							
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

								/* pobieranie dostępnych godzin */
								$.get(
									'../register?slots=' + [ meeting.date.day, parseInt( meeting.date.month )+1, meeting.date.year, meeting.duration ].join( ';' ),
									function( data ){
										try{
											// console.log( data );
											var slots = JSON.parse( data );
											console.log( slots );
											
											$.each( slots, function( index, value ){
												var t = new Date( value * 1000 );
												var th = t.getHours();
												var tm = t.getMinutes();
												var pora;
												
												if( th < 12 ){
													pora = 'rano';
													
												}
												else if( th < 17){
													pora = 'popoludnie';
													
												}
												else{
													pora = 'wieczor';
													
												}
												
												var proto = popupPora
												.filter( '[class*="'+ pora +'"]' )
												.children( '.hide' );
												
												proto
												.clone()
												.attr({
													h: th,
													m: tm,
													
												})
												.html( function(){
													var p1 = th.toString().length < 2?( '0' + th ):( th );
													var p2 = tm.toString().length < 2?( '0' + tm ):( tm );
													return p1 + ':' + p2;
													
												} )
												.removeClass( 'hide' )
												.appendTo( proto.parent() );
												
											} );
											
											popup.addClass( 'open' );
											
										}
										catch( err ){
											
										}
									}
								);
								
								
							}
							else if( mode === 'close' ){
								popup
								.find( '.body .item:not(.hide)' )
								.remove();
								
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
					
					cal.find( '.tbody' ).on( 'click', '.tcell.current:not(.disable)', function( e ){
						meeting.date = {
							day: $(this).attr( 'd' ),
							month: $(this).attr( 'm' ),
							year: $(this).attr( 'y' ),
							
						};
						
						cal.triggerHandler( 'time', [ 'open' ] );
						
						// console.log( meeting );
						
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
					popup
					.find( '.box .body' )
					.on( 'click', '.item:not(.hide)', function( e ){
						meeting.date.hour = $(this).attr( 'h' );
						meeting.date.minute = $(this).attr( 'm' );
						var sDay = meeting.date.day.toString().length < 2?( "0" + meeting.date.day ):( meeting.date.day );
						var sHour = meeting.date.hour.toString().length < 2?( "0" + meeting.date.hour ):( meeting.date.hour );
						var sMinute = meeting.date.minute.toString().length < 2?( "0" + meeting.date.minute ):( meeting.date.minute );
						
						meetingDay.text( 'Termin: ' + sDay + ' ' + nazwy[ meeting.date.month ] );
						meetingTime.text( 'Godzina: ' + sHour + '.' + sMinute );
						
						cal.triggerHandler( 'time', [ 'close' ] );
						meetingDay.parent().slideDown();
						meetingButton.slideDown();
						
					} );
					
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
				$( '#rezerwacja .side > .button.form' ),
				$( '#rezerwacja .side > .button.register' ),
				$( '#rezerwacja > .popup' ), 
				$( '#rezerwacja > .popup .body > .pora' ), 
				$( '#rezerwacja > .popup .body .item' ) );
				
				/* walidacja formularza rejestracji */
				(function( form, inputs, buttonRegister ){
					var myForm = [
						{
							name: 'imie',
							item: form.find( '.imie' ),
							filterName: 'imie',
						},
						{
							name: 'mail',
							item: form.find( '.mail' ),
							filterName: 'mail',
						},
						{
							name: 'tel',
							item: form.find( '.tel' ),
							filterName: 'telefon',
						},
						{
							name: 'msg',
							item: form.find( '.msg' ),
							filterName: 'tekst',
						},
						
					];
					
					form
					.on({
						test: function( e ){
							var test = addon.form.verify( myForm );
							if( test === true ){
								buttonRegister.show();
								
							}
							else{
								buttonRegister.hide();
								
							}
							
							return test;
						},
						
					});
					
					inputs.blur( function( e ){
						form.triggerHandler( 'test' );
						
					} );
					
				})
				( $( '#rezerwacja .bot .etap.form form' ), 
				$( '#rezerwacja .bot .etap.form form' ).find( 'input, textarea' ), 
				$( '#rezerwacja .bot > .side > .button.register' ) );
				
				/* ekran podsumowanie */
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