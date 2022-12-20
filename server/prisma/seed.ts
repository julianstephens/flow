import { PrismaClient } from "@prisma/client";
import https from "https";

const prisma = new PrismaClient();
const url = "https://restcountries.com/v3.1/all?fields=name,currencies,idd,cca3";
let countryData: any = [];

const main = async () => {
  const req = https.get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", async () => {
      const body = JSON.parse(data);
      countryData = body.map((el: any) => {
        const tempCur = el.currencies[0];
        const callingCodes = el.idd.suffixes.map((s: any) => el.idd.root + s);
        const country = {
          code: el.cca3,
          name: el.name.common,
          callingCodes: callingCodes,
        };
        return country;
      });
      console.log("Got country data");
      console.log("Writing db");
      const _data = await prisma.country.createMany({ data: countryData });
    });
  });
  req.on("error", (err) => {
    console.log(`ERROR: ${err.message}`);
  });
  req.end();
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
