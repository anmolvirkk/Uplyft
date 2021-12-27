import React from 'react'
import { ChevronDown, Maximize2 } from 'react-feather'
import styles from './_faq.module.sass'

const faqs = [
    {
        question: 'What’s included with Google Workspace (formerly G Suite)?',
        answer: 'Similar to G Suite, all Google Workspace plans provide a custom email for your business and include collaboration tools like Gmail, Calendar, Meet, Chat, Drive, Docs, Sheets, Slides, Forms, Sites and more. For additional details, visit our plans and pricing page.'
    },
    {
        question: 'What’s included with Google Workspace (formerly G Suite)?',
        answer: 'Similar to G Suite, all Google Workspace plans provide a custom email for your business and include collaboration tools like Gmail, Calendar, Meet, Chat, Drive, Docs, Sheets, Slides, Forms, Sites and more. For additional details, visit our plans and pricing page.'
    },
    {
        question: 'What’s included with Google Workspace (formerly G Suite)?',
        answer: 'Similar to G Suite, all Google Workspace plans provide a custom email for your business and include collaboration tools like Gmail, Calendar, Meet, Chat, Drive, Docs, Sheets, Slides, Forms, Sites and more. For additional details, visit our plans and pricing page.'
    },
    {
        question: 'What’s included with Google Workspace (formerly G Suite)?',
        answer: 'Similar to G Suite, all Google Workspace plans provide a custom email for your business and include collaboration tools like Gmail, Calendar, Meet, Chat, Drive, Docs, Sheets, Slides, Forms, Sites and more. For additional details, visit our plans and pricing page.'
    },
    {
        question: 'What’s included with Google Workspace (formerly G Suite)?',
        answer: 'Similar to G Suite, all Google Workspace plans provide a custom email for your business and include collaboration tools like Gmail, Calendar, Meet, Chat, Drive, Docs, Sheets, Slides, Forms, Sites and more. For additional details, visit our plans and pricing page.'
    }
]

const Faq = () => {
    return (
        <div className={styles.faq}>
            <h2>Find the answers that you need</h2>
            <div className={styles.list}>
                <div className={styles.expandAll}>
                    <button>
                        <p>Expand All</p>
                        <Maximize2 />
                    </button>
                </div>
                {faqs.map((item, i)=>{
                    return (
                        <div key={i} className={styles.question}>
                            <div className={styles.title}>
                                <h3>{item.question}</h3>
                                <ChevronDown />
                            </div>
                            <p>{item.answer}</p>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Faq
