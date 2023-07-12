import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { getPhoto } from '../testing/get-photo.mock';
import { FileService } from './file.service';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  it('validates definition', () => {
    expect(fileService).toBeDefined();
  });

  describe('FileService tests', () => {
    it('upload method', async () => {
      const photo = await getPhoto();
      const path = join(
        __dirname,
        '..',
        'testing',
        'storage',
        'photo-test.png',
      );
      fileService.upload(photo, path);
    });
  });
});
