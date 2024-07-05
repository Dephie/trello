import { z } from 'zod';

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: '标题是必需的',
      invalid_type_error: '标题是必需的',
    })
    .min(3, {
      message: '标题过短',
    }),
  image: z.string({
    required_error: '图片是必需的',
    invalid_type_error: '图片是必需的',
  }),
});