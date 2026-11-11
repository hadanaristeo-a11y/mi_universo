export interface StarMessage {
  id: number;
  text: string;
  isSpecial?: boolean;
  isHighlight?: boolean;
  x: number; // Posición horizontal en porcentaje
  y: number; // Posición vertical en porcentaje
}