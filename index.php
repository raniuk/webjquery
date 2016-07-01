<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>GUIA</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="description" content="ejemplo, guia" />
  <meta name="author" content="ejemplo" />
  <link rel="shortcut icon" href="favicon.png">
  <link href="css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/jquery-ui.min.css" rel="stylesheet" />
  <link href="css/jquery-ui.structure.min.css" rel="stylesheet" />
  <link href="css/jquery-ui.theme.min.css" rel="stylesheet" />
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-md-offset-3 col-md-6">
        <form class="form-horizontal" role="form" method="POST">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-user"></span></div>
                <input type="text" class="form-control input-lg" id="nombre" placeholder="Ingrese nombre" autofocus required>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-earphone"></span></div>
              <input type="number" class="form-control input-lg" id="telefono" placeholder="Ingrese teléfono" required>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></div>
              <input type="text" class="form-control input-lg" id="fecha" value="<?php echo date('Y-m-d') ?>" required>
            </div>
          </div>
          <div class="login-buttons">
            <button type="button" id="enviar" onclick="enviarDatos()" class="btn btn-success btn-lg"><i class="glyphicon glyphicon-ok"></i> Enviar</button>
          </div>
        </form>
      </div>
    </div><br><hr>
    <div class="row">
      <div class="table-responsive">
        <table class="table" id="tablapers">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <div id="flotante" style="display: none;" title="MODIFICAR DATOS">
        <form class="form-horizontal" role="form" method="POST">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-user"></span></div>
                <input type="text" class="form-control input-lg" id="mnombre" placeholder="Ingrese nombre" required>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-earphone"></span></div>
              <input type="number" class="form-control input-lg" id="mtelefono" placeholder="Ingrese teléfono" required>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></div>
              <input type="text" class="form-control input-lg" id="mfecha" required>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Librerias de JQUERY, BOOTSTRAP, JQUERY-UI y el Código que nos permite toda la operación de datos-->
  <script src="js/jquery-1.11.3.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery-ui.min.js"></script>
  <script src="js/ejemplo.js"></script>
</body>
</html>
