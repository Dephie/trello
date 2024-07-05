import { z } from 'zod';

export const CreateList = z.object({
  title: z
    .string({
      required_error: '标题是必需的',
      invalid_type_error: '标题是必需的',
    })
    .min(3, {
      message: '标题过短',
    }),
  boardId: z.string(),
});