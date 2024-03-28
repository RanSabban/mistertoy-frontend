
import React from 'react';

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { RadialLinearScale, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, PolarArea } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { loadToys } from '../store/actions/toy.actions';
import { PieChart } from './PieChart';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);



export function ToyChart() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('index => cannot load toys', err);
                throw err
            })
    }, [])

    console.log(toyService.getLabels());
    
    return (
        <section className="chart-contaioner">
            {!isLoading ?
                <PieChart toys={toys} />
                : <div className="loader"><span>III</span></div>
            }
        </section>
    )
}