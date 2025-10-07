'use client'

import { cn } from '@/lib/utils'

export default function Button_v1({ children, className = '', ...rest }) {
    return (
        <button
            {...rest}
            className={cn(
                'border-[0.5px] duration-200 rounded-sm bg-transparent px-6 py-1 text-lg font-medium',
                'shadow-[4px_4px_0px_0px_rgba(0,0,0)] active:shadow-none border-zinc-800 hover:bg-zinc-50 hover:text-black text-zinc-800',
                'dark:border-zinc-600 dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] active:dark:shadow-none dark:text-zinc-50 dark:bg-zinc-950',
                className,
            )}
        >
            {children}
        </button>
    )
}

