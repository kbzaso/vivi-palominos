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

interface internalEmailProps {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export const internalEmail = ({
  name,
  company,
  phone,
  email,
  message,
}: internalEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        Te acaba de contactar {name}, a través del formulario de la web.
      </Preview>
      <Container style={container}>
        <Img
          src="https://www.vivipalominos.com/logo_big.svg"
          width="170"
          height="50"
          alt="Logo"
          style={logo}
        />
        <Text style={paragraph}>Vivi,</Text>
        <Text style={paragraph}>
          Te acaba de contactare {name}
          {company ? ` de la empresa ${company}.` : "."}
        </Text>
        <Text style={paragraph}>
          Puedes contactar a la persona a través de:
          <br />
          {phone ? `Teléfono: ${phone}` : "No proporcionó teléfono."}
          <br />
          {email ? `Email: ${email}` : "No proporcionó email."}
        </Text>
        <Text style={paragraph}>
          ---------------------
          <br />
          {message ? message : "No proporcionó mensaje."}
          <br />
          ---------------------
        </Text>
        <Text style={paragraph}>
          Una aguil respuesta es clave para cerrar una venta.
          <br />
          Tu puedes Vivi, confia en ti, eres la mejor agente de viajes. ♥️
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

export default internalEmail;

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

const button = {
  backgroundColor: "#5ec3b7",
  borderRadius: "3px",
  color: "#171721",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
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
