import { z } from 'zod';

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: '描述是必需的',
        invalid_type_error: '描述是必需的',
      })
      .min(3, {
        message: '描述过短',
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: '标题是必需的',
        invalid_type_error: '标题是必需的',
      })
      .min(3, {
        message: '标题过短',
      })
  ),
  id: z.string(),
});