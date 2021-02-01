# NODEPOP

## API de un servicio de venta de artículos de segunda mano llamado NODEPOP
### Mantiene anuncios de compra o venta de artículos y permite buscar a través de filtros por varios criterios.

#### Anuncio
Cada anuncio está compuesto por los siguientes atributos:
- **name**: nombre del artículo. Tipo *String*.
- **sale**: indica si se vende o se busca. Tipo *Boolean*.
- **price**: precio de venta o precio máximo para búsqueda. Tipo *Number*.
- **image**: nombre del fichero de la imagen del artículo. Sólo admite una imagen. Tipo *String*.
- **tags**: etiquetas asociadas. Admite más de una. Tipo *array de String*.
*Los tags posibles a asociar son: work, lifestyle, motor y/o mobile*  

#### Inicialización de base de datos
Para la creación y poblado de la base de datos, se requiere disponer de la base de datos **MongoDB**.
**Pasos:**
1. Instalación de base de datos **MongoDB** según sistema operativo.
2. Arrancar el servicio de la base de datos. En el caso de Windows, éste queda arrancado después de instalarlo, por lo que no hace falta iniciarlo.
3. Desde la carpeta del proyecto, ejecutar el comando *npm run installDB* para poblar la base de datos.
4. Iniciar la aplicación con el comando *npm run dev*.


