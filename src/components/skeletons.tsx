export function TableRowsSkeleton() {
    return (
        <div className='animate-pulse mt-4'>
            <div className='w-full h-8 bg-gray-200 dark:bg-gray-700 rounded mb-8'></div>
            <div className='w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
            <div className='w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
            <div className='w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
            <div className='w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
        </div>
    );
}

export function FormSkeleton() {
    return (
        <div
            role='status'
            className='w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700'
        >
            <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded w-[50%] mb-10'></div>
            <div className='h-6 w-[30%] bg-gray-200 rounded dark:bg-gray-700 mb-2'></div>
            <div className='h-10 bg-gray-200 rounded dark:bg-gray-700 mb-6'></div>
            <div className='h-6 w-[30%] bg-gray-200 rounded dark:bg-gray-700 mb-2'></div>
            <div className='h-10 bg-gray-200 rounded dark:bg-gray-700 mb-6'></div>
            <div className='h-6 w-[30%] bg-gray-200 rounded dark:bg-gray-700 mb-2'></div>
            <div className='h-10 bg-gray-200 rounded dark:bg-gray-700 mb-6'></div>
            <div className='h-12 bg-gray-200 rounded dark:bg-gray-700 w-[30%]'></div>
        </div>
    );
}

export function CardsSkeleton() {
    return (
        <div className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <div className='max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                        <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
                </div>
            </div>
            <div className='max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                        <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
                </div>
            </div>
            <div className='max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                        <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
                </div>
            </div>
            <div className='max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
                        <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
                </div>
            </div>
        </div>
    );
}
