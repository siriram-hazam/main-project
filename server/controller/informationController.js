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
  const id = req.params.id;
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
            activity: true,
          },
        },
        status: true,
        create_time: true,
        user_account_relation: {
          select: {
            fullname: true,
          },
        },
        company_relation: {
          select: {
            companyName: true,
          },
        },
        category_information: {
          select: {
            category_id: true,
            category_relation: {
              select: {
                id: true,
                category: true,
                department_relation: {
                  select: {
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
                poi_info: {
                  select: {
                    info_relation: {
                      select: {
                        info_: true,
                      },
                    },
                  },
                },
                poi_info_owner: {
                  select: {
                    info_owner_relation: {
                      select: {
                        owner_: true,
                      },
                    },
                  },
                },
                poi_info_from: {
                  select: {
                    info_from_relation: {
                      select: {
                        from_: true,
                      },
                    },
                  },
                },
                poi_info_format: {
                  select: {
                    info_format_relation: {
                      select: {
                        format_: true,
                      },
                    },
                  },
                },
                poi_info_type: {
                  select: {
                    info_type_relation: {
                      select: {
                        type_: true,
                      },
                    },
                  },
                },
                poi_info_objective: {
                  select: {
                    info_objective_relation: {
                      select: {
                        objective_: true,
                      },
                    },
                  },
                },
                poi_info_lawbase: {
                  select: {
                    info_lawbase_relation: {
                      select: {
                        lawBase_: true,
                      },
                    },
                  },
                },
              },
            },
            category_relation: {
              select: {
                category: true,
              },
            },
          },
        },
        information_info_stored_period: {
          select: {
            info_stored_period_relation: {
              select: {
                period_: true,
              },
            },
          },
        },
        information_info_placed: {
          select: {
            info_placed_relation: {
              select: {
                placed_: true,
              },
            },
          },
        },
        information_info_allowed_ps: {
          select: {
            info_allowed_ps_relation: {
              select: {
                allowed_ps_: true,
              },
            },
          },
        },
        information_info_allowed_ps_condition: {
          select: {
            info_allowed_ps_condition_relation: {
              select: {
                allowed_ps_condition_: true,
              },
            },
          },
        },
        information_info_access: {
          select: {
            info_access_relation: {
              select: {
                access_: true,
              },
            },
          },
        },
        information_info_access_condition: {
          select: {
            info_access_condition_relation: {
              select: {
                access_condition_: true,
              },
            },
          },
        },
        information_info_ps_usedbyrole_inside: {
          select: {
            info_ps_usedbyrole_inside_relation: {
              select: {
                use_by_role_: true,
              },
            },
          },
        },
        information_info_ps_sendto_outside: {
          select: {
            info_ps_sendto_outside_relation: {
              select: {
                sendto_: true,
              },
            },
          },
        },
        information_info_ps_destroying: {
          select: {
            info_ps_destroying_relation: {
              select: {
                destroying_: true,
              },
            },
          },
        },
        information_info_ps_destroyer: {
          select: {
            info_ps_destroyer_relation: {
              select: {
                destroyer_: true,
              },
            },
          },
        },
        information_m_organization: {
          select: {
            m_organization_relation: {
              select: {
                organization: true,
              },
            },
          },
        },
        information_m_technical: {
          select: {
            m_technical_relation: {
              select: {
                technical: true,
              },
            },
          },
        },
        information_m_physical: {
          select: {
            m_physical_relation: {
              select: {
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

export const excelProcess = async (req, res) => {
  const item = req.body;

  try {
    const filePath = path.resolve(__dirname + `/assets/template_ropa.xlsx`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Template file not found" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

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

    const organizations = item.information_m_organization;
    let row_organizations = 15;

    organizations.forEach((org, index) => {
      worksheet.getCell(`A${row_organizations}`).value = `(${index + 1}) ${
        org.m_organization_relation.organization
      }`;
      row_organizations++;
    });

    const technicals = item.information_m_technical;
    let row_technicals = 15;

    technicals.forEach((tech, index) => {
      worksheet.getCell(`F${row_technicals}`).value = `(${index + 1}) ${
        tech.m_technical_relation.technical
      }`;
      row_technicals++;
    });

    const physicals = item.information_m_physical;
    let row_physicals = 15;

    physicals.forEach((phy, index) => {
      worksheet.getCell(`L${row_physicals}`).value = `(${index + 1}) ${
        phy.m_physical_relation.physical
      }`;
      row_physicals++;
    });

    const poiRelationsCount = item.poi_information.length;

    let startRow = 11;

    for (let i = 1; i < poiRelationsCount; i++) {
      worksheet.duplicateRow(startRow + i - 1, 1, true);
    }

    const endRow = startRow + poiRelationsCount - 1;

    worksheet.mergeCells(`H${startRow}:H${endRow}`);
    worksheet.mergeCells(`I${startRow}:I${endRow}`);
    worksheet.mergeCells(`J${startRow}:J${endRow}`);
    worksheet.mergeCells(`K${startRow}:K${endRow}`);
    worksheet.mergeCells(`L${startRow}:L${endRow}`);
    worksheet.mergeCells(`M${startRow}:M${endRow}`);
    worksheet.mergeCells(`N${startRow}:N${endRow}`);
    worksheet.mergeCells(`O${startRow}:O${endRow}`);
    worksheet.mergeCells(`P${startRow}:P${endRow}`);
    worksheet.mergeCells(`Q${startRow}:Q${endRow}`);

    worksheet.getCell(`H${startRow}`).value =
      item.information_info_stored_period
        .map(
          (placed, index) =>
            `(${index + 1}) ${placed.info_stored_period_relation.period_}`
        )
        .join("\n");

    worksheet.getCell(`I${startRow}`).value = item.information_info_placed
      .map(
        (placed, index) =>
          `(${index + 1}) ${placed.info_placed_relation.placed_}`
      )
      .join("\n");

    worksheet.getCell(`J${startRow}`).value = item.information_info_allowed_ps
      .map(
        (allowed, index) =>
          `(${index + 1}) ${allowed.info_allowed_ps_relation.allowed_ps_}`
      )
      .join("\n");

    worksheet.getCell(`K${startRow}`).value =
      item.information_info_allowed_ps_condition
        .map(
          (allowed, index) =>
            `(${index + 1}) ${
              allowed.info_allowed_ps_condition_relation.allowed_ps_condition_
            }`
        )
        .join("\n");

    worksheet.getCell(`L${startRow}`).value = item.information_info_access
      .map(
        (access, index) =>
          `(${index + 1}) ${access.info_access_relation.access_}`
      )
      .join("\n");

    worksheet.getCell(`M${startRow}`).value =
      item.information_info_access_condition
        .map(
          (access, index) =>
            `(${index + 1}) ${
              access.info_access_condition_relation.access_condition_
            }`
        )
        .join("\n");

    worksheet.getCell(`N${startRow}`).value =
      item.information_info_ps_usedbyrole_inside
        .map(
          (used, index) =>
            `(${index + 1}) ${
              used.info_ps_usedbyrole_inside_relation.use_by_role_
            }`
        )
        .join("\n");

    worksheet.getCell(`O${startRow}`).value =
      item.information_info_ps_sendto_outside
        .map(
          (send, index) =>
            `(${index + 1}) ${send.info_ps_sendto_outside_relation.sendto_}`
        )
        .join("\n");

    worksheet.getCell(`P${startRow}`).value =
      item.information_info_ps_destroying
        .map(
          (destroy, index) =>
            `(${index + 1}) ${destroy.info_ps_destroying_relation.destroying_}`
        )
        .join("\n");

    worksheet.getCell(`Q${startRow}`).value = item.information_info_ps_destroyer
      .map(
        (destroyer, index) =>
          `(${index + 1}) ${destroyer.info_ps_destroyer_relation.destroyer_}`
      )
      .join("\n");

    let previousValues = {
      info: null,
      owner: null,
      from: null,
      format: null,
      type: null,
      objective: null,
      lawbase: null,
    };

    item.poi_information.forEach((poiInfo) => {
      worksheet.getRow(startRow).height = 40;

      const relations = Array.isArray(poiInfo.poi_relation)
        ? poiInfo.poi_relation
        : [poiInfo.poi_relation];
      relations.forEach((relation) => {
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
            (lawbase, index) =>
              `(${index + 1}) ${lawbase.info_lawbase_relation.lawBase_}`
          )
          .join("\n");

        worksheet.getCell(`A${startRow}`).value = infoValue;

        if (ownerValue !== previousValues.owner) {
          worksheet.getCell(`B${startRow}`).value = ownerValue;
          previousValues.owner = ownerValue;
        } else {
          worksheet.mergeCells(`B${startRow - 1}:B${startRow}`);
        }

        if (fromValue !== previousValues.from) {
          worksheet.getCell(`C${startRow}`).value = fromValue;
          previousValues.from = fromValue;
        } else {
          worksheet.mergeCells(`C${startRow - 1}:C${startRow}`);
        }

        if (formatValue !== previousValues.format) {
          worksheet.getCell(`D${startRow}`).value = formatValue;
          previousValues.format = formatValue;
        } else {
          worksheet.mergeCells(`D${startRow - 1}:D${startRow}`);
        }

        if (typeValue !== previousValues.type) {
          worksheet.getCell(`E${startRow}`).value = typeValue;
          previousValues.type = typeValue;
        } else {
          worksheet.mergeCells(`E${startRow - 1}:E${startRow}`);
        }

        if (objectiveValue !== previousValues.objective) {
          worksheet.getCell(`F${startRow}`).value = objectiveValue;
          previousValues.objective = objectiveValue;
        } else {
          worksheet.mergeCells(`F${startRow - 1}:F${startRow}`);
        }

        if (lawbaseValue !== previousValues.lawbase) {
          worksheet.getCell(`G${startRow}`).value = lawbaseValue;
          previousValues.lawbase = lawbaseValue;
        } else {
          worksheet.mergeCells(`G${startRow - 1}:G${startRow}`);
        }

        startRow++;
      });
    });

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
