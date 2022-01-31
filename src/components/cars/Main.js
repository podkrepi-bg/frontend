import React from 'react';
import CarsGrid from './CarsGrid';

export default function CarsMain({ cars, setCars }) {
    return <>
        <CarsGrid cars={cars} setCars={setCars} />
    </>;
}
