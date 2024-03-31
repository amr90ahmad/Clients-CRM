"use client";

import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart,{defaults} from "chart.js/auto";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
Chart.register(CategoryScale);

const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(2000, i + 1, 1).toLocaleDateString("en", {
        month: "short",
    });
});

export default function LineChart() {
    const chartData = {
        labels: [...months],
        datasets: [
            {
                label: "Transactions",
                data: [17, 12, 10, 22, 17, 12, 10, 22, 17, 12, 10, 22],
                backgroundColor: "#62c3fe",
                borderColor: "#62c3fe",
            },
            {
                label: "Clients",
                data: [7, 8, 10, 2, 7, 8, 10, 2, 7, 8, 10, 2],
                backgroundColor: "#cb3cff",
                borderColor: "#cb3cff",
            },
        ],
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>2102</CardTitle>
                    <CardDescription>Transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Line data={chartData} />
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </>
    );
}
