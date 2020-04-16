<?php

$nombre = $_POST["nombre"];
$email = $_POST["email"];
$telefono = $_POST["telefono"];
$asunto = $_POST["asunto"];
$consulta = $_POST["consulta"];
$condiciones = $_POST["condiciones"];

if ($nombre == NULL | $email == NULL | $asunto == NULL | $contenido == NULL) {
    echo '<script> alert("Error al enviar el correo, revisar los campos obligatorios");</script>';
    echo '<meta http-equiv="refresh" content="0">';
    die();
}

/////// /////// /////// /////// /////// ENVIA EL EMAIL USANDO UNA CUENTA DE HOTMAIL /////// /////// /////// /////// /////// /////// /////// 

$mensaje = "Detalles del formulario de contacto:<br>"; // aquí pones el contenido del mensaje
  // prepare email body text
$mensaje .= "Nombre: ";
$mensaje .= $nombre;
$mensaje .= "<br>";

$mensaje .= "Email: ";
$mensaje .= $email;
$mensaje .= "<br>";

$mensaje .= "Teléfono: ";
$mensaje .= $telefono;
$mensaje .= "<br>";

$mensaje .= "Asunto: ";
$mensaje .= $asunto;
$mensaje .= "<br>";

$mensaje .= "Consulta: ";
$mensaje .= $consulta;
$mensaje .= "<br>";

$mensaje .= "Aceptación condiciones: ";
$mensaje .= $condiciones;
$mensaje .= "<br>";

$para = 'contacto@dictamconsult.com';                         //dirección de destino gauto@gmotor2015.net
$nombreUsuarioHotmail = "dictamconsult@hotmail.com";         ///Aquí pones tu dirección de email de hotmail automovilesGB@hotmail.com
$passUsuarioHotmail = "1234@Dictam";           ///Aquí pones tu contraseña de email de hotmail misma pw
require 'PHPMailerAutoload.php';

$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';


$mail->Host = "smtp.live.com";
$mail->SMTPDebug = 2;
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth = true;
$mail->Host = "smtp.live.com";
$mail->Port = 25;

$mail->Username = $nombreUsuarioHotmail;
$mail->Password = $passUsuarioHotmail;


$mail->From = 'Dictamconsult@hotmail.com';   /// email desde el que quieres que aparezca el envío.
$mail->FromName = 'Administrador de la web';    // el nombre que quieres que aparezca en el campo from
$mail->addAddress($para);
$mail->addReplyTo('yo@yo.com', 'hola');  //aquí pones la dirección de email al que quieres enviar los correos si le dan a responder, y el nombre del campo "para" que quieres que aparezca


$mail->WordWrap = 50;                                 // el ancho máximo de cada línea

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Contacto desde el sitio web';     // título del email
$mail->Body = $mensaje;
$mail->AltBody = 'Agregar esta dirección para mostrar el email correctamente';

if (!$mail->send()) {
    echo '<script> alert("Hubo un problema al enviar el correo, vuelva a intentarlo");</script>';
}

if ($nombre !== NULL | $email !== NULL | $asunto !== NULL | $contenido !== NULL) {
    echo '<script> alert("Mensaje enviado correctamente");</script>';
    echo '("<meta http-equiv="refresh" content="0">")';
    die();
}

/////// /////// /////// /////// /////// /////// /////// /////// /////// /////// /////// ////////////// /////// /////// /////// /////// /////// /////// /////// /////// /////// /////// ///////
?>