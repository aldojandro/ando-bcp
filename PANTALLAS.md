# Pantallas del prototipo ANDO

Guía simple de las 16 pantallas del happy path de **Camila Rojas**. El flujo es lineal: cada pantalla avanza a la siguiente con su botón principal.

- **Flujo:** P1 → P2 → … → P16
- **Estado compartido:** [`src/ando/store.tsx`](src/ando/store.tsx) (en memoria, sin localStorage)
- **Router:** [`src/ando/AndoApp.tsx`](src/ando/AndoApp.tsx)
- **Pantallas:** [`src/ando/screens/`](src/ando/screens/)

---

## Componentes reutilizables

| Componente | Archivo | Para qué sirve |
| --- | --- | --- |
| **TarjetaANDO** | [`components/tarjeta-ando.tsx`](src/ando/components/tarjeta-ando.tsx) | Tarjeta que evoluciona: `reservada` → `demo` → `enConstruccion` → `desbloqueada` |
| **Screen / TopBar / ProgressBar / StatusBar** | [`components/chrome.tsx`](src/ando/components/chrome.tsx) | Estructura de cada pantalla (barra de estado, top bar, progreso, footer fijo) |
| **PieceList** | [`components/pieces.tsx`](src/ando/components/pieces.tsx) | Checklist del expediente (pendiente / ✓) |

---

## Pantallas

### P1 · Landing
- **Path:** [`screens/p1-landing.tsx`](src/ando/screens/p1-landing.tsx)
- **Qué tiene:** sello "Con el respaldo del BCP", titular, tarjeta de marca (`reservada`), chips de meta, input de monto.
- **Acción:** guarda la meta y el monto → **P2**.

### P2 · Datos básicos
- **Path:** [`screens/p2-datos.tsx`](src/ando/screens/p2-datos.tsx)
- **Qué tiene:** 4 pasos internos (nombre, documento, nacimiento, celular) con barra de progreso; código SMS que se autocompleta; microcopy de confianza.
- **Acción:** loading "Estamos viendo cómo empezar contigo…" → **P3**.

### P3 · Tarjeta reservada
- **Path:** [`screens/p3-reservada.tsx`](src/ando/screens/p3-reservada.tsx)
- **Qué tiene:** mensaje celebratorio sobrio ("Tienes una tarjeta reservada a tu nombre").
- **Acción:** "Ver mi tarjeta" → **P4**.

### P4 · Tu tarjeta ANDO
- **Path:** [`screens/p4-tarjeta.tsx`](src/ando/screens/p4-tarjeta.tsx)
- **Qué tiene:** TarjetaANDO `reservada` (S/ 0, 0%) + explicación de que empieza vacía.
- **Acción:** "¿Cómo la lleno?" → **P5**.

### P5 · Por qué no es inmediata
- **Path:** [`screens/p5-porque.tsx`](src/ando/screens/p5-porque.tsx)
- **Qué tiene:** 3 bloques con íconos (historial crediticio, expediente, plazo condicional).
- **Acción:** "Lo tengo, sigamos" → **P6**.

### P6 · Punto de inflexión
- **Path:** [`screens/p6-inflexion.tsx`](src/ando/screens/p6-inflexion.tsx)
- **Qué tiene:** pregunta "¿Lo construimos juntos?" con dos opciones (la secundaria muestra "Te guardamos tu avance" y deja volver).
- **Acción:** "Sí, quiero construir mi tarjeta" → **P7**.

### P7 · Cómo funciona
- **Path:** [`screens/p7-comofunciona.tsx`](src/ando/screens/p7-comofunciona.tsx)
- **Qué tiene:** 3 puntos numerados (ahorras, cumples retos, desbloqueas y recuperas tu ahorro).
- **Acción:** "Empezar" → **P8**.

### P8 · Tu primer paso
- **Path:** [`screens/p8-primerpaso.tsx`](src/ando/screens/p8-primerpaso.tsx)
- **Qué tiene:** tarjeta de plan inicial (Línea S/ 500 · Ahorro S/ 100), anclaje a la meta y mini-mapa horizontal (S/ 500 → … → meta).
- **Acción:** "Empezar mi primer reto" → **P9**.

### P9 · Primer reto (Warda)
- **Path:** [`screens/p9-warda.tsx`](src/ando/screens/p9-warda.tsx)
- **Qué tiene:** explicación de Warda (qué es, manual/automático, cómo se retira).
- **Acción:** "Guardar S/ 100" → **P10**.

### P10 · Verificando tu ahorro
- **Path:** [`screens/p10-verificando.tsx`](src/ando/screens/p10-verificando.tsx)
- **Qué tiene:** loader honesto con texto de tiempo + enlace de soporte; estado de éxito.
- **Acción:** "Simular confirmación" (guarda S/ 100 en Warda) → "Ver mi tarjeta" → **P11**.

### P11 · Demo honesto
- **Path:** [`screens/p11-demo.tsx`](src/ando/screens/p11-demo.tsx)
- **Qué tiene:** TarjetaANDO `demo` con dos indicadores ("Disponible (tuyo): S/ 100" + "Línea: en construcción") y la aclaración de que es su plata, no crédito.
- **Acción:** "Ver mi camino" → **P12**.

### P12 · Tu camino
- **Path:** [`screens/p12-camino.tsx`](src/ando/screens/p12-camino.tsx)
- **Qué tiene:** tabla/escalera de crecimiento (línea ↔ ahorro mensual) con la fila actual y la meta resaltadas.
- **Acción:** "Entendido, ¡sigamos!" → **P13**.

### P13 · Tu expediente — Mes 1
- **Path:** [`screens/p13-expediente.tsx`](src/ando/screens/p13-expediente.tsx)
- **Qué tiene:** TarjetaANDO en construcción + checklist (PieceList), nudge de recordatorios, mensaje de perdón. "Completar un reto" marca piezas con micro-celebración.
- **Acción:** al completar todo → "Continuar al Mes 2" → **P14**.

### P14 · Empieza el Mes 2 (upgrade)
- **Path:** [`screens/p14-upgrade.tsx`](src/ando/screens/p14-upgrade.tsx)
- **Qué tiene:** comparación plan actual (S/ 500) vs. plan meta (S/ 2,000) tras completar el Mes 1.
- **Acción:** "Sí, quiero crecer…" sube el plan a S/ 2,000 → **P15**.

### P15 · Meses 2 y 3
- **Path:** [`screens/p15-meses.tsx`](src/ando/screens/p15-meses.tsx)
- **Qué tiene:** vista reutilizable por mes: hitos marcados, ahorro de Warda creciendo, tarjeta cerca del 100%.
- **Acción:** "Avanzar al Mes 3" y luego "Ver mi resultado" → **P16**.

### P16 · Graduación
- **Path:** [`screens/p16-graduacion.tsx`](src/ando/screens/p16-graduacion.tsx)
- **Qué tiene:** TarjetaANDO `desbloqueada` (S/ 2,000, 100%), ahorro de Warda liberado, estado festivo.
- **Acción:** "Activar mi tarjeta" o "Ver el resumen de mi camino" (reinicia la demo).

---

## Controles de la demo

- **Reiniciar:** botón flotante "⟳" (abajo a la derecha) vuelve a **P1**.
- **Navegación:** siempre por el botón principal de cada pantalla; algunas tienen "‹" para volver atrás.
