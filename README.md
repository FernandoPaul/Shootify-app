# 📸 Shootify

**Tienda online de accesorios móviles para creadores de contenido**

Shootify es una e-commerce desarrollada con React + Vite, Firebase y Bootstrap, orientada a fotógrafos y creadores de contenido móvil. Ofrece catálogo de productos, carrito persistente, autenticación de usuarios y mucho más.

---

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 19 + Vite 8 | Frontend y bundler |
| Firebase (Auth, Firestore, Storage) | Backend as a Service |
| Bootstrap 5 + React-Bootstrap | UI y estilos |
| React Router DOM v7 | Enrutamiento |
| React Toastify | Notificaciones |
| Vitest | Testing |

---

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables (Navbar, Footer, Hero, etc.)
├── context/           # Contextos globales (AuthContext, CartContext)
├── data/              # Datos estáticos (companyInfo.js)
├── firebase/          # Configuración de Firebase
├── pages/             # Páginas principales de la app
├── styles/            # Estilos globales
├── test/              # Tests unitarios
└── utils/             # Utilidades (validaciones)
```

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/FernandoPaul/Shootify-app
cd shootify-app
npm install
```

### 2. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

### 4. Build para producción

```bash
npm run build
```

---

## 🔐 Usuarios de Prueba

| Usuario | Contraseña |
| paul@gmail.com | Paul123$ |
| fernando@gmail.com | Fernando1$ |

---

## 🛒 Funcionalidades Principales

### Autenticación
- Registro e inicio de sesión con email/contraseña
- Login con Google (OAuth)
- Perfil de usuario editable (nombre, teléfono, dirección)
- Cierre de sesión

### Catálogo
- Listado de productos filtrado por tipo: **Productos**, **Accesorios**, **Destacados**, **Ofertas**
- Filtro por categoría (Trípodes, Estabilizadores, Micrófonos, Cables, Carcasas, etc.)
- Buscador en tiempo real con normalización de texto (soporta búsqueda sin acentos)
- Página de detalle de producto con galería de imágenes, selector de color/modelo (carcasas), control de cantidad y datos técnicos

### Carrito
- Añadir, eliminar y actualizar cantidad de productos
- Carrito **persistente**: se guarda en Firestore para usuarios autenticados, y en `localStorage` para usuarios anónimos
- **Fusión automática** del carrito local al iniciar sesión
- Cálculo de envío (gratis en pedidos ≥ 49€)
- Confirmación de pedido con toast interactivo y número de pedido generado

### Otras páginas
- **Contacto**: formulario con validación
- **Newsletter**: suscripción con validación de email y descuento del 10%
- **Sobre nosotros** y **Términos y Condiciones**: contenido dinámico por slug (`/info/:slug`)

---

## 🧪 Tests

El proyecto incluye tests unitarios con **Vitest**:

```bash
npm run test        # Modo watch
npm run test:run    # Ejecución única
npm run test:ui     # Interfaz visual
```

### Tests disponibles

| Archivo | Descripción |
|---|---|
| `cart.test.js` | Lógica del carrito: añadir, eliminar, actualizar cantidad, totales |
| `catalog.test.js` | Filtros del catálogo: por tipo, categoría, búsqueda y combinaciones |
| `validations.test.js` | Validación de email y contraseña |

---

## 📦 Scripts de Carga de Productos (CSV)

En la carpeta de scripts del proyecto encontrarás las herramientas para poblar el catálogo de Firestore:

- **Script de importación**: lee un archivo `.csv` con los productos y los sube a la colección `catalog` de Firestore
- **Archivo CSV**: contiene los productos con todos sus campos (nombre, precio, categoría, tipo, imágenes, stock, etc.)

Para ejecutar la importación:

```bash
node scripts/importProducts.js
```

> ⚠️ Asegúrate de tener configuradas las variables de entorno antes de ejecutar el script.

---

## 🌐 Despliegue

El proyecto está configurado para desplegarse en **Vercel**. El archivo `vercel.json` redirige todas las rutas al `index.html` para compatibilidad con React Router:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 🔑 Estructura de Firestore

| Colección | Descripción |
| `catalog` | Productos de la tienda |
| `users` | Perfiles de usuario (nombre, teléfono, dirección) |
| `carts` | Carritos de usuarios autenticados |

---

## 🧩 Contextos Globales

### `AuthContext`
Gestiona el estado de autenticación. Proporciona: `user`, `profile`, `loading`, `logout`, `updateUserProfile`.

### `CartContext`
Gestiona el carrito de compra con persistencia dual (Firestore / localStorage). Proporciona: `cart`, `cartCount`, `cartTotal`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.

# BASE DE DATOS
Es importante saber que los archivos descargados no están en JSON legible. Firebase no exportar en un lenguaje legible.

Para ello es necesario utilizar una herramienta de conversión o un script.

output-0: Este contiene los datos
export_metadatos: Este contiene los metadatos.