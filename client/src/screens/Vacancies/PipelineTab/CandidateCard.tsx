import { Card } from '@mui/material';
import React from 'react'
import { CandidateType } from '../../../helpers/types';
import { DebounceInput } from 'react-debounce-input';
import { updateCandidate } from "./apis";

interface CandidateCardProps {
    item: CandidateType;
}

const CandidateCard = (props: CandidateCardProps) => {

    const { item } = props;

    const _changeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let updatedInfo = {
            ...item,
            description: e.target.value,
        }

        let response = await updateCandidate(item.id, updatedInfo);
        if (!response) {
            await updateCandidate(item.id, updatedInfo);
        }
    }

    return (
        <Card className='p-1 h-full' sx={{ minHeight: '100px', maxHeight: '100px', }}>
            <span className='cursor-pointer text-primary'>{item.name}</span>
            <DebounceInput
                element="textarea"
                className='text-xs w-full h-full bg-transparent '
                value={item.description}
                onChange={_changeHandler}
                debounceTimeout={1000}
                rows={4}
                placeholder="Comments"
            />
        </Card>
    )
}

export default CandidateCard