import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Link,
  Text,
} from "@react-email/components";

interface confirmationEmailProps {
  name: string;
}

export const confirmationEmail = ({ name }: confirmationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Gracias por contactarme, {name} Te contactare pronto.</Preview>
      <Container style={container}>
        <Img
          src="https://www.vivipalominos.com/logo_big_sky.svg"
          width="170"
          height="50"
          alt="Logo"
          style={logo}
        />
        <Text style={paragraph}>Hola {name},</Text>
        <Text style={paragraph}>
          Gracias por contactarme, me alegra saber que te puedo ayudar con tu
          proyecto.
        </Text>
        <Text style={paragraph}>
          Te contactaré pronto para entender tus necesidades y orientarte en el
          proceso de planificación de tu viaje.
        </Text>
        <Text style={paragraph}>
          Saludos,
          <br />
          Viviana Palominos, tu agente de viajes.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          <Link style={link} href="https://vivipalominos.com">
            vivipalominos.com
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

confirmationEmail.PreviewProps = {
  name: "Alan",
} as confirmationEmailProps;

export default confirmationEmail;

const main = {
  backgroundColor: "#dae1e7",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#1b4ea7",
  margin: "20px 0",
};

const footer = {
  color: "#171721",
  fontSize: "12px",
};
const link = {
  textDecoration: "underline",
};
