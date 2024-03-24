import { getCardsInfo } from "@/app/lib/data";
import CardComponent from "@/components/card";

export default async function Cards() {
    const { numOfClients, numOfUsers, numOfTransactions, totalRevenues } =
        await getCardsInfo();
    return (
        <div className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <CardComponent title='Users' info={numOfUsers} />
            <CardComponent title='Clients' info={numOfClients} />
            <CardComponent title='Transaction' info={numOfTransactions} />
            <CardComponent title='Total Revenues' info={`$ ${totalRevenues}`} />
        </div>
    );
}
