import { Request, Response } from 'express'
import { episodeService } from '../services/episodeService';
import { WatchTime, WatchTimeAttributes } from '../models/WatchTime';
import { AuthenticatedRequest } from '../middlewares/auth';

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
    
    //Streaming de leitura- GET - /episodes/id:watchTime({
      getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const episodeId = req.params.id

        try {
            const watchTime = await episodeService.getWatchTime(userId, Number(episodeId))
            return res.json(watchTime)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

		// POST /episodes/:id/watchTime
    setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const episodeId = Number(req.params.id)
        const { seconds } = req.body

        try {
            const watchTime = await episodeService.settWatchTime({
                episodeId,
                userId,
                seconds
            })
            return res.json(watchTime)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }}