import React, {useEffect, useState} from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CusomBarChart from '../Charts/CusomBarChart';

const Last30DaysExpenses = ({data}) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {}
  }, [data]);

  return (
    <div className='card col-span-1 '>
      <div className='flex items-center justify-between pb-8'>
        <h5 className='text-lg'>Last 30 days Expenses</h5>
      </div>

      <CusomBarChart data= {chartData} />
    </div>
  )
}

export default Last30DaysExpenses