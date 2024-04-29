import prisma from '../db/db.config.js'

export const createInformation = async (req, res) => {
    // const { activity, status, createBy, company_id, category, department_id, info, poi_info_owner, poi_info_from, poi_info_format, poi_info_type, poi_info_objective, poi_info_lawbase, poi_info_stored_period, poi_info_placed,
    //     poi_info_allowed_ps, poi_info_allowed_ps_condition, poi_info_access, poi_info_access_condition, poi_info_ps_usedbyrole_inside, poi_info_ps_sendto_outside, poi_info_ps_destroying, poi_info_ps_destroyer } = req.body

    const {
        activity,
        status,
        createBy,
        company_id,
        category,
        department_id,
        info,
        poi_info_owner,
        poi_info_from,
        poi_info_format,
        poi_info_type,
        poi_info_objective,
        poi_info_lawbase,
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

    const createPOI = (poiData) => {
        return poiData.map(item => ({
            poi_relation: {
                create: {
                    info,
                    poi_info_owner: { create: { info_owner_id: poi_info_owner } },
                    poi_info_from: { create: { info_from_id: poi_info_from } },
                    poi_info_format: { create: { info_format_id: poi_info_format } },
                    poi_info_type: { create: { info_type_id: poi_info_type } },
                    poi_info_objective: { create: { info_objective_id: poi_info_objective } },
                    poi_info_lawbase: { create: { info_lawbase_id: poi_info_lawbase } },
                    poi_info_stored_period: { create: { info_stored_period: poi_info_stored_period } },
                    poi_info_placed: { create: { info_placed_id: poi_info_placed } },
                    poi_info_allowed_ps: { create: { info_allowed_ps_id: poi_info_allowed_ps } },
                    poi_info_allowed_ps_condition: { create: { info_allowed_ps_condition_id: poi_info_allowed_ps_condition } },
                    poi_info_access: { create: { info_access_id: poi_info_access } },
                    poi_info_access_condition: { create: { info_access_condition_id: poi_info_access_condition } },
                    poi_info_ps_usedbyrole_inside: { create: { info_ps_usedbyrole_inside_id: poi_info_ps_usedbyrole_inside } },
                    poi_info_ps_sendto_outside: { create: { info_ps_sendto_outside_id: poi_info_ps_sendto_outside } },
                    poi_info_ps_destroying: { create: { info_ps_destroying_id: poi_info_ps_destroying } },
                    poi_info_ps_destroyer: { create: { info_ps_destroyer_id: poi_info_ps_destroyer } }
                }
            }
        }));
    };

    const poi_information = createPOI(info);

    try {
        const newInformation = await prisma.information.create({

            data: {
                activity,
                status,
                createBy,
                company_information: { create: [{ company_id: Number(company_id) }] },
                category_information: { create: [{ category_relation: { create: { category, department_id: Number(department_id) } } }] },
                poi_information
            }

            // data: {
            //     activity: activity,
            //     status: status,
            //     createBy: createBy,
            //     company_information: {
            //         create: [
            //             {
            //                 company_id: Number(company_id)
            //             }
            //         ]
            //     },
            //     category_information: {
            //         create: [
            //             {
            //                 category_relation: {
            //                     create: {
            //                         category: category,
            //                         department_id: Number(department_id)
            //                     }
            //                 }
            //             }]
            //     },
            //     // poi_information: {
            //     //     create: info.map(item => ({
            //     //         poi_relation: {
            //     //             create: {
            //     //                 info: item

            //     //             }
            //     //         }
            //     //     }))
            //     // }
            //     poi_information: {
            //         create: [
            //             {
            //                 poi_relation: {
            //                     create: {
            //                         info: info,
            //                         poi_info_owner: {
            //                             create: [
            //                                 {
            //                                     info_owner_id: poi_info_owner
            //                                     // info_owner_relation: {
            //                                     //     create: {
            //                                     //         owner_: poi_info_owner,
            //                                     //     }
            //                                     // }
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_from: {
            //                             create: [
            //                                 {
            //                                     info_from_id: poi_info_from
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_format: {
            //                             create: [
            //                                 {
            //                                     info_format_id: poi_info_format
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_type: {
            //                             create: [
            //                                 {
            //                                     info_type_id: poi_info_type
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_objective: {
            //                             create: [
            //                                 {
            //                                     info_objective_id: poi_info_objective
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_lawbase: {
            //                             create: [
            //                                 {
            //                                     info_lawbase_id: poi_info_lawbase
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_stored_period: {
            //                             create: [
            //                                 {
            //                                     info_stored_period: poi_info_stored_period
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_placed: {
            //                             create: [
            //                                 {
            //                                     info_placed_id: poi_info_placed
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_allowed_ps: {
            //                             create: [
            //                                 {
            //                                     info_allowed_ps_id: poi_info_allowed_ps
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_allowed_ps_condition: {
            //                             create: [
            //                                 {
            //                                     info_allowed_ps_condition_id: poi_info_allowed_ps_condition
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_access: {
            //                             create: [
            //                                 {
            //                                     info_access_id: poi_info_access
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_access_condition: {
            //                             create: [
            //                                 {
            //                                     info_access_condition_id: poi_info_access_condition
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_usedbyrole_inside: {
            //                             create: [
            //                                 {
            //                                     info_ps_usedbyrole_inside_id: poi_info_ps_usedbyrole_inside
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_sendto_outside: {
            //                             create: [
            //                                 {
            //                                     info_ps_sendto_outside_id: poi_info_ps_sendto_outside
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_destroying: {
            //                             create: [
            //                                 {
            //                                     info_ps_destroying_id: poi_info_ps_destroying
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_destroyer: {
            //                             create: [
            //                                 {
            //                                     info_ps_destroyer_id: poi_info_ps_destroyer
            //                                 }
            //                             ]
            //                         }
            //                     }
            //                 }
            //             }, {
            //                 poi_relation: {
            //                     create: {
            //                         info: info,
            //                         poi_info_owner: {
            //                             create: [
            //                                 {
            //                                     info_owner_id: poi_info_owner
            //                                     // info_owner_relation: {
            //                                     //     create: {
            //                                     //         owner_: poi_info_owner,
            //                                     //     }
            //                                     // }
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_from: {
            //                             create: [
            //                                 {
            //                                     info_from_id: poi_info_from
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_format: {
            //                             create: [
            //                                 {
            //                                     info_format_id: poi_info_format
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_type: {
            //                             create: [
            //                                 {
            //                                     info_type_id: poi_info_type
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_objective: {
            //                             create: [
            //                                 {
            //                                     info_objective_id: poi_info_objective
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_lawbase: {
            //                             create: [
            //                                 {
            //                                     info_lawbase_id: poi_info_lawbase
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_stored_period: {
            //                             create: [
            //                                 {
            //                                     info_stored_period: poi_info_stored_period
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_placed: {
            //                             create: [
            //                                 {
            //                                     info_placed_id: poi_info_placed
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_allowed_ps: {
            //                             create: [
            //                                 {
            //                                     info_allowed_ps_id: poi_info_allowed_ps
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_allowed_ps_condition: {
            //                             create: [
            //                                 {
            //                                     info_allowed_ps_condition_id: poi_info_allowed_ps_condition
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_access: {
            //                             create: [
            //                                 {
            //                                     info_access_id: poi_info_access
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_access_condition: {
            //                             create: [
            //                                 {
            //                                     info_access_condition_id: poi_info_access_condition
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_usedbyrole_inside: {
            //                             create: [
            //                                 {
            //                                     info_ps_usedbyrole_inside_id: poi_info_ps_usedbyrole_inside
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_sendto_outside: {
            //                             create: [
            //                                 {
            //                                     info_ps_sendto_outside_id: poi_info_ps_sendto_outside
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_destroying: {
            //                             create: [
            //                                 {
            //                                     info_ps_destroying_id: poi_info_ps_destroying
            //                                 }
            //                             ]
            //                         },
            //                         poi_info_ps_destroyer: {
            //                             create: [
            //                                 {
            //                                     info_ps_destroyer_id: poi_info_ps_destroyer
            //                                 }
            //                             ]
            //                         }
            //                     }
            //                 }
            //             }
            //         ]
            //     }
            // }
        })

        return res.json({ status: 200, message: newInformation })
    } catch (error) {
        console.error(error.message)
    }
}