import React, { useEffect, useState } from 'react'
import { CandidateType, VacancyType } from '../../../helpers/types';
import Candidate from './Candidate';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { fetchCandidatesForVacancy, updateCandidate } from './apis';
import { toast } from 'react-toastify';

interface PipelineTabProps {
    currentVacancy: VacancyType | null;
}

const PipelineTab = (props: PipelineTabProps) => {

    const { currentVacancy } = props;
    const [data, setData] = useState<any>({});
    const [stages, setStages] = useState<string[]>([]);

    useEffect(() => {
        if (!currentVacancy) {
            toast.error("Select a vacancy first!");
            return;
        }

        let str = currentVacancy.stages;
        let arr = str.split(',');
        arr = arr.map((value) => {
            return value.trim();
        });

        setStages(arr);
    }, [currentVacancy]);

    useEffect(() => {
        if (!currentVacancy) {
            return;
        }

        (async () => {
            const list = await fetchCandidatesForVacancy(currentVacancy.id);
            let tempData: any = {};

            list.map((_current) => {
                if (_current.vacancyId !== currentVacancy?.id) {
                    return;
                }

                if (!tempData[_current.status]) {
                    tempData[_current.status] = [];
                }

                tempData[_current.status].push(_current);
            });

            setData(tempData);
        })();
    }, [currentVacancy]);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sourceIdx = parseInt(result.source.droppableId);
        const targetIdx = parseInt(result.destination.droppableId);

        if (sourceIdx === targetIdx) {
            return;
        }

        let targetVacancy: any = {};
        let sourceList = data[sourceIdx].filter((_current: CandidateType) => {
            if (_current.id === result.draggableId) {
                targetVacancy = _current;
                return null;
            }

            return _current;
        });

        targetVacancy = {
            ...targetVacancy,
            status: targetIdx,
        }

        let targetList = data[targetIdx] || [];
        targetList.push(targetVacancy);

        let response = await updateCandidate(targetVacancy.id, targetVacancy);
        if (!response) {
            toast.error('Server error. Unable to update information!');
            return;
        }

        let tempData = {
            ...data,
            [sourceIdx]: sourceList,
            [targetIdx]: targetList,
        }

        setData(tempData);
    };

    if (!currentVacancy) {
        return (
            <div className='font-bold text-2xl'>
                No vacancy has been selected!
            </div>
        )
    }

    return (
        <div className='h-full' style={{ overflowX: 'scroll', overflowY: 'scroll' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='h-full flex flex-row' style={{}}>
                    {
                        stages.length && stages.map((key: string, idx: number) => (
                            <Candidate
                                key={idx}
                                elements={data[idx] || []}
                                prefix={key}
                                idx={idx}
                            />
                        ))
                    }
                </div>
            </DragDropContext>
        </div>
    )
}

export default PipelineTab
