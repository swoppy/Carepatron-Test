import { ArrowBack, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
  TextField,
  useMediaQuery
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form"
import { useContext, useState } from "react";
import { createClient } from "../../services/api";
import { StateContext } from "../../store/DataProvider";

type ClientFields = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

function CreateNewClientDialog() {
  const [open, setOpen] = useState(false); 

  const steps = ["Personal details", "Contact details"];
  const [activeStep, setActiveStep] = useState(0);

  const { dispatch } = useContext(StateContext);
  const fullScreen = useMediaQuery('@media (max-width: 640px)');

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<ClientFields>();

  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

  function resetForm() {
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
    setActiveStep(0);
  }

  const handleCreateClient: SubmitHandler<ClientFields> = async (data) => {
    trigger(["email", "phoneNumber"]);
    if (isValid) {
      createClient({ id: "xxx-xasd", ...data })
      dispatch({ type: "ATTEMPT_OPTIMISCTIC_CLIENT", data: { id: "xxx-xasd", ...data } })
      resetForm();
      setOpen(false);
    }
  }

  function handleNext() {
    trigger(["firstName", "lastName"]);
    if (watchFirstName && watchLastName) {
      setActiveStep((prev) => prev + 1);
    }
  }

  function handleClose() {
    resetForm();
    setOpen(false);
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "#335FFF",
          fontSize: "0.75rem",
          lineHeight: "1.25rem",
          padding: "0.75rem 1.5rem",
          textTransform: "unset",
          borderRadius: "0.375rem",
          fontWeight: 600,
          boxShadow: "none",
        }}
      >
        Create new client
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        hideBackdrop
        fullWidth
        fullScreen={fullScreen}
        maxWidth="xs"
        sx={{
          '& .MuiPaper-root': {
            boxShadow: "1px 7px 44px 11px rgba(217,217,217,0.79)",
          },
          marginBottom: '11rem',
          ...fullScreen && { height: '100%' }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" pt={3} px={3}>
          <DialogTitle
            sx={{
              fontSize: "1rem",
              padding: 0,
              fontWeight: 400
            }}
          >
            Create new client
          </DialogTitle>
          <IconButton
            aria-label="close new client"
            onClick={handleClose}
            size="small"
          >
            <Close style={{ color: "A1A4A5" }}/>
          </IconButton>
        </Box>
          
        <DialogContent sx={{ height: "22rem" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label} sx={{ }}>
                <StepLabel
                  sx={{
                    '& .MuiStepIcon-root.Mui-active': {
                      color: '#335FFF'
                    },
                    '& .MuiStepIcon-root.Mui-completed': {
                      color: 'green'
                    },
                    '& .MuiStepLabel-label': {
                      fontSize: "0.75rem",
                      lineHeight: "1.25rem",
                    },
                    '& .MuiStepLabel-label.Mui-active': {
                      fontWeight: 600,
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      fontWeight: 600,
                    },
                    '& .MuiStepLabel-labelContainer': {
                      width: "6rem",
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))} 
          </Stepper>
          <form onSubmit={handleSubmit(handleCreateClient)}>
            {activeStep === 0 && (
              <>
                <Box>
                  <Box mt={1.5} height="6.125rem">
                    <InputLabel shrink htmlFor="first-name" sx={{color: "#ACAFAF" }}>
                      First name {' '}
                      {errors.firstName?.type === "required" && (
                        <span role="alert" style={{ fontSize: "0.94rem", color: "red", marginTop: "0.125.rem" }}>required</span>
                      )}
                    </InputLabel>
                    <TextField
                      id="first-name"
                      sx={{ width: "100%" }}
                      defaultValue=""
                      {...register("firstName", { required: true })}
                      {...errors.firstName?.type === "required" && { error: true }}
                    />
                  </Box>
                  <Box height="6.125rem">
                    <InputLabel shrink htmlFor="last-name" sx={{ color: "#ACAFAF" }}>
                      Last name {' '}
                      {errors.lastName?.type === "required" && (
                        <span role="alert" style={{ fontSize: "0.94rem", color: "red", marginTop: "0.125.rem" }}>required</span>
                      )}
                    </InputLabel>
                    <TextField
                      id="last-name"
                      sx={{ width: "100%" }}
                      defaultValue=""
                      {...register("lastName", { required: true })}
                      {...errors.lastName?.type === "required" && { error: true }}
                    />
                    
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt={7}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      backgroundColor: "#335FFF",
                      fontSize: "0.75rem",
                      lineHeight: "1.25rem",
                      padding: "0.75rem 1.5rem",
                      textTransform: "unset",
                      borderRadius: "0.375rem",
                      fontWeight: 600,
                      boxShadow: "none",
                      width: "7.813rem"
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Box>
                  <Box mt={1.5} height="6.125rem">
                    <InputLabel shrink htmlFor="email" sx={{ color: "#ACAFAF" }}>
                      Email {' '}
                      {errors.email?.type === "required" && (
                        <span role="alert" style={{ fontSize: "0.94rem", color: "red" }}>required</span>
                      )}
                    </InputLabel>
                    <TextField
                      id="email"
                      sx={{ width: "100%" }}
                      defaultValue=""
                      {...register("email", { required: true })}
                      {...errors.email?.type === "required" && { error: true }}
                    />
                  </Box>
                  <Box height="6.125rem">
                    <InputLabel shrink htmlFor="phone-number" sx={{ color: "#ACAFAF" }}>
                      Phone number {' '}
                      {errors.phoneNumber?.type === "required" && (
                        <span role="alert" style={{ fontSize: "0.94rem", color: "red" }}>required</span>
                      )}
                    </InputLabel>
                    <TextField
                      id="phone-number"
                      sx={{ width: "100%" }}
                      defaultValue=""
                      {...register("phoneNumber", { required: true })}
                      {...errors.phoneNumber?.type === "required" && { error: true }}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={7}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      lineHeight: "1.25rem",
                      fontWeight: 600,
                      color: "#335FFF",
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  > 
                    <IconButton
                      size="small"
                      onClick={() => setActiveStep((prev) => prev - 1)}
                      sx={{
                        display: 'flex',
                        gap: '0.375rem',
                        borderRadius: "0.375rem",
                        padding: '0.75rem',
                      }}
                    >
                      <ArrowBack sx={{ fontSize: 18, color: "#335FFF" }}/>
                      <span style={{ fontSize: 14, color: "#335FFF" }}>Back</span>
                    </IconButton>
                    
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#335FFF",
                      fontSize: "0.75rem",
                      lineHeight: "1.25rem",
                      padding: "0.75rem 1.5rem",
                      textTransform: "unset",
                      borderRadius: "0.375rem",
                      fontWeight: 600,
                      boxShadow: "none",
                      width: "7.813rem"
                    }}
                  >
                    Create client
                  </Button>
                </Box>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateNewClientDialog;
