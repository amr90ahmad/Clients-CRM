import React from "react";
import { getAdminCardsInfo } from "../app/lib/data";
import CardComponent from "@/components/card";

export default async function AdminCards() {
    const cardsInfo = await getAdminCardsInfo();

    if (
        !cardsInfo ||
        !cardsInfo.numOfUsers ||
        !cardsInfo.numOfClients ||
        !cardsInfo.numOfTransactions ||
        !cardsInfo.revenues
    ) {
        return null;
    }

    const { numOfClients, numOfUsers, numOfTransactions, revenues } = cardsInfo;

    return (
        <div className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <CardComponent title='Users' info={numOfUsers} />
            <CardComponent title='Clients' info={numOfClients} />
            <CardComponent title='Transactions' info={numOfTransactions} />
            <CardComponent title='Revenues' info={revenues} />
        </div>
    );
}
