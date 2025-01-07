"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import usersData from '../../lib/users.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalUsersChart = () => {
    // Group users by their join year
    const usersByYear = usersData.reduce((acc, user) => {
        const joinYear = new Date(parseInt(user.join_date) * 1000).getFullYear();
        acc[joinYear] = (acc[joinYear] || 0) + 1;
        return acc;
    }, {});

    // Prepare the data for the bar chart
    const data = {
        labels: Object.keys(usersByYear),
        datasets: [
            {
                label: 'Total Users',
                data: Object.values(usersByYear),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Number of Users by Join Year',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default TotalUsersChart;