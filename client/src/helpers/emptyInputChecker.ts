import { toast } from "react-toastify";

export const checkEmptyInput = (value: string): boolean => {
    let temp = value.trim();
    let isEmpty = temp.length === 0;

    return isEmpty;
}