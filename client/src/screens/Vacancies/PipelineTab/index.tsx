import React from 'react'
import { VacancyType } from '../../../helpers/types';

interface PipelineTabProps {
    currentVacancy: VacancyType | null;
}

const PipelineTab = (props: PipelineTabProps) => {

    const { currentVacancy } = props;

    return (
        <div>PipelineTab</div>
    )
}

export default PipelineTab
