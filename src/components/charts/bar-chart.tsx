"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

Chart.register(CategoryScale);

const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(2000, i + 1, 1).toLocaleDateString("en", {
        month: "short",
    });
});

export default function BarChart() {
    const chartData = {
        labels: [...months],
        datasets: [
            {
                label: "revenues",
                data: [
                    5500, 2300, 9600, 5500, 2300, 9600, 5500, 2300, 9600, 5500,
                    2300, 9600,
                ],
                backgroundColor: ["#c23af5", "#5dbaf4"],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Revenues</CardTitle>
                </CardHeader>
                <CardContent>
                    <Bar
                        data={chartData}
                        options={{
                            scales: {
                                x: {
                                    type: "category", // Specify x-axis scale type as 'category'
                                },
                            },
                            plugins: {
                                title: {
                                    display: false,
                                    text: "",
                                },
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </>
    );
}
