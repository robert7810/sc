import express, { Request, Response } from 'express';
import { getVideo, VideoParams } from './videoUtils'; // Assuming you have this file

const app = express();
const port = process.env.PORT || 3000;

app.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const season = req.query.s ? parseInt(req.query.s as string) : undefined;
  const episode = req.query.e ? parseInt(req.query.e as string) : undefined;

  let params: VideoParams;

  if (season && episode) {
    // TV Show
    params = {
      type: 'tv',
      id: id,
      season: season,
      episode: episode
    };
  } else {
    // Movie
    params = {
      type: 'movie',
      id: id
    };
  }

  try {
    const video = await getVideo(params);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
