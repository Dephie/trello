'use client';

import { toast } from 'sonner';
import { List } from '@prisma/client';
import { ElementRef, useRef } from 'react';
import { MoreHorizontal, X } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { Button } from '@/components/ui/button';
import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';
import { FormSubmit } from '@/components/form/form-submit';
import { Separator } from '@/components/ui/separator';

interface ListOptionsProps {
  // 列表数据
  data: List;
  // 添加卡片函数
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);

  // 使用自定义 hook 处理列表删除操作
  const { execute: executeDelete } = useAction(deleteList, {
    // 删除成功回调
    onSuccess: (data) => {
      toast.success(`列表 "${data.title}" 已删除`);
      closeRef.current?.click();
    },
    // 删除失败回调
    onError: (error) => {
      toast.error(error);
    },
  });

  // 使用自定义 hook 处理列表复制操作
  const { execute: executeCopy } = useAction(copyList, {
    // 复制成功回调
    onSuccess: (data) => {
      toast.success(`列表 "${data.title}" 已复制`);
      closeRef.current?.click();
    },
    // 复制失败回调
    onError: (error) => {
      toast.error(error);
    },
  });

  // 删除列表函数
  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeDelete({ id, boardId });
  };

  // 复制列表函数
  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      {/* 触发 Popover 的按钮 */}
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='ghost'>
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
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        {/* 复制列表表单 */}
        <form action={onCopy}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            复制列表...
          </FormSubmit>
        </form>
        <Separator />
        {/* 删除列表表单 */}
        <form action={onDelete}>
          <input hidden name='id' id='id' value={data.id} />
          <input hidden name='boardId' id='boardId' value={data.boardId} />
          <FormSubmit
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            删除此列表
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};