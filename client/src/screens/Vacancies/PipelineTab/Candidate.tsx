import React from 'react'
import { CandidateType } from '../../../helpers/types';
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from "react-beautiful-dnd";
import CandidateCard from './CandidateCard';

interface CandidateProps {
    elements: CandidateType[];
    prefix: string;
    idx: number;
}

const DroppableStyles = {
    padding: '10px',
    borderRadius: '6px',
    background: '#d4d4d4',
    minWidth: '250px',
    maxWidth: '250px',
    // marginX: '10px',
    marginRight: '10px',
}

const Candidate = (props: CandidateProps) => {
    const { elements, prefix } = props;

    return (
        <div style={DroppableStyles} className=''>
            <div className='mb-5 font-bold uppercase flex justify-center'>
                {prefix}
            </div>

            <Droppable droppableId={`${props.idx}`}>
                {(provided) => (
                    <div className='h-full' {...provided.droppableProps} ref={provided.innerRef}>
                        {elements.map((item, index) => (
                            <Draggable
                                draggableId={item.id}
                                index={index}
                                key={index}>
                                {
                                    (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
                                        return (
                                            <div
                                                className='my-2'
                                                style={{ maxHeight: '100px', minHeight: '100px' }}
                                                ref={provided.innerRef}
                                                // snapshot={snapshot}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <CandidateCard
                                                    item={item}
                                                />
                                            </div>
                                        )
                                    }
                                }
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Candidate