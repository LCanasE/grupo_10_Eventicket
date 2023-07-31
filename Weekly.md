REGISTRO DE WEEKLY

1. ¿QUÉ SE HIZO ESTA SEMANA?
2.  ¿IMPEDIMENTOS?
3. ¿QUÉ SE HARÁ ESTA SEMANA?

1. 2023/05/14 1° WEEKLY:

    CONSIDERACIONES:

    - Terminamos el 2° sprint.
    - Iniciamos el 3° sprint. 
    - Fecha de entrega 3° sprint: 2023/05/24

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Las correcciones de las vistas login y del carrito de compras, también algunos toques en el header y footer, y agregamos el checkbox de "Acuerdos y condiciones".

        - Corrección de estilos a las etiquetas generales por estilos a clases específicas en cada vista de la página.


    2.  ¿IMPEDIMENTOS?

        - No se ha logrado que el link implementado en el logo principal en el header, se aplique en el 100% de la imagen. 

        - Tuvimos dificultades con la aplicación de estilos a las etiquetas generales.


    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Inicio del sprint 3.

        - Agregar dinamismo a la página web.

        - Actualizar el tablero de Trello.

        - Separar los componentes repetidos en archivos parciales.

2. 2023/05/21 2° WEEKLY:

    CONSIDERACIONES:

    - Terminamos el 3° sprint.
    - Iniciamos el 4° sprint.
    - Fecha de entrega 4° sprint: 2023/06/12

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Terminamos el 3° sprint, incluímos formulario de creción de eventos localhost:3000/products/creacionEventos y edición de eventos localhost:3000/products/edicionEventos

        - Se incluyó la página localhost:3000/products/detalleEventosAdmin para listar los eventos del usuario administrador y desde allí se accede a edición de eventos, desde un evento en particular.

        - En la página /products/detalleEventos, que se accede desde la tarjeta de cada evento, se incluyó el botón para acceder al formulario de edición de eventos.

    2. ¿IMPEDIMENTOS?

        - En el detalleEventos, el link se aplica a todo el contenedor del botón "comprar" (Arreglado).

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Inicio del sprint 4.

        - Agregar CRUD 1 al proyecto.


3. 2023/06/04 3° WEEKLY:

    CONSIDERACIONES

    - Se inició ya la implementación de los requerimientos del sprint 4.
    - Fecha de entrega 4° sprint: 2023/06/12

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Comenzamos la implementación del CRUD,

        - Comenzamos la corrección de los términos en español. Todo pasa al inglés menos las variables.

        - El detalle de producto y el carrito traen el detalle del producto seleccionado.

        - EL formulario de edición de eventos se accede desde el botón de edición de producto desde cada detalle de producto.

    2.  ¿IMPEDIMENTOS?

        - Hasta ahora ninguno considerable.

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Traer el detalle del producto al formulario de edición de eventos.

        - Guardar los datos del evento nuevo a partir de los datos guardados en el formulario de creación de eventos.

        - Implementar botón de eliminación del evento y guardar el nuevo JSON de productos sin el producto eliminado.


4. 2023/06/11 4° WEEKLY:
        
    CONSIDERACIONES

    - Estamos terminando ya la implementación de los requerimientos del sprint 4.
    - Fecha de entrega 4° sprint: 2023/06/12

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Terminamos la implementación del CRUD de productos.

        - Iniciamos la implementación del CRUD de usuarios.

        - Terminamos la corrección de uso de inglés y español en las vistas, controllers y routers.

        - Terminamos la implementación del formularfio de edición y creación de productos.

    2.  ¿IMPEDIMENTOS?

        - Causó algunos errores el uso de "const" para las variables.

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Terminar el CRUD de usuarios.

        - Terminar la implementación de Javascript en las diferentes vistas y formularios para acceder a los datos del evento según ID.


ACLARACIÓN PARA LUCAS:

En la vista de eventos, estamos en modo administrador, por lo que se muestra el evento eliminado. Para la vista de usuario NO se verán los eventos eliminados.

Saludos! =)


5. 2023/07/02 5° WEEKLY:
        
    CONSIDERACIONES

    - Terminamos las implementaciones correspondientes al sprint 5.
    - Fecha de entrega 5° sprint: 2023/05/12

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Terminamos la implementación del CRUD de usuarios.

        - Armamos permisos para las vistas según el tipo de usuario, es decir, un usuario logueado no puede ingresar al login o al register, por ejemplo.

        - Implementamos nuevas validaciones como que no se puedan crear eventos con fecha pasada.

        - Implementamos una validación distinta de Multer para que se elimine la imagen cargada del usuario en caso de que no complete todos los campos. De esta manera evitamos tener dos imagenes de un mismo evento.

        - Implementamos cookies y session para mantener la sesión del usuario iniciada y al mismo tiempo para poder compartir entre las vistas los datos del usuario y personalizar la navegación.

        - División de eventos por categoria y por mes. 

    2.  ¿IMPEDIMENTOS?

        - Todavía no identificamos un impedimento que nos impidiera avanzar, los problemas que fueron surgiendo los pudimos solucionar.

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Dar inicio al Sprint 6.


6. 2023/07/09 6° WEEKLY:
        
    CONSIDERACIONES

    - Inicio de la implementación del Sprint 6.
    - Fecha de entrega 6° sprint: 2023/08/02

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Se realizó el esquema de tablas del proyecto y sus relaciones y exploramos el funcionamiento de phpMyAdmin para la modificación, creación y eliminación de tablas y relaciones. 

    2.  ¿IMPEDIMENTOS?

        - Hubo inconvenientes con la instalación y funcionamiento del phpMyAdmin y XAMPP.

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Llevar a cabo el esquema de tablas en phpMyAdmin y comenzar a implementar el CRUD de productos y usuarios.


7. 2023/07/16 7° WEEKLY:
        
    CONSIDERACIONES

    - Inicio de la implementación del CRUD de usuarios y productos.
    - Fecha de entrega 6° sprint: 2023/08/02

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Se llevó a cabo el esquema de tablas en phpMyAdmin con su implementación con Sequelize en nuestra página y se probó la creción de modelos.

        - Comenzamos a implementar el CRUD de productos.

    2.  ¿IMPEDIMENTOS?

        - No identificamos impedimentos esta semana.

        - Comprobamos que el esquema de relaciones entre tablas que habíamos estructurado estaba correctamente definido.

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Terminar el CRUD de productos y comenzar la implementación del CRUD de usuarios.

8. 2023/07/23 8° WEEKLY:
        
    CONSIDERACIONES

    - Fecha de entrega 6° sprint: 2023/08/02

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Se completó la implementación del CRUD de productos y se probó su funcionamiento.

        - Se inició el CRUD de usuarios.

    2.  ¿IMPEDIMENTOS?

        - No identificamos impedimentos esta semana.

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Completar el CRUD de usuarios y ultimar detalles para la entrega del sprint 6.


9. 2023/07/30 9° WEEKLY:
        
    CONSIDERACIONES

    - Finalización de entregables el Sprint-6.
    - BASE DE DATOS: Está agregada en este repositorio como "BASE DE DATOS Eventicket", del archivo se puede importar directamente en phpMyAdmin
    - Fecha de entrega 6° sprint: 2023/08/02

    1. ¿QUÉ SE HIZO HASTA AHORA?

        - Se completó la implementación del CRUD de usuarios y se probó su funcionamiento.

        - Se terminó de ajustar algunos detalles que se fueron evidenciado a medida que se realizó la implementación.

    2.  ¿IMPEDIMENTOS?

        - No identificamos impedimentos esta semana.

    3. ¿QUÉ SE HARÁ ESTA SEMANA?

        - Evaluación final de funcionamiento de la aplicación.

        - Se iniciará la revisión del Sprint-7.


10. 2023/08/06 10° WEEKLY:
        
    CONSIDERACIONES

    - Inicio
    - Fecha de entrega 7° sprint: 2023/08/16.
