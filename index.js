import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const isValidUrl = (url) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
};

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

  
    if (!isValidUrl(url)) {
      console.error("Please enter a valid URL.");
      return;
    }

    console.log("Generating QR code...");
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("An error occurred: ", error.message);
    }
  });
