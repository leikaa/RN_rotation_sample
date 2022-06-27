import AlbumApiRepository from './repositories/AlbumApiRepository';
import { getUniqueArray } from '../../base/utils/util';
import { appConfig } from '../../appConfig';

export default class AlbumService {
  apiRepository: AlbumApiRepository;

  constructor() {
    this.apiRepository = new AlbumApiRepository();
  }

  getAlbums = async (query: string) => {
    const { results } = await this.apiRepository.getAlbums(query);

    const data = results.map(
      (item: { collectionName: string }) => item.collectionName,
    );

    return getUniqueArray(data).sort().slice(0, appConfig.albumsToRotateCount);
  };

  prepareNewAlbumsForStore = (albums: string[], stubAlbums: string[]) => {
    if (albums?.length < appConfig.albumsToRotateCount) {
      albums = albums.concat(
        stubAlbums.slice(0, appConfig.albumsToRotateCount - albums.length),
      );
    }

    return albums;
  };

  prepareNewAlbumsForRotation = (albums: string[]) => {
    if (!albums.length) {
      return albums;
    }

    const lastAlbum = albums.shift() as string;

    if (albums.length < appConfig.albumsToRotateCount) {
      albums.push(lastAlbum);
    }

    return albums;
  };
}
