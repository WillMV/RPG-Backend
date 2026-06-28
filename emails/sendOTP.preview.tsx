import { sendOTP } from "../App/utils/templates/sendOtp";

export default function Preview() {
  return sendOTP("caraLegal", "1234G6");
}
