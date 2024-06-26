import Link from 'next/link';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import { Medal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
});

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const MarketingPage = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div
        className={cn(
          'flex items-center justify-center flex-col',
          headingFont.className
        )}
      >
        <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
          <Medal className='h-6 w-6 mr-2' />
          任务管理 No. 1
        </div>
        <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>
          Taskify 帮助你的团队取得进展
        </h1>
        <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 pt-4 pb-2 rounded-md w-fit'>
          开{" "}始{" "}!
        </div>
      </div>
      <div
        className={cn(
          'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
          textFont.className
        )}
      >
        协作，管理项目并达到新的生产力高峰。
        从摩天大楼到家庭办公室，你的团队的工作方式是独一无二的：用 Taskify 完成所有任务
      </div>
      <Button className='mt-6' size='lg' asChild>
        <Link href='/sign-up'>免费获取 Taskify</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;