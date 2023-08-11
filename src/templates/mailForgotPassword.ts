export const templateMailForgotPassword = (resetUrl: string) => {
  const text = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
            background-color: #008CBA; /* Blue */
            border: none;
            color: white;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            transition-duration: 0.4s;
            cursor: pointer;
          }
          .button:hover {
            background-color: #4CAF50; /* Green */
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Recovery password</h2>
          <p>You requested a password reset, please use this link to reset your password. This link will only be valid for the next hour.</p>
          <a href="${resetUrl}" class="button">Reset password</a>
        </div>
      </body>
      </html>`;

  return text;
};
