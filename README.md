# NODEPOP

## API de un servicio de venta de artículos de segunda mano llamado NODEPOP
### Mantiene y permite crear anuncios de compra o venta de artículos. También es posible buscar a través de filtros por varios criterios.

#### Anuncio
Cada anuncio está compuesto por los siguientes atributos:
- **name**: nombre del artículo. Tipo *String*.
- **sale**: indica si se vende o se busca. Tipo *Boolean*.
- **price**: precio de venta o precio máximo para búsqueda, en euros. Tipo *Number*.
- **image**: nombre del fichero de la imagen del artículo. Sólo admite una imagen. Tipo *String*.
- **tags**: etiquetas asociadas. Admite más de una. Tipo *array de String*.
*El usuario puede crear todos los tags que mejor se asocien al producto en cuestión.*  

#### 1 .Requisitos y descarga del proyecto *NODEPOP*
Como requisito se debe disponer de *node* como entorno, el cual se puede descargar desde su página oficial, así como de un editor de código.
También es necesario disponer de la base de datos que se emplea en el proyecto, la cual es *MongoDB* (pasos a seguir en el apartado *Instalación e inicialización de la base de datos*). Seguidamente, descargar el proyecto y continuar en el apartado *Instalación e inicialización de la aplicación*.
*Para poder crear un anuncio, se recomienda hacer uso de una aplicación para crear peticiones sobre APIs, como por ejemplo, **Postman**, la cual se puede descargar desde su página oficial.*

#### 2. Instalación e inicialización de base de datos
Para la creación y poblado de la base de datos, se requiere disponer de la base de datos **MongoDB**.
**Pasos:**
1. Instalación de base de datos **MongoDB** según sistema operativo.
2. Arrancar el servicio de la base de datos. En el caso de Windows, éste queda arrancado después de instalarlo, por lo que no hace falta iniciarlo.
*Adicionalmente, para poder visualizar la base de datos con interfaz gráfica, se puede hacer uso de la aplicación **nosqlbooster** la cual se puede descargar desde su página oficial.*

#### 3. Instalación e inicialización de la aplicación
Para hacer uso de la aplicación *NODEPOP*, se debe acceder a la carpeta del proyecto y seguir los siguientes pasos:
1. Ejecutar el comando *npm install* para instalar todo lo necesario para hacer uso de la aplicación. 
2. Ejecutar el comando *npm run initDB* para poblar la base de datos.
3. Ejecutar el comando *npm run dev* para arrancar e iniciar la aplicación. 
4. Ejecutar el comando *npm run microservices* para arrancar el microservicio correspondiente.

#### 4. Guías de uso
Una vez iniciada la aplicación, ésta permite realizar las siguientes operaciones:
1. Listar los anuncios con posibilidad de paginación y filtros para buscar aquellos anuncios deseados. 
    Esta operación está disponible desde en *web* como en *api*.
2. Listar los tags de todos los anuncios existentes. Esta operación está disponible desde *web* y desde *api*.
3. Crear un anuncio. Operación disponible desde api. *Uso de **Postman**.*

#### 4.1. **NODEPOP** en web
Una vez iniciada la aplicación, desde un navegador, las rutas de la aplicación, para las diferentes operaciones permitidas son:
1. Operación 1: *localhost:3000*
    Los filtros se añaden conforme al apartado *4.3* a partir de la ruta *localhost:3000?*.
2. Operación 2: *localhost:3000/tags*

#### 4.2. **NODEPOP** como API
Una vez iniciada la aplicación, desde la aplicación de creación de peticiones (*Postman*), las rutas para las diferentes operaciones permitidas son:
0. Autenticación de usuario: tipo *POST* a *localhost:3000/api/authenticate.
    Los parámetros a incluir en el body son:
    - **email**: cadena de texto con el email del usuario.
    - **password**: cadena de texto con la contraseña del usuario. 
    Se dispone de un usuario por defecto cuya datos son:
    - **email**: admin@example.com
    - **password**: 1234
1. Operación 1: tipo *GET* a *localhost:3000/api/advertisements*
    Los filtros se añaden conforme al apartado *4.3* a partir de la ruta *localhost:3000/api/advertisements?*.
    Para esta petición se requiere estar autenticado previamente, según se describe en el punto *4.2.0*
2. Operación 2: tipo *GET* a *localhost:3000/api/tags*
3. Operación 3: tipo *POST* a *localhost:3000/api/advertisements*, añadiendo todos los atributos o valores del anuncio en el *body*. 
    Para la creación de un artículo, los datos a introducir son: 
    - **name**: cadena de texto con el nombre del artículo.
    - **sale**: valor *true* para el caso de ser un artículo para ser vendido y *false* para el caso de ser un artículo que se busca.
    - **price**: cantidad expresada en números. Para el caso de venta, cantidad por la que se ofrece para vender y en el caso de ser buscado, sería la cantidad numérica máxima a pagar por el artículo.
    - **image**: tipo *file* de la imagen asociada al producto a añadir.*
    - **tags**: cadena de texto que representa una etiqueta relacionada como palabra clave para el artículo. Para añadir varios *tags* asociados, se añadiría una propiedad *tags* por cada tag deseado a asociar.

* Adicionalmente a la imagen asociada al producto, que se almacena en */images/*, se genera una imagen de tipo thumbnail asociada, la cual se almacena en */images/thumbnails/*.

#### 4.3. Filtros para **NODEPOP** en *web* y en *api*
Los filtros posibles son los que a continuación se describen, los cuales se añaden a partir de la ruta indicada para cada caso:
- Tag: se añade **tags=tag**, donde *tag* corresponde con el tag de interés.
    Adicionalmente, se pueden buscar por varios *tags*, para ello, por ejemplo, si se deseara buscar por 3 tags, sería **tags=tag1 tag2 tag3**, de forma que se pondrían los *tags* de interés separados por espacios.    
- Precio: se puede buscar por rango de precios o por un único valor, para cada caso sería:
    -- Para indicar un precio mínimo: **price=precioMínimo-**, donde *precioMínimo* es la cantidad mínima deseada, en euros.
    -- Para indicar un precio máximo: **price=-precioMáximo**, donde *precioMáximo* es la cantidad máxima deseada, en euros.
    -- Para indicar un rango de precios con un mínimo y un máximo: **price=precioMínimo-precioMáximo**, donde *precioMínimo* corresponde con la cantidad mínima deseada y *precioMáximo* corresponde con la cantidad máxima deseada, ambas expresadas en números.
    -- Para indicar un único precio concreto: **price=precio**, donde *precio* corresponde con la cantidad deseada, expresada en números.
- Nombre: permite buscar por tanto por el nombre concreto como el inicio del mismo, para ello se emplea **name=nombre**, donde *nombre* corresponde con el nombre del artículo de interés.
- Venta o Búsqueda: para el caso en el que se desee el listado de anuncios disponibles para venta, sería **sale=true** y para el caso de obtener el listado de artículos disponibles para búsqueda, sería **sale=false**.
- Paginación: para hacer uso de la paginación de un listado, se emplearían conjuntamente **limit=númeroDeAnunciosMostrados** y *skip=númeroDeAnunciosYaMostrados*, donde *númeroDeAnunciosMostrados* corresponden con el número de anuncios a mostrar en el listado deseado y *númeroDeAnunciosYaMostrados*, con el número de anuncios ya mostrados anteriormente, es decir, aquellos que se salta del listado obtenido.

Adicionalmente, se puede obtener un listado **ordenado** por alguno de las propiedades, en cuyo caso se usaría **sort=propiedad**, donde *propiedad* puede ser alguno de los siguientes valores: name, price. Para indicar un orden inverso, sería **sort=-propiedad**.

Para combinar los filtros y poder indicar varios seguidos, se emplea el carácter *&* entre cada uno de ellos.

#### 5. Ejemplo de uso
Un **ejemplos** de obtención de listados de anuncios con varios filtros, para cada caso, podría ser:
- Para *web*: **localhost:3000?tags=mobile&sale=true&name=tab&price=50-&limit=2&skip=0&sort=price**
- Para *api*: **localhost:3000/api/advertisements?tags=mobile&sale=true&name=tab&price=50-&limit=2&skip=0&sort=price**
El listado obtenido estaría paginado y para el caso de ejemplo, correspondería con la primera página, en la que se mostraría un total de 2 anuncios (si los hubiera), con el o los tags deseados (separados por espacios), que se venden, con un nombre que empiece por *tab*, con un precio mínimo de 50 euros y ordenados por precio.
