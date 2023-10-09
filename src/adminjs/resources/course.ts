import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
  filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
}
export const courseResourceFeatures: FeatureType[] = [  //Essa featureType vem direto do adminJs
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '../../../public') // Pasta esta publica pois nao e um item necessario de proteção
      }
    },
    properties: {
      key: 'thumbnailUrl', // Coluna do nosso banco de dados onde vamos referenciar a capa 
      file: 'uploadThumbnail'  // Representa o input do painel adm onde vamos fazer o upload
    },
    // Customizar o nome do arquivo e como vai ser salvo 
    uploadPath: (record, filename) => `thumbnails/course-${record.get('id')}/${filename}` // Dentro da pasta public pasta especifica thumbnails - 
  })
]