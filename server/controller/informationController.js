import prisma from "../db/db.config.js";
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { type } from "os";

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

  try {
    await prisma.$transaction(async (prisma) => {
      // 1. Update main information
      await prisma.$executeRawUnsafe(`
        UPDATE information 
        SET activity_id = ${updateData.activity_relation.id},
            status = '${updateData.status}'
        WHERE id = ${id}
      `);

      // 2. Delete existing relationships
      const deleteQueries = [
        `DELETE FROM poi_information WHERE information_id = ${id}`,
        `DELETE FROM category_information WHERE information_id = ${id}`,
        `DELETE FROM information_info_stored_period WHERE information_id = ${id}`,
        `DELETE FROM information_info_placed WHERE information_id = ${id}`,
        `DELETE FROM information_info_allowed_ps WHERE information_id = ${id}`,
        `DELETE FROM information_info_allowed_ps_condition WHERE information_id = ${id}`,
        `DELETE FROM information_info_access WHERE information_id = ${id}`,
        `DELETE FROM information_info_access_condition WHERE information_id = ${id}`,
        `DELETE FROM information_info_ps_usedbyrole_inside WHERE information_id = ${id}`,
        `DELETE FROM information_info_ps_sendto_outside WHERE information_id = ${id}`,
        `DELETE FROM information_info_ps_destroying WHERE information_id = ${id}`,
        `DELETE FROM information_info_ps_destroyer WHERE information_id = ${id}`,
        `DELETE FROM information_m_organization WHERE information_id = ${id}`,
        `DELETE FROM information_m_technical WHERE information_id = ${id}`,
        `DELETE FROM information_m_physical WHERE information_id = ${id}`,
      ];

      // Execute delete queries
      for (const queryText of deleteQueries) {
        await prisma.$executeRawUnsafe(queryText);
      }

      // 3. Insert new relationships
      // POI Information
      for (const poi of updateData.poi_information) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO poi_information (information_id, poi_id, category_id)
          VALUES (${id}, ${poi.poi_relation.id}, ${poi.category_relation.id})
        `);
      }

      // Category Information
      for (const category of updateData.category_information) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO category_information (information_id, category_id)
          VALUES (${id}, ${category.category_relation.id})
        `);
      }

      // Stored Period
      for (const period of updateData.information_info_stored_period) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_stored_period (information_id, info_stored_period_id)
          VALUES (${id}, ${period.info_stored_period_relation.id})
        `);
      }

      // Info Placed
      for (const placed of updateData.information_info_placed) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_placed (information_id, info_placed_id)
          VALUES (${id}, ${placed.info_placed_relation.id})
        `);
      }

      // Info Allowed PS
      for (const allowed of updateData.information_info_allowed_ps) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_allowed_ps (information_id, info_allowed_ps_id)
          VALUES (${id}, ${allowed.info_allowed_ps_relation.id})
        `);
      }

      // Info Allowed PS Condition
      for (const condition of updateData.information_info_allowed_ps_condition) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_allowed_ps_condition (information_id, info_allowed_ps_condition_id)
          VALUES (${id}, ${condition.info_allowed_ps_condition_relation.id})
        `);
      }

      // Info Access
      for (const access of updateData.information_info_access) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_access (information_id, info_access_id)
          VALUES (${id}, ${access.info_access_relation.id})
        `);
      }

      // Info Access Condition
      for (const condition of updateData.information_info_access_condition) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_access_condition (information_id, info_access_condition_id)
          VALUES (${id}, ${condition.info_access_condition_relation.id})
        `);
      }

      // PS Used By Role Inside
      for (const role of updateData.information_info_ps_usedbyrole_inside) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_ps_usedbyrole_inside (information_id, info_ps_usedbyrole_inside_id)
          VALUES (${id}, ${role.info_ps_usedbyrole_inside_relation.id})
        `);
      }

      // PS Send To Outside
      for (const sendto of updateData.information_info_ps_sendto_outside) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_ps_sendto_outside (information_id, info_ps_sendto_outside_id)
          VALUES (${id}, ${sendto.info_ps_sendto_outside_relation.id})
        `);
      }

      // PS Destroying
      for (const destroying of updateData.information_info_ps_destroying) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_ps_destroying (information_id, info_ps_destroying_id)
          VALUES (${id}, ${destroying.info_ps_destroying_relation.id})
        `);
      }

      // PS Destroyer
      for (const destroyer of updateData.information_info_ps_destroyer) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_info_ps_destroyer (information_id, info_ps_destroyer_id)
          VALUES (${id}, ${destroyer.info_ps_destroyer_relation.id})
        `);
      }

      // M Organization
      for (const org of updateData.information_m_organization) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_m_organization (information_id, m_organization_id)
          VALUES (${id}, ${org.m_organization_relation.id})
        `);
      }

      // M Technical
      for (const tech of updateData.information_m_technical) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_m_technical (information_id, m_technical_id)
          VALUES (${id}, ${tech.m_technical_relation.id})
        `);
      }

      // M Physical
      for (const physical of updateData.information_m_physical) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO information_m_physical (information_id, m_physical_id)
          VALUES (${id}, ${physical.m_physical_relation.id})
        `);
      }
    });

    // 4. Get updated data
    const updatedData = await prisma.$queryRaw`
      SELECT i.*, 
            a.activity,
            d."departmentName",  -- Add quotes for exact case match
            c."companyName"      -- Add quotes for exact case match
      FROM information i
      LEFT JOIN activity a ON i.activity_id = a.id
      LEFT JOIN department d ON i.department_id = d.id
      LEFT JOIN company c ON i.company_id = c.id
      WHERE i.id = ${id}
      `;

    return res.json({
      status: 200,
      message: "Information updated successfully",
      data: updatedData[0],
    });
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
            id: true,
            activity: true,
          },
        },
        status: true,
        create_time: true,
        user_account_relation: {
          select: {
            id: true,
            fullname: true,
          },
        },
        company_relation: {
          select: {
            id: true,
            companyName: true,
          },
        },
        department_relation: {
          select: {
            id: true,
            departmentName: true,
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
                    id: true,
                    departmentName: true,
                  },
                },
              },
            },
          },
        },
        poi_information: {
          select: {
            poi_id: true,
            category_id: true,
            poi_relation: {
              select: {
                id: true,
                poi_info: {
                  select: {
                    info_relation: {
                      select: {
                        id: true,
                        info_: true,
                      },
                    },
                  },
                },
                poi_info_owner: {
                  select: {
                    info_owner_relation: {
                      select: {
                        id: true,
                        owner_: true,
                      },
                    },
                  },
                },
                poi_info_from: {
                  select: {
                    info_from_relation: {
                      select: {
                        id: true,
                        from_: true,
                      },
                    },
                  },
                },
                poi_info_format: {
                  select: {
                    info_format_relation: {
                      select: {
                        id: true,
                        format_: true,
                      },
                    },
                  },
                },
                poi_info_type: {
                  select: {
                    info_type_relation: {
                      select: {
                        id: true,
                        type_: true,
                      },
                    },
                  },
                },
                poi_info_objective: {
                  select: {
                    info_objective_relation: {
                      select: {
                        id: true,
                        objective_: true,
                      },
                    },
                  },
                },
                poi_info_lawbase: {
                  select: {
                    info_lawbase_relation: {
                      select: {
                        id: true,
                        lawBase_: true,
                      },
                    },
                  },
                },
              },
            },
            category_relation: {
              select: {
                id: true,
                category: true,
              },
            },
          },
        },
        information_info_stored_period: {
          select: {
            info_stored_period_relation: {
              select: {
                id: true,
                period_: true,
              },
            },
          },
        },
        information_info_placed: {
          select: {
            info_placed_relation: {
              select: {
                id: true,
                placed_: true,
              },
            },
          },
        },
        information_info_allowed_ps: {
          select: {
            info_allowed_ps_relation: {
              select: {
                id: true,
                allowed_ps_: true,
              },
            },
          },
        },
        information_info_allowed_ps_condition: {
          select: {
            info_allowed_ps_condition_relation: {
              select: {
                id: true,
                allowed_ps_condition_: true,
              },
            },
          },
        },
        information_info_access: {
          select: {
            info_access_relation: {
              select: {
                id: true,
                access_: true,
              },
            },
          },
        },
        information_info_access_condition: {
          select: {
            info_access_condition_relation: {
              select: {
                id: true,
                access_condition_: true,
              },
            },
          },
        },
        information_info_ps_usedbyrole_inside: {
          select: {
            info_ps_usedbyrole_inside_relation: {
              select: {
                id: true,
                use_by_role_: true,
              },
            },
          },
        },
        information_info_ps_sendto_outside: {
          select: {
            info_ps_sendto_outside_relation: {
              select: {
                id: true,
                sendto_: true,
              },
            },
          },
        },
        information_info_ps_destroying: {
          select: {
            info_ps_destroying_relation: {
              select: {
                id: true,
                destroying_: true,
              },
            },
          },
        },
        information_info_ps_destroyer: {
          select: {
            info_ps_destroyer_relation: {
              select: {
                id: true,
                destroyer_: true,
              },
            },
          },
        },
        information_m_organization: {
          select: {
            m_organization_relation: {
              select: {
                id: true,
                organization: true,
              },
            },
          },
        },
        information_m_technical: {
          select: {
            m_technical_relation: {
              select: {
                id: true,
                technical: true,
              },
            },
          },
        },
        information_m_physical: {
          select: {
            m_physical_relation: {
              select: {
                id: true,
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
  const user = item1.user;

  console.log(item);
  console.log(user);

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
    worksheet.getCell(
      "B3"
    ).value = `${item.company_relation.companyName} , ${user.company_relation.companyName}`;
    worksheet.getCell("B4").value = user.company_relation.email;
    worksheet.getCell("B5").value = user.company_relation.phone_number;
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
      categoryRow.getCell("A").value = `${categoryName}`;
      // Merge เซลล์สำหรับหัวข้อหมวดหมู่ (A ถึง Q ตามความต้องการ)
      mergeCellsSafely(worksheet, `A${currentRow}:Q${currentRow}`);
      // ตั้งค่าฟอนต์ให้หนาสำหรับหัวข้อหมวดหมู่
      // categoryRow.getCell("A").font = {
      //   name: "TH Sarabun New",
      //   size: 14,
      //   bold: true,
      // };
      categoryRow.getCell("A").style = {
        font: {
          name: "TH SarabunPSK",
          bold: true,
          size: 14,
          color: { argb: "000000" },
        },
        alignment: {
          vertical: "middle",
          wrapText: true,
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ff70db70" },
        },
      };
      categoryRow.commit();

      // เก็บตำแหน่งเริ่มต้นของหมวดหมู่เพื่อใช้ในการ merge คอลัมน์ H-Q
      const categoryStartRow = currentRow;
      currentRow++;

      const applyCellStyle = (cell) => {
        cell.style = {
          font: {
            name: "TH SarabunPSK",
            size: 14,
            color: { argb: "000000" },
          },
          alignment: {
            vertical: "middle",
            wrapText: true,
          },
        };
      };

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

        // Apply style to each cell after setting value
        [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
        ].forEach((col) => {
          const cell = poiRow.getCell(col);
          applyCellStyle(cell);
        });

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

    const applyHeaderStyle = (worksheet, cellRef, mergeRange) => {
      // 1. First merge the cells
      worksheet.mergeCells(mergeRange);

      // 2. Get the merged cell reference (use first cell of merge range)
      const mergedCell = worksheet.getCell(mergeRange.split(":")[0]);

      // 3. Set complete styles on merged cell
      mergedCell.style = {
        font: {
          name: "TH SarabunPSK",
          bold: true,
          size: 14,
          color: { argb: "000000" },
        },
        alignment: {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffb3d9ff" },
        },
      };

      // 4. Set row height
      const rowNum = cellRef.match(/\d+/)[0];
      worksheet.getRow(parseInt(rowNum)).height = 50;

      return mergedCell;
    };

    const applyContentStyle = (worksheet, startCol, endCol, row) => {
      // Merge cells in the row
      const mergeRange = `${startCol}${row}:${endCol}${row}`;
      worksheet.mergeCells(mergeRange);

      // Apply alignment to merged cell
      worksheet.getCell(`${startCol}${row}`).style = {
        font: {
          name: "TH SarabunPSK",
          size: 14,
          color: { argb: "000000" },
        },
        alignment: {
          vertical: "middle",
          wrapText: true,
        },
      };
    };

    // Keep track of separate rows for each column
    let orgRow = currentRow;
    let techRow = currentRow;
    let phyRow = currentRow;

    // Organizational Measures
    applyHeaderStyle(worksheet, `A${orgRow}`, `A${orgRow}:E${orgRow}`);
    worksheet.getCell(
      `A${orgRow}`
    ).value = `มาตรการเชิงองค์กร \n (Organizational Measures)`;
    orgRow++;

    const organizations = item.information_m_organization;
    organizations.forEach((org, index) => {
      worksheet.getCell(`A${orgRow}`).value = `(${index + 1}) ${
        org.m_organization_relation.organization
      }`;
      applyContentStyle(worksheet, "A", "E", orgRow);
      orgRow++;
    });

    // Technical Measures
    applyHeaderStyle(worksheet, `F${techRow}`, `F${techRow}:K${techRow}`);
    worksheet.getCell(
      `F${techRow}`
    ).value = `มาตรการเชิงเทคนิค \n (Technical Measures)`;
    techRow++;

    const technicals = item.information_m_technical;
    technicals.forEach((tech, index) => {
      worksheet.getCell(`F${techRow}`).value = `(${index + 1}) ${
        tech.m_technical_relation.technical
      }`;
      applyContentStyle(worksheet, "F", "K", techRow);
      techRow++;
    });

    // Physical Measures
    applyHeaderStyle(worksheet, `L${phyRow}`, `L${phyRow}:Q${phyRow}`);
    worksheet.getCell(
      `L${phyRow}`
    ).value = `มาตรการทางกายภาพ \n (Physical Measures)`;
    phyRow++;

    const physicals = item.information_m_physical;
    physicals.forEach((phy, index) => {
      worksheet.getCell(`L${phyRow}`).value = `(${index + 1}) ${
        phy.m_physical_relation.physical
      }`;
      applyContentStyle(worksheet, "L", "Q", phyRow);
      phyRow++;
    });

    // Update main currentRow to highest value + 2
    currentRow = Math.max(orgRow, techRow, phyRow) + 2;

    // Find last row with data
    let lastRow = Math.max(orgRow, techRow, phyRow) - 1;

    // Apply borders only up to last row with data
    for (let rowNumber = 1; rowNumber <= lastRow; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }

    // เพิ่ม border ให้กับทุกเซลล์
    // worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    //   row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
    //     cell.border = {
    //       top: { style: "thin" },
    //       left: { style: "thin" },
    //       bottom: { style: "thin" },
    //       right: { style: "thin" },
    //     };
    //   });
    // });

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
