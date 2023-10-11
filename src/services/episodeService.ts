import { Response } from "express";
import path from 'path';
import fs from 'fs';

export const episodeService = {
  streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) =>{
    const filePath = path.join(__dirname, '../../uploads', videoUrl) // Caminho - A propriedade video url contem na string a pasta videos e o arquivo de video
    const fileStat = fs.statSync(filePath) // Vai pegar os dados do arquivo e salvar nessa varialvel

    if(range){ // Se existir pegar parte especifica para carregamento
      const parts = range.replace(/bytes=/, '').split('-') // Cortando a frase bytes= -- Pegamos o primeiro valor e o segundo valor atraves do -

      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

      const chunkSize = (end - start) + 1 // Tamanho do pedaço 

      const file = fs.createReadStream(filePath, {start, end} ) // Pegando o arquivo de video em si (leitura)

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(206, head)

      file.pipe(res) //Devolve o arquivo na resposta
    } else{ // Se o range (pedaço do video ) não for passado

      const head = {
        'Content-Length': fileStat.size, // Devolve o tamanho do video inteiro
        'Content-Type': 'video/mp4',
      }

      res.writeHead(200, head)

      fs.createReadStream(filePath).pipe(res) // Pegando o arquivo de video em si (leitura) - Devolve o arquivo na resposta
  }
  }
}