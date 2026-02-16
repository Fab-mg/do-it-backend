export const confirmEmailMSG = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification - Do-It</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8; padding:30px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:12px; padding:30px;">

            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <img 
                  src="https://do-it-fab.netlify.app/assets/logo-Cr1fg9vl.png" 
                  alt="Do-It Logo" 
                  width="120" 
                  style="display:block;"
                />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td align="center" style="font-size:22px; font-weight:bold; color:#111;">
                Confirm your email
              </td>
            </tr>

            <!-- Text -->
            <tr>
              <td align="center" style="padding-top:15px; font-size:14px; color:#444; line-height:20px;">
                Thanks for signing up to <b>Do-It</b>! <br />
                Use the verification code below to confirm your email address.
              </td>
            </tr>

            <!-- Code Box -->
            <tr>
              <td align="center" style="padding-top:25px;">
                <div style="
                  display:inline-block;
                  background:#f1f5f9;
                  padding:14px 24px;
                  border-radius:10px;
                  font-size:26px;
                  font-weight:bold;
                  letter-spacing:6px;
                  color:#111;
                ">
                  {{CODE}}
                </div>
              </td>
            </tr>

            <!-- Note -->
            <tr>
              <td align="center" style="padding-top:20px; font-size:12px; color:#666; line-height:18px;">
                This code will expire in <b>10 minutes</b>. <br />
                If you didn’t request this, you can ignore this email.
              </td>
            </tr>


            <tr>
              <td align="center" style="padding-top:30px; font-size:12px; color:#999;">
                © Do-It - Turn Chaos into Clarity
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;
