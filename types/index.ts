import { MouseEventHandler, Dispatch, SetStateAction } from "react";

export interface CustomButtonProps {
   title: string;
   containerStyles?: string;
   handleClick?: MouseEventHandler<HTMLButtonElement>;
   btnType?: "button" | "submit";
   textStyles?: string;
   rightIcon?: string;
   isDisabled?: boolean;
}

export interface SearchManufacturerProps {
   selected: string;
   setSelected: Dispatch<SetStateAction<string>>;
}

export interface SearchBarProps {
   setManufacturer: Dispatch<SetStateAction<string>>;
   setModel: Dispatch<SetStateAction<string>>;
}

export interface CarProps {
   city_mpg: number;
   classs: string;
   combination_mpg: number;
   cylinders: number;
   displacement: number;
   drive: string;
   fuel_type: string;
   highway_mpg: number;
   make: string;
   model: string;
   transmission: string;
   year: number;
}

export interface CarCardProps{
   car: CarProps;
   countcart: number;
   setCountcart: Dispatch<SetStateAction<number>>;
}

export interface FilterProps {
   manufacturer: string;
   year: string;
   fuel: string;
   limit: number;
   model: string;
}

export interface OptionProps{
   title: string;
   value: string;
}

export interface CustomFilterProps{
   title: string;
   option: OptionProps[];
   setFilter: Dispatch<SetStateAction<string>>;
}

export interface ShowMoreProps{
   pageNumber: number;
   isNext: boolean;
   setLimit: Dispatch<SetStateAction<number>>;
}

export interface ActionProps {
   action: string;
   setValueUsenname: Dispatch<SetStateAction<string>>;
   setValuePassword: Dispatch<SetStateAction<string>>;
   setValueName: Dispatch<SetStateAction<string>>;
}
