<?php
  // Import PHPMailer classes into the global namespace
  // These must be at the top of your script, not inside a function
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  //Load Composer's autoloader
  require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

  $name = $_POST["name"];
	$surname = $_POST["surname"];
  $email = $_POST["mail"];
  $phone = $_POST["phone"];
  $terms = $_POST["condition"];
  $newsletter = $_POST["newsletter"];

  // checked value
  $terms = (empty($terms) ? 'no' : 'si');
  $newsletter = (empty($newsletter) ? 'no' : 'si');

  // prepare email body text
  $body .= "Nombre: ";
  $body .= $name;
  $body .= "<br>";

	$body .= "Apellidos: ";
	$body .= $surname;
  $body .= "<br>";

	$body .= "Teléfono: ";
	$body .= $phone;
  $body .= "<br>";

  $body .= "E-mail: ";
  $body .= $email;
  $body .= "<br>";

  $body .= "Aceptación GRPD: ";
  $body .= $terms;
  $body .= "<br>";

  $body .= "Recibir información: ";
  $body .= $newsletter;
  $body .= "<br>";

  if(!empty($email) && $email != ''){
    sendMail($body);
  }

  function sendMail($body = null){

    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
      //Server settings
      $mail->SMTPDebug = 0;                                 // Enable verbose debug output
      $mail->isSMTP();                                      // Set mailer to use SMTP
      $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
      $mail->SMTPAuth = true;                               // Enable SMTP authentication
      $mail->Username = 'babelcreativa@gmail.com';                 // SMTP username
      $mail->Password = 'Bbc_0000';                           // SMTP password
      $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
      $mail->Port = 587;                                    // TCP port to connect to
      $mail->CharSet = 'UTF-8';

      //Recipients
      $mail->setFrom('babelcreativa@gmail.com', 'BABEL Creativa');
      // $mail->addAddress('communication@babel.es');     // Add a recipient
      // $mail->addReplyTo('babelcreativa@gmail.com', 'BABEL Creativa');
      // $mail->addCC('roksana.nechay@babel.es');
      $mail->addAddress('info@amaine.es');

      //Content
      $mail->isHTML(true);
      $mail->Subject = 'Nueva Inscripcion Amaine';
      $mail->Body    = $body;
      //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

      $mail->send();
      return true;
    } catch (Exception $e) {
        echo 'El mensaje no ha podido ser enviado. Mailer Error: ', $mail->ErrorInfo;
    }
  }
?>
