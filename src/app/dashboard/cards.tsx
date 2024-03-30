import { getCardsInfo } from "@/app/lib/data";
import CardComponent from "@/components/card";

export default async function Cards() {
    const cardsInfo = await getCardsInfo();

    if (
        !cardsInfo ||
        !cardsInfo.numOfClients ||
        !cardsInfo.numOfUsers ||
        !cardsInfo.numOfTransactions ||
        !cardsInfo.totalRevenues
    ) {
        return null;
    }

    const { numOfClients, numOfUsers, numOfTransactions, totalRevenues } =
        cardsInfo;

    return (
        <div className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <CardComponent title='Users' info={numOfUsers} />
            <CardComponent title='Clients' info={numOfClients} />
            <CardComponent title='Transaction' info={numOfTransactions} />
            <CardComponent title='Total Revenues' info={totalRevenues} />
        </div>
    );
}
