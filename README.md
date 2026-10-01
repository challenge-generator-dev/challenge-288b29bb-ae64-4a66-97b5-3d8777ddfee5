# Desarrollo de una SPA con React y TypeScript

Se requiere construir una aplicación de página única (SPA) en el dominio de banca digital. La aplicación permitirá a los usuarios autenticados ver su saldo, realizar transferencias y consultar su historial de transacciones. El sistema debe manejar la autenticación de usuarios, la persistencia de datos y la navegación entre diferentes vistas. Los usuarios se autenticarán a través de un servicio externo de autenticación que devuelve un token JWT válido por 24 horas. Las transacciones deben ser idempotentes y el sistema debe manejar correctamente los errores de red y del servicio externo. Se espera que la aplicación maneje al menos 100 solicitudes por segundo en hora pico con una latencia máxima de 200ms.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | React TypeScript |
| **Nivel** | junior-l1 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial y autenticación

**Objetivo:** Configurar el proyecto y manejar la autenticación de usuarios.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar un proyecto de React con TypeScript.
- Implementar la autenticación de usuarios utilizando un servicio externo que devuelve un token JWT.
- Almacenar el token JWT de manera segura y manejar la sesión del usuario.

**Entregable:** Proyecto de React configurado con TypeScript y autenticación de usuarios funcional.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar la persistencia del token JWT.
- Piensa en cómo manejar la expiración del token.

</details>

### Fase 2: Visualización del saldo y realización de transferencias

**Objetivo:** Implementar la visualización del saldo del usuario y la realización de transferencias.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Mostrar el saldo del usuario en la interfaz de usuario.
- Permitir al usuario realizar transferencias a otros usuarios.
- Asegurar que las transferencias sean idempotentes.

**Entregable:** Interfaz de usuario que muestra el saldo del usuario y permite realizar transferencias idempotentes.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los errores de red y del servicio externo.
- Piensa en cómo asegurar que las transferencias sean idempotentes.

</details>

### Fase 3: Consulta del historial de transacciones

**Objetivo:** Implementar la consulta del historial de transacciones del usuario.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Permitir al usuario consultar su historial de transacciones.
- Mostrar las transacciones en orden cronológico.
- Manejar la paginación del historial de transacciones.

**Entregable:** Interfaz de usuario que permite consultar el historial de transacciones del usuario con paginación.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar la paginación del historial de transacciones.
- Piensa en cómo mostrar las transacciones en orden cronológico.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una SPA y por qué se usa en este contexto?
- **paraQueSirve**: ¿Para qué sirve la autenticación en este sistema?
- **comoSeUsa**: ¿Cómo se usa el token JWT en este sistema?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al realizar transferencias y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de la paginación del historial de transacciones?

## Criterios de Evaluacion

- Proyecto de React configurado con TypeScript y autenticación de usuarios funcional.
- Interfaz de usuario que muestra el saldo del usuario y permite realizar transferencias idempotentes.
- Interfaz de usuario que permite consultar el historial de transacciones del usuario con paginación.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
