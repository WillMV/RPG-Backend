import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export function sendOTP(name: string, otp: string) {
  // const domain = process.env.FRONTEND_DOMAIN ;
  const domain = "https://rpg.willmv.com.br";
  const validateUrl = `${domain}/validateAccount?otp=${otp}`;
  const digits = otp.split("");

  return (
    <Html>
      <Head />
      <Preview>Seu código de verificação do RPG é {otp}</Preview>
      <Tailwind>
        <Body className="bg-slate-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[16px] max-w-[480px] mx-auto overflow-hidden border border-solid border-slate-200">
            {/* Header */}
            <Section className="bg-violet-700 px-[32px] py-[28px] text-center">
              <Heading className="text-white text-[24px] font-bold m-0">
                ⚔️ RPG
              </Heading>
            </Section>

            {/* Conteúdo */}
            <Section className="px-[32px] py-[32px]">
              <Heading className="text-slate-900 text-[20px] font-bold m-0 mb-[8px]">
                Olá, {name}!
              </Heading>
              <Text className="text-slate-600 text-[15px] leading-[24px] m-0 mb-[24px]">
                Bem-vindo à mesa. Use o código abaixo para validar sua conta e
                começar a sua aventura.
              </Text>

              {/* Dígitos do OTP */}
              <Section className="text-center mb-[20px]">
                {digits.map((digit, index) => (
                  <span
                    key={index}
                    className="inline-block w-[44px] h-[56px] leading-[56px] mx-[4px] text-[24px] font-bold text-violet-700 bg-violet-50 border border-solid border-violet-200 rounded-[10px] text-center"
                  >
                    {digit}
                  </span>
                ))}
              </Section>

              <Text className="text-slate-500 text-[13px] leading-[20px] text-center m-0 mb-[28px]">
                Este código expira em 10 minutos.
              </Text>

              {domain && (
                <Section className="text-center">
                  <Button
                    href={validateUrl}
                    className="bg-violet-700 text-white text-[15px] font-semibold px-[28px] py-[14px] rounded-[10px] no-underline box-border"
                  >
                    Validar minha conta
                  </Button>
                </Section>
              )}
            </Section>

            <Hr className="border border-solid border-slate-200 my-0" />

            {/* Rodapé */}
            <Section className="px-[32px] py-[20px]">
              <Text className="text-slate-400 text-[12px] leading-[18px] text-center m-0">
                Se você não criou uma conta no RPG, ignore este email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
