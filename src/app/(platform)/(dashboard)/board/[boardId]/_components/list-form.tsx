'use client';

import { useState, useRef, ElementRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/use-action';
import { Button } from '@/components/ui/button';
import { createList } from '@/actions/create-list';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';

import { ListWrapper } from './list-wrapper';

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  // 使用自定义 hook 处理列表创建操作
  const { execute, fieldErrors } = useAction(createList, {
    // 创建成功回调
    onSuccess: (data) => {
      toast.success(`列表 "${data.title}" 已创建`);
      disableEditing();
      router.refresh();
    },
    // 创建失败回调
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = formData.get('boardId') as string;

    execute({
      title,
      boardId,
    });
  };

  // 如果正在编辑，则渲染表单
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
        >
          {/* 列表标题输入框 */}
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id='title'
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
            placeholder='请输入列表标题'
          />
          {/* 隐藏的看板 ID 输入框 */}
          <input hidden value={params.boardId} name='boardId' />
          <div className='flex items-center justify-between gap-x-1'>
            {/* 提交按钮 */}
            <FormSubmit variant='outline'>添加</FormSubmit>
            {/* 取消按钮 */}
            <Button onClick={disableEditing} size='sm' variant='ghost'>
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  // 如果没有编辑，则渲染添加列表按钮
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'
      >
        <Plus className='h-4 w-4 mr-2' />
        添加到列表
      </button>
    </ListWrapper>
  );
};