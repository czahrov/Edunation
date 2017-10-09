<?php
add_theme_support('post-thumbnails');

if( !is_admin() ){
	wp_enqueue_style( "fonts", get_template_directory_uri() . "/css/fonts.css", array() );
	wp_enqueue_style( "font-awesome", get_template_directory_uri() . "/css/font-awesome.min.css", array() );
	wp_enqueue_style( "facepalm", get_template_directory_uri() . "/css/facepalm.css", array() );
	wp_enqueue_style( "style", get_template_directory_uri() . "/style.css", array() );
	wp_enqueue_style( "override", get_template_directory_uri() . "/override.css", array() );
	
	wp_enqueue_script( "jQ", get_template_directory_uri() . "/js/jquery.js" );
	wp_enqueue_script( "jQGSAP", get_template_directory_uri() . "/js/jquery.gsap.min.js" );
	wp_enqueue_script( "TweenLite", get_template_directory_uri() . "/js/TweenLite.min.js" );
	wp_enqueue_script( "TimelineLite", get_template_directory_uri() . "/js/TimelineLite.min.js" );
	wp_enqueue_script( "CSSPlugin", get_template_directory_uri() . "/js/CSSPlugin.min.js" );
	wp_enqueue_script( "ScrollTo", get_template_directory_uri() . "/js/ScrollToPlugin.min.js" );
	wp_enqueue_script( "RoundProps", get_template_directory_uri() . "/js/RoundPropsPlugin.min.js" );
	wp_enqueue_script( "main", get_template_directory_uri() . "/js/main.js" );
	wp_enqueue_script( "facepalm", get_template_directory_uri() . "/js/facepalm.js" );

}


$args = array(
	'numberposts' => 10,
	'offset' => 0,
	'category' => 0,
	'orderby' => 'post_date',
	'order' => 'DESC',
	'include' => '',
	'exclude' => '',
	'meta_key' => '',
	'meta_value' =>'',
	'post_type' => 'post',
	'post_status' => 'draft, publish, future, pending, private',
	'suppress_filters' => true
);

$recent_posts = wp_get_recent_posts( $args, ARRAY_A );

add_action( 'print_page_title', function( $arg ){
	$site_title = get_bloginfo( 'name' );
	
	if( is_home() ){
		printf( "%s | %s", 'Strona główna', $site_title );
		
	}
	else{
		$page_title = get_post()->post_title;
		printf( "%s | %s", $page_title, $site_title );
		
	}	
	
} );

date_default_timezone_set( 'Europe/Warsaw' );

class DateManager{
	/*
		funkcjonalność:
		- dodawanie terminu spotkania ( rodzaj spotkania, czas trwania, informacje kontaktowe )
			- powiadamianie o nowym spotkaniu przez e-mail
			
		- usuwanie terminu spotkania
		- wypisywanie umówionych terminów spotkań
		- generowanie listy wolnych terminów ( początek spotkania od 10:00 do 17:00, z dokładnością do 30 minut )
		- zapis i odczyt terminów spotkań w pliku
		
	*/
	
	private $_furi = null;
	private $_mail = "my@mail.example";
	private $_work = array(
		'start' => array( 11, 0 ),
		'end' => array( 17, 0 ),
		'step' => 30,
		
	);
	private $_dates = array(
		/*
			time => array( 
				'status' => null,
				'name' => null,
				'time' => null,
				'duration' => null,
				'price' => null,
				'client' => array(
					'name' => null,
					'mail' => null,
					'tel' => null,
					'msg' => null,
				)
			)
		*/
	);
	
	/* konstruktor - jako argument przyjmuje adres URI pliku z terminami spotkań */
	public function __construct( $uri = null ){
		if( $uri !== null ){
			$this->_furi = $uri;
		}
		else{
			$this->_furi = __DIR__ . "/meetings.json";
			
		}
		
		$this->load();
		
	}
	
	/* Tworzy obiekt odpowiadający pojedynczemu terminowi spotkania */
	public function createDate(){
		return new SingleDate;
		
	}
	
	/* Dodaje do tablicy terminów spotkanie w postaci obiektu */
	public function addDate( SingleDate $SD ){
		// if( empty( $this->_dates ) ) $this->load();
		// $item = $SD->getData();
		$item = array(
			'status' => null,
			'name' => $SD->getName(),
			'time' => $SD->getTime(),
			'date' => date( "d.m.Y H:i:s" ,$SD->getTime() ),
			'duration' => $SD->getDuration(),
			'price' => $SD->getPrice(),
			'client' => $SD->getClient(),
			
		);
		$start = (int)$item[ 'time' ];		// timestamp
		$end = $start + (int)$item[ 'duration' ] * 60;
		$conflict = false;
		
		/* sprawdzanie czy podany termin jest wolny */
		foreach( $this->_dates as $time => $date ){
			$check_start = (int)$time;
			$check_end = $check_start + (int)$date[ 'duration' ] * 60;
			
			if( ( $start >= $check_start && $start <= $check_end ) or ( $end >= $check_start && $end <= $check_end ) ){
				$conflict = true;
				break;
				
			}
			
		}
		
		if( $conflict === false ){
			$this->_dates[ $start ] = $item;
			if( $this->save() ){
				return $this->mailNotify( $item );
				
			}
			else return json_encode( array(
				'status' => 'fail',
				'msg' => 'Błąd zapisu spotkania',
				
			) );
			
		}
		else return json_encode( array(
			'status' => 'fail',
			'msg' => 'Ten termin został już zarezerwowany',
			
		) );
		
	}
	
	/* Funkcja usuwająca wpis z tablicy */
	public function delDate( $timestamp ){
		unset( $this->_dates[ $timestamp ] );
		$this->save();
		
	}
	
	/* Ustawia mail adresata powiadomień o dodanych terminach */
	public function setMail( $mail ){
		$this->_mail = $mail;
		
	}
	
	/* Sortuje rosnąco wg klucza (timestamp) i zapisuje terminy spotkań w formacie JSON do pliku */
	public function save(){
		$dir = pathinfo( $this->_furi, PATHINFO_DIRNAME );
		ksort( $this->_dates, 1 );
		if( !file_exists( $dir ) ) mkdir( $dir, 0775, true );
		return file_put_contents( $this->_furi, json_encode( $this->_dates ) ) !== false;
		
	}
	
	/* Wczytuje tablicę z pliku JSON */
	public function load(){
		if( file_exists( $this->_furi ) ){
			$content = file_get_contents( $this->_furi );
			if( $content !== false ){
				$this->_dates = json_decode( $content, true );
				
			}
			
			return $content !== false;
		}
		
		return false;
	}
	
	/* Funkcja wysyłająca mail z powiadomieniem o dodaniu spotkania */
	public function mailNotify( $date, $mode = 'new' ){
		if( !class_exists( 'PHPMailer', false ) ){
			require_once get_template_directory() . "/php/PHPMailer/PHPMailerAutoload.php";
			
		}
		
		$mailer = new PHPMailer;
		$mailer->CharSet = 'utf-8';
		$mailer->Encoding = 'base64';
		$mailer->setLanguage( 'pl' );
		
		if( $mode === 'new' ){
			$mailer->setFrom( "noreply@{$_SERVER[ 'HTTP_HOST' ]}", 'Formularz www' );
			$mailer->addAddress( $this->_mail );
			$mailer->addReplyTo( $this->_mail );
			$mailer->Subject = sprintf( "%s rezerwuje szkolenie", $date[ 'client' ][ 'name' ] );
			$mailer->Body = sprintf( "Klient: %s <%s> ( tel: %s )\r\nNazwa szkolenia: %s\r\nData rozpoczęcia: %s\r\nCzas trwania szkolenia: ( %s minut )\r\nNależność: %.2f PLN\r\nWiadomość dodatkowa:\r\n%s\r\n\r\n---\r\nWiadomość została wygenerowana automatycznie na %s",
				$date[ 'client' ][ 'name' ],
				$date[ 'client' ][ 'mail' ],
				$date[ 'client' ][ 'tel' ],
				$date[ 'name' ],
				date( "d.m.Y H:i", (int)$date[ 'time' ] ),
				(int)$date[ 'duration' ],
				(float)$date[ 'price' ],
				$date[ 'client' ][ 'msg' ],
				home_url()
				
			);
			
			if( $mailer->send() === true ){
				return json_encode( array(
					'status' => 'ok',
					'msg' => '',
					
				) );
				
			}
			else{
				return json_encode( array(
					'status' => 'fail',
					'msg' => 'Wysyłka maila nie powiodła się.<br>Powód: ' . $mailer->ErrorInfo,
					
				) );
				
			}
			
		}
		elseif( $mode === 'accept' ){
			$mailer->setFrom( "noreply@{$_SERVER[ 'HTTP_HOST' ]}", 'Edunation' );
			$mailer->addAddress( $date[ 'client' ][ 'mail' ] );
			$mailer->Subject = "Edunation - potwierdzenie terminu";
			$mailer->Body = sprintf( "Witaj %s,\r\ntermin Twojego spotkania właśnie został potwierdzony!\r\nPrzypominamy, że spotkanie '%s' odbędzie się %s o godzinie %s.\r\nKoszt spotkania wynosi: %.2f zł\r\n\r\n---\r\nWiadomość została wygenerowana automatycznie na %s",
				$date[ 'client' ][ 'name' ],
				$date[ 'name' ],
				date( "d.m.Y", (int)$date[ 'time' ] ),
				date( "H:i", (int)$date[ 'time' ] ),
				(float)$date[ 'price' ],
				home_url()
				
			);
			
			if( $mailer->send() === true ){
				return json_encode( array(
					'status' => 'ok',
					'msg' => '',
					
				) );
				
			}
			else{
				return json_encode( array(
					'status' => 'fail',
					'msg' => 'Wysyłka maila nie powiodła się.<br>Powód: ' . $mailer->ErrorInfo,
					
				) );
				
			}
			
		}
		elseif( $mode === 'cancel' ){
			$mailer->setFrom( "noreply@{$_SERVER[ 'HTTP_HOST' ]}", 'Edunation' );
			$mailer->addAddress( $date[ 'client' ][ 'mail' ] );
			$mailer->Subject = "Edunation - anulowanie terminu spotkania";
			$mailer->Body = sprintf( "Witaj %s,\r\nz przykrością informujemy, że termin Twojego spotkania ( '%s' dnia %s o godzinie %s ) został właśnie anulowany.\r\n\r\n---\r\nWiadomość została wygenerowana automatycznie na %s",
				$date[ 'client' ][ 'name' ],
				$date[ 'name' ],
				date( "d.m.Y", (int)$date[ 'time' ] ),
				date( "H:i", (int)$date[ 'time' ] ),
				home_url()
				
			);
			
			if( $mailer->send() === true ){
				return json_encode( array(
					'status' => 'ok',
					'msg' => '',
					
				) );
				
			}
			else{
				return json_encode( array(
					'status' => 'fail',
					'msg' => 'Wysyłka maila nie powiodła się.<br>Powód: ' . $mailer->ErrorInfo,
					
				) );
				
			}
			
		}
			
	}
	
	/* Funkcja eksportująca tablicę z terminami spotkań */
	public function getData( $timestamp = null ){
		if( $timestamp !== null ){
			return $this->_dates[ $timestamp ];
			
		}
		else return $this->_dates;
		
	}
	
	/* Funkcja generująca listę dostępnych terminów dla danego dnia */
	public function getSlots( $year, $month, $day, $duration ){
		$now = date_create()->getTimestamp();
		$startTime = date_create( sprintf( "%s/%s/%s %s:%s", (int)$month, (int)$day, (int)$year, (int)$this->_work[ 'start' ][0], (int)$this->_work[ 'start' ][1] ) )->getTimestamp();
		$endTime = date_create( sprintf( "%s/%s/%s %s:%s", (int)$month, (int)$day, (int)$year, (int)$this->_work[ 'end' ][0], (int)$this->_work[ 'end' ][1] ) )->getTimestamp();
		$step = (int)$this->_work[ 'step' ] * 60;
		$possible = array();
		
		for( $i = 0; $i <= ( $endTime - $startTime ) / $step; $i++ ){
			$t = $startTime + $step * $i;
			// $possible[] = $t;
			if( $t >= $now ) $possible[] = $t;
			
		}
		
		/*
		[1507564800] => Array
        (
            [name] => Business 1:1
            [time] => 1507564800
            [date] => 09.10.2017 16:00:00
            [duration] => 45
            [price] => 50
            [client] => Array
                (
                    [name] => Dawid
                    [mail] => sprytne@scepter.pl
                    [tel] => 0700100200300
                    [msg] => nuffin lol
                )

        )
		*/
		
		foreach( $this->_dates as $timestamp => $date ){
			if( $timestamp >= $startTime && $timestamp <= $endTime ){
				$index = array_search( $timestamp, $possible );
				if( $index !== false ){
					// array_splice( $possible, $index, ceil( (int)$date[ 'duration' ] * 60 / $step ) );
					array_splice( $possible, $index, ceil( (int)$duration * 60 / $step ) );
					
				}
				
			}
			
		}
		
		return $possible;
		
		/* return array_map( function( $item ){
			return date( "d.m.Y H:i:s", $item );
			
		}, $possible ); */
		
	}
	
	public function statusDate( $timestamp = null, $status = null ){
		if( $timestamp !== null ){
			if( $status === null ){
				return $this->_dates[ $timestamp ][ 'status' ];
				
			}
			else{
				$this->_dates[ $timestamp ][ 'status' ] = $status;
				$this->save();
				return true;
				
				
			}
			
		}
		else return false;
		
	}
	
}

class SingleDate{
	/* Obiekt pojedynczego zdarzenia */
	
	private $_name = null;			// typ spotkania - nazwa
	private $_time = null;				// czas rozpoczęcia spotkania ( timestamp, sekundy )
	private $_duration = null;		// czas trwania spotkania ( minuty )
	private $_price = null;				// należność za spotkanie
	private $_client = null;				// dane klienta ( informacje kontaktowe )
	
	public function __construct(){
		
	}
	
	/* nazwa spotkania */
	public function setName( $name ){
		$this->_name = (string)$name;
		return $this;
		
	}
	
	/* data rozpoczęcia spotkania jako timestamp ( sekundy ) */
	public function setTime( $time ){
		$this->_time = (int)$time;
		return $this;
		
	}
	
	/* czas trwania spotkania w minutach */
	public function setDuration( $val ){
		$this->_duration = (int)$val;
		return $this;
		
	}
	
	/* należność za spotkanie */
	public function setPrice( $val ){
		$this->_price = (float)$val;
		return $this;
		
	}
	
	/* ustawianie danych klienta */
	public function setClient( $arg ){
		$this->_client = array_merge(
			array(
				'name' => null,
				'mail' => null,
				'tel' => null,
				'msg' => null,
			),
			(array)$arg
		);
		return $this;
		
	}
	
	/* eksportowanie danych w formie tablicy */
	public function getData(){
		return array(
			'name' => $this->_name,
			'time' => $this->_time,
			'duration' => $this->_duration,
			'price' => $this->_price,
			'client' => $this->_client,
			
		);
		
	}
	
	public function getName(){
		return $this->_name;
		
	}
	
	public function getTime(){
		return $this->_time;
		
	}
	
	public function getDuration(){
		return $this->_duration;
		
	}
	
	public function getPrice(){
		return $this->_price;
		
	}
	
	public function getClient(){
		return $this->_client;
		
	}
	
}


