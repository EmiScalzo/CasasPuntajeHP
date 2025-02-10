export interface House {
  id: string;
  name: string;
  color: {
    primary: string;
    secondary: string;
    text: string;
  };
  points: number;
}

export interface WinnerModalProps {
  house: House;
  onClose: () => void;
}