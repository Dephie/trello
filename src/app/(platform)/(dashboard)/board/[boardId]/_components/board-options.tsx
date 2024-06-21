'use client';

import { toast } from 'sonner';
import { MoreHorizontal, X } from 'lucide-react';

import { deleteBoard } from '@/actions/delete-board';
import { useAction } from '@/hooks/use-action';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface BoardOptionsProps {
  // 看板 ID
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  // 使用自定义 hook 处理看板删除操作
  const { execute, isLoading } = useAction(deleteBoard, {
    // 删除失败回调
    onError: (error) => {
      toast.error(error);
    },
  });

  // 删除看板函数
  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      {/* 触发 Popover 的按钮 */}
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='transparent'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      {/* Popover 内容 */}
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        {/* 标题 */}
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          操作
        </div>
        {/* 关闭按钮 */}
        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        {/* 删除看板按钮 */}
        <Button
          variant='ghost'
          onClick={onDelete}
          disabled={isLoading}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        >
          删除此看板
        </Button>
      </PopoverContent>
    </Popover>
  );
};