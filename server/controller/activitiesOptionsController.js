import prisma from "../db/db.config.js";

export const getActivitiesOption = async (req, res) => {
  const companyID = req.user.company_id;

  let activitiesOptions;
  let departmentsOptions;

  let poi_info_Options;
  let poi_info_owner_Options;
  let poi_info_from_Options;
  let poi_info_format_Options;
  let poi_info_type_Options;
  let poi_info_objective_Options;
  let poi_info_lawbase_Options;

  let info_stored_period_Options;
  let info_placed_Options;
  let info_allowed_ps_Options;
  let info_allowed_ps_condition_Options;
  let info_access_Options;
  let info_access_condition_Options;
  let info_ps_usedbyrole_inside_Options;
  let info_ps_sendto_outside_Options;
  let info_ps_destroying_Options;
  let info_ps_destroyer_Options;

  let m_organization_Options;
  let m_physical_Options;
  let m_technical_Options;

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
      poi_info_Options = await prisma.info.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error("Error getActivitiesOption poi_info_Options : ", error);
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

    try {
      info_stored_period_Options = await prisma.info_stored_period.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_stored_period_Options : ",
        error
      );
    }

    try {
      info_placed_Options = await prisma.info_placed.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_stored_placed_Options : ",
        error
      );
    }

    try {
      info_allowed_ps_Options = await prisma.info_allowed_ps.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_allowed_ps_Options : ",
        error
      );
    }

    try {
      info_allowed_ps_condition_Options =
        await prisma.info_allowed_ps_condition.findMany({
          where: {
            company_id: {
              in: [companyID, 0],
            },
          },
        });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_allowed_ps_condition_Options : ",
        error
      );
    }

    try {
      info_access_Options = await prisma.info_access.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error("Error getActivitiesOption info_access_Options : ", error);
    }

    try {
      info_access_condition_Options =
        await prisma.info_access_condition.findMany({
          where: {
            company_id: {
              in: [companyID, 0],
            },
          },
        });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_access_condition_Options : ",
        error
      );
    }

    try {
      info_ps_usedbyrole_inside_Options =
        await prisma.info_ps_usedbyrole_inside.findMany({
          where: {
            company_id: {
              in: [companyID, 0],
            },
          },
        });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_ps_usedbyrole_inside_Options : ",
        error
      );
    }

    try {
      info_ps_sendto_outside_Options =
        await prisma.info_ps_sendto_outside.findMany({
          where: {
            company_id: {
              in: [companyID, 0],
            },
          },
        });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_ps_sendto_outside_Options : ",
        error
      );
    }

    try {
      info_ps_destroying_Options = await prisma.info_ps_destroying.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_ps_destroying_Options : ",
        error
      );
    }

    try {
      info_ps_destroyer_Options = await prisma.info_ps_destroyer.findMany({
        where: {
          company_id: {
            in: [companyID, 0],
          },
        },
      });
    } catch (error) {
      console.error(
        "Error getActivitiesOption info_ps_destroyer_Options : ",
        error
      );
    }

    try {
      m_organization_Options = await prisma.m_organization.findMany({});
    } catch (error) {
      console.error(
        "Error getActivitiesOption m_organization_Options : ",
        error
      );
    }

    try {
      m_physical_Options = await prisma.m_physical.findMany({});
    } catch (error) {
      console.error("Error getActivitiesOption m_physical_Options : ", error);
    }

    try {
      m_technical_Options = await prisma.m_technical.findMany({});
    } catch (error) {
      console.error("Error getActivitiesOption m_technical_Options : ", error);
    }

    return res.json({
      status: 200,
      activity: activitiesOptions,
      department: departmentsOptions,
      poi_info: poi_info_Options,
      poi_info_owner: poi_info_owner_Options,
      poi_info_from: poi_info_from_Options,
      poi_info_format: poi_info_format_Options,
      poi_info_type: poi_info_type_Options,
      poi_info_objective: poi_info_objective_Options,
      poi_info_lawbase: poi_info_lawbase_Options,
      info_stored_period: info_stored_period_Options,
      info_placed: info_placed_Options,
      info_allowed_ps: info_allowed_ps_Options,
      info_allowed_ps_condition: info_allowed_ps_condition_Options,
      info_access: info_access_Options,
      info_access_condition: info_access_condition_Options,
      info_ps_usedbyrole_inside: info_ps_usedbyrole_inside_Options,
      info_ps_sendto_outside: info_ps_sendto_outside_Options,
      info_ps_destroying: info_ps_destroying_Options,
      info_ps_destroyer: info_ps_destroyer_Options,
      m_organization: m_organization_Options,
      m_physical: m_physical_Options,
      m_technical: m_technical_Options,
    });
  } catch (error) {
    console.error("Error getActivitiesOption : ", error);
  }
};
