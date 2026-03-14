/** Robot Lottie URL for floating button. Replace with any LottieFiles robot JSON URL. */
export const ROBOT_LOTTIE_URL = "https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json";

export interface ChatMessageData {
  role: "user" | "assistant";
  content: string;
}

export interface UserState {
  origin?: string;
  destination?: string;
  departure?: string;
  passengers?: string;
  cabin?: string;
}
