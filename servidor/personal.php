<?php
	include('conexions.php');
	if ($_GET['action']=='add') {
		$sentencia = $conn->prepare("INSERT INTO personal (nombre, telefono, fecha) VALUES (:dato0,:dato1,:dato2)");
		$sentencia->bindParam(':dato0', $_POST['nom']);
		$sentencia->bindParam(':dato1', $_POST['fone']);
		$sentencia->bindParam(':dato2', $_POST['fecha']);
		$sentencia->execute();
		echo "ok";
		$conn = null;
	}
	else{
		if ($_GET['action']=='list') {
		    $resultado=$conn->query("SELECT * FROM personal");
		    $datos = array();
		    foreach($resultado as $registro){
		    	$datos[] = array(
					'idp' => $registro['id'],
					'nom' => $registro['nombre'],
					'fone' => $registro['telefono'],
					'fech' => $registro['fecha']
				);
		    }
		    echo json_encode($datos);
		    $conn = null;
		}
		else{
			if ($_GET['action']=='get') {
				$idp = $_GET['idp'];
			    $resultado=$conn->query("SELECT * FROM personal WHERE id='$idp'");
			    $datos = "";
			    foreach($resultado as $registro){
			    	$datos = $datos."|".$registro['nombre']."|".$registro['telefono']."|".$registro['fecha'];
			    }
			    echo $datos;
			    $conn = null;
			}
			else{
				if ($_GET['action']=='upd') {
					$idp =  $_POST['idp'];
					$nom =  $_POST['nom'];
					$fone =  $_POST['fone'];
					$fecha = $_POST['fech'];
					$stmt = $conn->prepare("UPDATE personal SET nombre = :nom, telefono = :fone, fecha = :fech WHERE id = :idprs");
					$stmt->bindParam(':idprs', $idp, PDO::PARAM_INT);
					$stmt->bindParam(':nom', $nom);
					$stmt->bindParam(':fone', $fone);
					$stmt->bindParam(':fech', $fecha);
					$stmt->execute();
				}
				elseif ($_GET['action']=='del') {
					$idp = $_GET['idp'];
				    $resultado=$conn->query("DELETE personal WHERE id='$idp'");
					$conn = null;	   
				}
			}
		}
	}
?>