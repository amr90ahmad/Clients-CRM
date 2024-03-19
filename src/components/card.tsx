export default function Card({ title = "Pageviews", count = "50.9K" }) {
    return (
        <div className='rounded-lg bg-primary-2 border-border-clr p-4'>
            <p className='text-neutral-400 mb-4'>{title}</p>
            <span className='text-neutral-100 text-2xl font-bold'>{count}</span>
        </div>
    );
}
