import React, { useEffect } from "react";

import {
  Button,
  Stack,
  FormHelperText,
  Input,
  FormControl,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useStyles from "../../authentication/components/Forms/Style.js";
import { createUnit, updateUnit } from "../actions/units.js";
import HelperText from "../../../components/HelperText.js";
import { useSelector } from "react-redux";
import { cleanUp } from "../../courses/actions/courses.js";
import { useLocation } from "react-router-dom";

const UnitForm = ({
  courseId,
  unit,
  setOpenUnitForm,
  setIsUpdate,
  isUpdate,
  setSelectedUnit,
}) => {
  const dispatch = useDispatch();

  const { message, success } = useSelector((state) => state.courses);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: isUpdate ? unit?.title : "",
    },
  });

  const onSubmit = (data) => {
    const newUnit = {
      courseId: courseId,
      title: data.title,
    };
    if (isUpdate && unit) {
      dispatch(updateUnit({ ...newUnit, id: unit.id }));
    } else {
      dispatch(createUnit(newUnit));
    }
  };

  useEffect(() => {
    if (success) {
      setIsUpdate(false);
      setOpenUnitForm(false);
      setSelectedUnit("");
      dispatch(cleanUp());
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {message && (
        <Typography
          sx={{
            color: "red",
            textAlign: "center",
            mt: "10px",
          }}
        >
          {message}
        </Typography>
      )}

      <Stack sx={{ gap: "20px", margin: "20px 0" }}>
        <Stack>
          <HelperText text="Unit title" />
          <FormControl variant="outlined" fullWidth>
            <Input
              disableUnderline
              type={"text"}
              sx={{
                m: "15px 0 !important",
                background: "rgba(176, 186, 195, 0.19) !important",
                padding: "10px 16px !important",
                borderRadius: "5px",
              }}
              placeholder="Unit"
              name="title"
              {...register("title", {
                required: "Unit title is required",
              })}
              id="outlined-basic unit title"
            />
            {!!errors.title && (
              <FormHelperText sx={{ mt: "-10px" }} error id="username-error">
                {errors.title && errors.title.message}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
      </Stack>

      <Button sx={useStyles.submitButtonStyle} type="submit">
        Save
      </Button>
    </form>
  );
};

export default UnitForm;
