import { sendOTP } from "../App/utils/templates/sendOtp";

export default function Preview() {
  return sendOTP({ name: "caraLegal", otp: "1234G6", email: "teste@example.com" });
}
