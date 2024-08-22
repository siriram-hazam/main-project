import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";

import authUtils from "../../hooks/useAuth";

const ActivitiesAdd = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authUtils.checkUser();
        setCheckUser(user);
        // console.log(user);
      } catch (error) {
        console.error("Error Activities checkUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const loadUser = async () => {
      try {
        const user = await authUtils.userProfile();
        setUser(user);
        // console.log(user.data.users.id);
      } catch (error) {
        console.error("Error Activities loadUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // console.log(user.data.users.id);

  useEffect(() => {
    if (user) {
      setFormData({
        activity: "",
        status: "pending",
        createBy: user.data.users.id,
        company_id: user.data.users.company_id,
        category: "",
        department_id: "",
        poi_relations: [
          {
            info: "",
            poi_info_owner: "",
            poi_info_from: "",
            poi_info_format: "",
            poi_info_type: "",
            poi_info_objective: "",
            poi_info_lawbase: [],
          },
        ],
        info_stored_period: [],
        info_placed: [],
        info_allowed_ps: [],
        info_allowed_ps_condition: [],
        info_access: [],
        info_access_condition: [],
        info_ps_usedbyrole_inside: [],
        info_ps_sendto_outside: [],
        info_ps_destroying: [],
        info_ps_destroyer: [],
        m_organization: [],
        m_technical: [],
        m_physical: [],
      });
    }
  }, [user]);

  // const [formData, setFormData] = useState({
  //   activity: "",
  //   status: "pending",
  //   createBy: user ? user.data.users.id : "",
  //   company_id: "",
  //   category: "",
  //   department_id: "",
  //   info_role: "",
  //   info_document: "",
  //   poi_relations: [
  //     {
  //       info: "",
  //       poi_info_owner: "",
  //       poi_info_from: "",
  //       poi_info_format: "",
  //       poi_info_type: "",
  //       poi_info_objective: "",
  //       poi_info_lawbase: [],
  //     },
  //   ],
  //   info_stored_period: [],
  //   info_placed: [],
  //   info_allowed_ps: [],
  //   info_allowed_ps_condition: [],
  //   info_access: [],
  //   info_access_condition: [],
  //   info_ps_usedbyrole_inside: [],
  //   info_ps_sendto_outside: [],
  //   info_ps_destroying: [],
  //   info_ps_destroyer: [],
  //   m_organization: [],
  //   m_technical: [],
  //   m_physical: [],
  // });

  const handleAutocompleteChange = (event, value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedAutocompleteChange = (event, value, name, index, field) => {
    const newArray = [...formData[name]];
    newArray[index][field] = value;
    setFormData({
      ...formData,
      [name]: newArray,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //ข้อมูลไปยัง API
    console.log(formData);
    // fetch("YOUR_API_ENDPOINT", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  const addPoiRelation = () => {
    const newPoiRelation = {
      info: "",
      poi_info_owner: "",
      poi_info_from: "",
      poi_info_format: "",
      poi_info_type: "",
      poi_info_objective: "",
      poi_info_lawbase: [],
    };
    setFormData((prevState) => ({
      ...prevState,
      poi_relations: [...prevState.poi_relations, newPoiRelation],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !checkUser) {
    return <div>Failed to load user data</div>;
  }

  if (!formData) {
    return <div>Initializing form...</div>;
  }

  console.log("user", user);

  console.log("formData", formData);

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Add Activities</Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <form onSubmit={handleSubmit}>
            <Autocomplete
              freeSolo
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="กิจกรรมงานที่บันทึกรายการ" />
              )}
              value={formData.activity}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "activity")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            {/* <Autocomplete
              options={["pending", "success"]}
              renderInput={(params) => <TextField {...params} label="Status" />}
              value={formData.status}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "status")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            /> */}
            {/* Status ^^^^ */}

            {/* <Autocomplete
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="Create By" />
              )}
              value={formData.createBy}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "createBy")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            /> */}
            {/* Create By ^^^^ */}

            {/* <Autocomplete
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="Company ID" />
              )}
              value={formData.company_id}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "company_id")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            /> */}
            {/* Company ID ^^^^ */}

            <Autocomplete
              freeSolo
              // options={["ข้อมูลในใบรับสมัครพนักงาน", "ข้อมูลอื่นๆ"]}
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="รายละเอียดของข้อมูลที่กรอก เช่น ข้อมูลส่วนบุคคลของพนักงาน"
                />
              )}
              value={formData.category}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "category")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />

            <Autocomplete
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="หน่วยงานที่บันทึกรายการ" />
              )}
              value={formData.department_id}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "department_id")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            {formData.poi_relations.map((relation, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1.2 }}>
                  ข้อมูลส่วนบุคคลที่เก็บ ที่ {index + 1}
                </Typography>

                <Box sx={{ ml: 3 }}>
                  <Autocomplete
                    options={["ข้อมูลที่หนึ่ง", "ข้อมูลที่สอง"]}
                    renderInput={(params) => (
                      <TextField {...params} label="ข้อมูล เช่น ชื่อ-นามสกุล" />
                    )}
                    value={relation.info}
                    onChange={(event, value) =>
                      handleNestedAutocompleteChange(
                        event,
                        value,
                        "poi_relations",
                        index,
                        "info"
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                  <Autocomplete
                    options={["ผู้สมัครงาน", "บุคคลอ้างอิง ของ ผู้สมัครงาน"]}
                    renderInput={(params) => (
                      <TextField {...params} label="เจ้าของข้อมูลส่วนบุคคล" />
                    )}
                    value={relation.poi_info_owner}
                    onChange={(event, value) =>
                      handleNestedAutocompleteChange(
                        event,
                        value,
                        "poi_relations",
                        index,
                        "poi_info_owner"
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                  <Autocomplete
                    options={["เจ้าของข้อมูลโดยตรง", "ข้อมูลจากแหล่งอื่น"]}
                    renderInput={(params) => (
                      <TextField {...params} label="ได้รับข้อมูลจาก" />
                    )}
                    value={relation.poi_info_from}
                    onChange={(event, value) =>
                      handleNestedAutocompleteChange(
                        event,
                        value,
                        "poi_relations",
                        index,
                        "poi_info_from"
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                  <Autocomplete
                    options={["ข้อมูลอ่อนไหว", "ข้อมูลทั่วไป"]}
                    renderInput={(params) => (
                      <TextField {...params} label="รูปแบบของข้อมูล" />
                    )}
                    value={relation.poi_info_format}
                    onChange={(event, value) =>
                      handleNestedAutocompleteChange(
                        event,
                        value,
                        "poi_relations",
                        index,
                        "poi_info_format"
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                  <Autocomplete
                    options={["ประเภทที่หนึ่ง", "ประเภทที่สอง"]}
                    renderInput={(params) => (
                      <TextField {...params} label="ประเภทของข้อมูลส่วนบุคคล" />
                    )}
                    value={relation.poi_info_type}
                    onChange={(event, value) =>
                      handleNestedAutocompleteChange(
                        event,
                        value,
                        "poi_relations",
                        index,
                        "poi_info_type"
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                  <Autocomplete
                    options={["วัตถุประสงค์ที่หนึ่ง", "วัตถุประสงค์ที่สอง"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="วัตถุประสงค์ของการเก็บข้อมูล"
                      />
                    )}
                    value={relation.poi_info_objective}
                    onChange={(event, value) =>
                      handleNestedAutocompleteChange(
                        event,
                        value,
                        "poi_relations",
                        index,
                        "poi_info_objective"
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                  <Autocomplete
                    multiple
                    options={["กฎหมายที่หนึ่ง", "กฎหมายที่สอง"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="ฐานทางกฏหมายสำหรับการประมวลผลข้อมูลส่วนบุคคล"
                      />
                    )}
                    value={relation.poi_info_lawbase}
                    onChange={(event, value) =>
                      handleNestedAutocompleteChange(
                        event,
                        value,
                        "poi_relations",
                        index,
                        "poi_info_lawbase"
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                </Box>
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={addPoiRelation}
              sx={{ mb: 2 }}
            >
              Add POI Relation
            </Button>
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ระยะเวลาการจัดเก็บข้อมูลส่วนบุคคล"
                />
              )}
              value={formData.info_stored_period}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_stored_period")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="แหล่งจัดเก็บข้อมูลส่วนบุคคล" />
              )}
              value={formData.info_placed}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_placed")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="บุคคลที่มีสิทธิเข้าถึงข้อมูล" />
              )}
              value={formData.info_allowed_ps}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_allowed_ps")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล"
                />
              )}
              value={formData.info_allowed_ps_condition}
              onChange={(event, value) =>
                handleAutocompleteChange(
                  event,
                  value,
                  "info_allowed_ps_condition"
                )
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="วิธีการเข้าถึงข้อมูลส่วนบุคคล" />
              )}
              value={formData.info_access}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_access")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="เงื่อนไขการเข้าถึงข้อมูล" />
              )}
              value={formData.info_access_condition}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_access_condition")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง (ภายในองค์กร)"
                />
              )}
              value={formData.info_ps_usedbyrole_inside}
              onChange={(event, value) =>
                handleAutocompleteChange(
                  event,
                  value,
                  "info_ps_usedbyrole_inside"
                )
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ข้อมูลส่วนบุคคล ถูกส่งต่อ/เปิดเผยให้ใครบ้าง (ภายนอกองค์กร)"
                />
              )}
              value={formData.info_ps_sendto_outside}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_ps_sendto_outside")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="วิธีการทำลายข้อมูลส่วนบุคคล" />
              )}
              value={formData.info_ps_destroying}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_ps_destroying")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ผู้อนุมัติการทำลายข้อมูลส่วนบุคคล"
                />
              )}
              value={formData.info_ps_destroyer}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_ps_destroyer")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="มาตรการเชิงองค์กร" />
              )}
              value={formData.m_organization}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "m_organization")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="มาตรการเชิงเทคนิค" />
              )}
              value={formData.m_technical}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "m_technical")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
              multiple
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="มาตรการทางกายภาพ" />
              )}
              value={formData.m_physical}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "m_physical")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivitiesAdd;
