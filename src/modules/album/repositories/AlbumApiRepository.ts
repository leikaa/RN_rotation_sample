import { appConfig } from '../../../appConfig';

export default class AlbumApiRepository {
  getAlbums = async (query: string) => {
    return await fetch(`${appConfig.apiUrl}/search?term=${query}`).then(
      response => response.json(),
    );
  };
}
