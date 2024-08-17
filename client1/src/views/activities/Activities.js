import React, { useState } from "react";
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

const ActivitiesAdd = () => {
  const [formData, setFormData] = useState({
    activity: "",
    status: "",
    createBy: "",
    company_id: "",
    category: "",
    department_id: "",
    info_role: "",
    info_document: "",
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

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Add Activities</Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <form onSubmit={handleSubmit}>
            <Autocomplete
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="Activity" />
              )}
              value={formData.activity}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "activity")
              }
              fullWidth
              sx={{ mb: 2 }}
              freeSolo
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            <Autocomplete
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
            />
            <Autocomplete
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
            />
            <Autocomplete
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
            />
            <Autocomplete
              options={["ข้อมูลในใบรับสมัครพนักงาน", "ข้อมูลอื่นๆ"]}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
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
                <TextField {...params} label="Department ID" />
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
            <Autocomplete
              options={[1, 2, 3, 4, 5]}
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) => (
                <TextField {...params} label="Info Role" />
              )}
              value={formData.info_role}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_role")
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
                <TextField {...params} label="Info Document" />
              )}
              value={formData.info_document}
              onChange={(event, value) =>
                handleAutocompleteChange(event, value, "info_document")
              }
              fullWidth
              sx={{ mb: 2 }}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
            {formData.poi_relations.map((relation, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">POI Relation {index + 1}</Typography>
                <Autocomplete
                  options={["ข้อมูลที่หนึ่ง", "ข้อมูลที่สอง"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Info" />
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
                  options={["เจ้าของที่หนึ่ง", "เจ้าของที่สอง"]}
                  renderInput={(params) => (
                    <TextField {...params} label="POI Info Owner" />
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
                  options={["แหล่งที่หนึ่ง", "แหล่งที่สอง"]}
                  renderInput={(params) => (
                    <TextField {...params} label="POI Info From" />
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
                  options={["รูปแบบที่หนึ่ง", "รูปแบบที่สอง"]}
                  renderInput={(params) => (
                    <TextField {...params} label="POI Info Format" />
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
                    <TextField {...params} label="POI Info Type" />
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
                    <TextField {...params} label="POI Info Objective" />
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
                    <TextField {...params} label="POI Info Lawbase" />
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
                <TextField {...params} label="Info Stored Period" />
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
                <TextField {...params} label="Info Placed" />
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
                <TextField {...params} label="Info Allowed PS" />
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
                <TextField {...params} label="Info Allowed PS Condition" />
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
                <TextField {...params} label="Info Access" />
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
                <TextField {...params} label="Info Access Condition" />
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
                <TextField {...params} label="Info PS Used by Role Inside" />
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
                <TextField {...params} label="Info PS Send to Outside" />
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
                <TextField {...params} label="Info PS Destroying" />
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
                <TextField {...params} label="Info PS Destroyer" />
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
                <TextField {...params} label="M Organization" />
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
                <TextField {...params} label="M Technical" />
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
                <TextField {...params} label="M Physical" />
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
