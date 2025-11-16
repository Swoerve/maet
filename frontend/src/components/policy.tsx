import {
  Typography,
} from "@mui/material";

export default function Policy() {

  return (
  <>
    <Typography variant="h1" gutterBottom>
      Privacy Policy
    </Typography>
    <Typography variant="h4" gutterBottom>
      Introduction
    </Typography>
    <Typography variant="body1" gutterBottom>
      This privacy policy explains how we handle your information in clear and transparent terms.
    </Typography>
    <Typography variant="h4" gutterBottom>
      What information do we collect?
    </Typography>
    <Typography variant="h6" gutterBottom>
      When you sign up
    </Typography>
    <ul>
      <li>Email adress</li>
      <li>username</li>
      <li>password - not encrypted</li>
    </ul>
    <br />
    <Typography variant="h6" gutterBottom>
      When you are using maet
    </Typography>
    <ul>
      <li>profile settings</li>
      <li>board, column and task settings and information</li>
    </ul>
    <br />
    <Typography variant="h4" gutterBottom>
      Why do we collect this information
    </Typography>
    <Typography variant="body1" gutterBottom>
      To create and manage your account and boards 
    </Typography>
    <Typography variant="h4" gutterBottom>
      Who can see my information?
    </Typography>
    <Typography variant="body1" gutterBottom>
      No one else except maet company workers and Legal authorities if required by law
    </Typography>
    <Typography variant="h4" gutterBottom>
      How long do we keep your data?
    </Typography>
    <Typography variant="body1" gutterBottom>
      until you delete your account. We dont keep any data afterwards.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Your rights
    </Typography>
    <Typography variant="body1" gutterBottom>
      You as a user have rights to edit and delete any data connected to you.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Contact us
    </Typography>
    <Typography variant="body1" gutterBottom>
      For privacy related issues: privacy@maet.com <br />
      For general support: support@maet.com
    </Typography>
  </>
  );
}
