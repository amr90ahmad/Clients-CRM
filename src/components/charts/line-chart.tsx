"use client";

import { Line } from "react-chartjs-2";
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

export default function LineChart() {
    const chartData = {
        labels: [...months.slice(0, 7)],
        datasets: [
            {
                label: "revenues",
                data: [5500, 2300, 9600, 5500, 2300, 5500, 2300],
                backgroundColor: "#C23AF6",
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
                    <Line
                        data={chartData}
                        options={{
                            plugins: {
                                title: {
                                    display: false,
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
