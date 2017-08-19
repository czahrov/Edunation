<?php get_header();?>

<body id="home">
	<header>
		<?php get_template_part("template/menu"); ?>

		
		<div class="header-main flex flex-justify-between">
			<div class="grid padding flex">
				<div class="header-content flex flex-column no-shrink">
					<h1 class="font-basic-light"><span class="underline-closking">Hello to you! </span><span>My name is Lucas.</span></h1>
					<p class="font-basic-bold"><span>Let's design your </span> <span>English excellence.</span></p>
					<a href="#busines-english"><div class="angle"><i class="fa fa-angle-down fa-4x" aria-hidden="true"></i></div></a>
				</div>
				<div class="img-box grow">
					<img class="header-img shrink" src="<?php echo get_template_directory_uri(); ?>/img/header.png" alt="Lucas">
				</div>
			</div>
		</div>
	</header>
<!-- Business -->
	<div class="business" id="busines-english">
		<div class="business-content grid padding flex flex-column flex-justify-center">
			<div class="title1 font-basic-regular">Business English</div>
			<div class="title2 font-basic-bold">Bo dobry English to Twój biznes.</div>
		</div>
		<a href="#business-training" class="roll-down flex flex-items-center flex-justify-center pointer-inner arrow-box-down"><img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png"></a>
	</div>
<!-- TRAINING -->
	<div class="training" id="business-training">
		<div class="wrapper flex no-wrap">
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/1.png"></div>
					<div class="title font-secondary-bold">Szkolenia grupowe <span class="block">business</span></div>
					<div class="text">Twoja kadra profesjonalna <span class="block">w każdym calu.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/2.png"></div>
					<div class="title font-secondary-bold">Business 1:1 <span class="block">w firmie</span></div>
					<div class="text">Zaprojektujmy wspólnie Twój <span class="block">profesjonalny wizerunek w biznesie.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/3.png"></div>
					<div class="title font-secondary-bold">Business 1:1 <span class="block">w firmie</span></div>
					<div class="text">Idealne dopasowanie do <span class="block">Twojego rytmu dnia.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>

			<div class="pagination">
				<div class="pager active"></div>
				<div class="pager"></div>
				<div class="pager"></div>
			</div>
		</div>
	</div>
<!-- REVIEWS -->
	<div class="reviews">
		<div class="inner grid padding">
			<div class="title font-secondary-bold">Power your business<span class="block">with edunation</span></div>
			<div class="sub-title">Współpracują ze mną w 2017</div>
			
			<div class="container flex flex-items-center flex-justify-center">
				<div class="arrow flex flex-items-center flex-justify-center no-shrink"><i class="fa fa-angle-left fa-angle-thin fa-3x" aria-hidden="true"></i></div>
				<div class="wrapper grow flex flex-nowrap">
					<div class="box base1 no-shrink flex flex-column flex-items-center">
						<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/domus.png" alt="domus"></div>
						<div class="quote font-basic-medium">"Ekspert, motywator, łączący solidne wykształcenie z finezją prowadzenia sesji szkoleniowych."</div>
						<ul class="author">
							<li>Kinga Kurkowska</li>
							<li>Senior KAM Pfizer</li>
							<li>k.kurkowska@pfizer.eu</li>
						</ul>
					</div>
				
					
					<div class="box base1 no-shrink"></div>
					<div class="box base1 no-shrink"></div>
				
				</div>
				<div class="avatar" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/ikony/avatar.png);"></div>
				
				
				<div class="arrow arrow-right flex flex-items-center flex-justify-center no-shrink"><i class="fa fa-angle-right fa-angle-thin fa-3x" aria-hidden="true"></i></div>
			</div>
		</div>
		<div class="pagination">
			<div class="pager active"></div>
			<div class="pager"></div>
			<div class="pager"></div>
		</div>
	</div>
<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title"><span class="block inline-mm">Szkolenia dla pracowników, </span><span class="block inline-mm">zajęcia indywidualne?</span></div>
				<div class="title font-basic-bold">Porozmawiajmy o Twoim biznesie</div>
			</div>
			<a href="#" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster.jpg);"></div>
	</div>
<!-- Business -->
	<div class="business"  id="general-english">
		<div class="business-content grid padding flex flex-column flex-justify-center">
			<div class="title1 font-basic-regular">General English</div>
			<div class="title2 font-basic-bold">Bo chcemy sobie zawsze poradzić.</div>
		</div>
		<a href="#general-training" class="roll-down flex flex-items-center flex-justify-center pointer-inner arrow-box-down"><img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png"></a>
	</div>
<!-- TRAINING -->
	<div class="training training2" id="general-training">
		<div class="wrapper flex no-wrap">
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/4.png"></div>
					<div class="title font-secondary-bold">Kariera za granicą</div>
					<div class="text">Wszyscy chcemy pewności siebie. <span class="block">Zbudujmy ją razem.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/5.png"></div>
					<div class="title font-secondary-bold">Podróżowanie</div>
					<div class="text">Świadomość poradzenia sobie <span class="block">w każdej sytuacji. Bezcenne.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/6.png"></div>
					<div class="title font-secondary-bold">AB ...CV</div>
					<div class="text">Przygotuję Twój profesjonalny wizerunek<span class="block">w przyszłej pracy.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>

			<div class="pagination">
				<div class="pager active"></div>
				<div class="pager"></div>
				<div class="pager"></div>
			</div>
		</div>
	</div>
<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster2.jpg);"></div>
	</div>
<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title">Chcesz studiować, pracować za granicą, wyjeżdzasz?</div>
				<div class="title font-basic-bold">Przygotuję Cię językowo</div>
			</div>
			<a href="#" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
<!-- POSTER -->





	<div class="poster">
		<div class="pic">
			<div class="video-viewport">
				<video width="1920" height="1280" autoplay muted loop>
					<source src="<?php echo get_template_directory_uri(); ?>/media/peron.webm" type="video/webm" />
					<source src="<?php echo get_template_directory_uri(); ?>/media/peron.mp4" type="video/mp4" />
				</video>
			</div>
		</div>
	</div>	
	
	
	
	
	
	<!-- Business Sessions-->
	<div class="business">
		<div class="business-content grid padding flex flex-column flex-justify-center" id="sessions">
			<div class="title1 font-basic-regular">1:1 Sessions</div>
			<div class="title2 font-basic-bold">Bo razem podnosimy poprzeczkę.</div>
		</div>
		<a href="#sessions-training" class="roll-down flex flex-items-center flex-justify-center pointer-inner arrow-box-down"><img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png"></a>
	</div>
<!-- TRAINING -->
	<div class="training training2" id="sessions-training">
		<div class="wrapper flex no-wrap">
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/7.png"></div>
					<div class="title font-secondary-bold">100% Target</div>
					<div class="text">Moje 100% uwagi, Twój cel <span class="block">nasz wspólny wynik.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">Zobacz Film</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/8.png"></div>
					<div class="title font-secondary-bold">Ready steady talk!</div>
					<div class="text">Mówisz od pierwszych zajęć.</div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">Sprawdź</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/9.png"></div>
					<div class="title font-secondary-bold">Aim: Exam</div>
					<div class="text">Najszybsza i najskuteczniejsza <span class="block">droga do Twojego celu.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>

			<div class="pagination">
				<div class="pager active"></div>
				<div class="pager"></div>
				<div class="pager"></div>
			</div>
		</div>
	</div>	
<!-- POSTER -->
	<div class="poster">
			<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster4.jpg);"></div>
	</div>
<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title">Konkretny cel?</div>
				<div class="title font-basic-bold">Twój sukces, moim sukcesem</div>
			</div>
			<a href="#" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
<!-- POSTER -->
	<div class="poster">
			<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster5.jpg);"></div>
	</div>
<!-- Business MUMMY -->
	<div class="business">
		<div class="business-content grid padding flex flex-column flex-justify-center" id="mummy">
			<div class="title1 font-basic-regular">Mummy, Daddy I can speak English!</div>
			<div class="title2 font-basic-bold">Bo im szybciej, tym płynniej.</div>
		</div>
		<a href="#mummy-training" class="roll-down flex flex-items-center flex-justify-center pointer-inner arrow-box-down"><img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png"></a>
	</div>
<!-- TRAINING -->
	<div class="training training2" id="mummy-training">
		<div class="wrapper flex no-wrap">
			<div class="box flex no-shrink base1 base2-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/10.png"></div>
					<div class="title font-secondary-bold">Power kid 1:1</div>
					<div class="text">Angielski dla dzieci + <span class="block">100% zanurzenia w języku.</span></div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">Zobacz naszą pracę</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>
			<div class="box flex no-shrink base1 base2-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/11.png"></div>
					<div class="title font-secondary-bold">Power kid Skype</div>
					<div class="text">Twoje dziecko + tablet = Mission Possible.</div>
					<a href="single.html" class="button flex flex-items-center flex-justify-center font-basic-bold">Sprawdź</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/1-Business.jpg);"></div>
			</div>

			<div class="pagination">
				<div class="pager active"></div>
				<div class="pager"></div>
			</div>
		</div>
	</div>
<!-- POSTER -->
	<div class="poster">
		<div class="pic">
			<div class="video-viewport">
				<video width="1920" height="1280" autoplay muted loop>
					<source src="<?php echo get_template_directory_uri(); ?>/media/peron.webm" type="video/webm" />
					<source src="<?php echo get_template_directory_uri(); ?>/media/peron.mp4" type="video/mp4" />
				</video>
			</div>
		</div>
	</div>	
	
<!-- REVIEWS -->
	<div class="reviews reviews2">
		<div class="inner grid padding">
			<div class="title font-secondary-bold">Przeczytaj opinie<span class="block">rodziców</span></div>
			
			<div class="container flex flex-items-center flex-justify-center">
				<div class="arrow flex flex-items-center flex-justify-center no-shrink"><i class="fa fa-angle-left fa-angle-thin fa-3x" aria-hidden="true"></i></div>
				<div class="wrapper grow flex flex-nowrap">
					<div class="box base1 no-shrink flex flex-column flex-items-center">
						<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/skype.png" alt="skype"></div>
						<div class="quote font-basic-medium">"Wow!<br>Nadia jest zachwycona.<br> Świetne zajęcia<br> w nowoczesnej oprawie."</div>
						<ul class="author">
							<li>Kinga</li>
							<li>mama 7-letniej Nadii</li>
						</ul>
					</div>
				
					
					<div class="box base1 no-shrink"></div>
					<div class="box base1 no-shrink"></div>
				
				</div>
				<div class="avatar" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/ikony/avatar.png);"></div>
				
				
				<div class="arrow arrow-right flex flex-items-center flex-justify-center no-shrink"><i class="fa fa-angle-right fa-angle-thin fa-3x" aria-hidden="true"></i></div>
			</div>
		</div>
		<div class="pagination">
			<div class="pager active"></div>
			<div class="pager"></div>
			<div class="pager"></div>
		</div>
	</div>
<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title">To jak, zaczynamy?</div>
				<div class="title font-basic-bold">Razem znajdziemy wspólny język.</div>
			</div>
			<a href="single.html" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster7.jpg);"></div>
	</div>	

<!-- Contact -->
<div class="contact flex flex-column flex-row-ml">
	<div class="box base1 base3-ml">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title font-basic-extrabold">Contact <span class="pretty">me</span></div>
			<div class="text font-secondary-medium">889-774-241</div>
			<div class="text font-secondary-medium">lucas@edunation.pl</div>
			<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/skype.png" alt="skype"></div>
			<div class="text font-secondary-medium">edunation_lucas</div>
		</div>
	</div>
	<div class="box base1 base3-ml">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title font-basic-extrabold">Tell <span class="pretty">me</span></div>
			<div class="text font-secondary-medium">Masz pytania? Mam odpowiedzi!</div>
			<form>
				<div class="wrapper flex flex-wrap flex-justify-center">
					<div class="personal base1 base2-mm no-shrink">
						<input type="text" id="name" name="name" placeholder="Imię">
						<input type="email" id="email" name="email" placeholder="E-mail">
						<input type="text" id="subject" name="subject" placeholder="Temat">
					</div>
					<div class="message base1 base2-mm no-shrink">
						<textarea placeholder="Wiadomość"></textarea>
					</div>
					<button class="font-secondary-bold">wyślij</button>
				</div>
			</form>
		</div>
	</div>
	<div class="box base1 base3-ml">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title font-basic-extrabold">Find <span class="pretty">me</span></div>
			<div class="text font-secondary-medium">Jestem tutaj! I nieźle sobie radzę</div>
			<div class="social flex flex-justify-between">
				<a href="#" target="_blank" class="icon flex flex-items-center flex-juitify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/in.png" alt="in"></a>
				<a href="#" target="_blank" class="icon flex flex-items-center flex-justify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/fb.png" alt="facebook"></a>
				<a href="#" target="_blank" class="icon flex flex-items-center flex-justify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/instagram.png" alt="instagram"></a>
				<a href="#" target="_blank" class="icon flex flex-items-center flex-justify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/yt.png" alt="youtube"></a>
			</div>
		</div>
	</div>
</div>

<div class="line"></div>


<!-- FOOTER -->
<?php get_footer(); ?>