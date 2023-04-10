import { validarDireccion } from "/geolocalization.js";

function formatearFecha(fecha) {
  const fechaObj = new Date(fecha);
  const opcionesFecha = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const opcionesHora = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const fechaFormateada = new Intl.DateTimeFormat(
    "es-AR",
    opcionesFecha
  ).format(fechaObj);
  const horaFormateada = new Intl.DateTimeFormat("es-AR", opcionesHora).format(
    fechaObj
  );

  return `${fechaFormateada} Hora: ${horaFormateada}`;
}

const preciosServicios = {
  Casamiento: 1.5,
  Comunion: 1.3,
  Bautismo: 1.2,
  Evento: 1.3,
  Fiesta: 1.4,
  Sesion: 1.0,
};

$(document).ready(function () {
  $("#formulario-fotografia").on("submit", async function (event) {
    event.preventDefault();

    // Capturar datos
    const fecha = $("#fecha").val();
    const direccion = $("#direccion").val();
    const paqueteSeleccionado = JSON.parse($("#paquete").val());
    const fotos = paqueteSeleccionado.fotos;
    const precioPaquete = paqueteSeleccionado.precio;
    const servicio = $("#servicio").val();

    // Validar dirección
    const esDireccionValida = await validarDireccion(direccion);

    if (!esDireccionValida) {
      alert(
        "La dirección debe estar dentro de los límites de la Ciudad Autónoma de Buenos Aires"
      );
      return;
    }

    // Calcular costo total
    const multiplicadorServicio = preciosServicios[servicio];
    const costoTotal = precioPaquete * multiplicadorServicio;

    // Generar ticket (aquí puedes generar el ticket como prefieras)
    const fechaFormateada = formatearFecha(fecha);
    const ticket = {
      fecha: fechaFormateada,
      direccion: direccion,
      fotos: fotos,
      servicio: servicio,
      costoTotal: costoTotal.toFixed(2),
    };

    console.log(ticket);
    alert(
      `Has generado un ticket con los siguientes datos: \n Fecha: ${fechaFormateada} \n Dirección: ${direccion} \n Fotos: ${fotos} \n Servicio: ${servicio} \n Costo total: $${costoTotal.toFixed(
        2
      )}`
    );
    alert("Ticket generado con éxito");

    // Limpiar formulario
    $("#formulario-fotografia")[0].reset();
  });
});
