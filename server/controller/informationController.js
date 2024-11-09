import prisma from "../db/db.config.js";
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";

const __dirname = path.resolve();

export const createInformation = async (req, res) => {
  const {
    activity,
    status = "pending",
    createBy,
    company_id,
    department_id,
    categories,
    info_stored_period,
    info_placed,
    info_allowed_ps,
    info_allowed_ps_condition,
    info_access,
    info_access_condition,
    info_ps_usedbyrole_inside,
    info_ps_sendto_outside,
    info_ps_destroying,
    info_ps_destroyer,
    m_organization,
    m_technical,
    m_physical,
  } = req.body;

  // Helper function to fetch field values and handle errors
  const handleField = async (
    item,
    modelName,
    fieldName,
    additionalData = {}
  ) => {
    if (Array.isArray(item)) {
      const ids = [];
      for (const singleItem of item) {
        const id = await handleField(
          singleItem,
          modelName,
          fieldName,
          additionalData
        );
        ids.push(id);
      }
      return ids;
    }

    if (typeof item === "string" && isNaN(parseInt(item))) {
      const data = { [fieldName]: item, ...additionalData };
      const where = { [fieldName]: item };

      const modelsWithCompanyId = [
        "activity",
        "category",
        "department",
        "info",
        "info_owner",
        "info_from",
        "info_format",
        "info_type",
        "info_objective",
        "info_lawbase",
        "info_stored_period",
        "info_placed",
        "info_allowed_ps",
        "info_allowed_ps_condition",
        "info_access",
        "info_access_condition",
        "info_ps_usedbyrole_inside",
        "info_ps_sendto_outside",
        "info_ps_destroying",
        "info_ps_destroyer",
        "m_organization",
        "m_technical",
        "m_physical",
      ];

      if (modelsWithCompanyId.includes(modelName)) {
        data.company_id = company_id;
        where.company_id = company_id;
      }

      const existingRecord = await prisma[modelName].findFirst({
        where: where,
      });

      if (existingRecord) {
        return existingRecord.id;
      } else {
        const createdRecord = await prisma[modelName].create({ data });
        return createdRecord.id;
      }
    } else {
      const id = parseInt(item);
      return id;
    }
  };

  try {
    // Ensure department and activity are retrieved properly
    const departmentId = await handleField(
      department_id,
      "department",
      "departmentName"
    );
    const activityId = await handleField(activity, "activity", "activity");

    // Category and POI entries
    const categoryInformationEntries = [];
    const poiInformationEntries = [];

    for (const categoryItem of categories) {
      const categoryId = await handleField(
        categoryItem.category,
        "category",
        "category",
        {
          department_id: departmentId,
        }
      );

      if (!categoryId) {
        throw new Error(
          `Category ID not found for category: ${categoryItem.category}`
        );
      }

      for (const poiItem of categoryItem.poi_relations) {
        const ownerIdToUse = await handleField(
          poiItem.poi_info_owner,
          "info_owner",
          "owner_"
        );
        const infoIdToUse = await handleField(
          poiItem.poi_info,
          "info",
          "info_"
        );
        const infoFromIdToUse = await handleField(
          poiItem.poi_info_from,
          "info_from",
          "from_"
        );
        const infoFormatIdToUse = await handleField(
          poiItem.poi_info_format,
          "info_format",
          "format_"
        );
        const infoTypeIdToUse = await handleField(
          poiItem.poi_info_type,
          "info_type",
          "type_"
        );
        const infoObjectiveIdToUse = await handleField(
          poiItem.poi_info_objective,
          "info_objective",
          "objective_"
        );
        const lawbaseIds = await handleField(
          poiItem.poi_info_lawbase,
          "info_lawbase",
          "lawBase_"
        );

        // Create or find the piece_of_info
        let pieceOfInfo = await prisma.piece_of_info.create({
          data: {
            category_piece_of_info: {
              create: {
                categoryId: categoryId,
              },
            },
            poi_info: {
              create: [
                {
                  info_id: infoIdToUse,
                },
              ],
            },
            poi_info_owner: {
              create: [
                {
                  info_owner_id: ownerIdToUse,
                },
              ],
            },
            poi_info_from: {
              create: [
                {
                  info_from_id: infoFromIdToUse,
                },
              ],
            },
            poi_info_format: {
              create: [
                {
                  info_format_id: infoFormatIdToUse,
                },
              ],
            },
            poi_info_type: {
              create: [
                {
                  info_type_id: infoTypeIdToUse,
                },
              ],
            },
            poi_info_objective: {
              create: [
                {
                  info_objective_id: infoObjectiveIdToUse,
                },
              ],
            },
            poi_info_lawbase: {
              create: lawbaseIds.map((lawbaseId) => ({
                info_lawbase_id: lawbaseId,
              })),
            },
          },
        });

        if (!pieceOfInfo.id) {
          throw new Error(
            `POI creation failed for category: ${categoryItem.category}`
          );
        }

        poiInformationEntries.push({
          poi_relation: { connect: { id: pieceOfInfo.id } },
          category_relation: { connect: { id: categoryId } },
        });
      }

      categoryInformationEntries.push({
        category_id: categoryId,
      });
    }

    // Store remaining IDs as done before
    const storedPeriodIds = await handleField(
      info_stored_period,
      "info_stored_period",
      "period_"
    );
    const placedIds = await handleField(info_placed, "info_placed", "placed_");
    const allowedPsIds = await handleField(
      info_allowed_ps,
      "info_allowed_ps",
      "allowed_ps_"
    );
    const allowedPsConditionIds = await handleField(
      info_allowed_ps_condition,
      "info_allowed_ps_condition",
      "allowed_ps_condition_"
    );
    const accessIds = await handleField(info_access, "info_access", "access_");
    const accessConditionIds = await handleField(
      info_access_condition,
      "info_access_condition",
      "access_condition_"
    );
    const psUsedByRoleInsideIds = await handleField(
      info_ps_usedbyrole_inside,
      "info_ps_usedbyrole_inside",
      "use_by_role_"
    );
    const psSendToOutsideIds = await handleField(
      info_ps_sendto_outside,
      "info_ps_sendto_outside",
      "sendto_"
    );
    const psDestroyingIds = await handleField(
      info_ps_destroying,
      "info_ps_destroying",
      "destroying_"
    );
    const psDestroyerIds = await handleField(
      info_ps_destroyer,
      "info_ps_destroyer",
      "destroyer_"
    );
    const organizationIds = await handleField(
      m_organization,
      "m_organization",
      "organization"
    );
    const technicalIds = await handleField(
      m_technical,
      "m_technical",
      "technical"
    );
    const physicalIds = await handleField(m_physical, "m_physical", "physical");

    // Create new information entry with all data
    const newInformation = await prisma.information.create({
      data: {
        activity_relation: { connect: { id: activityId } },
        status,
        user_account_relation: { connect: { id: createBy } },
        company_relation: { connect: { id: company_id } },
        department_relation: { connect: { id: departmentId } },
        category_information: {
          create: categoryInformationEntries,
        },
        poi_information: {
          create: poiInformationEntries.map((entry) => ({
            poi_relation: { connect: { id: entry.poi_relation.connect.id } },
            category_relation: {
              connect: { id: entry.category_relation.connect.id },
            },
          })),
        },
        information_info_stored_period: {
          create: storedPeriodIds.map((id) => ({ info_stored_period_id: id })),
        },
        information_info_placed: {
          create: placedIds.map((id) => ({ info_placed_id: id })),
        },
        information_info_allowed_ps: {
          create: allowedPsIds.map((id) => ({ info_allowed_ps_id: id })),
        },
        information_info_allowed_ps_condition: {
          create: allowedPsConditionIds.map((id) => ({
            info_allowed_ps_condition_id: id,
          })),
        },
        information_info_access: {
          create: accessIds.map((id) => ({ info_access_id: id })),
        },
        information_info_access_condition: {
          create: accessConditionIds.map((id) => ({
            info_access_condition_id: id,
          })),
        },
        information_info_ps_usedbyrole_inside: {
          create: psUsedByRoleInsideIds.map((id) => ({
            info_ps_usedbyrole_inside_id: id,
          })),
        },
        information_info_ps_sendto_outside: {
          create: psSendToOutsideIds.map((id) => ({
            info_ps_sendto_outside_id: id,
          })),
        },
        information_info_ps_destroying: {
          create: psDestroyingIds.map((id) => ({ info_ps_destroying_id: id })),
        },
        information_info_ps_destroyer: {
          create: psDestroyerIds.map((id) => ({ info_ps_destroyer_id: id })),
        },
        information_m_organization: {
          create: organizationIds.map((id) => ({ m_organization_id: id })),
        },
        information_m_technical: {
          create: technicalIds.map((id) => ({ m_technical_id: id })),
        },
        information_m_physical: {
          create: physicalIds.map((id) => ({ m_physical_id: id })),
        },
      },
    });

    return res.json({ status: 200, message: newInformation });
  } catch (error) {
    console.error("Error creating information: ", error);
    return res.status(500).json({
      status: 500,
      message: "Error creating information",
      error: error.message,
    });
  }
};

export const updateInformation = async (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body;

  // Remove ID from update data
  delete updateData.id;

  try {
    const updatedInformation = await prisma.information.update({
      where: { id },
      data: {
        activity_relation: { connect: { id: updateData.activity_relation.id } },
        status: updateData.status,
        create_time: new Date(updateData.create_time),
        user_account_relation: {
          connect: { id: updateData.user_account_relation.id },
        },
        company_relation: { connect: { id: updateData.company_relation.id } },
        department_relation: {
          connect: { id: updateData.department_relation.id },
        },
        category_information: {
          upsert: updateData.category_information.map((category) => ({
            where: {
              information_id_category_id: {
                information_id: id,
                category_id: category.category_id,
              },
            },
            update: {
              category_relation: {
                connectOrCreate: {
                  where: { id: category.category_relation.id },
                  create: {
                    category: category.category_relation.category,
                    department_relation: {
                      connect: {
                        id: category.category_relation.department_relation.id,
                      },
                    },
                  },
                },
              },
            },
            create: {
              category_relation: {
                connectOrCreate: {
                  where: { id: category.category_relation.id },
                  create: {
                    category: category.category_relation.category,
                    department_relation: {
                      connect: {
                        id: category.category_relation.department_relation.id,
                      },
                    },
                  },
                },
              },
            },
          })),
        },
        poi_information: {
          upsert: updateData.poi_information.map((poi) => ({
            where: {
              information_id_poi_id: {
                information_id: id,
                poi_id: poi.poi_relation.id,
              },
            },
            update: {
              poi_relation: {
                connectOrCreate: {
                  where: { id: poi.poi_relation.id },
                  create: {
                    // name: poi.poi_relation.name || "Default Name",
                    poi_info: poi.poi_relation.poi_info.map((info) => ({
                      info_relation: {
                        connectOrCreate: {
                          where: { id: info.info_relation.id },
                          create: { info_: info.info_relation.info_ },
                        },
                      },
                    })),
                    poi_info_owner: poi.poi_relation.poi_info_owner.map(
                      (owner) => ({
                        info_owner_relation: {
                          connectOrCreate: {
                            where: { id: owner.info_owner_relation.id },
                            create: {
                              owner_: owner.info_owner_relation.owner_,
                            },
                          },
                        },
                      })
                    ),
                    poi_info_from: poi.poi_relation.poi_info_from.map(
                      (from) => ({
                        info_from_relation: {
                          connectOrCreate: {
                            where: { id: from.info_from_relation.id },
                            create: { from_: from.info_from_relation.from_ },
                          },
                        },
                      })
                    ),
                    poi_info_format: poi.poi_relation.poi_info_format.map(
                      (format) => ({
                        info_format_relation: {
                          connectOrCreate: {
                            where: { id: format.info_format_relation.id },
                            create: {
                              format_: format.info_format_relation.format_,
                            },
                          },
                        },
                      })
                    ),
                    poi_info_type: poi.poi_relation.poi_info_type.map(
                      (type) => ({
                        info_type_relation: {
                          connectOrCreate: {
                            where: { id: type.info_type_relation.id },
                            create: { type_: type.info_type_relation.type_ },
                          },
                        },
                      })
                    ),
                    poi_info_objective: poi.poi_relation.poi_info_objective.map(
                      (objective) => ({
                        info_objective_relation: {
                          connectOrCreate: {
                            where: { id: objective.info_objective_relation.id },
                            create: {
                              objective_:
                                objective.info_objective_relation.objective_,
                            },
                          },
                        },
                      })
                    ),
                    poi_info_lawbase: poi.poi_relation.poi_info_lawbase.map(
                      (lawbase) => ({
                        info_lawbase_relation: {
                          connectOrCreate: {
                            where: { id: lawbase.info_lawbase_relation.id },
                            create: {
                              lawBase_: lawbase.info_lawbase_relation.lawBase_,
                            },
                          },
                        },
                      })
                    ),
                  },
                },
              },
            },
            create: {
              poi_relation: {
                connectOrCreate: {
                  where: { id: poi.poi_relation.id },
                  create: {
                    name: poi.poi_relation.name || "Default Name",
                    poi_info: poi.poi_relation.poi_info.map((info) => ({
                      info_relation: {
                        connectOrCreate: {
                          where: { id: info.info_relation.id },
                          create: { info_: info.info_relation.info_ },
                        },
                      },
                    })),
                    poi_info_owner: poi.poi_relation.poi_info_owner.map(
                      (owner) => ({
                        info_owner_relation: {
                          connectOrCreate: {
                            where: { id: owner.info_owner_relation.id },
                            create: {
                              owner_: owner.info_owner_relation.owner_,
                            },
                          },
                        },
                      })
                    ),
                    poi_info_from: poi.poi_relation.poi_info_from.map(
                      (from) => ({
                        info_from_relation: {
                          connectOrCreate: {
                            where: { id: from.info_from_relation.id },
                            create: { from_: from.info_from_relation.from_ },
                          },
                        },
                      })
                    ),
                    poi_info_format: poi.poi_relation.poi_info_format.map(
                      (format) => ({
                        info_format_relation: {
                          connectOrCreate: {
                            where: { id: format.info_format_relation.id },
                            create: {
                              format_: format.info_format_relation.format_,
                            },
                          },
                        },
                      })
                    ),
                    poi_info_type: poi.poi_relation.poi_info_type.map(
                      (type) => ({
                        info_type_relation: {
                          connectOrCreate: {
                            where: { id: type.info_type_relation.id },
                            create: { type_: type.info_type_relation.type_ },
                          },
                        },
                      })
                    ),
                    poi_info_objective: poi.poi_relation.poi_info_objective.map(
                      (objective) => ({
                        info_objective_relation: {
                          connectOrCreate: {
                            where: { id: objective.info_objective_relation.id },
                            create: {
                              objective_:
                                objective.info_objective_relation.objective_,
                            },
                          },
                        },
                      })
                    ),
                    poi_info_lawbase: poi.poi_relation.poi_info_lawbase.map(
                      (lawbase) => ({
                        info_lawbase_relation: {
                          connectOrCreate: {
                            where: { id: lawbase.info_lawbase_relation.id },
                            create: {
                              lawBase_: lawbase.info_lawbase_relation.lawBase_,
                            },
                          },
                        },
                      })
                    ),
                  },
                },
              },
            },
          })),
        },
        information_info_stored_period: {
          upsert: updateData.information_info_stored_period.map((period) => ({
            where: {
              information_id_info_stored_period_id: {
                information_id: id,
                info_stored_period_id: period.info_stored_period_relation.id,
              },
            },
            update: {
              info_stored_period_relation: {
                connect: { id: period.info_stored_period_relation.id },
              },
            },
            create: {
              info_stored_period_relation: {
                connect: { id: period.info_stored_period_relation.id },
              },
            },
          })),
        },
        information_info_placed: {
          upsert: updateData.information_info_placed.map((placed) => ({
            where: {
              information_id_info_placed_id: {
                information_id: id,
                info_placed_id: placed.info_placed_relation.id,
              },
            },
            update: {
              info_placed_relation: {
                connect: { id: placed.info_placed_relation.id },
              },
            },
            create: {
              info_placed_relation: {
                connect: { id: placed.info_placed_relation.id },
              },
            },
          })),
        },
        information_info_allowed_ps: {
          upsert: updateData.information_info_allowed_ps.map((allowedPs) => ({
            where: {
              information_id_info_allowed_ps_id: {
                information_id: id,
                info_allowed_ps_id: allowedPs.info_allowed_ps_relation.id,
              },
            },
            update: {
              info_allowed_ps_relation: {
                connect: { id: allowedPs.info_allowed_ps_relation.id },
              },
            },
            create: {
              info_allowed_ps_relation: {
                connect: { id: allowedPs.info_allowed_ps_relation.id },
              },
            },
          })),
        },
        information_info_allowed_ps_condition: {
          upsert: updateData.information_info_allowed_ps_condition.map(
            (allowedPsCondition) => ({
              where: {
                information_id_info_allowed_ps_condition_id: {
                  information_id: id,
                  info_allowed_ps_condition_id:
                    allowedPsCondition.info_allowed_ps_condition_relation.id,
                },
              },
              update: {
                info_allowed_ps_condition_relation: {
                  connect: {
                    id: allowedPsCondition.info_allowed_ps_condition_relation
                      .id,
                  },
                },
              },
              create: {
                info_allowed_ps_condition_relation: {
                  connect: {
                    id: allowedPsCondition.info_allowed_ps_condition_relation
                      .id,
                  },
                },
              },
            })
          ),
        },
        information_info_access: {
          upsert: updateData.information_info_access.map((access) => ({
            where: {
              information_id_info_access_id: {
                information_id: id,
                info_access_id: access.info_access_relation.id,
              },
            },
            update: {
              info_access_relation: {
                connect: { id: access.info_access_relation.id },
              },
            },
            create: {
              info_access_relation: {
                connect: { id: access.info_access_relation.id },
              },
            },
          })),
        },
        information_info_access_condition: {
          upsert: updateData.information_info_access_condition.map(
            (accessCondition) => ({
              where: {
                information_id_info_access_condition_id: {
                  information_id: id,
                  info_access_condition_id:
                    accessCondition.info_access_condition_relation.id,
                },
              },
              update: {
                info_access_condition_relation: {
                  connect: {
                    id: accessCondition.info_access_condition_relation.id,
                  },
                },
              },
              create: {
                info_access_condition_relation: {
                  connect: {
                    id: accessCondition.info_access_condition_relation.id,
                  },
                },
              },
            })
          ),
        },
        information_info_ps_usedbyrole_inside: {
          upsert: updateData.information_info_ps_usedbyrole_inside.map(
            (usedByRoleInside) => ({
              where: {
                information_id_info_ps_usedbyrole_inside_id: {
                  information_id: id,
                  info_ps_usedbyrole_inside_id:
                    usedByRoleInside.info_ps_usedbyrole_inside_relation.id,
                },
              },
              update: {
                info_ps_usedbyrole_inside_relation: {
                  connect: {
                    id: usedByRoleInside.info_ps_usedbyrole_inside_relation.id,
                  },
                },
              },
              create: {
                info_ps_usedbyrole_inside_relation: {
                  connect: {
                    id: usedByRoleInside.info_ps_usedbyrole_inside_relation.id,
                  },
                },
              },
            })
          ),
        },
        information_info_ps_sendto_outside: {
          upsert: updateData.information_info_ps_sendto_outside.map(
            (sendToOutside) => ({
              where: {
                information_id_info_ps_sendto_outside_id: {
                  information_id: id,
                  info_ps_sendto_outside_id:
                    sendToOutside.info_ps_sendto_outside_relation.id,
                },
              },
              update: {
                info_ps_sendto_outside_relation: {
                  connect: {
                    id: sendToOutside.info_ps_sendto_outside_relation.id,
                  },
                },
              },
              create: {
                info_ps_sendto_outside_relation: {
                  connect: {
                    id: sendToOutside.info_ps_sendto_outside_relation.id,
                  },
                },
              },
            })
          ),
        },
        information_info_ps_destroying: {
          upsert: updateData.information_info_ps_destroying.map(
            (destroying) => ({
              where: {
                information_id_info_ps_destroying_id: {
                  information_id: id,
                  info_ps_destroying_id:
                    destroying.info_ps_destroying_relation.id,
                },
              },
              update: {
                info_ps_destroying_relation: {
                  connect: { id: destroying.info_ps_destroying_relation.id },
                },
              },
              create: {
                info_ps_destroying_relation: {
                  connect: { id: destroying.info_ps_destroying_relation.id },
                },
              },
            })
          ),
        },
        information_info_ps_destroyer: {
          upsert: updateData.information_info_ps_destroyer.map((destroyer) => ({
            where: {
              information_id_info_ps_destroyer_id: {
                information_id: id,
                info_ps_destroyer_id: destroyer.info_ps_destroyer_relation.id,
              },
            },
            update: {
              info_ps_destroyer_relation: {
                connect: { id: destroyer.info_ps_destroyer_relation.id },
              },
            },
            create: {
              info_ps_destroyer_relation: {
                connect: { id: destroyer.info_ps_destroyer_relation.id },
              },
            },
          })),
        },
        information_m_organization: {
          upsert: updateData.information_m_organization.map((organization) => ({
            where: {
              information_id_m_organization_id: {
                information_id: id,
                m_organization_id: organization.m_organization_relation.id,
              },
            },
            update: {
              m_organization_relation: {
                connect: { id: organization.m_organization_relation.id },
              },
            },
            create: {
              m_organization_relation: {
                connect: { id: organization.m_organization_relation.id },
              },
            },
          })),
        },
        information_m_technical: {
          upsert: updateData.information_m_technical.map((technical) => ({
            where: {
              information_id_m_technical_id: {
                information_id: id,
                m_technical_id: technical.m_technical_relation.id,
              },
            },
            update: {
              m_technical_relation: {
                connect: { id: technical.m_technical_relation.id },
              },
            },
            create: {
              m_technical_relation: {
                connect: { id: technical.m_technical_relation.id },
              },
            },
          })),
        },
        information_m_physical: {
          upsert: updateData.information_m_physical.map((physical) => ({
            where: {
              information_id_m_physical_id: {
                information_id: id,
                m_physical_id: physical.m_physical_relation.id,
              },
            },
            update: {
              m_physical_relation: {
                connect: { id: physical.m_physical_relation.id },
              },
            },
            create: {
              m_physical_relation: {
                connect: { id: physical.m_physical_relation.id },
              },
            },
          })),
        },
      },
    });

    return res.json({ status: 200, message: updatedInformation });
  } catch (error) {
    console.error("Error updating information:", error);
    return res.status(500).json({
      status: 500,
      message: "Error updating information",
      error: error.message,
    });
  }
};

export const getInformation = async (req, res) => {
  try {
    const where = {};

    if (req.user.role !== "superadmin") {
      where.company_id = req.user.company_id;
    }

    const information = await prisma.information.findMany({
      where,
      select: {
        id: true,
        activity_relation: {
          select: {
            id: true, // Include ID
            activity: true,
          },
        },
        status: true,
        create_time: true,
        user_account_relation: {
          select: {
            id: true, // Include ID
            fullname: true,
          },
        },
        company_relation: {
          select: {
            id: true, // Include ID
            companyName: true,
          },
        },
        department_relation: {
          select: {
            id: true, // Include ID
            departmentName: true,
          },
        },
        category_information: {
          select: {
            category_id: true,
            category_relation: {
              select: {
                id: true, // Include ID
                category: true,
                department_relation: {
                  select: {
                    id: true, // Include ID if needed
                    departmentName: true,
                  },
                },
              },
            },
          },
        },
        poi_information: {
          select: {
            poi_relation: {
              select: {
                id: true, // Include POI ID
                poi_info: {
                  select: {
                    info_relation: {
                      select: {
                        id: true, // Include Info ID
                        info_: true,
                      },
                    },
                  },
                },
                poi_info_owner: {
                  select: {
                    info_owner_relation: {
                      select: {
                        id: true, // Include Owner ID
                        owner_: true,
                      },
                    },
                  },
                },
                poi_info_from: {
                  select: {
                    info_from_relation: {
                      select: {
                        id: true, // Include From ID
                        from_: true,
                      },
                    },
                  },
                },
                poi_info_format: {
                  select: {
                    info_format_relation: {
                      select: {
                        id: true, // Include Format ID
                        format_: true,
                      },
                    },
                  },
                },
                poi_info_type: {
                  select: {
                    info_type_relation: {
                      select: {
                        id: true, // Include Type ID
                        type_: true,
                      },
                    },
                  },
                },
                poi_info_objective: {
                  select: {
                    info_objective_relation: {
                      select: {
                        id: true, // Include Objective ID
                        objective_: true,
                      },
                    },
                  },
                },
                poi_info_lawbase: {
                  select: {
                    info_lawbase_relation: {
                      select: {
                        id: true, // Include Lawbase ID
                        lawBase_: true,
                      },
                    },
                  },
                },
              },
            },
            category_relation: {
              select: {
                id: true, // Include Category ID
                category: true,
              },
            },
          },
        },
        information_info_stored_period: {
          select: {
            info_stored_period_relation: {
              select: {
                id: true, // Include Stored Period ID
                period_: true,
              },
            },
          },
        },
        information_info_placed: {
          select: {
            info_placed_relation: {
              select: {
                id: true, // Include Placed ID
                placed_: true,
              },
            },
          },
        },
        information_info_allowed_ps: {
          select: {
            info_allowed_ps_relation: {
              select: {
                id: true, // Include Allowed PS ID
                allowed_ps_: true,
              },
            },
          },
        },
        information_info_allowed_ps_condition: {
          select: {
            info_allowed_ps_condition_relation: {
              select: {
                id: true, // Include Allowed PS Condition ID
                allowed_ps_condition_: true,
              },
            },
          },
        },
        information_info_access: {
          select: {
            info_access_relation: {
              select: {
                id: true, // Include Access ID
                access_: true,
              },
            },
          },
        },
        information_info_access_condition: {
          select: {
            info_access_condition_relation: {
              select: {
                id: true, // Include Access Condition ID
                access_condition_: true,
              },
            },
          },
        },
        information_info_ps_usedbyrole_inside: {
          select: {
            info_ps_usedbyrole_inside_relation: {
              select: {
                id: true, // Include Used by Role Inside ID
                use_by_role_: true,
              },
            },
          },
        },
        information_info_ps_sendto_outside: {
          select: {
            info_ps_sendto_outside_relation: {
              select: {
                id: true, // Include Send to Outside ID
                sendto_: true,
              },
            },
          },
        },
        information_info_ps_destroying: {
          select: {
            info_ps_destroying_relation: {
              select: {
                id: true, // Include Destroying ID
                destroying_: true,
              },
            },
          },
        },
        information_info_ps_destroyer: {
          select: {
            info_ps_destroyer_relation: {
              select: {
                id: true, // Include Destroyer ID
                destroyer_: true,
              },
            },
          },
        },
        information_m_organization: {
          select: {
            m_organization_relation: {
              select: {
                id: true, // Include Organization Measure ID
                organization: true,
              },
            },
          },
        },
        information_m_technical: {
          select: {
            m_technical_relation: {
              select: {
                id: true, // Include Technical Measure ID
                technical: true,
              },
            },
          },
        },
        information_m_physical: {
          select: {
            m_physical_relation: {
              select: {
                id: true, // Include Physical Measure ID
                physical: true,
              },
            },
          },
        },
      },
    });

    return res.json({ status: 200, message: information });
  } catch (error) {
    console.error("Error retrieving information:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

export const deleteInformation = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.information.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({ status: 200, message: "Deleted Information!!" });
  } catch (error) {
    console.error(error);
  }
};

export const updateInformationApproval = async (req, res) => {
  const id = req.params.id;
  const status = "success";

  try {
    await prisma.information.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
    });

    return res.json({ status: 200, message: "Information Approval Updated!" });
  } catch (error) {
    console.error(error);
  }
};

// ฟังก์ชันสำหรับแปลงหมายเลขคอลัมน์เป็นตัวอักษร (เช่น 8 -> H)
const getExcelAlpha = (col) => {
  let letter = "";
  while (col > 0) {
    let mod = (col - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    col = Math.floor((col - mod) / 26);
  }
  return letter;
};

// ฟังก์ชันสำหรับ merge cells แบบปลอดภัยโดยไม่ใช้ getMergedCells
const mergeCellsSafely = (worksheet, cellRange) => {
  try {
    // ทำการ unmerge เซลล์ก่อนเพื่อป้องกันการ merge ซ้อนกัน
    worksheet.unMergeCells(cellRange);
    console.log(`Successfully unmerged cells for range: ${cellRange}`);
  } catch (e) {
    // หากเซลล์ไม่ได้ถูก merge อยู่แล้ว ก็สามารถข้ามได้
    console.log(`No existing merge to unmerge for range: ${cellRange}`);
  }

  try {
    // ทำการ merge เซลล์
    worksheet.mergeCells(cellRange);
    console.log(`Successfully merged cells for range: ${cellRange}`);
  } catch (e) {
    console.error(`Error merging cells for range ${cellRange}: `, e);
  }
};

// ฟังก์ชันสำหรับ unmerge เซลล์ทั้งหมดในคอลัมน์ H-Q ก่อนการประมวลผล
const unmergeColumnsHtoQ = (worksheet) => {
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    for (let col = 8; col <= 17; col++) {
      // H=8 ถึง Q=17
      const cell = row.getCell(col);
      if (cell.isMerged) {
        worksheet.unMergeCells(cell.address);
        console.log(`Unmerged cell at ${cell.address}`);
      }
    }
  });
};

// ฟังก์ชันสำหรับคัดลอกแถวต้นแบบและแทรกแถวใหม่ที่ตำแหน่งที่ต้องการ
const duplicateRow = (worksheet, sourceRowNumber, insertAt) => {
  const sourceRow = worksheet.getRow(sourceRowNumber);
  // แทรกแถวใหม่ก่อนแถวที่ต้องการ โดยไม่ใช้การจัดรูปแบบ
  const newRow = worksheet.insertRow(insertAt, [], { insertBefore: true });

  // คัดลอกค่าจากแถวต้นแบบ (ไม่คัดลอกสไตล์)
  sourceRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    const newCell = newRow.getCell(colNumber);
    newCell.value = cell.value;
  });

  // ปรับความสูงของแถวใหม่ให้เหมือนต้นแบบ
  newRow.height = sourceRow.height;

  // Unmerge เซลล์ทั้งหมดในแถวใหม่
  newRow.eachCell({ includeEmpty: true }, (cell) => {
    if (cell.isMerged) {
      worksheet.unMergeCells(cell.address);
      console.log(`Unmerged cell at ${cell.address} in new row ${insertAt}`);
    }
  });

  return newRow;
};

export const excelProcess = async (req, res) => {
  let item1 = req.body;
  const item = item1.item;

  console.log(item);

  try {
    const filePath = path.resolve(__dirname + `/assets/template_ropa.xlsx`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Template file not found" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

    // ทำการ unmerge เซลล์ทั้งหมดในคอลัมน์ H-Q ก่อนการประมวลผล
    unmergeColumnsHtoQ(worksheet);

    // กรอกข้อมูลพื้นฐาน
    worksheet.getCell("B2").value = item.user_account_relation.fullname;
    worksheet.getCell("B3").value = item.company_relation.address;
    worksheet.getCell("B4").value = item.company_relation.email;
    worksheet.getCell("B5").value = item.company_relation.phone_number;
    worksheet.getCell("B6").value = item.user_account_relation.fullname;
    worksheet.getCell("B7").value =
      item.category_information[0].category_relation.department_relation.departmentName;
    worksheet.getCell("B8").value = item.activity_relation.activity;
    worksheet.getCell("K2").value = item.company_relation.dpo;
    worksheet.getCell("K3").value = item.company_relation.address;
    worksheet.getCell("K4").value = item.company_relation.email;
    worksheet.getCell("K5").value = item.company_relation.phone_number;
    worksheet.getCell("K6").value = item.company_relation.dpo;

    // กรอกข้อมูลมาตรการ
    // const organizations = item.information_m_organization;
    // let row_organizations = 15;
    // organizations.forEach((org, index) => {
    //   worksheet.getCell(`A${row_organizations}`).value = `(${index + 1}) ${
    //     org.m_organization_relation.organization
    //   }`;
    //   row_organizations++;
    // });

    // const technicals = item.information_m_technical;
    // let row_technicals = 15;
    // technicals.forEach((tech, index) => {
    //   worksheet.getCell(`F${row_technicals}`).value = `(${index + 1}) ${
    //     tech.m_technical_relation.technical
    //   }`;
    //   row_technicals++;
    // });

    // const physicals = item.information_m_physical;
    // let row_physicals = 15;
    // physicals.forEach((phy, index) => {
    //   worksheet.getCell(`L${row_physicals}`).value = `(${index + 1}) ${
    //     phy.m_physical_relation.physical
    //   }`;
    //   row_physicals++;
    // });

    // การจัดกลุ่ม poi_information ตามหมวดหมู่
    const groupedPoi = item.poi_information.reduce((acc, poi) => {
      const category = poi.category_relation.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(poi);
      return acc;
    }, {});

    // เริ่มต้นที่แถว 11
    let currentRow = 11;

    // วนลูปผ่านหมวดหมู่ที่จัดกลุ่มแล้ว
    for (const [categoryName, pois] of Object.entries(groupedPoi)) {
      // แทรกแถวใหม่สำหรับหัวข้อหมวดหมู่ที่แถว currentRow
      duplicateRow(worksheet, 11, currentRow);
      const categoryRow = worksheet.getRow(currentRow);

      // กรอกชื่อหมวดหมู่
      categoryRow.getCell("A").value = `Category: ${categoryName}`;
      // Merge เซลล์สำหรับหัวข้อหมวดหมู่ (A ถึง Q ตามความต้องการ)
      mergeCellsSafely(worksheet, `A${currentRow}:Q${currentRow}`);
      // ตั้งค่าฟอนต์ให้หนาสำหรับหัวข้อหมวดหมู่
      categoryRow.getCell("A").font = { bold: true };
      categoryRow.commit();

      // เก็บตำแหน่งเริ่มต้นของหมวดหมู่เพื่อใช้ในการ merge คอลัมน์ H-Q
      const categoryStartRow = currentRow;
      currentRow++;

      // วนลูปผ่าน POI ภายในหมวดหมู่
      pois.forEach((poiInfo, index) => {
        // แทรกแถวใหม่สำหรับข้อมูล POI ที่แถว currentRow
        duplicateRow(worksheet, 11, currentRow);
        const poiRow = worksheet.getRow(currentRow);

        const relation = poiInfo.poi_relation;

        // กำหนดความสูงของแถว
        poiRow.height = 40;

        const infoValue = relation.poi_info
          .map((info) => info.info_relation.info_)
          .join(", ");
        const ownerValue = relation.poi_info_owner
          .map((owner) => owner.info_owner_relation.owner_)
          .join(", ");
        const fromValue = relation.poi_info_from
          .map((from) => from.info_from_relation.from_)
          .join(", ");
        const formatValue = relation.poi_info_format
          .map((format) => format.info_format_relation.format_)
          .join(", ");
        const typeValue = relation.poi_info_type
          .map((type) => type.info_type_relation.type_)
          .join(", ");
        const objectiveValue = relation.poi_info_objective
          .map((objective) => objective.info_objective_relation.objective_)
          .join(", ");
        const lawbaseValue = relation.poi_info_lawbase
          .map(
            (lawbase, idx) =>
              `(${idx + 1}) ${lawbase.info_lawbase_relation.lawBase_}`
          )
          .join("\n");

        // กรอกข้อมูลในแถว POI
        poiRow.getCell("A").value = infoValue;
        poiRow.getCell("B").value = ownerValue;
        poiRow.getCell("C").value = fromValue;
        poiRow.getCell("D").value = formatValue;
        poiRow.getCell("E").value = typeValue;
        poiRow.getCell("F").value = objectiveValue;
        poiRow.getCell("G").value = lawbaseValue;

        // กรอกข้อมูลมาตรการในคอลัมน์ H ถึง Q
        poiRow.getCell("H").value = item.information_info_stored_period
          .map(
            (placed, index) =>
              `(${index + 1}) ${placed.info_stored_period_relation.period_}`
          )
          .join("\n");

        poiRow.getCell("I").value = item.information_info_placed
          .map(
            (placed, index) =>
              `(${index + 1}) ${placed.info_placed_relation.placed_}`
          )
          .join("\n");

        poiRow.getCell("J").value = item.information_info_allowed_ps
          .map(
            (allowed, index) =>
              `(${index + 1}) ${allowed.info_allowed_ps_relation.allowed_ps_}`
          )
          .join("\n");

        poiRow.getCell("K").value = item.information_info_allowed_ps_condition
          .map(
            (allowed, index) =>
              `(${index + 1}) ${
                allowed.info_allowed_ps_condition_relation.allowed_ps_condition_
              }`
          )
          .join("\n");

        poiRow.getCell("L").value = item.information_info_access
          .map(
            (access, index) =>
              `(${index + 1}) ${access.info_access_relation.access_}`
          )
          .join("\n");

        poiRow.getCell("M").value = item.information_info_access_condition
          .map(
            (access, index) =>
              `(${index + 1}) ${
                access.info_access_condition_relation.access_condition_
              }`
          )
          .join("\n");

        poiRow.getCell("N").value = item.information_info_ps_usedbyrole_inside
          .map(
            (used, index) =>
              `(${index + 1}) ${
                used.info_ps_usedbyrole_inside_relation.use_by_role_
              }`
          )
          .join("\n");

        poiRow.getCell("O").value = item.information_info_ps_sendto_outside
          .map(
            (send, index) =>
              `(${index + 1}) ${send.info_ps_sendto_outside_relation.sendto_}`
          )
          .join("\n");

        poiRow.getCell("P").value = item.information_info_ps_destroying
          .map(
            (destroy, index) =>
              `(${index + 1}) ${
                destroy.info_ps_destroying_relation.destroying_
              }`
          )
          .join("\n");

        poiRow.getCell("Q").value = item.information_info_ps_destroyer
          .map(
            (destroyer, index) =>
              `(${index + 1}) ${
                destroyer.info_ps_destroyer_relation.destroyer_
              }`
          )
          .join("\n");

        poiRow.commit();

        currentRow++;
      });

      // ระบุตำแหน่งสิ้นสุดของหมวดหมู่
      const categoryEndRow = currentRow - 1;

      // ทำการ merge คอลัมน์ H ถึง Q แบบแนวตั้งสำหรับหมวดหมู่นี้
      if (categoryEndRow > categoryStartRow) {
        for (let col = 8; col <= 17; col++) {
          // H=8 ถึง Q=17
          const colLetter = getExcelAlpha(col);
          const range = `${colLetter}${
            categoryStartRow + 1
          }:${colLetter}${categoryEndRow}`;
          mergeCellsSafely(worksheet, range);
        }
      }

      // เพิ่มบรรทัดว่างหลังจากแต่ละหมวดหมู่ (ถ้าต้องการ)
      currentRow++;
    }

    // Keep track of separate rows for each column
    let orgRow = currentRow;
    let techRow = currentRow;
    let phyRow = currentRow;

    worksheet.getCell(
      `A${orgRow}`
    ).value = `มาตรการเชิงองค์กร \n (Organizational Measures)`;
    worksheet.mergeCells(`A${orgRow}:E${orgRow}`);
    worksheet.getCell(`A${orgRow}`).alignment = { horizontal: "center" };
    orgRow++;
    const organizations = item.information_m_organization;
    organizations.forEach((org, index) => {
      worksheet.getCell(`A${orgRow}`).value = `(${index + 1}) ${
        org.m_organization_relation.organization
      }`;
      orgRow++;
    });

    worksheet.getCell(
      `F${techRow}`
    ).value = `มาตรการเชิงเทคนิค \n (Technical Measures)`;
    worksheet.mergeCells(`F${techRow}:K${techRow}`);
    worksheet.getCell(`F${techRow}`).alignment = { horizontal: "center" };
    techRow++;
    const technicals = item.information_m_technical;
    technicals.forEach((tech, index) => {
      worksheet.getCell(`F${techRow}`).value = `(${index + 1}) ${
        tech.m_technical_relation.technical
      }`;
      techRow++;
    });

    worksheet.getCell(
      `L${phyRow}`
    ).value = `มาตรการทางกายภาพ \n (Physical Measures)`;
    worksheet.mergeCells(`L${phyRow}:Q${phyRow}`);
    worksheet.getCell(`L${phyRow}`).alignment = { horizontal: "center" };
    phyRow++;
    const physicals = item.information_m_physical;
    physicals.forEach((phy, index) => {
      worksheet.getCell(`L${phyRow}`).value = `(${index + 1}) ${
        phy.m_physical_relation.physical
      }`;
      phyRow++;
    });

    // Update main currentRow to highest value + 2
    currentRow = Math.max(orgRow, techRow, phyRow) + 2;

    // เพิ่ม border ให้กับทุกเซลล์
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    worksheet.mergeCells(1, 1, 1, 17);
    worksheet.mergeCells(2, 2, 2, 8);
    worksheet.mergeCells(3, 2, 3, 8);
    worksheet.mergeCells(4, 2, 4, 8);
    worksheet.mergeCells(5, 2, 5, 8);
    worksheet.mergeCells(6, 2, 6, 8);
    worksheet.mergeCells(7, 2, 7, 17);
    worksheet.mergeCells(8, 2, 8, 17);

    worksheet.mergeCells(2, 10, 2, 17);
    worksheet.mergeCells(3, 10, 3, 17);
    worksheet.mergeCells(4, 10, 4, 17);
    worksheet.mergeCells(5, 10, 5, 17);
    worksheet.mergeCells(6, 10, 6, 17);

    worksheet.mergeCells(9, 8, 10, 8);
    worksheet.mergeCells(9, 9, 10, 9);
    worksheet.mergeCells(9, 10, 9, 13);
    worksheet.mergeCells(9, 14, 10, 14);
    worksheet.mergeCells(9, 15, 10, 15);
    worksheet.mergeCells(9, 16, 10, 16);
    worksheet.mergeCells(9, 17, 10, 17);

    // สร้างไฟล์ Excel
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Excel_Activity_${item.id}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error excelProcess : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const testInformation = async (req, res) => {
  async function testActivityId() {
    const info = await prisma.information.findUnique({
      where: { id: 1 },
      select: { activity_id: true },
    });

    return info;
  }

  const info = await testActivityId();
  return res.json({ info });
};
