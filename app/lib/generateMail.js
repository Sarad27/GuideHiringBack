const GenerateMailBody = (guideName, touristEmail, touristName, destination) => {
    return `
          <!DOCTYPE html>
  <html lang="en">
    <body style="box-sizing: border-box;">
      <div
        class="mail-invoice"
        style="
      width: fit-content;
      max-width: 1000px;"
      >
        <div class="mail-title" style="text-align: left;">
          <h4>Yatri</h4>
          <h4>Hire Details</h4>
        </div>
        <div class="mail-body" style="margin: 15px 0 30px 0;">
          <div class="body-msg" style="padding: 20px 20px;">
            <p>Dear ${guideName},</p>
            <p>You have been hired by ${touristName} with email ${touristEmail} to gudie him in location ${destination}</p>
          </div>

        </div>
        <div
          class="mail-footer"
          style="text-align: left; "
        >
          <span style="margin: 15px 0;"
            >Thank you for using Yatri Platform</span
          >
          <div
            class="line-seperator"
            style="height: 1px;
          width: 100%;
          background: #333;margin: 15px 0;"
          ></div>
          <h5 style="margin: 15px 0;">Dillibazar, Kathmandu</h5>
        </div>
      </div>
    </body>
  </html>
  `;
  };
  

  module.exports = GenerateMailBody;
  