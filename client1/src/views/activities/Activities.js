import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Autocomplete,
  Button,
  IconButton,
  Collapse,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import PlusOneOutlinedIcon from "@mui/icons-material/PlusOneOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import authUtils from "../../hooks/useAuth";
import optionUtils from "../../hooks/useOption";
import axios from "axios";

const ActivitiesAdd = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize initial form state
  const initialFormState = useMemo(
    () => ({
      activity: "",
      status: "pending",
      createBy: "",
      company_id: "",
      department_id: "",
      categories: [{ category: "", poi_relations: [] }],
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormState);

  // const [formData, setFormData] = useState({
  //   activity: "",
  //   status: "pending",
  //   createBy: "",
  //   company_id: "",
  //   department_id: "",
  //   categories: [
  //     {
  //       category: "",
  //       poi_relations: [
  //         {
  //           poi_info: "",
  //           poi_info_owner: "",
  //           poi_info_from: "",
  //           poi_info_format: "",
  //           poi_info_type: "",
  //           poi_info_objective: "",
  //           poi_info_lawbase: [],
  //         },
  //       ],
  //     },
  //   ],
  //   // categories: [],
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

  const [optionData, setOptionData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState({}); // State for tracking expanded sections

  const requiredFields = [
    "activity",
    "status",
    "createBy",
    "company_id",
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

        // Update formData with user information
        setFormData((prevData) => ({
          ...prevData,
          createBy: user.data.users.id,
          company_id: user.data.users.company_id,
        }));
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
    checkFormCompletion();
    // console.log("Form data", formData);
  }, [formData]);

  // const checkFormCompletion = () => {
  //   if (!formData) return setIsFormComplete(false);

  //   const requiredFieldsComplete = requiredFields.every((field) => {
  //     const value = formData[field];
  //     const isFilled =
  //       value &&
  //       (Array.isArray(value)
  //         ? value.length > 0
  //         : typeof value === "string"
  //         ? value.trim() !== ""
  //         : true);
  //     if (!isFilled) {
  //       console.log(`Field ${field} is incomplete.`);
  //     }
  //     return isFilled;
  //   });

  //   const categoriesComplete =
  //     formData.categories.length > 0 &&
  //     formData.categories.every((categoryItem, index) => {
  //       if (!categoryItem.category) {
  //         console.log(`Category ${index + 1} is incomplete.`);
  //         return false;
  //       }
  //       return categoryItem.poi_relations.every((poi, poiIndex) => {
  //         return requiredPoiFields.every((field) => {
  //           const poiValue = poi[field];
  //           const isFilled =
  //             poiValue &&
  //             (Array.isArray(poiValue)
  //               ? poiValue.length > 0
  //               : typeof poiValue === "string"
  //               ? poiValue.trim() !== ""
  //               : true);
  //           if (!isFilled) {
  //             console.log(
  //               `POI Relation ${poiIndex + 1} in Category ${
  //                 index + 1
  //               } has incomplete field ${field}.`
  //             );
  //           }
  //           return isFilled;
  //         });
  //       });
  //     });

  //   const isComplete = requiredFieldsComplete && categoriesComplete;
  //   console.log("Form complete:", isComplete);
  //   setIsFormComplete(isComplete);
  // };

  const checkFormCompletion = () => {
    // Early return if no form data
    if (!formData) {
      setIsFormComplete(false);
      return;
    }

    // Check required fields first
    for (const field of requiredFields) {
      const value = formData[field];
      if (
        !value ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "string" && !value.trim())
      ) {
        // console.log(`Field ${field} is incomplete.`);
        setIsFormComplete(false);
        return;
      }
    }

    // Check categories
    const categories = formData.categories;
    if (!Array.isArray(categories) || categories.length === 0) {
      setIsFormComplete(false);
      return;
    }

    // Validate each category
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (!category?.category) {
        // console.log(`Category ${i + 1} is incomplete.`);
        setIsFormComplete(false);
        return;
      }

      const pois = category.poi_relations;
      if (!Array.isArray(pois)) {
        setIsFormComplete(false);
        return;
      }

      // Validate POIs
      for (const poi of pois) {
        if (!poi) continue;

        for (const field of requiredPoiFields) {
          const value = poi[field];
          if (
            !value ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === "string" && !value.trim())
          ) {
            // console.log(
            //   `POI Field ${field} in category ${i + 1} is incomplete.`
            // );
            setIsFormComplete(false);
            return;
          }
        }
      }
    }

    setIsFormComplete(true);
  };

  const handleAutocompleteChange = (event, value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value && value.id ? value.id : value,
    }));
    checkFormCompletion();
  };

  const handleCategoryChange = (event, value, categoryIndex) => {
    setFormData((prevFormData) => {
      const updatedCategories = [...prevFormData.categories];
      updatedCategories[categoryIndex].category =
        value && value.id ? value.id : value;
      return { ...prevFormData, categories: updatedCategories };
    });
    checkFormCompletion();
  };

  // const handleAutocompleteChange = (event, value, field) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: value && value.id ? value.id : value,
  //   }));
  //   checkFormCompletion();
  // };

  // const handleCategoryChange = (event, value, categoryIndex) => {
  //   setFormData((prevFormData) => {
  //     const updatedCategories = [...prevFormData.categories];
  //     updatedCategories[categoryIndex].category =
  //       value && value.id ? value.id : value;
  //     return { ...prevFormData, categories: updatedCategories };
  //   });
  //   checkFormCompletion();
  // };

  // const handleCategoryInputChange = (event, newInputValue, categoryIndex) => {
  //   setFormData((prevFormData) => {
  //     const updatedCategories = [...prevFormData.categories];
  //     updatedCategories[categoryIndex].category = newInputValue;
  //     return { ...prevFormData, categories: updatedCategories };
  //   });
  //   checkFormCompletion();
  // };

  const handleCategoryInputChange = (event, newInputValue, categoryIndex) => {
    setFormData((prevFormData) => {
      const updatedCategories = [...prevFormData.categories];
      updatedCategories[categoryIndex].category = newInputValue;
      return { ...prevFormData, categories: updatedCategories };
    });
    checkFormCompletion();
  };

  // const handleNestedAutocompleteChange = (
  //   event,
  //   value,
  //   categoryIndex,
  //   index,
  //   field
  // ) => {
  //   setFormData((prevFormData) => {
  //     const updatedCategories = [...prevFormData.categories];
  //     const updatedRelations = [
  //       ...updatedCategories[categoryIndex].poi_relations,
  //     ];
  //     updatedRelations[index] = {
  //       ...updatedRelations[index],
  //       [field]: value && value.id ? value.id : value,
  //     };
  //     updatedCategories[categoryIndex].poi_relations = updatedRelations;
  //     return {
  //       ...prevFormData,
  //       categories: updatedCategories,
  //     };
  //   });
  //   checkFormCompletion();
  // };

  const handleNestedAutocompleteChange = (
    event,
    value,
    categoryIndex,
    index,
    field
  ) => {
    setFormData((prevFormData) => {
      const updatedCategories = [...prevFormData.categories];
      if (
        updatedCategories[categoryIndex] &&
        Array.isArray(updatedCategories[categoryIndex].poi_relations)
      ) {
        const updatedPoiRelations = [
          ...updatedCategories[categoryIndex].poi_relations,
        ];
        updatedPoiRelations[index] = {
          ...updatedPoiRelations[index],
          [field]: value && value.id ? value.id : value,
        };
        updatedCategories[categoryIndex].poi_relations = updatedPoiRelations;
      }
      return { ...prevFormData, categories: updatedCategories };
    });
    checkFormCompletion();
  };

  const handleNestedInputChange = (
    event,
    newInputValue,
    categoryIndex,
    index,
    field
  ) => {
    setFormData((prevFormData) => {
      const updatedCategories = [...prevFormData.categories];
      const updatedRelations = [
        ...updatedCategories[categoryIndex].poi_relations,
      ];
      updatedRelations[index] = {
        ...updatedRelations[index],
        [field]: newInputValue,
      };
      updatedCategories[categoryIndex].poi_relations = updatedRelations;
      return {
        ...prevFormData,
        categories: updatedCategories,
      };
    });
    checkFormCompletion();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data", formData);

    // Validation
    for (let field of requiredFields) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        return alert(`Please fill in the ${field}`);
      }
    }

    for (let category of formData.categories) {
      if (!category.category || category.category.trim() === "") {
        return alert("Please fill in the category");
      }
      for (let poi of category.poi_relations) {
        for (let field of requiredPoiFields) {
          if (
            !poi[field] ||
            (Array.isArray(poi[field]) && poi[field].length === 0)
          ) {
            return alert(
              `Please fill in the ${field} in poi_relations of category`
            );
          }
        }
      }
    }

    await axios
      .post(`${process.env.REACT_APP_SERVER_SIDE}/information`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Activity added successfully!");
        } else {
          toast.error("Failed to add activity. Please try again.");
        }

        setTimeout(() => {
          window.location.href = "/activities";
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to add activity. Please try again.");
        console.error("Error", error);
      });
  };

  const addCategory = () => {
    const newCategory = {
      category: "",
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
    };
    setFormData((prevState) => ({
      ...prevState,
      categories: [...prevState.categories, newCategory],
    }));
  };

  const addPoiRelation = (categoryIndex) => {
    const newPoiRelation = {
      poi_info: "",
      poi_info_owner: "",
      poi_info_from: "",
      poi_info_format: "",
      poi_info_type: "",
      poi_info_objective: "",
      poi_info_lawbase: [],
    };
    setFormData((prevState) => {
      const updatedCategories = [...prevState.categories];
      updatedCategories[categoryIndex].poi_relations = [
        ...updatedCategories[categoryIndex].poi_relations,
        newPoiRelation,
      ];
      return { ...prevState, categories: updatedCategories };
    });
  };

  // Handle expanding/collapsing sections
  const toggleExpand = (categoryIndex) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
  };

  // Toggle collapse for poi_relations
  const togglePoiExpand = (categoryIndex, poiIndex) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [`${categoryIndex}-${poiIndex}`]: !prev[`${categoryIndex}-${poiIndex}`],
    }));
  };

  const handleDeleteCategory = (index) => {
    setFormData((prevFormData) => {
      const updatedCategories = [...prevFormData.categories];
      updatedCategories.splice(index, 1); // ลบหมวดหมู่ตาม index ที่ส่งเข้ามา
      return { ...prevFormData, categories: updatedCategories };
    });
  };

  const handleDeletePoiRelation = (categoryIndex, relationIndex) => {
    setFormData((prevFormData) => {
      const updatedCategories = [...prevFormData.categories];
      const updatedRelations = [
        ...updatedCategories[categoryIndex].poi_relations,
      ];
      updatedRelations.splice(relationIndex, 1); // ลบข้อมูลส่วนบุคคลตาม index ที่ส่งเข้ามา
      updatedCategories[categoryIndex].poi_relations = updatedRelations;
      return { ...prevFormData, categories: updatedCategories };
    });
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
              {/* Department Field */}
              <Autocomplete
                freeSolo
                options={optionData.data.department}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : option.departmentName || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="หน่วยงานที่บันทึกรายการ" />
                )}
                value={
                  typeof formData.department_id === "string"
                    ? formData.department_id
                    : optionData.data.department.find(
                        (option) => option.id === formData.department_id
                      ) || ""
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    typeof value === "string" ? value : value?.id || "",
                    "department_id"
                  )
                }
                onInputChange={(event, newInputValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    department_id: newInputValue,
                  }));
                  checkFormCompletion();
                }}
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === "" || option === value
                }
              />

              {/* Activity Field */}
              <Autocomplete
                freeSolo
                options={optionData.data.activity}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.activity || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="กิจกรรมงานที่บันทึกรายการ" />
                )}
                value={
                  typeof formData.activity === "string"
                    ? formData.activity
                    : optionData.data.activity.find(
                        (option) => option.id === formData.activity
                      ) || ""
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    typeof value === "string" ? value : value?.id || "",
                    "activity"
                  )
                }
                onInputChange={(event, newInputValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    activity: newInputValue,
                  }));
                  checkFormCompletion();
                }}
                fullWidth
                sx={{ mb: 2 }}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id || value === "" || option === value
                }
              />

              <Box sx={{ ml: 3 }}>
                {/* Categories and POI Relations */}
                {formData.categories.map((categoryItem, categoryIndex) => (
                  <Box key={categoryIndex} sx={{ mb: 1 }}>
                    {/* <Typography variant="h6" sx={{ mb: 1.2 }}>
                      ข้อมูลเอกสาร ที่ {categoryIndex + 1}
                    </Typography> */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h6" sx={{ mb: 1.2, flex: 1 }}>
                        ข้อมูลเอกสาร ที่ {categoryIndex + 1}
                      </Typography>

                      {/* Expand/Collapse button */}
                      <IconButton onClick={() => toggleExpand(categoryIndex)}>
                        {expandedIndexes[categoryIndex] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </Box>

                    {/* Category Field */}
                    <Autocomplete
                      freeSolo
                      options={optionData?.data?.category || []}
                      getOptionLabel={(option) =>
                        typeof option === "string"
                          ? option
                          : option?.category || ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ชื่อเอกสาร หรือ ชื่อไฟล์ที่จัดเก็บข้อมูล เช่น สำเนาบัตรประชาชน หรือ ใบสมัครงาน"
                        />
                      )}
                      value={
                        typeof categoryItem.category === "string"
                          ? categoryItem.category
                          : (optionData?.data?.category || []).find(
                              (option) => option.id === categoryItem.category
                            ) || ""
                      }
                      onChange={(event, value) =>
                        handleCategoryChange(event, value, categoryIndex)
                      }
                      onInputChange={(event, newInputValue) =>
                        handleCategoryInputChange(
                          event,
                          newInputValue,
                          categoryIndex
                        )
                      }
                      sx={{ mb: 2, ml: 4 }}
                      isOptionEqualToValue={(option, value) =>
                        option?.id === value?.id ||
                        value === "" ||
                        option === value
                      }
                    />

                    {/* Collapse for POI Relations */}
                    <Collapse in={expandedIndexes[categoryIndex]}>
                      <Box sx={{ ml: 4 }}>
                        {/* POI Relations */}
                        {categoryItem.poi_relations.map(
                          (relation, relationIndex) => (
                            <Box key={relationIndex} sx={{ mb: 2, ml: 4 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  // ml: 4,
                                }}
                              >
                                <Typography variant="h6" sx={{ mb: 1.2 }}>
                                  ข้อมูลส่วนบุคคลที่เก็บ ที่ {relationIndex + 1}
                                </Typography>
                                <IconButton
                                  onClick={() =>
                                    togglePoiExpand(
                                      categoryIndex,
                                      relationIndex
                                    )
                                  }
                                >
                                  {expandedIndexes[
                                    `${categoryIndex}-${relationIndex}`
                                  ] ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </IconButton>
                              </Box>

                              <Collapse
                                in={
                                  expandedIndexes[
                                    `${categoryIndex}-${relationIndex}`
                                  ]
                                }
                              >
                                <Box sx={{ ml: 4 }}>
                                  {/* poi_info */}
                                  <Autocomplete
                                    freeSolo
                                    options={optionData.data.poi_info}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.info_ || ""
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="ข้อมูล เช่น ชื่อ-นามสกุล"
                                      />
                                    )}
                                    value={
                                      typeof relation.poi_info === "string"
                                        ? relation.poi_info
                                        : optionData.data.poi_info.find(
                                            (opt) =>
                                              opt.id === relation.poi_info
                                          ) || ""
                                    }
                                    onChange={(event, value) =>
                                      handleNestedAutocompleteChange(
                                        event,
                                        typeof value === "string"
                                          ? value
                                          : value?.id || "",
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info"
                                      )
                                    }
                                    onInputChange={(event, newInputValue) => {
                                      handleNestedInputChange(
                                        event,
                                        newInputValue,
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info"
                                      );
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    isOptionEqualToValue={(option, value) =>
                                      option.id === value.id ||
                                      value === "" ||
                                      option === value
                                    }
                                  />

                                  {/* poi_info_owner */}
                                  <Autocomplete
                                    freeSolo
                                    options={optionData.data.poi_info_owner}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.owner_ || ""
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="เจ้าของข้อมูลส่วนบุคคล"
                                      />
                                    )}
                                    value={
                                      typeof relation.poi_info_owner ===
                                      "string"
                                        ? relation.poi_info_owner
                                        : optionData.data.poi_info_owner.find(
                                            (opt) =>
                                              opt.id === relation.poi_info_owner
                                          ) || ""
                                    }
                                    onChange={(event, value) =>
                                      handleNestedAutocompleteChange(
                                        event,
                                        typeof value === "string"
                                          ? value
                                          : value?.id || "",
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_owner"
                                      )
                                    }
                                    onInputChange={(event, newInputValue) => {
                                      handleNestedInputChange(
                                        event,
                                        newInputValue,
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_owner"
                                      );
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                  />

                                  {/* poi_info_from */}
                                  <Autocomplete
                                    freeSolo
                                    options={optionData.data.poi_info_from}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.from_ || ""
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="ได้รับข้อมูลจาก"
                                      />
                                    )}
                                    value={
                                      typeof relation.poi_info_from === "string"
                                        ? relation.poi_info_from
                                        : optionData.data.poi_info_from.find(
                                            (opt) =>
                                              opt.id === relation.poi_info_from
                                          ) || ""
                                    }
                                    onChange={(event, value) =>
                                      handleNestedAutocompleteChange(
                                        event,
                                        typeof value === "string"
                                          ? value
                                          : value?.id || "",
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_from"
                                      )
                                    }
                                    onInputChange={(event, newInputValue) => {
                                      handleNestedInputChange(
                                        event,
                                        newInputValue,
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_from"
                                      );
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                  />

                                  {/* poi_info_format */}
                                  <Autocomplete
                                    freeSolo
                                    options={optionData.data.poi_info_format}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.format_ || ""
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="รูปแบบของข้อมูล"
                                      />
                                    )}
                                    value={
                                      typeof relation.poi_info_format ===
                                      "string"
                                        ? relation.poi_info_format
                                        : optionData.data.poi_info_format.find(
                                            (opt) =>
                                              opt.id ===
                                              relation.poi_info_format
                                          ) || ""
                                    }
                                    onChange={(event, value) =>
                                      handleNestedAutocompleteChange(
                                        event,
                                        typeof value === "string"
                                          ? value
                                          : value?.id || "",
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_format"
                                      )
                                    }
                                    onInputChange={(event, newInputValue) => {
                                      handleNestedInputChange(
                                        event,
                                        newInputValue,
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_format"
                                      );
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                  />

                                  {/* poi_info_type */}
                                  <Autocomplete
                                    freeSolo
                                    options={optionData.data.poi_info_type}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.type_ || ""
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="วัตถุประสงค์ของการเก็บข้อมูล"
                                      />
                                    )}
                                    value={
                                      typeof relation.poi_info_type === "string"
                                        ? relation.poi_info_type
                                        : optionData.data.poi_info_type.find(
                                            (opt) =>
                                              opt.id === relation.poi_info_type
                                          ) || ""
                                    }
                                    onChange={(event, value) =>
                                      handleNestedAutocompleteChange(
                                        event,
                                        typeof value === "string"
                                          ? value
                                          : value?.id || "",
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_type"
                                      )
                                    }
                                    onInputChange={(event, newInputValue) => {
                                      handleNestedInputChange(
                                        event,
                                        newInputValue,
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_type"
                                      );
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                  />

                                  {/* poi_info_objective */}
                                  <Autocomplete
                                    freeSolo
                                    options={optionData.data.poi_info_objective}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.objective_ || ""
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="ประเภทของข้อมูลส่วนบุคคล"
                                      />
                                    )}
                                    value={
                                      typeof relation.poi_info_objective ===
                                      "string"
                                        ? relation.poi_info_objective
                                        : optionData.data.poi_info_objective.find(
                                            (opt) =>
                                              opt.id ===
                                              relation.poi_info_objective
                                          ) || ""
                                    }
                                    onChange={(event, value) => {
                                      handleNestedAutocompleteChange(
                                        event,
                                        typeof value === "string"
                                          ? value
                                          : value?.id || "",
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_objective"
                                      );
                                      checkFormCompletion();
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                      handleNestedInputChange(
                                        event,
                                        newInputValue,
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_objective"
                                      );
                                      checkFormCompletion();
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    isOptionEqualToValue={(option, value) =>
                                      option.id === value.id ||
                                      value === "" ||
                                      option === value
                                    }
                                  />

                                  {/* poi_info_lawbase */}
                                  <Autocomplete
                                    freeSolo
                                    multiple
                                    options={optionData.data.poi_info_lawbase}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.lawBase_ || ""
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="ฐานทางกฏหมายสำหรับการประมวลผลข้อมูลส่วนบุคคล"
                                        onKeyDown={(event) => {
                                          if (
                                            event.key === "Enter" &&
                                            event.target.value.trim() !== ""
                                          ) {
                                            event.preventDefault();
                                            handleNestedAutocompleteChange(
                                              event,
                                              [
                                                ...(relation.poi_info_lawbase ||
                                                  []),
                                                event.target.value,
                                              ],
                                              categoryIndex,
                                              relationIndex,
                                              "poi_info_lawbase"
                                            );
                                            checkFormCompletion();
                                          }
                                        }}
                                      />
                                    )}
                                    value={
                                      relation.poi_info_lawbase
                                        ? optionData.data.poi_info_lawbase
                                            .filter((opt) =>
                                              relation.poi_info_lawbase.includes(
                                                opt.id
                                              )
                                            )
                                            .concat(
                                              relation.poi_info_lawbase.filter(
                                                (item) =>
                                                  typeof item === "string"
                                              )
                                            )
                                        : []
                                    }
                                    onChange={(event, value) => {
                                      const updatedValues = value.map((v) =>
                                        typeof v === "string" ? v : v.id
                                      );
                                      handleNestedAutocompleteChange(
                                        event,
                                        updatedValues,
                                        categoryIndex,
                                        relationIndex,
                                        "poi_info_lawbase"
                                      );
                                      checkFormCompletion();
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                  />
                                </Box>

                                {/* Delete POI Relation Button */}
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleDeletePoiRelation(
                                      categoryIndex,
                                      relationIndex
                                    )
                                  }
                                  sx={{
                                    // mb: 2,
                                    fontSize: "0.7rem",
                                    mr: 2,
                                  }}
                                >
                                  <RemoveOutlinedIcon
                                    sx={{
                                      mr: 1,
                                      mb: {
                                        xs: 1,
                                        sm: 0,
                                        lg: 0,
                                      },
                                      fontSize: "1.0rem",
                                    }}
                                  />
                                  ลบข้อมูลส่วนบุคคลที่เก็บ
                                </Button>
                              </Collapse>
                            </Box>
                          )
                        )}
                        {/* Add POI Relation Button */}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addPoiRelation(categoryIndex)}
                          sx={{ mb: 2, fontSize: "0.7rem", mr: 2, ml: 4 }}
                        >
                          <PlusOneOutlinedIcon
                            sx={{
                              mr: 1,
                              mb: {
                                xs: 1,
                                sm: 0,
                                lg: 0,
                              },
                              fontSize: "1.0rem",
                            }}
                          />
                          เพิ่มข้อมูลส่วนบุคคลที่เก็บ
                        </Button>
                      </Box>
                    </Collapse>
                    {/* Delete Category Button */}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteCategory(categoryIndex)}
                      sx={{
                        // mb: 2,
                        fontSize: "0.7rem",
                        mr: 2,
                      }}
                    >
                      <RemoveOutlinedIcon
                        sx={{
                          mr: 1,
                          mb: {
                            xs: 1,
                            sm: 0,
                            lg: 0,
                          },
                          fontSize: "1.0rem",
                        }}
                      />
                      ลบเอกสาร
                    </Button>
                  </Box>
                ))}

                {/* Add Category Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addCategory}
                  sx={{ mb: 2, fontSize: "0.7rem" }}
                >
                  <PlusOneOutlinedIcon
                    sx={{
                      mr: 1,
                      mb: {
                        xs: 1,
                        sm: 0,
                        lg: 0,
                      },
                      fontSize: "1.0rem",
                    }}
                  />
                  เพิ่มเอกสาร
                </Button>
              </Box>

              {/* Rest of the Form Fields */}

              {/* info_stored_period */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_stored_period}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.period_ || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ระยะเวลาการจัดเก็บข้อมูลส่วนบุคคล"
                  />
                )}
                value={
                  formData.info_stored_period
                    ? optionData.data.info_stored_period
                        .filter((opt) =>
                          formData.info_stored_period.includes(opt.id)
                        )
                        .concat(
                          formData.info_stored_period.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_stored_period"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_placed */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_placed}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.placed_ || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="แหล่งจัดเก็บข้อมูลส่วนบุคคล" />
                )}
                value={
                  formData.info_placed
                    ? optionData.data.info_placed
                        .filter((opt) => formData.info_placed.includes(opt.id))
                        .concat(
                          formData.info_placed.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_placed"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_allowed_ps */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_allowed_ps}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.allowed_ps_ || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="บุคคลที่มีสิทธิเข้าถึงข้อมูล" />
                )}
                value={
                  formData.info_allowed_ps
                    ? optionData.data.info_allowed_ps
                        .filter((opt) =>
                          formData.info_allowed_ps.includes(opt.id)
                        )
                        .concat(
                          formData.info_allowed_ps.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_allowed_ps"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_allowed_ps_condition */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_allowed_ps_condition}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : option.allowed_ps_condition_ || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล"
                  />
                )}
                value={
                  formData.info_allowed_ps_condition
                    ? optionData.data.info_allowed_ps_condition
                        .filter((opt) =>
                          formData.info_allowed_ps_condition.includes(opt.id)
                        )
                        .concat(
                          formData.info_allowed_ps_condition.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_allowed_ps_condition"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_access */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_access}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.access_ || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="วิธีการเข้าถึงข้อมูลส่วนบุคคล"
                  />
                )}
                value={
                  formData.info_access
                    ? optionData.data.info_access
                        .filter((opt) => formData.info_access.includes(opt.id))
                        .concat(
                          formData.info_access.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_access"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_access_condition */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_access_condition}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : option.access_condition_ || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="เงื่อนไขการเข้าถึงข้อมูล" />
                )}
                value={
                  formData.info_access_condition
                    ? optionData.data.info_access_condition
                        .filter((opt) =>
                          formData.info_access_condition.includes(opt.id)
                        )
                        .concat(
                          formData.info_access_condition.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_access_condition"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_ps_usedbyrole_inside */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_ps_usedbyrole_inside}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : option.use_by_role_ || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง (ภายในองค์กร)"
                  />
                )}
                value={
                  formData.info_ps_usedbyrole_inside
                    ? optionData.data.info_ps_usedbyrole_inside
                        .filter((opt) =>
                          formData.info_ps_usedbyrole_inside.includes(opt.id)
                        )
                        .concat(
                          formData.info_ps_usedbyrole_inside.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_ps_usedbyrole_inside"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_ps_sendto_outside */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_ps_sendto_outside}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.sendto_ || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ข้อมูลส่วนบุคคล ถูกส่งต่อ/เปิดเผยให้ใครบ้าง (ภายนอกองค์กร)"
                  />
                )}
                value={
                  formData.info_ps_sendto_outside
                    ? optionData.data.info_ps_sendto_outside
                        .filter((opt) =>
                          formData.info_ps_sendto_outside.includes(opt.id)
                        )
                        .concat(
                          formData.info_ps_sendto_outside.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_ps_sendto_outside"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_ps_destroying */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_ps_destroying}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.destroying_ || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="วิธีการทำลายข้อมูลส่วนบุคคล" />
                )}
                value={
                  formData.info_ps_destroying
                    ? optionData.data.info_ps_destroying
                        .filter((opt) =>
                          formData.info_ps_destroying.includes(opt.id)
                        )
                        .concat(
                          formData.info_ps_destroying.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_ps_destroying"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* info_ps_destroyer */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.info_ps_destroyer}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.destroyer_ || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ผู้อนุมัติการทำลายข้อมูลส่วนบุคคล"
                  />
                )}
                value={
                  formData.info_ps_destroyer
                    ? optionData.data.info_ps_destroyer
                        .filter((opt) =>
                          formData.info_ps_destroyer.includes(opt.id)
                        )
                        .concat(
                          formData.info_ps_destroyer.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "info_ps_destroyer"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* m_organization */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.m_organization}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : option.organization || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="มาตรการเชิงองค์กร" />
                )}
                value={
                  formData.m_organization
                    ? optionData.data.m_organization
                        .filter((opt) =>
                          formData.m_organization.includes(opt.id)
                        )
                        .concat(
                          formData.m_organization.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "m_organization"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* m_technical */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.m_technical}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.technical || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="มาตรการเชิงเทคนิค" />
                )}
                value={
                  formData.m_technical
                    ? optionData.data.m_technical
                        .filter((opt) => formData.m_technical.includes(opt.id))
                        .concat(
                          formData.m_technical.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "m_technical"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* m_physical */}
              <Autocomplete
                multiple
                freeSolo
                options={optionData.data.m_physical}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.physical || ""
                }
                renderInput={(params) => (
                  <TextField {...params} label="มาตรการทางกายภาพ" />
                )}
                value={
                  formData.m_physical
                    ? optionData.data.m_physical
                        .filter((opt) => formData.m_physical.includes(opt.id))
                        .concat(
                          formData.m_physical.filter(
                            (item) => typeof item === "string"
                          )
                        )
                    : []
                }
                onChange={(event, value) =>
                  handleAutocompleteChange(
                    event,
                    value.map((v) => (typeof v === "string" ? v : v.id)),
                    "m_physical"
                  )
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  fontSize: "1.1rem",
                }}
                disabled={!isFormComplete}
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

export default React.memo(ActivitiesAdd);
