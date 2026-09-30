// ─── CONEXIÓN CON LA PASARELA DE PAGOS ───────────────────────────────────────
//
// ⚠️ REGLA DE SEGURIDAD MÁS IMPORTANTE:
//   Los datos de la tarjeta (número, fecha, CVV) NUNCA se envían a nuestro
//   backend ni se guardan en la base de datos. Solo la pasarela (Izipay, Culqi
//   o Mercado Pago) los recibe y nos devuelve un "token". Nuestro backend
//   solo usa ese token + tu LLAVE SECRETA (en el .env del backend) para cobrar.
//
// CÓMO SE CONECTA (cuando tengan la cuenta de comercio):
//   1. En el frontend: cargar la librería de la pasarela y convertir la tarjeta
//      en un token (ej. Culqi: Culqi.createToken(), Mercado Pago: createCardToken()).
//      La LLAVE PÚBLICA va en .env.local → NEXT_PUBLIC_PASARELA_PUBLIC_KEY
//   2. Enviar al backend SOLO: { token, monto, causa, nombre, email }
//      → POST {API_URL}/donaciones
//   3. En el backend: crear el cargo con la LLAVE SECRETA y responder ok / error.
//
// Mientras no esté configurada, esta función responde que aún no está lista,
// y la página lo muestra de forma amable. No se envía ni se guarda nada.

export type DatosTarjeta = {
  numero: string; // solo dígitos
  nombre: string;
  mes: string; // "MM"
  anio: string; // "AA"
  cvv: string;
};

export type ResultadoPago = { ok: true; referencia: string } | { ok: false; mensaje: string };

export async function pagarConTarjeta(
  _tarjeta: DatosTarjeta,
  _detalle: { monto: number; causa: string; nombre: string; email: string }
): Promise<ResultadoPago> {
  const llavePublica = process.env.NEXT_PUBLIC_PASARELA_PUBLIC_KEY;

  if (!llavePublica) {
    return {
      ok: false,
      mensaje:
        "El pago con tarjeta todavía se está configurando. Mientras tanto, puedes donar por Yape o Plin. ¡Gracias!",
    };
  }

  // TODO: aquí va la integración real con la pasarela elegida:
  //   const token = await crearTokenEnLaPasarela(_tarjeta, llavePublica);
  //   const res = await fetch(`${API_URL}/donaciones`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ token, ..._detalle }),
  //   });
  //   ...
  return { ok: false, mensaje: "La pasarela de pagos aún no está conectada." };
}
