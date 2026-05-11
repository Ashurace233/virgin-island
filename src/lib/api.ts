export const backendBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type RoomOption = {
  id: "premium-suite" | "island-view" | "royal-deluxe" | "standard-room";
  label: string;
};

export const ROOM_OPTIONS: RoomOption[] = [
  { id: "premium-suite", label: "Premium Suite" },
  { id: "island-view", label: "Island View Room" },
  { id: "royal-deluxe", label: "Royal Deluxe Room" },
  { id: "standard-room", label: "Standard Room" },
];
