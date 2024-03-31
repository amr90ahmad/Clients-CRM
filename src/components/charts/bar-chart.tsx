"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart, { defaults } from "chart.js/auto";
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

export default function BarChart() {
    const chartData = {
        labels: [...months],
        datasets: [
            {
                label: "Revenues",
                data: [
                    11200, 8200, 4000, 11200, 8200, 4000, 11200, 8200, 4000,
                    11200, 8200, 4000,
                ],
                backgroundColor: "#62c3fe",
            },
            {
                label: "Income",
                data: [
                    5200, 2200, 1000, 5200, 2200, 1000, 5200, 2200, 1000, 5200,
                    2200, 1000,
                ],
                backgroundColor: "#cb3cff",
            },
        ],
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>$240K</CardTitle>
                    <CardDescription>Revenues</CardDescription>
                </CardHeader>
                <CardContent>
                    <Bar data={chartData} />
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </>
    );
}
