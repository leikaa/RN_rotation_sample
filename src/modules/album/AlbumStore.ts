import { makeAutoObservable, runInAction } from 'mobx';

import AlbumService from './AlbumService';
import { appConfig } from '../../appConfig';

export class AlbumStore {
  stubAlbums: string[] = ['A', 'B', 'C', 'D', 'E'];
  albums: string[] = [];

  private albumService: AlbumService;
  private albumsRunInterval: ReturnType<typeof setInterval> | undefined;

  constructor() {
    makeAutoObservable(this);
    this.albumService = new AlbumService();
  }

  initAlbums = () => {
    this.albums = this.stubAlbums;
  };

  getAlbums = async (query: string) => {
    await this.albumService
      .getAlbums(query)
      .then(response => {
        runInAction(() => {
          const newAlbums = this.albumService.prepareNewAlbumsForStore(
            response,
            this.stubAlbums,
          );

          this.albums = [...this.albums, ...newAlbums];
          this.runNewRotation();
        });
      })
      .catch(e => console.log('Get albums error: ', e));
  };

  runAlbumsRotation = () => {
    const newAlbums: string[] = this.albums.slice();

    this.albumsRunInterval = setInterval(() => {
      runInAction(() => {
        this.albums = this.albumService.prepareNewAlbumsForRotation(newAlbums);
      });
    }, appConfig.albumsRotationInterval);
  };

  resetAlbums = () => {
    this.albums = [];
    clearInterval(this.albumsRunInterval);
  };

  setDefaultAlbums = () => {
    this.albums = [...this.albums, ...this.stubAlbums];
    this.runNewRotation();
  };

  private runNewRotation = () => {
    clearInterval(this.albumsRunInterval);
    this.runAlbumsRotation();
  };
}
