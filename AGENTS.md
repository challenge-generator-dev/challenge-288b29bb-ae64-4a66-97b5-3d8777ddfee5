# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de una SPA con React y TypeScript**.

| | |
|---|---|
| Tema | React TypeScript |
| Nivel | junior-l1 |
| Chapter | Frontend |
| Especialidad | React |
| Stack | TypeScript / React 18 |
| Patron arquitectonico | capas estándar con separación de responsabilidades (presentación, lógica de negocio, servicios API, contexto global) |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, vite.config.ts y tsconfig.json en la raiz`
- `src/main.tsx como entry point`
- `src/app con el arbol de rutas`
- `src/features con componentes contenedores y sus hooks`
- `src/shared con componentes presentacionales`
- `src/services con los clientes HTTP`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET. `@types/react-router-dom` ya no se publica para v6+, React Router trae sus tipos.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.

Dependencias:

- react 18.2.0
- react-dom 18.2.0
- @types/react 18.2.79
- @types/react-dom 18.2.25
- typescript 5.4.5
- axios 1.7.2
- react-router-dom 6.23.0
- @tanstack/react-query 5.32.0
- crypto-js 4.2.0
- eslint n/a
- prettier n/a
- @testing-library/react n/a
- @testing-library/jest-dom n/a

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración inicial y autenticación**: Proyecto de React configurado con TypeScript y autenticación de usuarios funcional.
- **Fase 2 — Visualización del saldo y realización de transferencias**: Interfaz de usuario que muestra el saldo del usuario y permite realizar transferencias idempotentes.
- **Fase 3 — Consulta del historial de transacciones**: Interfaz de usuario que permite consultar el historial de transacciones del usuario con paginación.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/context/AuthContext.tsx` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/hooks/useAuth.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/services/authService.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Archivos que la arquitectura declara (1 de 21)

La propuesta arquitectonica del reto los lista y no llegaron al repo. Crealos con implementacion real, respetando la capa en la que viven:

- [ ] `src/context/AuthContext.tsx`

### 2. Referencias colgando (2)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/services/transactionService.ts` — `TransferRequest.use`
      Se invoca `use` sobre `TransferRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/pages/TransactionHistory.tsx` — `Transaction.map`
      Se invoca `map` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (20)

- `vite.config.ts`
- `src/main.tsx`
- `package.json`
- `tsconfig.json`
- `src/index.tsx`
- `src/App.tsx`
- `index.html`
- `src/types/index.ts`
- `src/hooks/useAuth.ts`
- `src/services/authService.ts`
- `src/services/transactionService.ts`
- `src/pages/Login.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Transfer.tsx`
- `src/utils/storage.ts`
- `src/utils/api.ts`
- `src/pages/TransactionHistory.tsx`
- `src/components/PrivateRoute.tsx`
- `src/components/ErrorBoundary.tsx`
- `src/styles/global.css`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/components`
- `src/context`
- `src/hooks`
- `src/pages`
- `src/services`
- `src/types`
- `src/utils`
- `src/styles`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar con separación de responsabilidades (presentación, lógica de negocio, servicios API, contexto global)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Brecha que el reto ataca: Construir una SPA con React, TypeScript, hooks y Context API

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
