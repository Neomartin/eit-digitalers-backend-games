# Backend E-commerce Module

## Description

## Dictionary

### Request

- Valores útiles del parámetro req

  - req.params -> Parámetros de la URL (id, etc)
    - console.log(req.params);
  - req.body -> Cuerpo de la petición (datos enviados por el cliente)
    - console.log(req.body);
  - **req.query** -> Query params (filtros, búsquedas, etc)
    - console.log(req.query);
  - req.headers -> Cabeceras de la petición (info adicional, tokens, etc)
    - console.log(req.headers);
  - req.method -> Método HTTP (GET, POST, PUT, DELETE, etc)
    - console.log(req.method);
  - req.url -> URL de la petición
    - console.log(req.url);
  - req.cookies -> Cookies enviadas por el cliente
    - console.log(req.cookies);
  - req.ip -> Dirección IP del cliente
    - console.log(req.ip);
  - req.hostname -> Nombre del host (dominio)
    - console.log(req.hostname);
  - req.protocol -> Protocolo utilizado (http, https)
    - console.log(req.protocol);
  - req.originalUrl -> URL original de la petición (antes de cualquier redirección)
    - console.log(req.originalUrl);
