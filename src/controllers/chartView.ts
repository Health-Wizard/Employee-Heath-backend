import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

class CharView {
  prisma = new PrismaClient();

  getHealthAnalytics = async (req: any, res: Response) => {
    const empId = parseInt(req.user.empId);
    if (!empId) {
      return res.status(400).json({ message: "Emp Id is missing or invalid." });
    }
    try {
      const healthDetails = await this.prisma.health_Analytics.findUnique({
        where: { empId },
      });

      if (!healthDetails) {
        return res.status(404).json({ message: "No Data Found" });
      }
      // console.log(healthDetails);
      res.status(200).json(healthDetails.health_data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default CharView;
