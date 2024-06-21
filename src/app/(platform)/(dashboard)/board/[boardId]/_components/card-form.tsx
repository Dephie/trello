// 使用客户端组件
'use client';

import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';
import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from 'react';
import { useParams } from 'next/navigation';
import { useOnClickOutside, useEventListener } from 'usehooks-ts';

import { useAction } from '@/hooks/use-action';
import { createCard } from '@/actions/create-card';
import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';

interface CardFormProps {
  // 列表 ID
  listId: string;
  // 启用编辑函数
  enableEditing: () => void;
  // 禁用编辑函数
  disableEditing: () => void;
  // 是否正在编辑
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    // 表单 ref
    const formRef = useRef<ElementRef<'form'>>(null);

    // 使用自定义 hook 处理卡片创建操作
    const { execute, fieldErrors } = useAction(createCard, {
      // 创建成功回调
      onSuccess: (data) => {
        toast.success(`卡片 "${data.title}" 已创建。`);
        formRef.current?.reset();
      },
      // 创建失败回调
      onError: (error) => {
        toast.error(error);
      },
    });

    // 键盘按下事件处理函数
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing();
      }
    };

    // 使用自定义 hook 处理表单外部点击事件
    useOnClickOutside(formRef, disableEditing);
    // 使用自定义 hook 监听键盘按下事件
    useEventListener('keydown', onKeyDown);

    // 文本域键盘按下事件处理函数
    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      // 按下回车键且没有按下 Shift 键时提交表单
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    // 表单提交事件处理函数
    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string;
      const listId = formData.get('listId') as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    // 如果正在编辑，则渲染表单
    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className='m-1 py-0.5 px-1 space-y-4'
        >
          {/* 卡片标题输入框 */}
          <FormTextarea
            id='title'
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder='请输入卡片标题...'
            errors={fieldErrors}
          />
          {/* 隐藏的列表 ID 输入框 */}
          <input hidden id='listId' name='listId' value={listId} />
          <div className='flex items-center justify-between gap-x-1'>
            {/* 提交按钮 */}
            <FormSubmit>添加卡片</FormSubmit>
            {/* 取消按钮 */}
            <Button onClick={disableEditing} size='sm' variant='ghost'>
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      );
    }

    // 如果没有编辑，则渲染添加卡片按钮
    return (
      <div className='pt-2 px-2'>
        <Button
          onClick={enableEditing}
          className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
          size='sm'
          variant='ghost'
        >
          <Plus className='h-4 w-4 mr-2' />
          添加卡片
        </Button>
      </div>
    );
  }
);

CardForm.displayName = 'CardForm';