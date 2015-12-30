<?php
	require "vendor/autoload.php";
	date_default_timezone_set('Asia/Colombo');
	
	use Monolog\Logger;
	use Monolog\Handler\StreamHandler;
	
	//$log = new Logger('name');
	//$log->pushHandler(new StreamHandler('app.txt', Logger::WARNING));
	//$log->addWarning('Welcome to MoviePlatform!');
	
	$app = new \Slim\Slim(array(
		'view' => new \Slim\Views\Twig(),
		'templates.path' => './templates'
	));
	
	$view = $app->view();
	$view->parserOptions = array(
		'debug' => true
	);
	
	$view->parserExtensions = array(
		new \Slim\Views\TwigExtension(),
	);

	$view = $app->view();
	$view->setTemplatesDirectory('./templates');
	
	$app->get('/', function() use($app){
		$app->render('index.twig');
	})->name('home');
	
	$app->get('/latest-movies', function() use($app){
		$app->render('latest_movies.twig');
	})->name('latest-movies');
	
	$app->get('/popular-movies', function() use($app){
		$app->render('popular_movies.twig');
	})->name('popular-movies');
	
	$app->get('/tv-series', function() use($app){
		$app->render('tv_series.twig');
	})->name('tv-series');
	
	$app->get('/trailers', function() use($app){
		$app->render('trailers.twig');
	})->name('trailers');
	
	$app->get('/upcoming', function() use($app){
		$app->render('upcoming.twig');
	})->name('upcoming');
	
	$app->get('/gallery', function() use($app){
		$app->render('gallery.twig');
	})->name('gallery');
	
	$app->get('/about', function() use($app){
		$app->render('about.twig');
	})->name('about');
	
	$app->get('/contact', function() use($app){
		$app->render('contact.twig');
	})->name('contact');
	
	$app->post('/contact', function() use($app){
		
		$firstName = $app->request->post('firstName');
		$lastName = $app->request->post('lastName');
		$email = $app->request->post('email');
		$message = $app->request->post('message');
		
		if(isset($firstName) && isset($lastName) && isset($email) && isset($message)){
			
			if (!empty($firstName) && !empty($lastName) && !empty($email) && !empty($message)) {
				
				$cleanFirstName = filter_var($firstName, FILTER_SANITIZE_STRING);
				$cleanLastName = filter_var($lastName, FILTER_SANITIZE_STRING);
				$cleanEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
				$validEmail = filter_var($cleanEmail, FILTER_VALIDATE_EMAIL);
				$cleanMessage = filter_var($message, FILTER_SANITIZE_STRING);
				
			} else {
				$app->redirect('./contact');
			}	
			
		} else {
			
		}
		
		$cleanFullName = $cleanFirstName . " " . $cleanLastName;
		$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
			->setUsername('lakindu1.jayathilaka@gmail.com')
			->setPassword('lakindu.01.06.1998')
		;
		
		$mailer = Swift_Mailer::newInstance($transport);
		
		$message = Swift_Message::newInstance();
		
		$message->setSubject('MoviePlatform: Contact Form Submitted');
		
		$message->setFrom(array(
			$validEmail => $cleanFullName
		));
		
		$message->setTo(array(
			'lakindu1.jayathilaka@gmail.com' => 'Lakindu Jayathilaka'
		));
		
		$message->setReplyTo($validEmail);
		
		$message->setBody($cleanMessage);
		$result = $mailer->send($message);
		
		if($result > 0){
			$app->redirect('./');
		} else {
			$app->redirect('./contact');
		}
		
	});
	
	$app->run();
?>