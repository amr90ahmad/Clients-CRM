"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

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
        <div className='text-neutral-400 font-bold row-span-2 col-span-2'>
            <h5 style={{ textAlign: "center" }}>BarChart</h5>
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
        </div>
    );
}
