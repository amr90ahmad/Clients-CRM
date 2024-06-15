import { getCardsInfo } from "@/app/lib/data";
import CardComponent from "@/components/card";

export default async function UserCards() {
    const cardsInfo = await getCardsInfo();

    if (
        !cardsInfo ||
        !cardsInfo.numOfClients ||
        !cardsInfo.numOfTransactions ||
        !cardsInfo.revenues ||
        !cardsInfo.income
    ) {
        return null;
    }

    const { numOfClients, income, numOfTransactions, revenues } = cardsInfo;

    return (
        <div className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <CardComponent title='Clients' info={numOfClients} />
            <CardComponent title='Transactions' info={numOfTransactions} />
            <CardComponent title='Revenues' info={revenues} />
            <CardComponent title='Income' info={income} />
        </div>
    );
}
