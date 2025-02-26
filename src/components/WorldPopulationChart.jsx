import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { FiGlobe } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(...registerables);

const WorldPopulationChart = () => {
    // Sample data (2023 estimates in millions)
    const populationData = [
        { country: 'China', population: 1425 },
        { country: 'India', population: 1408 },
        { country: 'USA', population: 339 },
        { country: 'Indonesia', population: 277 },
        { country: 'Pakistan', population: 240 },
        { country: 'Nigeria', population: 223 },
        { country: 'Brazil', population: 216 },
        { country: 'Bangladesh', population: 173 },
        { country: 'Russia', population: 144 },
        { country: 'Mexico', population: 128 },
    ];

    const [chartType, setChartType] = useState('bar');

    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.parsed.y !== undefined) {
                            label += `${context.parsed.y} million`;
                        }
                        return label;
                    }
                }
            }
        }
    };

    // Chart data configuration
    const chartData = {
        labels: populationData.map(item => item.country),
        datasets: [
            {
                label: 'Population (millions)',
                data: populationData.map(item => item.population),
                backgroundColor: [
                    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
                    '#EC4899', '#14B8A6', '#F97316', '#64748B', '#84CC16'
                ],
                borderColor: '#fff',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FiGlobe className="text-2xl text-blue-500" />
                <h1 className="text-2xl font-semibold text-gray-800">
                    World Population by Country
                </h1>
            </div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setChartType('bar')}
                    className={`px-4 py-2 rounded-md ${chartType === 'bar'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Bar Chart
                </button>
                <button
                    onClick={() => setChartType('pie')}
                    className={`px-4 py-2 rounded-md ${chartType === 'pie'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Pie Chart
                </button>
            </div>

            <div className="h-[500px] relative">
                {chartType === 'bar' ? (
                    <Bar
                        data={chartData}
                        options={{
                            ...commonOptions,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Population (in millions)'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Countries'
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <Pie
                        data={chartData}
                        options={{
                            ...commonOptions,
                            plugins: {
                                ...commonOptions.plugins,
                                datalabels: {
                                    formatter: (value) => `${value}M`,
                                    color: '#fff',
                                }
                            }
                        }}
                    />
                )}
            </div>

            <div className="mt-4 text-md font-bold text-gray-500">
                <p>* Population data in millions (2023 estimates)</p>
                <p>* Source: World Bank population projections</p>
            </div>
        </div>
    );
};

export default WorldPopulationChart;