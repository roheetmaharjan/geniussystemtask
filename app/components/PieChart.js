"use client"
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import usersData from '../../lib/users.json';
import subscriptionsData from '../../lib/subscriptions.json';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const subscriptionCounts = subscriptionsData.reduce((acc, sub) => {
        acc[sub.package] = (acc[sub.package] || 0) + 1;
        return acc;
    }, {});

    const noSubscriptionCount = usersData.length - subscriptionsData.length;

    const data = {
        labels: [...Object.keys(subscriptionCounts), 'No Subscription'],
        datasets: [
            {
                label: '# of Users',
                data: [...Object.values(subscriptionCounts), noSubscriptionCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;