import path from 'path'
import uploadFileFeature from '@adminjs/upload'
import { FeatureType, ResourceOptions } from 'adminjs'

export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'  ],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

export const episodeResourceFeatures: FeatureType[] = [  //Essa featureType vem direto do adminJs
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '../../../uploads'), //Caminho absoluto onde adminJs vai salvar o nosso arquivo
        opts: {}
      }
    },
    properties: {
      key: 'videoUrl', // Coluna do nosso banco de dados onde vamos referenciar a url do video
      file: 'uploadVideo'  // Representa o input do painel adm onde vamos fazer o upload
    },
    // Customizar o nome do arquivo e como vai ser salvo na pasta Uploads
    uploadPath: (record, filename) => `videos/course-${record.get('courseId')}/${filename}` // Dentro da pasta upload pasta especifica para os videos - dentro dela uma pasta couse-Id do curso - Depois o nome do arquivo
  })
]