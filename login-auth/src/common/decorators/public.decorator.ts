// 不进行jwt鉴权

import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../contants/decorator.contant';
export const Public = () => SetMetadata(PUBLIC_KEY, true);
