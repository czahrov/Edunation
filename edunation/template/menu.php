<nav class="main-nav">
	<div class="navigation-bar grid padding flex flex-justify-between flex-items-center">
		<a class="logo;" href="<?php echo home_url(''); ?>">
			<img src="<?php echo get_template_directory_uri(); ?>/img/logo_edunation.jpg" alt="Edunation" class="logo-img">
		</a>
		
		<div class="ham-box hide-ml">
			<div class="hamburger">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	
		<ul class="navigation flex flex-column flex-row-ml flex-items-center-ml font-basic-medium no-shrink closed">
			<li><a href="<?php echo home_url( '#busines-english' ); ?>">Business English</a></li>
			<li><a href="<?php echo home_url( '#general-english' ); ?>">General English</a></li>
			<li><a href="<?php echo home_url( '#sessions' ); ?>">1:1 sessions</a></li>
			<li><a href="<?php echo home_url( '#mummy' ); ?>">Mummy Daddy!</a></li>
			<li><a href="<?php echo home_url( 'rezerwacja' ); ?>" class="font-secondary-bold">Rezerwuj online</a></li>
		</ul>
	</div>
</nav>