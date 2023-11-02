import React, { useState } from 'react'

const Flashcard = ({ flashcard }) => {
    const [flip, setFlip] = useState(false)

    return (
        <div key={flashcard.id} className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
            <div className="front">
                {flashcard.question}
            </div>
            <div className="back">{flashcard.answer}</div>
        </div>
    )
}

export default Flashcard