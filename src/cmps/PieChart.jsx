import React from 'react';

import { RadialLinearScale, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


import { toyService } from "../services/toy.service";



export function PieChart({toys}) {

    const dataPrice = {
        labels: toyService.getLabels(),
        datasets: [
            {
                label: 'Average Price',
                data: getDataPrice(),
                backgroundColor: [
                    '#1f77b4', // blue
                    '#ff7f0e', // orange
                    '#2ca02c', // green
                    '#d62728', // red
                    '#9467bd', // purple
                    '#8c564b', // brown
                    '#e377c2', // pink
                    '#7f7f7f', // gray
                    '#bcbd22'  // yellow
                  ],
                  borderColor: [
                    '#1769aa', // darker blue
                    '#cc6d0a', // darker orange
                    '#1e7c22', // darker green
                    '#a01f1b', // darker red
                    '#754b9c', // darker purple
                    '#6b473e', // darker brown
                    '#c25195', // darker pink
                    '#5f5f5f', // darker gray
                    '#8e981b'  // darker yellow
                  ],
                  borderWidth: 1,
            }
        ]
    }

    const dataStock = {
        labels: toyService.getLabels(),
        datasets: [
            {
                label: 'Total Stock',
                data: getDataStock(),
                backgroundColor: [
                    '#1f77b4', // blue
                    '#ff7f0e', // orange
                    '#2ca02c', // green
                    '#d62728', // red
                    '#9467bd', // purple
                    '#8c564b', // brown
                    '#e377c2', // pink
                    '#7f7f7f', // gray
                    '#bcbd22'  // yellow
                  ],
                  borderColor: [
                    '#1769aa', // darker blue
                    '#cc6d0a', // darker orange
                    '#1e7c22', // darker green
                    '#a01f1b', // darker red
                    '#754b9c', // darker purple
                    '#6b473e', // darker brown
                    '#c25195', // darker pink
                    '#5f5f5f', // darker gray
                    '#8e981b'  // darker yellow
                  ],
                  borderWidth: 1,
            }
        ]
    }

    function getDataPrice() {
        const labels = toyService.getLabels()
        const labelsMap = {}
        labels.forEach(label => {
          labelsMap[label] = 0  
        })
        toys.forEach((toy) => {
            toy.labels.forEach((label) => {
                console.log(label);
                labelsMap[label] ? '' : labelsMap[label] = 1
                labelsMap[label] = Math.ceil((labelsMap[label] + toy.price) / 2)
                console.log(labelsMap);
            })
        })
        const labelsCount = []
        for (const [label, value] of Object.entries(labelsMap)) {
            console.log(`${label}: ${value}`);
            labelsCount.push(value)
        }
        console.log(labelsMap);
        console.log(labelsCount);
        return labelsCount
    }

    function getDataStock() {
        const labels = toyService.getLabels()
        const labelsMap = {}
        labels.forEach(label => {
          labelsMap[label] = 0  
        })
        toys.forEach((toy) => {
            toy.labels.forEach((label) => {
                // console.log(label);
                if (toy.stock){
                    labelsMap[label] ? '' : labelsMap[label] = 0
                    labelsMap[label]=  labelsMap[label] + toy.stock
                }
                console.log(labelsMap);
            })
        })
        const labelsCount = []
        for (const [label, value] of Object.entries(labelsMap)) {
            console.log(`${label}: ${value}`);
            labelsCount.push(value)
        }
        return labelsCount
    }

    return <section style={{width: 500}} className="pie-chart-container">
        <h2>Average Price per label</h2>
        <Pie data={dataPrice} />
        <h2>Total stock per label</h2>
        <Pie data={dataStock} />
    </section>
}