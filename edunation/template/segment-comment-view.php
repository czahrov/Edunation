<!-- cooment view -->
<div id='comment_view'>
<?php
	$comments = get_comments( array(
		'post_id' => get_post()->ID,
		'order' => 'ASC',
		'order_by' => 'comment_parent, comment_post_ID',
		'status' => 'approve',
		'parent' => 0,
		
	) );
	
	if( empty( $comments ) ):
?>
<p class="comment-nr col-12">
	Jeszcze nikt nie komentował tego arytukłu.<br>Twój komentarz może być pierwszy!
</p>
<?php else: ?>
<p class="comment-nr col-12">
	<span>
		<?php echo get_comments_number( get_post()->ID ); ?>
	</span>
	komentarzy
</p>
<?php
	commentPrinter( get_post()->ID, 0, $comments );
 ?>
<?php endif; ?>


<!--
<?php
	// print_r( $comments );
?>
-->
</div>