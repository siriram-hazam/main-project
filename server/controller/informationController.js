import prisma from "../db/db.config.js";

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

  // console.log(req.body)

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
                info: item.info,
                poi_info_owner: {
                  create: [
                    {
                      info_owner_id: item.poi_info_owner,
                      // info_owner_relation: {
                      //     create: {
                      //         owner_: poi_info_owner,
                      //     }
                      // }
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
                  // create: [
                  //     {
                  //         info_lawbase_id: item.poi_info_lawbase
                  //     }
                  // ]
                  create: item.poi_info_lawbase.map((item) => ({
                    info_lawbase_id: item,
                  })),
                },
                // poi_info_stored_period: {
                //     create: [
                //         {
                //             info_stored_period: poi_info_stored_period
                //         }
                //     ]
                // },
                // poi_info_placed: {
                //     create: [
                //         {
                //             info_placed_id: poi_info_placed
                //         }
                //     ]
                // },
                // poi_info_allowed_ps: {
                //     create: [
                //         {
                //             info_allowed_ps_id: poi_info_allowed_ps
                //         }
                //     ]
                // },
                // poi_info_allowed_ps_condition: {
                //     create: [
                //         {
                //             info_allowed_ps_condition_id: poi_info_allowed_ps_condition
                //         }
                //     ]
                // },
                // poi_info_access: {
                //     create: [
                //         {
                //             info_access_id: poi_info_access
                //         }
                //     ]
                // },
                // poi_info_access_condition: {
                //     create: [
                //         {
                //             info_access_condition_id: poi_info_access_condition
                //         }
                //     ]
                // },
                // poi_info_ps_usedbyrole_inside: {
                //     create: [
                //         {
                //             info_ps_usedbyrole_inside_id: poi_info_ps_usedbyrole_inside
                //         }
                //     ]
                // },
                // poi_info_ps_sendto_outside: {
                //     create: [
                //         {
                //             info_ps_sendto_outside_id: poi_info_ps_sendto_outside
                //         }
                //     ]
                // },
                // poi_info_ps_destroying: {
                //     create: [
                //         {
                //             info_ps_destroying_id: poi_info_ps_destroying
                //         }
                //     ]
                // },
                // poi_info_ps_destroyer: {
                //     create: [
                //         {
                //             info_ps_destroyer_id: poi_info_ps_destroyer
                //         }
                //     ]
                // }
              },
            },
          })),
        },
        // Set the option to avoid creating duplicates
        // onConnect: {
        //     where: {
        //         info_lawbase_id: {
        //             in: poi_info_lawbase
        //         }
        //     }
        // },
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
    const information = await prisma.information.findMany({
      where: {
        company_id: req.user.company_id,
      },
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
            id: true,
            username: true,
            fullname: true,
          },
        },
        company_relation: {
          select: {
            id: true,
            companyName: true,
          },
        },
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
        // information_info_role: {
        //   select: {
        //     info_role_relation: {
        //       select: {
        //         role: true,
        //       },
        //     },
        //   },
        // },
        // information_info_document: {
        //   select: {
        //     info_document_relation: {
        //       select: {
        //         document: true,
        //       },
        //     },
        //   },
        // },
        poi_information: {
          select: {
            poi_relation: {
              select: {
                info: true,
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
