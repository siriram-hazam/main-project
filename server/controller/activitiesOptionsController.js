import prisma from "../db/db.config.js";

export const getActivitiesOption = async (req, res) => {
  const companyID = req.user.company_id;

  let activitiesOptions;
  let departmentsOptions;

  let piece_of_info_Options;
  let poi_info_owner_Options;
  let poi_info_from_Options;
  let poi_info_format_Options;
  let poi_info_type_Options;
  let poi_info_objective_Options;
  let poi_info_lawbase_Options;

  try {
    try {
      activitiesOptions = await prisma.activity.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error("Error getActivitiesOption activitiesOptions : ", error);
    }

    try {
      departmentsOptions = await prisma.department.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error("Error getActivitiesOption departmentsOptions : ", error);
    }

    try {
      piece_of_info_Options = await prisma.piece_of_info.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption piece_of_info_Options : ",
        error
      );
    }

    try {
      poi_info_owner_Options = await prisma.info_owner.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption poi_info_owner_Options : ",
        error
      );
    }

    try {
      poi_info_from_Options = await prisma.info_from.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption poi_info_from_Options : ",
        error
      );
    }

    try {
      poi_info_format_Options = await prisma.info_format.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption poi_info_format_Options : ",
        error
      );
    }

    try {
      poi_info_type_Options = await prisma.info_type.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption poi_info_type_Options : ",
        error
      );
    }

    try {
      poi_info_objective_Options = await prisma.info_objective.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption poi_info_objective_Options : ",
        error
      );
    }

    try {
      poi_info_lawbase_Options = await prisma.info_lawbase.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption poi_info_lawbase_Options : ",
        error
      );
    }

    return res.json({
      status: 200,
      activity: activitiesOptions,
      department: departmentsOptions,
      piece_of_info: piece_of_info_Options,
      poi_info_owner: poi_info_owner_Options,
      poi_info_from: poi_info_from_Options,
      poi_info_format: poi_info_format_Options,
      poi_info_type: poi_info_type_Options,
      poi_info_objective: poi_info_objective_Options,
      poi_info_lawbase: poi_info_lawbase_Options,
    });
  } catch (error) {
    console.error("Error getActivitiesOption : ", error);
  }
};
