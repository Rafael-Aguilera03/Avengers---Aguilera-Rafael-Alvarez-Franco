# Avengers API
Backend para la gestión de miembros de los Avengers, construido con Node.js, Express y Prisma, con integración a una base de datos MySQL.

# Integrantes 

Aguilera Rafael (backend)
Franco Alvarez (frontend)

Tecnologías utilizadas
- Backend: Node.js, Express, Prisma
- Base de datos: MySQL (XAMPP) con Prisma
- Testing: Thunder Client

Características
CRUD para la gestión de miembros:
- GET /members → Obtiene todos los miembros
- POST /members → Agrega un nuevo miembro
- PUT /members/:id → Actualiza un miembro
- DELETE /members/:id → Elimina un miembro

# Dependencias

npm install

    # Backend:  

        Configurar el .env con credenciales de base de datos.
        Migrar la base de datos con Prisma:
            npx prisma migrate dev --name init

        Levantar server:
            npm run dev

