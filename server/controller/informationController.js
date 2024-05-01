import prisma from '../db/db.config.js'

export const createInformation = async (req, res) => {

    const {
        activity,
        status, //set default value ("pending")
        createBy, //fontend auto add from session
        company_id, //frontend auto add from session
        category,
        department_id, //fontend show department name but map to department id then send to backend
        poi_relations,
        // poi_info_owner, //ย้ายไปใน poi_relations
        // poi_info_from,
        // poi_info_format,
        // poi_info_type,
        // poi_info_objective,
        // poi_info_lawbase,
        poi_info_stored_period,
        poi_info_placed,
        poi_info_allowed_ps,
        poi_info_allowed_ps_condition,
        poi_info_access,
        poi_info_access_condition,
        poi_info_ps_usedbyrole_inside,
        poi_info_ps_sendto_outside,
        poi_info_ps_destroying,
        poi_info_ps_destroyer
    } = req.body;

    // {
    //     "activity": "งานสรรหาว่าจ้าง",
    //         "status" : "pending",
    //             "createBy": 1,
    //                 "company_id": 1,
    //                     "category": "ข้อมูลในใบรับสมัครพนักงาน",
    //                         "department_id": 1,
    //                             "poi_relations": [
    //                                 {
    //                                     "info": "ข้อมูลที่หนึ่ง",
    //                                     "poi_info_owner": 1,
    //                                     "poi_info_from": 1,
    //                                     "poi_info_format": 1,
    //                                     "poi_info_type": 1,
    //                                     "poi_info_objective": 1,
    //                                     "poi_info_lawbase": [3, 1]
    //                                 },
    //                                 {
    //                                     "info": "ข้อมูลที่สอง",
    //                                     "poi_info_owner": 1,
    //                                     "poi_info_from": 1,
    //                                     "poi_info_format": 1,
    //                                     "poi_info_type": 1,
    //                                     "poi_info_objective": 1,
    //                                     "poi_info_lawbase": [2, 3]
    //                                 }
    //                             ]
    // }

    // console.log(req.body)

    try {
        const newInformation = await prisma.information.create({

            data: {
                activity: activity,
                status: status,
                createBy: createBy,
                company_id: company_id,
                department_id: department_id,
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
                                    department_id: department_id
                                }
                            }
                        }]
                },
                poi_information: {
                    create: poi_relations.map(item => (
                        {
                            poi_relation: {
                                create: {
                                    info: item.info,
                                    poi_info_owner: {
                                        create: [
                                            {
                                                info_owner_id: item.poi_info_owner
                                                // info_owner_relation: {
                                                //     create: {
                                                //         owner_: poi_info_owner,
                                                //     }
                                                // }
                                            }
                                        ]
                                    },
                                    poi_info_from: {
                                        create: [
                                            {
                                                info_from_id: item.poi_info_from
                                            }
                                        ]
                                    },
                                    poi_info_format: {
                                        create: [
                                            {
                                                info_format_id: item.poi_info_format
                                            }
                                        ]
                                    },
                                    poi_info_type: {
                                        create: [
                                            {
                                                info_type_id: item.poi_info_type
                                            }
                                        ]
                                    },
                                    poi_info_objective: {
                                        create: [
                                            {
                                                info_objective_id: item.poi_info_objective
                                            }
                                        ]
                                    },
                                    poi_info_lawbase: {
                                        // create: [
                                        //     {
                                        //         info_lawbase_id: item.poi_info_lawbase
                                        //     }
                                        // ]
                                        create: item.poi_info_lawbase.map(item => ({
                                            info_lawbase_id: item
                                        }))
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
                                }
                            }

                        }
                    ))
                },
                // Set the option to avoid creating duplicates
                // onConnect: {
                //     where: {
                //         info_lawbase_id: {
                //             in: poi_info_lawbase
                //         }
                //     }
                // }
            }
        })

        return res.json({ status: 200, message: newInformation })
    } catch (error) {
        console.error(error)
    }
}