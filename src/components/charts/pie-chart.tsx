"use client";

import { Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

export default function PieChart() {
    const chartData = {
        labels: ["Revenues", "Pending"],
        datasets: [
            {
                label: "Total Revenues",
                data: [5500, 2300],
                backgroundColor: ["#0f0", "#f00"],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <h5 style={{ textAlign: "center" }}>Revenues</h5>
            <Pie
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
        </>
    );
}
