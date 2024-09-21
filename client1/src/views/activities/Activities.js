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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PlusOneOutlinedIcon from "@mui/icons-material/PlusOneOutlined";

import authUtils from "../../hooks/useAuth";
import optionUtils from "../../hooks/useOption";
import axios from "axios";

const ActivitiesAdd = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [optionData, setOptionData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const requiredFields = [
    "activity",
    "status",
    "createBy",
    "company_id",
    "category",
    "department_id",
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

  const requiredPoiFields = [
    "poi_info",
    "poi_info_owner",
    "poi_info_from",
    "poi_info_format",
    "poi_info_type",
    "poi_info_objective",
    "poi_info_lawbase",
  ];

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authUtils.checkUser();
        setCheckUser(user);
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
      } catch (error) {
        console.error("Error Activities loadUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const loadOptions = async () => {
      try {
        const options = await optionUtils.optionAllDropdown();
        setOptionData(options);
      } catch (error) {
        console.error("Error Activities loadOptions : ", error);
      }
    };

    loadOptions();
  }, []);

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
            poi_info: "",
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

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  const checkFormCompletion = () => {
    if (!formData) return setIsFormComplete(false); // ถ้า formData เป็น null ให้รีเทิร์น false

    const isComplete =
      requiredFields.every((field) => {
        const value = formData[field];
        // เช็คว่าฟิลด์เป็น string และไม่ใช่ empty string
        return (
          value &&
          (Array.isArray(value)
            ? value.length > 0
            : typeof value === "string"
            ? value.trim() !== ""
            : true)
        );
      }) &&
      formData.poi_relations.every((poi) =>
        requiredPoiFields.every((field) => {
          const poiValue = poi[field];
          // ตรวจสอบค่าเดียวกัน
          return (
            poiValue &&
            (Array.isArray(poiValue)
              ? poiValue.length > 0
              : typeof poiValue === "string"
              ? poiValue.trim() !== ""
              : true)
          );
        })
      );

    // console.log("Form complete status:", isComplete); // Debugging line
    setIsFormComplete(isComplete);
  };

  const handleAutocompleteChange = (event, value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value && value.id ? value.id : value,
    }));
    checkFormCompletion(); // ตรวจสอบความครบถ้วนหลังการเปลี่ยนแปลง
  };

  const handleNestedAutocompleteChange = (event, value, name, index, field) => {
    setFormData((prevFormData) => {
      const updatedRelations = [...prevFormData.poi_relations];
      updatedRelations[index] = {
        ...updatedRelations[index],
        [field]: value,
      };
      return {
        ...prevFormData,
        [name]: updatedRelations,
      };
    });
    checkFormCompletion(); // ตรวจสอบความครบถ้วนหลังการเปลี่ยนแปลง
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data", formData);

    for (let field of requiredFields) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        return alert(`Please fill in the ${field}`);
      }
    }

    for (let poi of formData.poi_relations) {
      for (let field of requiredPoiFields) {
        if (
          !poi[field] ||
          (Array.isArray(poi[field]) && poi[field].length === 0)
        ) {
          return alert(`Please fill in the ${field} in poi_relations`);
        }
      }
    }

    await axios
      .post(`${process.env.REACT_APP_SERVER_SIDE}/information`, formData)
      .then((res) => {
        // console.log("Success", res);
        if (res.data.status === 200) {
          toast.success("Activity added successfully");
        } else {
          toast.error("Failed to add activity");
        }

        setTimeout(() => {
          window.location.href = "/activities";
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to add activity");
        console.error("Error", error);
      });
  };

  const addPoiRelation = () => {
    const newPoiRelation = {
      poi_info: "",
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

  if (!formData || !optionData) {
    return <div>Initializing form...</div>;
  }

  return (
    <>
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">
              <AddCircleOutlineOutlinedIcon
                sx={{
                  color: "grey",
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                  fontSize: "2rem",
                }}
              />
              Add Activities
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <form onSubmit={handleSubmit}>
              <Autocomplete
                freeSolo
                options={optionData.data.activity}
                getOptionLabel={(option) =>
                  // option.activity ? option.activity : ""
                  typeof option === "string" ? option : option.activity || ""
                } //Display option label
                renderInput={(params) => (
                  <TextField {...params} label="กิจกรรมงานที่บันทึกรายการ" />
                )}
                value={
                  // optionData.data.activity.find(
                  //   (option) => option.id === formData.activity
                  // ) || null
                  typeof formData.activity === "string"
                    ? formData.activity
                    : optionData.data.activity.find(
                        (option) => option.id === formData.activity
                      ) || ""
                } // Handle the input value
                onChange={(event, value) =>
                  // handleAutocompleteChange(event, value, "activity")
                  handleAutocompleteChange(
                    event,
                    typeof value === "string" ? value : value?.id || "",
                    "activity"
                  )
                } // Handle change when selecting from dropdown
                onInputChange={(event, newInputValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    activity: newInputValue,
                  }));
                  checkFormCompletion();
                }} // Handle free solo input change
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === "" || option === value
                } // Check for matching value
              />

              <Autocomplete
                freeSolo
                options={
                  optionData.data.category ? optionData.data.category : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ชื่อเอกสาร หรือ ชื่อไฟล์ที่จัดเก็บข้อมูล เช่น สำเนาบัตรประชาชน หรือ ใบสมัครงาน"
                  />
                )}
                value={formData.category}
                onChange={(event, value) =>
                  handleAutocompleteChange(event, value, "category")
                }
                onInputChange={(event, newInputValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    category: newInputValue,
                  }));
                }}
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option === value || value === ""
                }
              />

              <Autocomplete
                freeSolo
                options={optionData.data.department} // Option list
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : option.departmentName || ""
                } // Display option label
                renderInput={(params) => (
                  <TextField {...params} label="หน่วยงานที่บันทึกรายการ" />
                )}
                value={
                  typeof formData.department_id === "string"
                    ? formData.department_id
                    : optionData.data.department.find(
                        (option) => option.id === formData.department_id
                      ) || ""
                } // Handle the input value
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    typeof value === "string" ? value : value?.id || "",
                    "department_id"
                  )
                } // Handle change when selecting from dropdown
                onInputChange={(event, newInputValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    department_id: newInputValue,
                  }));
                  checkFormCompletion();
                }} // Handle free solo input change
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === "" || option === value
                } // Check for matching value
              />

              {formData.poi_relations.map((relation, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1.2 }}>
                    ข้อมูลส่วนบุคคลที่เก็บ ที่ {index + 1}
                  </Typography>

                  <Box sx={{ ml: 3 }}>
                    <Autocomplete
                      options={optionData.data.poi_info}
                      getOptionLabel={(option) =>
                        option.info_ ? option.info_ : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ข้อมูล เช่น ชื่อ-นามสกุล"
                        />
                      )}
                      value={
                        relation.poi_info
                          ? optionData.data.poi_info.find(
                              (opt) => opt.id === relation.poi_info
                            )
                          : null
                      }
                      onChange={(event, value) =>
                        handleNestedAutocompleteChange(
                          event,
                          value ? value.id : "",
                          "poi_relations",
                          index,
                          "poi_info"
                        )
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || value === ""
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.info_}
                        </li>
                      )}
                    />
                    <Autocomplete
                      options={optionData.data.poi_info_owner}
                      getOptionLabel={(option) =>
                        option.owner_ ? option.owner_ : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="เจ้าของข้อมูลส่วนบุคคล" />
                      )}
                      value={
                        relation.poi_info_owner
                          ? optionData.data.poi_info_owner.find(
                              (opt) => opt.id === relation.poi_info_owner
                            )
                          : null
                      }
                      onChange={(event, value) =>
                        handleNestedAutocompleteChange(
                          event,
                          value ? value.id : "",
                          "poi_relations",
                          index,
                          "poi_info_owner"
                        )
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || value === ""
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.owner_}
                        </li>
                      )}
                    />
                    <Autocomplete
                      options={optionData.data.poi_info_from}
                      getOptionLabel={(option) =>
                        option.from_ ? option.from_ : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="ได้รับข้อมูลจาก" />
                      )}
                      value={
                        relation.poi_info_from
                          ? optionData.data.poi_info_from.find(
                              (opt) => opt.id === relation.poi_info_from
                            )
                          : null
                      }
                      onChange={(event, value) =>
                        handleNestedAutocompleteChange(
                          event,
                          value ? value.id : "",
                          "poi_relations",
                          index,
                          "poi_info_from"
                        )
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || value === ""
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.from_}
                        </li>
                      )}
                    />
                    <Autocomplete
                      options={optionData.data.poi_info_format}
                      getOptionLabel={(option) =>
                        option.format_ ? option.format_ : ""
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="รูปแบบของข้อมูล" />
                      )}
                      value={
                        relation.poi_info_format
                          ? optionData.data.poi_info_format.find(
                              (opt) => opt.id === relation.poi_info_format
                            )
                          : null
                      }
                      onChange={(event, value) =>
                        handleNestedAutocompleteChange(
                          event,
                          value ? value.id : "",
                          "poi_relations",
                          index,
                          "poi_info_format"
                        )
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || value === ""
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.format_}
                        </li>
                      )}
                    />
                    <Autocomplete
                      options={optionData.data.poi_info_type}
                      getOptionLabel={(option) =>
                        option.type_ ? option.type_ : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ประเภทของข้อมูลส่วนบุคคล"
                        />
                      )}
                      value={
                        relation.poi_info_type
                          ? optionData.data.poi_info_type.find(
                              (opt) => opt.id === relation.poi_info_type
                            )
                          : null
                      }
                      onChange={(event, value) =>
                        handleNestedAutocompleteChange(
                          event,
                          value ? value.id : "",
                          "poi_relations",
                          index,
                          "poi_info_type"
                        )
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || value === ""
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.type_}
                        </li>
                      )}
                    />
                    <Autocomplete
                      options={optionData.data.poi_info_objective}
                      getOptionLabel={(option) =>
                        option.objective_ ? option.objective_ : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="วัตถุประสงค์ของการเก็บข้อมูล"
                        />
                      )}
                      value={
                        relation.poi_info_objective
                          ? optionData.data.poi_info_objective.find(
                              (opt) => opt.id === relation.poi_info_objective
                            )
                          : null
                      }
                      onChange={(event, value) =>
                        handleNestedAutocompleteChange(
                          event,
                          value ? value.id : "",
                          "poi_relations",
                          index,
                          "poi_info_objective"
                        )
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || value === ""
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.objective_}
                        </li>
                      )}
                    />

                    <Autocomplete
                      multiple
                      options={optionData.data.poi_info_lawbase}
                      getOptionLabel={(option) =>
                        option.lawBase_ ? option.lawBase_ : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ฐานทางกฏหมายสำหรับการประมวลผลข้อมูลส่วนบุคคล"
                        />
                      )}
                      value={
                        relation.poi_info_lawbase
                          ? optionData.data.poi_info_lawbase.filter((opt) =>
                              relation.poi_info_lawbase.includes(opt.id)
                            )
                          : []
                      }
                      onChange={(event, value) =>
                        handleNestedAutocompleteChange(
                          event,
                          value.map((v) => v.id),
                          "poi_relations",
                          index,
                          "poi_info_lawbase"
                        )
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id || value === ""
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.lawBase_}
                        </li>
                      )}
                    />
                  </Box>
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={addPoiRelation}
                sx={{ mb: 2, fontSize: "1rem" }}
              >
                <PlusOneOutlinedIcon
                  sx={{
                    mr: 1,
                    mb: {
                      xs: 1,
                      sm: 0,
                      lg: 0,
                    },
                    fontSize: "1.5rem",
                  }}
                />
                เพิ่มข้อมูลส่วนบุคคลที่เก็บ
              </Button>
              <Autocomplete
                multiple
                options={optionData.data.info_stored_period}
                getOptionLabel={(option) =>
                  option.period_ ? option.period_ : ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ระยะเวลาการจัดเก็บข้อมูลส่วนบุคคล"
                  />
                )}
                value={
                  formData.info_stored_period
                    ? optionData.data.info_stored_period.filter((opt) =>
                        formData.info_stored_period.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_stored_period"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.period_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_placed}
                getOptionLabel={(option) =>
                  option.placed_ ? option.placed_ : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="แหล่งจัดเก็บข้อมูลส่วนบุคคล" />
                )}
                value={
                  formData.info_placed
                    ? optionData.data.info_placed.filter((opt) =>
                        formData.info_placed.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_placed"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.placed_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_allowed_ps}
                getOptionLabel={(option) =>
                  option.allowed_ps_ ? option.allowed_ps_ : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="บุคคลที่มีสิทธิเข้าถึงข้อมูล" />
                )}
                value={
                  formData.info_allowed_ps
                    ? optionData.data.info_allowed_ps.filter((opt) =>
                        formData.info_allowed_ps.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_allowed_ps"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.allowed_ps_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_allowed_ps_condition}
                getOptionLabel={(option) =>
                  option.allowed_ps_condition_
                    ? option.allowed_ps_condition_
                    : ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล"
                  />
                )}
                value={
                  formData.info_allowed_ps_condition
                    ? optionData.data.info_allowed_ps_condition.filter((opt) =>
                        formData.info_allowed_ps_condition.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_allowed_ps_condition"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.allowed_ps_condition_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_access}
                getOptionLabel={(option) =>
                  option.access_ ? option.access_ : ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="วิธีการเข้าถึงข้อมูลส่วนบุคคล"
                  />
                )}
                value={
                  formData.info_access
                    ? optionData.data.info_access.filter((opt) =>
                        formData.info_access.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_access"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.access_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_access_condition}
                getOptionLabel={(option) =>
                  option.access_condition_ ? option.access_condition_ : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="เงื่อนไขการเข้าถึงข้อมูล" />
                )}
                value={
                  formData.info_access_condition
                    ? optionData.data.info_access_condition.filter((opt) =>
                        formData.info_access_condition.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_access_condition"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.access_condition_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_ps_usedbyrole_inside}
                getOptionLabel={(option) =>
                  option.use_by_role_ ? option.use_by_role_ : ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง (ภายในองค์กร)"
                  />
                )}
                value={
                  formData.info_ps_usedbyrole_inside
                    ? optionData.data.info_ps_usedbyrole_inside.filter((opt) =>
                        formData.info_ps_usedbyrole_inside.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_ps_usedbyrole_inside"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.use_by_role_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_ps_sendto_outside}
                getOptionLabel={(option) =>
                  option.sendto_ ? option.sendto_ : ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ข้อมูลส่วนบุคคล ถูกส่งต่อ/เปิดเผยให้ใครบ้าง (ภายนอกองค์กร)"
                  />
                )}
                value={
                  formData.info_ps_sendto_outside
                    ? optionData.data.info_ps_sendto_outside.filter((opt) =>
                        formData.info_ps_sendto_outside.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_ps_sendto_outside"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.sendto_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.info_ps_destroying}
                getOptionLabel={(option) =>
                  option.destroying_ ? option.destroying_ : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="วิธีการทำลายข้อมูลส่วนบุคคล" />
                )}
                value={
                  formData.info_ps_destroying
                    ? optionData.data.info_ps_destroying.filter((opt) =>
                        formData.info_ps_destroying.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_ps_destroying"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.destroying_}
                  </li>
                )}
              />

              <Autocomplete
                multiple
                options={optionData.data.info_ps_destroyer}
                getOptionLabel={(option) =>
                  option.destroyer_ ? option.destroyer_ : ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ผู้อนุมัติการทำลายข้อมูลส่วนบุคคล"
                  />
                )}
                value={
                  formData.info_ps_destroyer
                    ? optionData.data.info_ps_destroyer.filter((opt) =>
                        formData.info_ps_destroyer.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "info_ps_destroyer"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.destroyer_}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.m_organization}
                getOptionLabel={(option) =>
                  option.organization ? option.organization : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="มาตรการเชิงองค์กร" />
                )}
                value={
                  formData.m_organization
                    ? optionData.data.m_organization.filter((opt) =>
                        formData.m_organization.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "m_organization"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.organization}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.m_technical}
                getOptionLabel={(option) =>
                  option.technical ? option.technical : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="มาตรการเชิงเทคนิค" />
                )}
                value={
                  formData.m_technical
                    ? optionData.data.m_technical.filter((opt) =>
                        formData.m_technical.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "m_technical"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.technical}
                  </li>
                )}
              />
              <Autocomplete
                multiple
                options={optionData.data.m_physical}
                getOptionLabel={(option) =>
                  option.physical ? option.physical : ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="มาตรการทางกายภาพ" />
                )}
                value={
                  formData.m_physical
                    ? optionData.data.m_physical.filter((opt) =>
                        formData.m_physical.includes(opt.id)
                      )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => v.id),
                    "m_physical"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === ""
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.physical}
                  </li>
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  fontSize: "1.1rem",
                }}
                disabled={!isFormComplete} // Disable button if form is not complete
              >
                <NoteAddOutlinedIcon
                  sx={{
                    mr: 1,
                    mb: {
                      xs: 1,
                      sm: 0,
                      lg: 0,
                    },
                    fontSize: "1.5rem",
                  }}
                />{" "}
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default ActivitiesAdd;
