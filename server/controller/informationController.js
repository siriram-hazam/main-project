import prisma from "../db/db.config.js";

import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";

const __dirname = path.resolve();

export const createInformation = async (req, res) => {
  const {
    activity,
    status, //set default value ("pending")
    createBy, //fontend auto add from session
    company_id, //frontend auto add from session
    category,
    department_id, //fontend show text but map to id then send to backend
    poi_relations, //fontend show text but map to id then send to backend
    // poi_info_owner, //ย้ายไปใน poi_relations
    // poi_info_from,
    // poi_info_format,
    // poi_info_type,
    // poi_info_objective,
    // poi_info_lawbase,
    info_stored_period, //fontend show text but map to id then send to backend
    info_placed, //fontend show text but map to id then send to backend
    info_allowed_ps, //fontend show text but map to id then send to backend
    info_allowed_ps_condition, //fontend show text but map to id then send to backend
    info_access, //fontend show text but map to id then send to backend
    info_access_condition, //fontend show text but map to id then send to backend
    info_ps_usedbyrole_inside, //fontend show text but map to id then send to backend
    info_ps_sendto_outside, //fontend show text but map to id then send to backend
    info_ps_destroying, //fontend show text but map to id then send to backend
    info_ps_destroyer, //fontend show text but map to id then send to backend
    m_organization, //fontend show text but map to id then send to backend
    m_technical, //fontend show text but map to id then send to backend
    m_physical, //fontend show text but map to id then send to backend
  } = req.body;

  //   {
  //     "activity": "งานสรรหาว่าจ้าง",
  //     "status" : "pending",
  //     "createBy": 1,
  //     "company_id": 1,
  //     "category": "ข้อมูลในใบรับสมัครพนักงาน",
  //     "department_id": 1,
  //     "info_role": "",
  //     "info_document": "",
  //     "poi_relations": [
  //         {
  //             "info": "ข้อมูลที่หนึ่ง",
  //             "poi_info_owner": 1,
  //             "poi_info_from": 1,
  //             "poi_info_format": 1,
  //             "poi_info_type": 1,
  //             "poi_info_objective": 1,
  //             "poi_info_lawbase": [3,1]
  //         },
  //         {
  //             "info": "ข้อมูลที่สอง",
  //             "poi_info_owner": 1,
  //             "poi_info_from": 1,
  //             "poi_info_format": 1,
  //             "poi_info_type": 1,
  //             "poi_info_objective": 1,
  //             "poi_info_lawbase": [2,3]
  //         }
  //     ],
  //     "info_stored_period" : [1,2,3],
  //     "info_placed" : [1,2],
  //     "info_allowed_ps" : [1,2,3],
  //     "info_allowed_ps_condition" : [1,2,3],
  //     "info_access" : [1,2],
  //     "info_access_condition" : [1,2],
  //     "info_ps_usedbyrole_inside" : [1,2,3],
  //     "info_ps_sendto_outside" : [4,5],
  //     "info_ps_destroying" : [1,2,3],
  //     "info_ps_destroyer" : [1]
  // }

  console.log(req.body);

  try {
    const newInformation = await prisma.information.create({
      data: {
        // activity: activity,
        // activity_relation: {
        //   create: {
        //     activity: activity,
        //   },
        // },
        // activity_id: activity,
        activity_relation: {
          connect: { id: activity },
        },
        status: status,
        // createBy: createBy,
        user_account_relation: {
          connect: { id: createBy },
        },
        // company_id: company_id,
        company_relation: {
          connect: { id: company_id },
        },
        // department_id: department_id,
        department_relation: {
          connect: { id: department_id },
        },
        // company_information: {
        //     create: [
        //         {
        //             company_id: Number(company_id)
        //         }
        //     ]
        // },
        category_information: {
          create: [
            {
              category_relation: {
                create: {
                  category: category,
                  department_id: department_id,
                },
              },
            },
          ],
        },
        // information_info_role: {
        //   create: [
        //     {
        //       info_role_id: info_role,
        //     },
        //   ],
        // },
        // information_info_document: {
        //   create: [
        //     {
        //       info_document_id: info_document,
        //     },
        //   ],
        // },
        poi_information: {
          create: poi_relations.map((item) => ({
            poi_relation: {
              create: {
                // info: item.info,
                poi_info: {
                  create: [
                    {
                      info_id: item.poi_info,
                    },
                  ],
                },
                poi_info_owner: {
                  create: [
                    {
                      info_owner_id: item.poi_info_owner,
                    },
                  ],
                },
                poi_info_from: {
                  create: [
                    {
                      info_from_id: item.poi_info_from,
                    },
                  ],
                },
                poi_info_format: {
                  create: [
                    {
                      info_format_id: item.poi_info_format,
                    },
                  ],
                },
                poi_info_type: {
                  create: [
                    {
                      info_type_id: item.poi_info_type,
                    },
                  ],
                },
                poi_info_objective: {
                  create: [
                    {
                      info_objective_id: item.poi_info_objective,
                    },
                  ],
                },
                poi_info_lawbase: {
                  create: item.poi_info_lawbase.map((lawbase) => ({
                    info_lawbase_id: lawbase,
                  })),
                },
              },
            },
          })),
        },
        information_info_stored_period: {
          create: info_stored_period.map((item) => ({
            info_stored_period_id: item,
          })),
        },
        information_info_placed: {
          create: info_placed.map((item) => ({
            info_placed_id: item,
          })),
        },
        information_info_allowed_ps: {
          create: info_allowed_ps.map((item) => ({
            info_allowed_ps_id: item,
          })),
        },
        information_info_allowed_ps_condition: {
          create: info_allowed_ps_condition.map((item) => ({
            info_allowed_ps_condition_id: item,
          })),
        },
        information_info_access: {
          create: info_access.map((item) => ({
            info_access_id: item,
          })),
        },
        information_info_access_condition: {
          create: info_access_condition.map((item) => ({
            info_access_condition_id: item,
          })),
        },
        information_info_ps_usedbyrole_inside: {
          create: info_ps_usedbyrole_inside.map((item) => ({
            info_ps_usedbyrole_inside_id: item,
          })),
        },
        information_info_ps_sendto_outside: {
          create: info_ps_sendto_outside.map((item) => ({
            info_ps_sendto_outside_id: item,
          })),
        },
        information_info_ps_destroying: {
          create: info_ps_destroying.map((item) => ({
            info_ps_destroying_id: item,
          })),
        },
        information_info_ps_destroyer: {
          create: info_ps_destroyer.map((item) => ({
            info_ps_destroyer_id: item,
          })),
        },
        information_m_organization: {
          create: m_organization.map((item) => ({
            m_organization_id: item,
          })),
        },
        information_m_technical: {
          create: m_technical.map((item) => ({
            m_technical_id: item,
          })),
        },
        information_m_physical: {
          create: m_physical.map((item) => ({
            m_physical_id: item,
          })),
        },
      },
    });

    return res.json({ status: 200, message: newInformation });
  } catch (error) {
    console.error(error);
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
        activity_relation: {},
        status: true,
        create_time: true,
        user_account_relation: {},
        company_relation: {},
        category_information: {
          select: {
            category_relation: {
              select: {
                category: true,
                department_relation: true,
              },
            },
          },
        },
        poi_information: {
          select: {
            poi_relation: {
              select: {
                // info: true,
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
    console.error("Error retrieving information:", error); // Log any error
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
  // const { status } = req.body;
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
  // console.log("Received request for /api/information/download-excel");
  const item = req.body;

  console.log(item);

  try {
    const filePath = path.resolve(__dirname + `/assets/template_ropa.xlsx`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Template file not found" });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1); // เลือก worksheet แรก

    worksheet.getCell("B2").value = item.user_account_relation.fullname; //ชื่อผู้ควบคุมข้อมูล หรือ ผู้แทน
    worksheet.getCell("B3").value = item.company_relation.address; //ที่ตั้งของสถานที่ติดต่อ
    worksheet.getCell("B4").value = item.company_relation.email; //อีเมล์แอดเดรส
    worksheet.getCell("B5").value = item.company_relation.phone_number; //เบอร์โทรศัพท์
    worksheet.getCell("B6").value = item.user_account_relation.fullname; //ชื่อของผู้บันทึกรายการ

    // worksheet.getCell("B7").value = item.category_information.map((item) => {
    //   return item.category_relation.department_relation.departmentName;
    // }); //หน่วยงานที่บันทึกรายการ

    worksheet.getCell("B7").value =
      item.category_information[0].category_relation.department_relation.departmentName; //หน่วยงานที่บันทึกรายการ
    worksheet.getCell("B8").value = item.activity_relation.activity; //กิจกรรมงานที่บันทึกรายการ

    worksheet.getCell("K2").value = item.company_relation.dpo; //ชื่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
    worksheet.getCell("K3").value = item.company_relation.address; //ที่ตั้งของสถานที่ติดต่อ
    worksheet.getCell("K4").value = item.company_relation.email; //อีเมล์แอดเดรส
    worksheet.getCell("K5").value = item.company_relation.phone_number; //หมายเลขโทรศัพท์
    worksheet.getCell("K6").value = item.company_relation.dpo; //ชื่อของผู้ตรวจสอบบันทึกรายการ

    const organizations = item.information_m_organization;
    let row_organizations = 15; // Starting row for the first organization

    organizations.forEach((org, index) => {
      worksheet.getCell(`A${row_organizations}`).value = `(${index + 1}) ${
        org.m_organization_relation.organization
      }`;
      row_organizations++; // Move to the next row for the next organization
    });

    const technicals = item.information_m_technical;
    let row_technicals = 15; // Starting row for the first technical

    technicals.forEach((tech, index) => {
      worksheet.getCell(`F${row_technicals}`).value = `(${index + 1}) ${
        tech.m_technical_relation.technical
      }`;
      row_technicals++; // Move to the next row for the next technical
    });

    const physicals = item.information_m_physical;
    let row_physicals = 15; // Starting row for the first physical

    physicals.forEach((phy, index) => {
      worksheet.getCell(`L${row_physicals}`).value = `(${index + 1}) ${
        phy.m_physical_relation.physical
      }`;
      row_physicals++; // Move to the next row for the next physical
    });

    // workbook.getCell("A11").value = item.poi_information.map((item) => {
    //   return item.poi_relation.poi_info.info_relation.info_;
    // });

    let startRow = 11; // Starting row for the first poi_relation
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
      // Copy the current row and paste it below
      worksheet.duplicateRow(startRow, 1, true);

      worksheet.getRow(startRow).height = 40; // Set the height of the row

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

    worksheet.getCell("H11").value = item.information_info_stored_period
      .map(
        (placed, index) =>
          `(${index + 1}) ${placed.info_stored_period_relation.period_}`
      )
      .join("\n");

    worksheet.getCell("I11").value = item.information_info_placed
      .map(
        (placed, index) =>
          `(${index + 1}) ${placed.info_placed_relation.placed_}`
      )
      .join("\n");

    worksheet.getCell("J11").value = item.information_info_allowed_ps
      .map(
        (allowed, index) =>
          `(${index + 1}) ${allowed.info_allowed_ps_relation.allowed_ps_}`
      )
      .join("\n");

    worksheet.getCell("K11").value = item.information_info_allowed_ps_condition
      .map(
        (allowed, index) =>
          `(${index + 1}) ${
            allowed.info_allowed_ps_condition_relation.allowed_ps_condition_
          }`
      )
      .join("\n");

    worksheet.getCell("L11").value = item.information_info_access
      .map(
        (access, index) =>
          `(${index + 1}) ${access.info_access_relation.access_}`
      )
      .join("\n");

    worksheet.getCell("M11").value = item.information_info_access_condition
      .map(
        (access, index) =>
          `(${index + 1}) ${
            access.info_access_condition_relation.access_condition_
          }`
      )
      .join("\n");

    worksheet.getCell("N11").value = item.information_info_ps_usedbyrole_inside
      .map(
        (used, index) =>
          `(${index + 1}) ${
            used.info_ps_usedbyrole_inside_relation.use_by_role_
          }`
      )
      .join("\n");

    worksheet.getCell("O11").value = item.information_info_ps_sendto_outside
      .map(
        (send, index) =>
          `(${index + 1}) ${send.info_ps_sendto_outside_relation.sendto_}`
      )
      .join("\n");

    worksheet.getCell("P11").value = item.information_info_ps_destroying
      .map(
        (destroy, index) =>
          `(${index + 1}) ${destroy.info_ps_destroying_relation.destroying_}`
      )
      .join("\n");

    worksheet.getCell("Q11").value = item.information_info_ps_destroyer
      .map(
        (destroyer, index) =>
          `(${index + 1}) ${destroyer.info_ps_destroyer_relation.destroyer_}`
      )
      .join("\n");

    // // Create a new sheet
    // // const newSheet = workbook.addWorksheet("New Sheet");

    // // Populate the new sheet with data
    // newSheet.getCell("A5").value = item.activity_relation.activity;
    // newSheet.getCell("A6").value = item.user_account_relation.fullname;
    // newSheet.getCell("A7").value = item.company_relation.companyName;
    // newSheet.getCell("A8").value = item.status;
    // newSheet.getCell("A9").value = new Date(item.create_time).toLocaleString(
    //   "th-TH",
    //   {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "numeric",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //   }
    // );

    //Get the file data as a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Set the appropriate headers and send the buffer as a response
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Excel_Activity_${item.id}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);

    // const outputDir = path.resolve(__dirname + `/assets`);
    // // console.log(outputDir);
    // const outputFilePath = path.join(
    //   outputDir,
    //   `excel_Activity_${item.id}.xlsx`
    // );

    // // Check if the directory exists, if not, create it
    // if (!fs.existsSync(outputDir)) {
    //   fs.mkdirSync(outputDir, { recursive: true });
    // }

    // await workbook.xlsx.writeFile(outputFilePath);

    // res.download(outputFilePath, `Excel_Activity_${item.id}.xlsx`);
  } catch (error) {
    console.error("Error excelProcess : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
