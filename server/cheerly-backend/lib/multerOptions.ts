import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { diskStorage } from 'multer';

// // 업로드 가능한 확장자 설정
// export const imageFileFilter = (req, file, callback) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//     return callback(new Error('Only image files are allowed!'), false);
//   }
//   callback(null, true);
// };

// // 파일명 중복을 피하기 위해 파일명 수정
// export const editFileName = (req, file, callback) => {
//   const name = file.originalname.split('.')[0];
//   const fileExtName = file.originalname.slice(
//     file.originalname.lastIndexOf('.') - 1 + 2,
//   );
//   const time = Date.now();
//   const randomName = `${name}-${time}`;
//   callback(null, `${randomName}.${fileExtName}`);
// };

// export const multerConfig = {
//   dest: 'upload',
// };

// function uuidRandom(file) {
//   const result = `${uuid()}${extname(file.originalname)}`;
//   return result;
// }

// export const multerOptions = {
//   filefilter: (req: any, file: any, cb: any) => {
//     if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//       cb(null, true);
//     } else {
//       cb(
//         new HttpException(
//           `Unsupported file type ${file.originalname}`,
//           HttpStatus.BAD_REQUEST,
//         ),
//         false,
//       );
//     }
//   },
//storage properties
// storage: diskStorage({
//   destination: (req: any, file: any, cb: any) => {
//     const uploadPath = multerConfig.dest;
//     if (!existsSync(uploadPath)) {
//       mkdirSync(uploadPath);
//     }
//     cb(null, uploadPath);
//   },
// filename: (req: any, file: any, cb: any) => {
//   cb(null, uuidRandom(file));
// },
//   }),
// };

export const imageFileFilter = (req: any, file: any, callback: any) => {
  // if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
  //   cb(null, true);
  // } else {
  //   cb(
  //     new HttpException(
  //       `Unsupported file type ${file.originalname}`,
  //       HttpStatus.BAD_REQUEST,
  //     ),
  //     false,
  //   );
  // }
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
