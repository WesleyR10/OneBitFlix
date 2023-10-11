import { Request, Response } from 'express'
import { episodeService } from '../services/episodeService';

export const episodesController = {
    //Streaming de leitura- GET - /episodes/stram?videourl=
    stream: async (req: Request, res: Response) => {
      const {videoUrl} = req.query // Pegando o parametro 

      try {
            if (typeof videoUrl !== 'string') throw new Error('videoUrl param must be of type string'); // Definimos que o videoUrl tinha que ser string no service precisando dessa verificação para se nao for string
            //Carregamento parcial
            const range = req.headers.range
            
            episodeService.streamEpisodeToResponse( res, videoUrl, range)
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message })
      }}
    },
}