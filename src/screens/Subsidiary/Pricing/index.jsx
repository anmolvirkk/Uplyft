import React, { useState, useEffect } from 'react'
import styles from './_pricing.module.sass'
import Header from '../LandingPage/components/Header'
import Toggle from './components/Toggle'
import Plan from './components/Plan'
import company from '../../../company'
import Footer from '../LandingPage/components/Footer'

export const plans = [
  {
    title: 'Starter',
    subtitle: 'free forever',
    price: 0,
    features: {
      journals: [
        'Up to 4 journals',
        'Up to 10 entries per journal',
        'Up to 6 notes per entry',
        'Local browser storage',
        'Limited customizable options',
        'Single device'
      ],
      schedule: [
        'Up to 6 habits',
        'Up to 3 times limit for habits',
        'Up to 3 projects',
        'Up to 12 tasks',
        'One layer of subtasks',
        'Up to 12 events',
        'Limited customizable options',
        'Local browser storage',
        'Single device'
      ],
      notes: [
        'Up to 2 folders',
        'Up to 6 mind maps per folder',
        'Link upto 2 notes',
        'No export options',
        'Limited customizable options',
        'Local browser storage',
        'Single device'
      ],
      finances: [
        'Manual budget tracking',
        'Setting up to 5 financial goals',
        'Up to 5 custom income and expense categories',
        'No automatic seperation of bills and subscription',
        'No stock market investing',
        'Limited customizable options',
        'Local browser storage',
        'Single device'
      ],
      fitness: [
        'Weight tracking',
        'Gym logs',
        'Up to 6 custom workout routines',
        'Calorie tracking',
        'Choose from an extensive list of meal plans',
        'Up to 6 custom meals',
        'Choose from an extensive list of recipies',
        'Up to 6 custom recipies',
        'Groccery list',
        'Water tracking',
        'No food database',
        'No barcode scanner',
        'Limited customizable options',
        'Local browser storage',
        'Single device'
      ]
    }
  },
  {
    title: 'Plus',
    subtitle: 'unlocks everything',
    price: 40,
    features: {
      journals: [
        'Unlimited journals',
        'Unlimited entries per journal',
        'Unlimited notes per entry',
        'Unlocked customizable options',
        'Local browser storage',
        'Single device'
      ],
      schedule: [
        'Unlimited habits',
        'Unlimited times limit for habits',
        'Unlimited projects',
        'Unlimited tasks',
        'Unlimited layers of subtasks',
        'Unlimited events',
        'Unlocked customizable options',
        'Local browser storage',
        'Single device'
      ],
      notes: [
        'Unlimited folders',
        'Unlimited mind maps per folder',
        'Link unlimited notes',
        'No export options',
        'Unlocked customizable options',
        'Local browser storage',
        'Single device'
      ],
      finances: [
        'Manual budget tracking',
        'Setting unlimited financial goals',
        'Unlimited custom income and expense categories',
        'No automatic seperation of bills and subscription',
        'No stock market investing',
        'Unlocked customizable options',
        'Local browser storage',
        'Single device'
      ],
      fitness: [
        'Weight tracking',
        'Gym logs',
        'Unlimited custom workout routines',
        'Calorie tracking',
        'Choose from an extensive list of meal plans',
        'Unlimited custom meal plans',
        'Choose from an extensive list of recipies',
        'Unlimited custom recipies',
        'Groccery list',
        'Water tracking',
        'No food database',
        'No barcode scanner',
        'Unlocked customizable options',
        'Local browser storage',
        'Single device'
      ]
    }
  },
  {
    title: 'Pro',
    subtitle: 'unlocks everything + cloud storage + additional online features',
    price: 50,
    features: {
      journals: [
        'Unlimited journals',
        'Unlimited entries',
        'Unlimited notes',
        'Unlocked customizable options',
        'Cloud storage',
        'Multiple devices'
      ],
      schedule: [
        'Unlimited habits',
        'Unlimited times limit for habits',
        'Unlimited projects',
        'Unlimited tasks',
        'Unlimited layers of subtasks',
        'Unlimited events',
        'Unlocked customizable options',
        'Cloud storage',
        'Multiple devices'
      ],
      notes: [
        'Unlimited folders',
        'Unlimited mind maps per folder',
        'Link unlimited notes',
        'Export as PDF',
        'Unlocked customizable options',
        'Cloud storage',
        'Multiple devices'
      ],
      finances: [
        'Automatic budget tracking',
        'Setting unlimited financial goals',
        'Unlimited custom income and expense categories',
        'Automatic seperation of bills and subscriptions',
        'Investing in the stock market',
        'Unlocked customizable options',
        'Cloud storage',
        'Multiple devices'
      ],
      fitness: [
        'Weight tracking',
        'Gym logs',
        'Unlimited custom workout routines',
        'Calorie tracking',
        'Choose from an extensive list of meal plans',
        'Unlimited custom meal plans',
        'Choose from an extensive list of recipies',
        'Unlimited custom recipies',
        'Groccery list',
        'Water tracking',
        'Massive food database',
        'barcode scanner',
        'Unlocked customizable options',
        'Cloud storage',
        'Multiple devices'
      ]
    }
  }
]

const Pricing = () => {

  const [month, setMonth] = useState(false)
  
  useEffect(()=>{
    document.getElementsByTagName('html')[0].className = 'light'
  }, [])

  return (
    <div className={`${styles.pricing} light`} style={{height: window.innerHeight+'px'}}>
        <Header type='pricing' />
        <div className={styles.title}>
          <h1>Ready to start with <span>{company.subsidiary}</span>?</h1>
          <p>Choose the plan that suits you.</p>
        </div>
        <Toggle month={month} setMonth={setMonth} />
        <div className={styles.plans}>
          {plans.map((item, i)=>{
            return <Plan {...item} interval={month?'month':'year'} key={i} month={month} />
          })}
        </div>
        <Footer type='pricing' />
    </div>
  )
}

export default Pricing
