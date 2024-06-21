'use client';

import { toast } from 'sonner';
import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';

import { CardWithList } from '@/types';
import { useAction } from '@/hooks/use-action';
import { copyCard } from '@/actions/copy-card';
import { Button } from '@/components/ui/button';
import { deleteCard } from '@/actions/delete-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCardModal } from '@/hooks/use-card-modal';

interface ActionsProps {
  // 卡片数据（包含列表信息）
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  // 卡片模态框自定义 hook
  const cardModal = useCardModal();

  // 使用自定义 hook 处理卡片复制操作
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      // 复制成功回调
      onSuccess: (data) => {
        toast.success(`卡片 "${data.title}" 已复制。`);
        cardModal.onClose();
      },
      // 复制失败回调
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  // 使用自定义 hook 处理卡片删除操作
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      // 删除成功回调
      onSuccess: (data) => {
        toast.success(`卡片 "${data.title}" 已删除。`);
        cardModal.onClose();
      },
      // 删除失败回调
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  // 复制卡片函数
  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  // 删除卡片函数
  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className='space-y-2 mt-2'>
      <p className='text-xs font-semibold'>操作</p>
      {/* 复制按钮 */}
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant='gray'
        className='w-full justify-start'
        size='inline'
      >
        <Copy className='h-4 w-4 mr-2' />
        复制
      </Button>
      {/* 删除按钮 */}
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant='gray'
        className='w-full justify-start'
        size='inline'
      >
        <Trash className='h-4 w-4 mr-2' />
        删除
      </Button>
    </div>
  );
};

// 骨架屏组件
Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className='space-y-2 mt-2'>
      <Skeleton className='w-20 h-4 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
      <Skeleton className='w-full h-8 bg-neutral-200' />
    </div>
  );
};