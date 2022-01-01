import React from 'react'

const questions = [
    {
        question: 'What are the main features of Uplyft?',
        answer: ''
    },
    {
        question: 'How much does the app cost?',
        answer: ''
    },
    {
        question: 'Is there a free version?',
        answer: ''
    },
    {
        question: 'Can I use Uplyft in multiple devices?',
        answer: ''
    },
    {
        question: 'Do you support languages other than English?',
        answer: ''
    },
    {
        question: 'Is there an option to pay annually?',
        answer: ''
    },
    {
        question: 'Can I sync across multiple devices (mobile, desktop)?',
        answer: ''
    }
]

const FAQ = () => {
    return (
        <div className={styles.faq}>
            {questions.map((item)=>{
                return <div>{item}</div>
            })}
        </div>
    )
}

export default FAQ
