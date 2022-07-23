import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react'
import { CompanyType } from '../../helpers/types'
import LanguageIcon from '@mui/icons-material/Language';
import { useHistory } from 'react-router-dom';

interface SingleCompanyProps {
    info: CompanyType;
    setSelectedCompany: (selectedCompany: CompanyType) => void;
    setIsEditCompanyModalOpen: (value: boolean) => void;
}

const SingleCompany = (props: SingleCompanyProps) => {

    const { info } = props;
    const history = useHistory();

    const _cardClickHandler = () => {
        props.setSelectedCompany(info);
        props.setIsEditCompanyModalOpen(true);
    }

    const _calcApproxSize = (): string => {
        if (info.companySize <= 1000) {
            return "" + info.companySize;
        }

        let rem: number = info.companySize % 100;
        let hundreds: number = info.companySize / 100;

        if (rem > 50) {
            hundreds += 1;
        }

        let cnt = hundreds * 100;

        if (cnt < 100000) {
            return "" + cnt / 1000 + "k"
        }

        return "" + Math.trunc(cnt / 100000) + "lakh"
    }

    const _renderCardTitle = () => {
        return (
            <div className='text-3xl text-primary flex flex-row justify-between '>
                <motion.div
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.25 },
                    }}
                    whileTap={{
                        scale: 0.9,
                    }}
                    onClick={_cardClickHandler}
                    className='w-fit cursor-pointer font-semibold hover:font-bold hover:underline'>
                    {info.name}
                </motion.div>

                <motion.a
                    className=''
                    href={info.url}
                    target="_blank"
                >
                    <LanguageIcon />
                </motion.a>
            </div>
        )
    }

    const _renderEmployeeCount = () => {
        return (
            <div className='text-sm'>
                (Approx.
                <span className='mx-1'>
                    {_calcApproxSize()}
                </span>
                employees)
            </div>
        )
    }

    const _renderOpenVacancies = () => {

        const _clickHandler = () => {
            history.push('/vacancies?query=' + info.name);
            return;
        }

        return (
            <div className='text-sm mt-2'>
                Open Vacancies:
                <span
                    className='ml-2 text-primary cursor-pointer'
                    onClick={_clickHandler}
                >
                    {info.openVacancies}
                </span>
            </div >
        )
    }

    const _renderDescription = () => {
        return (
            <div className='text-xs overflow-y-hidden mt-2'>
                {info.description}
            </div>
        )
    }

    return (
        <Card
            className='shadow-black bg-card w-11/12 mb-3'
            sx={{ height: "200px" }}>

            <CardContent className='flex flex-col h-full'>
                {_renderCardTitle()}
                {_renderEmployeeCount()}
                {_renderOpenVacancies()}
                {_renderDescription()}
            </CardContent>

        </Card>
    )
}

export default SingleCompany
