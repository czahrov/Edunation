<nav class="main-nav">
	<div class="navigation-bar grid padding flex flex-justify-between flex-items-center">
		<a class="logo;" href="<?php echo home_url(''); ?>">
			<img src="/img/logo_edunation.png" alt="Edunation" class="logo-img">
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
			<li><a href="<?php echo home_url( 'blog' ); ?>">Blog</a></li>
			<li class='last'><a href="<?php echo home_url( 'rezerwacja' ); ?>" class="font-secondary-bold">Rezerwuj online</a></li>
			<li class='call pointer'>
				<a href='tel:+48889747241' class='flex flex-column flex-items-center'>
					<img class='icon'/ src='/img/icon_tel.png'>
					<div class='text'>889 747 241</div>
					
				</a>
			</li>
			<li class='call pointer'>
				<a href='skype:edunation_lucas?call' class='flex flex-column flex-items-center'>
					<img class='icon'/ src='/img/icon_skype.png'>
					<div class='text'>edunation_lucas</div>
					
				</a>
			</li>
			
		</ul>
	</div>
</nav>