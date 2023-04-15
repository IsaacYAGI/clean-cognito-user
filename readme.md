# Proyecto para limpiar todos los usuarios de cognito

Con este proyecto se puede limpiar todos los usuarios de un pool seleccionado de cognito, TOMAR PRECAUCIONES

# Uso

El algoritmo obtiene la lista de todos los usuarios de cognito, solo vienen de 60 en 60 pero esto es limitación de cognito. Para obtener la siguiente lista se utiliza un paginationToken que se envía en la siguiente petición de usuarios entregando 60 más. Este proceso se repite hasta que no devuelve paginationToken por lo que ya no hay mas usuarios. Luego este array se utiliza para eliminar los registros.

Para iniciar el proceso hacer lo siguiente:

1. Correr `npm install` para instalar las dependencias
1. Duplicar el archivo `.env.example` y renombrarlo a `.env`
1. Abrir el archivo `.env` y colocarle el valor a las variables de entorno de acuerdo a la configuracion de cognito en AWS
1. Se deben configurar las variables de entorno de AWS. Esto se hace desde la consola de AWS donde se obtienen las credenciales para acceso programaticamente por lo que hay que setear dichas variables también en el archivo `.env`:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SESSION_TOKEN=

```

1. Por seguridad la linea que elimina está comentada, asi que abrir el archivo `delete.js` y descomentar la línea que envía el comando de eliminación hacia cognito

```
async function deleteCognitoUser(username, client){
    ...
    // const adminDeleteUserCommandResults = await client.send(new AdminDeleteUserCommand(adminDeleteUserCommandInput));
    ...
}
```

1. Correr el comando `npm start` para iniciar con el proceso. ESTE PROCESO ES IRREVERSIBLE.

