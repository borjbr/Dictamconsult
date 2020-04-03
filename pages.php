<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width; initial-scale=1.0">

</head>
<body>

</body>
</html>

<div class="container">

<div class="row">
<div class="col-md-6 col-md-push-3">
<h1>Páginas</h1>

<table class="table table-striped">

<?php 
$qrimcon= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAA5UlEQVRIS82WbQ7DIAiGx5n0AN3JtwPomWxoYkOZfBm71H9G9EF4QSGl1F7GqLUCmnTbPu/bPGeAx2gpiHvpuYHlAD3jvBFuorejcylUI5B0RgjEw/x8EBcfV5mlOi3P/1edVkpeMWhnHIUYHVIIVVDOeUODUsrXC5wCSQn3QrmdVMSXOqKVvBwkNUbuGQWP1jR73HuKwar6ZaDZUHn3heRtdYYRtIf09s4wBbJeVE0QP/Km14+Gyg2yHj7p2bekfcibev04kPULGn0DQjny5kwFzbxHAPDGri81ZlxvrX0uObobtAPYC3VCM7UsFwAAAABJRU5ErkJggg==';

if ($handle = opendir('.')) {
	$dirname = substr($_SERVER['REQUEST_URI'], 0, strrpos($_SERVER['REQUEST_URI'], '/') + 1);

    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && strpos($entry, 'html') != false) {
        	print '<tr><td><a href="'.$entry.'">'.$entry.'</a></td><td><a target="_blank" href="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=http%3A%2F%2Fclientes.babel.es'.$dirname.$entry.'&choe=UTF-8"><img src="'.$qrimcon.'" /></a></td></tr>';

        }
    }

    closedir($handle);
}

 ?>
 </table></div>
 </div></div>
