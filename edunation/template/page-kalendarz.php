<?php
/*
	Template Name: Kalendarz google
*/
	get_header();
?>

<!--NAVIGATION -->
<body id="kalendarz">
	<header>
		<nav class="main-nav">
			<?php get_template_part("template/menu"); ?>
		</nav>
		
	</header>
<!--BLOG-->
	
	
<div id="content">
	<div id='wsite-content' class='wsite-elements wsite-not-footer'>
		<h2 style="text-align:left;">Kalendarz Skype<br /></h2>
		<iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;mode=WEEK&amp;height=700&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=kaczanowskii%40gmail.com&amp;color=%232952A3&amp;ctz=Europe%2FWarsaw" style="border-width:0" width="100%" height="700" frameborder="0" scrolling="no"></iframe>
		<div style="height: 10px; overflow: hidden;"></div>
	</div>
</div>
	
	
	<div class="line"></div>


<?php get_footer(); ?>